// Système d'authentification pour Batobaye Market
// Gestion des rôles : Super Admin et Admin

export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin'
  permissions: string[]
  created_at: Date
  last_login?: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

// Utilisateurs par défaut
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'sobam@daveandlucesolutions.com',
    name: 'Super Admin',
    role: 'super_admin',
    permissions: [
      'dashboard:read',
      'products:read',
      'products:write',
      'products:delete',
      'orders:read',
      'orders:write',
      'orders:delete',
      'analytics:read',
      'content:read',
      'content:write',
      'media:read',
      'media:write',
      'seo:read',
      'seo:write',
      'design:read',
      'design:write',
      'deploy:read',
      'deploy:write',
      'ai:read',
      'ai:write',
      'code:read',
      'code:write',
      'settings:read',
      'settings:write',
      'users:read',
      'users:write',
      'users:delete',
      'security:read',
      'security:write'
    ],
    created_at: new Date()
  }
]

// Stockage en mémoire (en production, utilisez une vraie base de données)
let users: User[] = [...defaultUsers]
let sessions: Map<string, { user: User; expires: Date }> = new Map()

// Mots de passe (en production, utilisez bcrypt)
const passwords = new Map([
  ['sobam@daveandlucesolutions.com', '@DavyFrantz2025']
])

// Permissions par rôle
const rolePermissions = {
  super_admin: [
    'dashboard:read',
    'products:read',
    'products:write',
    'products:delete',
    'orders:read',
    'orders:write',
    'orders:delete',
    'analytics:read',
    'content:read',
    'content:write',
    'media:read',
    'media:write',
    'seo:read',
    'seo:write',
    'design:read',
    'design:write',
    'deploy:read',
    'deploy:write',
    'ai:read',
    'ai:write',
    'code:read',
    'code:write',
    'settings:read',
    'settings:write',
    'users:read',
    'users:write',
    'users:delete',
    'security:read',
    'security:write'
  ],
  admin: [
    'dashboard:read',
    'products:read',
    'products:write',
    'orders:read',
    'orders:write',
    'analytics:read',
    'content:read',
    'content:write',
    'media:read',
    'media:write',
    'seo:read',
    'seo:write',
    'design:read',
    'design:write',
    'settings:read'
  ]
}

// Fonctions d'authentification
export async function login(credentials: LoginCredentials): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  try {
    const { email, password } = credentials
    
    // Vérifier les identifiants
    const storedPassword = passwords.get(email)
    if (!storedPassword || storedPassword !== password) {
      return { success: false, error: 'Identifiants invalides' }
    }
    
    // Trouver l'utilisateur
    const user = users.find(u => u.email === email)
    if (!user) {
      return { success: false, error: 'Utilisateur non trouvé' }
    }
    
    // Créer une session
    const token = generateToken()
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures
    
    sessions.set(token, { user, expires })
    
    // Mettre à jour la dernière connexion
    user.last_login = new Date()
    
    return { success: true, user, token }
  } catch (error) {
    return { success: false, error: 'Erreur lors de la connexion' }
  }
}

export async function logout(token: string): Promise<{ success: boolean }> {
  try {
    sessions.delete(token)
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function verifyToken(token: string): Promise<{ valid: boolean; user?: User; error?: string }> {
  try {
    const session = sessions.get(token)
    
    if (!session) {
      return { valid: false, error: 'Session invalide' }
    }
    
    if (session.expires < new Date()) {
      sessions.delete(token)
      return { valid: false, error: 'Session expirée' }
    }
    
    return { valid: true, user: session.user }
  } catch (error) {
    return { valid: false, error: 'Erreur de vérification' }
  }
}

export async function hasPermission(user: User, permission: string): Promise<boolean> {
  return user.permissions.includes(permission)
}

export async function canAccessSection(user: User, section: string): Promise<boolean> {
  const sectionPermissions = {
    'dashboard': ['dashboard:read'],
    'products': ['products:read'],
    'orders': ['orders:read'],
    'analytics': ['analytics:read'],
    'content': ['content:read'],
    'media': ['media:read'],
    'seo': ['seo:read'],
    'design': ['design:read'],
    'deploy': ['deploy:read'],
    'ai': ['ai:read'],
    'code': ['code:read'],
    'settings': ['settings:read']
  }
  
  const requiredPermissions = sectionPermissions[section as keyof typeof sectionPermissions] || []
  
  for (const permission of requiredPermissions) {
    if (!user.permissions.includes(permission)) {
      return false
    }
  }
  
  return true
}

// Fonctions de gestion des utilisateurs (Super Admin seulement)
export async function createAdminUser(email: string, password: string, name: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Vérifier que l'email n'existe pas déjà
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Cet email est déjà utilisé' }
    }
    
    // Créer le nouvel utilisateur admin
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'admin',
      permissions: rolePermissions.admin,
      created_at: new Date()
    }
    
    users.push(newUser)
    passwords.set(email, password)
    
    return { success: true, user: newUser }
  } catch (error) {
    return { success: false, error: 'Erreur lors de la création de l\'utilisateur' }
  }
}

export async function updateAdminUser(id: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return { success: false, error: 'Utilisateur non trouvé' }
    }
    
    // Ne pas permettre de changer le rôle en super_admin
    if (updates.role === 'super_admin') {
      return { success: false, error: 'Impossible de promouvoir en super admin' }
    }
    
    users[userIndex] = { ...users[userIndex], ...updates }
    
    return { success: true, user: users[userIndex] }
  } catch (error) {
    return { success: false, error: 'Erreur lors de la mise à jour' }
  }
}

export async function deleteAdminUser(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const user = users.find(u => u.id === id)
    if (!user) {
      return { success: false, error: 'Utilisateur non trouvé' }
    }
    
    if (user.role === 'super_admin') {
      return { success: false, error: 'Impossible de supprimer un super admin' }
    }
    
    users = users.filter(u => u.id !== id)
    passwords.delete(user.email)
    
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Erreur lors de la suppression' }
  }
}

export async function getAllUsers(): Promise<User[]> {
  return users.filter(u => u.role === 'admin') // Ne retourner que les admins
}

// Fonctions utilitaires
function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
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