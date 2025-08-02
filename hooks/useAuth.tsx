'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, LoginCredentials, RegisterData, AuthResult } from '@/lib/auth'
import { login as authLogin, logout as authLogout, verifyToken, hasPermission, canAccessSection, register as authRegister } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<AuthResult>
  register: (data: RegisterData) => Promise<AuthResult>
  logout: () => void
  isAuthenticated: boolean
  isSuperAdmin: boolean
  isAdmin: boolean
  hasPermission: (permission: string) => boolean
  canAccessSection: (section: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier le token au chargement
    const token = localStorage.getItem('authToken')
    if (token) {
      const verifiedUser = verifyToken(token)
      if (verifiedUser) {
        setUser(verifiedUser)
      } else {
        // Token invalide, le supprimer
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      const result = authLogin(credentials)
      
      if (result.success && result.user && result.token) {
        setUser(result.user)
        localStorage.setItem('authToken', result.token)
      }
      
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion'
      }
    }
  }

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      const result = authRegister(data)
      return result
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de l\'inscription'
      }
    }
  }

  const logout = () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      authLogout(token)
      localStorage.removeItem('authToken')
    }
    setUser(null)
  }

  const isAuthenticated = !!user
  const isSuperAdmin = user?.role === 'super_admin'
  const isAdmin = user?.role === 'admin'

  const hasUserPermission = (permission: string): boolean => {
    if (!user) return false
    return hasPermission(user, permission)
  }

  const canUserAccessSection = (section: string): boolean => {
    if (!user) return false
    return canAccessSection(user, section)
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isSuperAdmin,
    isAdmin,
    hasPermission: hasUserPermission,
    canAccessSection: canUserAccessSection
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
} 