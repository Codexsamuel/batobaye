// 🛡️ Système de Sécurité Renforcé pour Batobaye Market
// Protection contre : Bots, Scraping, Injections, Fuites de données

import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Configuration de sécurité
const SECURITY_CONFIG = {
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 60,
  MAX_REQUESTS_PER_HOUR: 1000,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // Session security
  SESSION_DURATION: 2 * 60 * 60 * 1000, // 2 heures
  TOKEN_LENGTH: 64,
  
  // Password security
  MIN_PASSWORD_LENGTH: 12,
  REQUIRE_SPECIAL_CHARS: true,
  REQUIRE_NUMBERS: true,
  REQUIRE_UPPERCASE: true,
  
  // IP blocking
  SUSPICIOUS_IPS: new Set<string>(),
  BLOCKED_IPS: new Set<string>(),
  
  // Request validation
  MAX_BODY_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_ORIGINS: [
    'http://localhost:3000',
    'https://batobaye-market.com',
    'https://www.batobaye-market.com'
  ],
  
  // Content Security Policy
  CSP_POLICY: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'"
  ].join('; ')
}

// Stockage des tentatives de connexion
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>()

// Stockage des requêtes par IP
const requestCounts = new Map<string, { count: number; resetTime: number }>()

// Stockage des sessions sécurisées
const secureSessions = new Map<string, {
  userId: string
  expiresAt: number
  ip: string
  userAgent: string
  lastActivity: number
}>()

// 🔐 Génération de tokens sécurisés
export function generateSecureToken(): string {
  return crypto.randomBytes(SECURITY_CONFIG.TOKEN_LENGTH).toString('hex')
}

// 🔐 Hashage sécurisé des mots de passe
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

// 🔐 Vérification des mots de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const [salt, hash] = hashedPassword.split(':')
  const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'))
}

// 🔐 Validation de la force du mot de passe
export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (password.length < SECURITY_CONFIG.MIN_PASSWORD_LENGTH) {
    errors.push(`Le mot de passe doit contenir au moins ${SECURITY_CONFIG.MIN_PASSWORD_LENGTH} caractères`)
  }
  
  if (SECURITY_CONFIG.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un caractère spécial')
  }
  
  if (SECURITY_CONFIG.REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre')
  }
  
  if (SECURITY_CONFIG.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre majuscule')
  }
  
  return { valid: errors.length === 0, errors }
}

// 🚫 Rate Limiting
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = requestCounts.get(ip)
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute
    return { allowed: true, remaining: SECURITY_CONFIG.MAX_REQUESTS_PER_MINUTE - 1, resetTime: now + 60000 }
  }
  
  if (record.count >= SECURITY_CONFIG.MAX_REQUESTS_PER_MINUTE) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }
  
  record.count++
  return { allowed: true, remaining: SECURITY_CONFIG.MAX_REQUESTS_PER_MINUTE - record.count, resetTime: record.resetTime }
}

// 🚫 Protection contre les tentatives de connexion
export function checkLoginAttempts(ip: string): { allowed: boolean; remainingAttempts: number; lockedUntil?: number } {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)
  
  if (!attempts) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now })
    return { allowed: true, remainingAttempts: SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - 1 }
  }
  
  // Vérifier si l'IP est verrouillée
  if (attempts.lockedUntil && now < attempts.lockedUntil) {
    return { allowed: false, remainingAttempts: 0, lockedUntil: attempts.lockedUntil }
  }
  
  // Réinitialiser si le verrouillage est expiré
  if (attempts.lockedUntil && now >= attempts.lockedUntil) {
    attempts.count = 0
    attempts.lockedUntil = undefined
  }
  
  // Vérifier le nombre de tentatives
  if (attempts.count >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
    attempts.lockedUntil = now + SECURITY_CONFIG.LOCKOUT_DURATION
    return { allowed: false, remainingAttempts: 0, lockedUntil: attempts.lockedUntil }
  }
  
  attempts.count++
  attempts.lastAttempt = now
  
  return { allowed: true, remainingAttempts: SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count }
}

// 🚫 Réinitialiser les tentatives de connexion (après succès)
export function resetLoginAttempts(ip: string): void {
  loginAttempts.delete(ip)
}

// 🚫 Détection d'IPs suspectes
export function isSuspiciousIP(ip: string): boolean {
  // Vérifier si l'IP est dans la liste des IPs suspectes
  if (SECURITY_CONFIG.SUSPICIOUS_IPS.has(ip)) {
    return true
  }
  
  // Vérifier si l'IP est bloquée
  if (SECURITY_CONFIG.BLOCKED_IPS.has(ip)) {
    return true
  }
  
  // Détection de patterns suspects (ex: IPs de datacenters connus)
  const suspiciousPatterns = [
    /^8\.8\.8\./, // Google DNS
    /^1\.1\.1\./, // Cloudflare DNS
    /^10\./, // IPs privées
    /^192\.168\./, // IPs privées
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./ // IPs privées
  ]
  
  return suspiciousPatterns.some(pattern => pattern.test(ip))
}

// 🚫 Validation des en-têtes de sécurité
export function validateSecurityHeaders(request: NextRequest): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const userAgent = request.headers.get('user-agent') || ''
  const origin = request.headers.get('origin') || ''
  const referer = request.headers.get('referer') || ''
  
  // Vérifier l'User-Agent (plus permissif)
  if (!userAgent) {
    errors.push('User-Agent manquant')
  } else if (userAgent.length < 5) {
    errors.push('User-Agent trop court')
  }
  
  // Vérifier l'origine
  if (origin && !SECURITY_CONFIG.ALLOWED_ORIGINS.includes(origin)) {
    errors.push('Origine non autorisée')
  }
  
  // Vérifier le referer pour les requêtes sensibles (plus permissif)
  // Permettre l'accès direct aux pages admin
  if (request.nextUrl.pathname.startsWith('/admin') && referer && !referer.includes('batobaye-market.com') && !referer.includes('localhost')) {
    // Ne pas bloquer, juste logger
    console.log(`⚠️ Accès admin avec referer externe: ${referer}`)
  }
  
  return { valid: errors.length === 0, errors }
}

// 🚫 Protection contre les injections
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Supprimer les balises HTML
    .replace(/javascript:/gi, '') // Supprimer les protocoles dangereux
    .replace(/on\w+=/gi, '') // Supprimer les événements JavaScript
    .trim()
}

// 🚫 Validation des données JSON
export function validateJSON(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (typeof data !== 'object' || data === null) {
    errors.push('Données invalides')
    return { valid: false, errors }
  }
  
  // Vérifier la taille des données
  const dataSize = JSON.stringify(data).length
  if (dataSize > SECURITY_CONFIG.MAX_BODY_SIZE) {
    errors.push('Données trop volumineuses')
  }
  
  // Vérifier les propriétés dangereuses
  const dangerousProps = ['__proto__', 'constructor', 'prototype']
  for (const prop of dangerousProps) {
    if (prop in data) {
      errors.push(`Propriété dangereuse détectée: ${prop}`)
    }
  }
  
  return { valid: errors.length === 0, errors }
}

// 🛡️ Middleware de sécurité
export function securityMiddleware(request: NextRequest): NextResponse | null {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || ''
  
  // Bloquer les IPs suspectes
  if (isSuspiciousIP(ip)) {
    console.warn(`🚫 IP suspecte bloquée: ${ip}`)
    return new NextResponse('Accès refusé', { status: 403 })
  }
  
  // Vérifier le rate limiting
  const rateLimit = checkRateLimit(ip)
  if (!rateLimit.allowed) {
    console.warn(`🚫 Rate limit dépassé pour IP: ${ip}`)
    return new NextResponse('Trop de requêtes', { status: 429 })
  }
  
  // Vérifier les en-têtes de sécurité (plus permissif)
  const headersValidation = validateSecurityHeaders(request)
  if (!headersValidation.valid) {
    console.warn(`⚠️ En-têtes de sécurité invalides pour IP: ${ip}`, headersValidation.errors)
    // Ne pas bloquer, juste logger
  }
  
  // Bloquer les bots connus
  const botPatterns = [
    /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
    /python/i, /java/i, /perl/i, /ruby/i, /php/i
  ]
  
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    console.warn(`🚫 Bot détecté et bloqué: ${userAgent}`)
    return new NextResponse('Accès refusé', { status: 403 })
  }
  
  return null // Continuer le traitement
}

// 🛡️ Headers de sécurité
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': SECURITY_CONFIG.CSP_POLICY,
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
}

// 🛡️ Gestion des sessions sécurisées
export function createSecureSession(userId: string, ip: string, userAgent: string): string {
  const token = generateSecureToken()
  const expiresAt = Date.now() + SECURITY_CONFIG.SESSION_DURATION
  
  secureSessions.set(token, {
    userId,
    expiresAt,
    ip,
    userAgent,
    lastActivity: Date.now()
  })
  
  return token
}

// 🛡️ Vérification des sessions sécurisées
export function verifySecureSession(token: string, ip: string, userAgent: string): string | null {
  const session = secureSessions.get(token)
  
  if (!session) {
    return null
  }
  
  // Vérifier l'expiration
  if (Date.now() > session.expiresAt) {
    secureSessions.delete(token)
    return null
  }
  
  // Vérifier l'IP (optionnel, peut être trop strict)
  // if (session.ip !== ip) {
  //   secureSessions.delete(token)
  //   return null
  // }
  
  // Vérifier le User-Agent
  if (session.userAgent !== userAgent) {
    secureSessions.delete(token)
    return null
  }
  
  // Mettre à jour l'activité
  session.lastActivity = Date.now()
  
  return session.userId
}

// 🛡️ Nettoyage des sessions expirées
export function cleanupExpiredSessions(): void {
  const now = Date.now()
  for (const [token, session] of secureSessions.entries()) {
    if (now > session.expiresAt) {
      secureSessions.delete(token)
    }
  }
}

// 🛡️ Logs de sécurité
export function logSecurityEvent(event: string, details: any): void {
  const timestamp = new Date().toISOString()
  console.log(`🛡️ [${timestamp}] ${event}:`, details)
  
  // En production, envoyer vers un service de logging sécurisé
  // Ex: Sentry, LogRocket, ou un système interne
}

// 🛡️ Validation des Super Admin
export function validateSuperAdminCreation(): { allowed: boolean; reason?: string } {
  // Vérifier si un Super Admin existe déjà
  const existingSuperAdmin = Array.from(secureSessions.values()).some(session => {
    // Cette logique doit être adaptée selon votre système d'utilisateurs
    return true // Placeholder
  })
  
  if (existingSuperAdmin) {
    return { allowed: false, reason: 'Un Super Admin existe déjà. Impossible d\'en créer un autre.' }
  }
  
  return { allowed: true }
}

// 🛡️ Protection contre les fuites de données
export function sanitizeResponseData(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'apiKey', 'privateKey']
  const sanitized = { ...data }
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]'
    }
  }
  
  return sanitized
}

// 🛡️ Nettoyage périodique
setInterval(cleanupExpiredSessions, 5 * 60 * 1000) // Toutes les 5 minutes 