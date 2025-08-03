import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { 
  securityMiddleware, 
  getSecurityHeaders, 
  isSuspiciousIP,
  logSecurityEvent 
} from './lib/security'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''

  // 🔧 MODE DÉVELOPPEMENT - Règles assouplies pour localhost
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isLocalhost = ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')

  // ✅ Autoriser l'accès admin en développement local
  if (isDevelopment && isLocalhost && pathname.startsWith('/admin')) {
    console.log(`🔓 Accès admin autorisé pour IP locale: ${ip}`)
    const response = NextResponse.next()
    
    // En-têtes de sécurité de base pour le développement
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    return response
  }

  // 🛡️ Protection générale pour la production
  if (!isDevelopment) {
    // Vérifications de sécurité complètes
    const securityResponse = securityMiddleware(request)
    if (securityResponse) {
      // Si securityMiddleware retourne une réponse, c'est un blocage
      logSecurityEvent('BLOCKED_REQUEST', {
        ip,
        pathname,
        userAgent
      })
      return securityResponse
    }

    // Détection d'IP suspecte
    if (isSuspiciousIP(ip)) {
      logSecurityEvent('SUSPICIOUS_IP', { ip, pathname, userAgent })
      return new NextResponse('IP suspecte détectée', { status: 403 })
    }
  }

  // 🔍 Protection spéciale pour les routes admin en production
  if (pathname.startsWith('/admin') && !isDevelopment) {
    // Vérifications strictes pour l'admin en production
    const validReferer = referer && (
      referer.includes(request.nextUrl.origin) ||
      referer.includes('localhost') ||
      referer.includes('127.0.0.1')
    )

    if (!validReferer) {
      logSecurityEvent('INVALID_ADMIN_ACCESS', {
        ip,
        pathname,
        referer,
        userAgent
      })
      return new NextResponse('Accès administrateur non autorisé', { status: 403 })
    }
  }

  // 🚫 Détection de scraping et bots
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i,
    /curl/i, /wget/i, /python/i, /selenium/i,
    /headless/i, /phantom/i, /puppet/i
  ]

  const isBot = botPatterns.some(pattern => pattern.test(userAgent))
  if (isBot && !isDevelopment) {
    logSecurityEvent('BOT_DETECTED', { ip, userAgent, pathname })
    return new NextResponse('Accès non autorisé', { status: 403 })
  }

  // 🚫 Détection d'injection dans l'URL
  const injectionPatterns = [
    /<script/i, /javascript:/i, /data:/i, /vbscript:/i,
    /onload/i, /onerror/i, /onclick/i, /onmouseover/i,
    /union.*select/i, /select.*union/i, /drop.*table/i,
    /insert.*into/i, /delete.*from/i, /update.*set/i
  ]

  const hasInjection = injectionPatterns.some(pattern => pattern.test(pathname))
  if (hasInjection) {
    logSecurityEvent('INJECTION_ATTEMPT', { ip, pathname, userAgent })
    return new NextResponse('Tentative d\'injection détectée', { status: 403 })
  }

  // ✅ Réponse normale avec en-têtes de sécurité
  const response = NextResponse.next()
  
  // En-têtes de sécurité adaptés au contexte
  const securityHeaders = getSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // En-têtes supplémentaires pour les pages sensibles
  if (pathname.startsWith('/admin')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 