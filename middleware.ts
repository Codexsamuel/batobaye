import { NextRequest, NextResponse } from 'next/server'
import { 
  securityMiddleware, 
  getSecurityHeaders, 
  checkLoginAttempts, 
  resetLoginAttempts,
  logSecurityEvent 
} from './lib/security'

export function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const pathname = request.nextUrl.pathname

  // 🛡️ SÉCURITÉ : Middleware de sécurité général
  const securityResponse = securityMiddleware(request)
  if (securityResponse) {
    return securityResponse
  }

  // 🛡️ SÉCURITÉ : Protection spéciale pour les routes admin
  if (pathname.startsWith('/admin')) {
    // Vérifier les tentatives de connexion pour les routes de login
    if (pathname === '/admin/login' && request.method === 'POST') {
      const loginCheck = checkLoginAttempts(ip)
      if (!loginCheck.allowed) {
        logSecurityEvent('LOGIN_ATTEMPT_BLOCKED', {
          ip,
          userAgent,
          remainingTime: loginCheck.lockedUntil ? loginCheck.lockedUntil - Date.now() : 0
        })
        
        return new NextResponse(
          JSON.stringify({ 
            error: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
            lockedUntil: loginCheck.lockedUntil 
          }), 
          { 
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
    }

    // Bloquer l'accès direct aux routes admin sans authentification
    if (!pathname.includes('/login') && !pathname.includes('/register')) {
      const token = request.cookies.get('auth-token')?.value || 
                   request.headers.get('authorization')?.replace('Bearer ', '')
      
      if (!token) {
        logSecurityEvent('UNAUTHORIZED_ADMIN_ACCESS', {
          ip,
          userAgent,
          pathname,
          timestamp: new Date().toISOString()
        })
        
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
  }

  // 🛡️ SÉCURITÉ : Protection contre les attaques par injection
  const url = request.nextUrl.toString()
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /union\s+select/i,
    /drop\s+table/i,
    /insert\s+into/i,
    /delete\s+from/i,
    /update\s+set/i,
    /exec\s*\(/i,
    /eval\s*\(/i,
    /document\.cookie/i,
    /window\.location/i
  ]

  if (suspiciousPatterns.some(pattern => pattern.test(url))) {
    logSecurityEvent('INJECTION_ATTEMPT', {
      ip,
      userAgent,
      url,
      timestamp: new Date().toISOString()
    })
    
    return new NextResponse('Requête malveillante détectée', { status: 403 })
  }

  // 🛡️ SÉCURITÉ : Protection contre le scraping
  const scraperPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /perl/i,
    /ruby/i,
    /php/i,
    /headless/i,
    /phantomjs/i,
    /selenium/i
  ]

  if (scraperPatterns.some(pattern => pattern.test(userAgent))) {
    logSecurityEvent('SCRAPER_DETECTED', {
      ip,
      userAgent,
      pathname,
      timestamp: new Date().toISOString()
    })
    
    return new NextResponse('Accès non autorisé', { status: 403 })
  }

  // 🛡️ SÉCURITÉ : Headers de sécurité
  const response = NextResponse.next()
  
  // Ajouter les headers de sécurité
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // 🛡️ SÉCURITÉ : Headers spécifiques pour les routes sensibles
  if (pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
  }

  // 🛡️ SÉCURITÉ : Protection contre le clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none'")

  // 🛡️ SÉCURITÉ : Protection contre le MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // 🛡️ SÉCURITÉ : Protection contre les attaques XSS
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // 🛡️ SÉCURITÉ : Référent Policy stricte
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // 🛡️ SÉCURITÉ : Permissions Policy
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  // 🛡️ SÉCURITÉ : Cache Control pour les pages sensibles
  if (pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
}

// Configuration du middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 