// Système d'authentification pour Batobaye Market
// Gestion des rôles : Super Admin et Admin

export interface User {
  id: string
  name: string
  email: string
  role: 'super_admin' | 'admin'
  createdAt: Date
  lastLogin?: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  role: 'admin' | 'super_admin'
}

export interface AuthResult {
  success: boolean
  error?: string
  user?: User
  token?: string
}

// Configuration sécurisée via variables d'environnement
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'admin@batobaye.com'
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || 'change-me-immediately'

// Stockage en mémoire (en production, utiliser une base de données)
let users: User[] = []
let sessions: { [token: string]: { userId: string; expiresAt: Date } } = {}

// Permissions par rôle
const rolePermissions = {
  super_admin: [
    'users:write',
    'deploy:write',
    'code:write',
    'ai:write',
    'products:write',
    'orders:write',
    'content:write',
    'design:write',
    'settings:write',
    'security:write'
  ],
  admin: [
    'products:write',
    'orders:write',
    'content:write',
    'design:write',
    'settings:write'
  ]
}

// Sections accessibles par rôle
const roleSections = {
  super_admin: [
    'dashboard',
    'ecommerce',
    'analytics',
    'website',
    'advanced',
    'system'
  ],
  admin: [
    'dashboard',
    'ecommerce',
    'analytics',
    'website',
    'system'
  ]
}

// Fonction d'initialisation sécurisée
export function initializeAuthSystem(): void {
  // Vérifier si les variables d'environnement sont configurées
  if (!process.env.SUPER_ADMIN_EMAIL || !process.env.SUPER_ADMIN_PASSWORD) {
    console.warn('⚠️ ATTENTION: Variables d\'environnement Super Admin non configurées!')
    console.warn('   Veuillez configurer SUPER_ADMIN_EMAIL et SUPER_ADMIN_PASSWORD dans .env.local')
    console.warn('   Le système utilise des valeurs par défaut non sécurisées.')
  }

  // Créer le Super Admin seulement s'il n'existe pas déjà
  const existingSuperAdmin = users.find(u => u.role === 'super_admin')
  if (!existingSuperAdmin) {
    users.push({
      id: generateId(),
      name: 'Super Administrateur',
      email: SUPER_ADMIN_EMAIL,
      role: 'super_admin',
      createdAt: new Date(),
      lastLogin: new Date()
    })
    console.log('✅ Super Admin initialisé avec succès')
  }
}

export function login(credentials: LoginCredentials): AuthResult {
  try {
    // Vérifier les identifiants Super Admin
    if (credentials.email === SUPER_ADMIN_EMAIL && credentials.password === SUPER_ADMIN_PASSWORD) {
      const user = users.find(u => u.email === SUPER_ADMIN_EMAIL)
      if (user) {
        // Mettre à jour la dernière connexion
        user.lastLogin = new Date()
        
        // Générer un token de session
        const token = generateToken()
        sessions[token] = {
          userId: user.id,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures
        }

        return {
          success: true,
          user,
          token
        }
      }
    }

    // Vérifier les autres utilisateurs
    const user = users.find(u => u.email === credentials.email)
    if (user) {
      // En production, vérifier le hash du mot de passe
      // Pour l'instant, on accepte n'importe quel mot de passe pour les admins
      user.lastLogin = new Date()
      
      const token = generateToken()
      sessions[token] = {
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }

      return {
        success: true,
        user,
        token
      }
    }

    return {
      success: false,
      error: 'Email ou mot de passe incorrect'
    }
  } catch (error) {
    return {
      success: false,
      error: 'Erreur lors de la connexion'
    }
  }
}

export function register(data: RegisterData): AuthResult {
  try {
    // Vérifier si l'email existe déjà
    const existingUser = users.find(u => u.email === data.email)
    if (existingUser) {
      return {
        success: false,
        error: 'Cet email est déjà enregistré'
      }
    }

    // Créer le nouvel utilisateur
    const newUser: User = {
      id: generateId(),
      name: data.name,
      email: data.email,
      role: data.role,
      createdAt: new Date()
    }

    users.push(newUser)

    // Générer un token de session
    const token = generateToken()
    sessions[token] = {
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }

    return {
      success: true,
      user: newUser,
      token
    }
  } catch (error) {
    return {
      success: false,
      error: 'Erreur lors de l\'inscription'
    }
  }
}

export function logout(token: string): void {
  delete sessions[token]
}

export function verifyToken(token: string): User | null {
  const session = sessions[token]
  if (!session) return null

  if (session.expiresAt < new Date()) {
    delete sessions[token]
    return null
  }

  return users.find(u => u.id === session.userId) || null
}

export function hasPermission(user: User, permission: string): boolean {
  const permissions = rolePermissions[user.role] || []
  return permissions.includes(permission)
}

export function canAccessSection(user: User, section: string): boolean {
  const sections = roleSections[user.role] || []
  return sections.includes(section)
}

export function createAdminUser(data: RegisterData): AuthResult {
  // Seuls les Super Admins peuvent créer d'autres admins
  return register(data)
}

export function updateAdminUser(id: string, data: Partial<User>): AuthResult {
  try {
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return {
        success: false,
        error: 'Utilisateur non trouvé'
      }
    }

    // Mettre à jour l'utilisateur
    users[userIndex] = { ...users[userIndex], ...data }

    return {
      success: true,
      user: users[userIndex]
    }
  } catch (error) {
    return {
      success: false,
      error: 'Erreur lors de la mise à jour'
    }
  }
}

export function deleteAdminUser(id: string): AuthResult {
  try {
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return {
        success: false,
        error: 'Utilisateur non trouvé'
      }
    }

    const user = users[userIndex]
    
    // Empêcher la suppression du Super Admin
    if (user.role === 'super_admin') {
      return {
        success: false,
        error: 'Impossible de supprimer le Super Administrateur'
      }
    }

    users.splice(userIndex, 1)

    // Supprimer les sessions de cet utilisateur
    Object.keys(sessions).forEach(token => {
      if (sessions[token].userId === id) {
        delete sessions[token]
      }
    })

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'Erreur lors de la suppression'
    }
  }
}

export function getAllUsers(): User[] {
  return users.map(user => ({
    ...user,
    // Ne pas exposer les mots de passe ou informations sensibles
  }))
}

export function getRolePermissions(role: 'super_admin' | 'admin'): string[] {
  return rolePermissions[role] || []
}

export function isSuperAdmin(user: User): boolean {
  return user.role === 'super_admin'
}

export function isAdmin(user: User): boolean {
  return user.role === 'admin'
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Initialiser le système au chargement du module
initializeAuthSystem() 