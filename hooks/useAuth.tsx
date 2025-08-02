'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, LoginCredentials, login as authLogin, logout as authLogout, verifyToken } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isSuperAdmin: boolean
  isAdmin: boolean
  hasPermission: (permission: string) => boolean
  canAccessSection: (section: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Vérifier l'authentification au chargement
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (token) {
        const result = await verifyToken(token)
        if (result.valid && result.user) {
          setUser(result.user)
        } else {
          localStorage.removeItem('admin_token')
        }
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error)
      localStorage.removeItem('admin_token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      const result = await authLogin(credentials)
      if (result.success && result.user && result.token) {
        setUser(result.user)
        localStorage.setItem('admin_token', result.token)
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'Erreur lors de la connexion' }
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      if (token) {
        await authLogout(token)
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('admin_token')
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const canAccessSection = (section: string): boolean => {
    if (!user) return false
    
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

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'super_admin',
    isAdmin: user?.role === 'admin',
    hasPermission,
    canAccessSection
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
} 