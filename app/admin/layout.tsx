"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { initializeAuthSystem } from '@/lib/auth'
import Sidebar from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [authInitialized, setAuthInitialized] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Initialiser le système d'authentification
    initializeAuthSystem()
    setAuthInitialized(true)
  }, [])

  useEffect(() => {
    // Rediriger vers la page de connexion si non authentifié
    if (authInitialized && !loading && !isAuthenticated && isClient) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, loading, authInitialized, router, isClient])

  // Rendu côté serveur - afficher un layout de base
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <div className="w-64 bg-white shadow-lg">
            {/* Sidebar placeholder */}
          </div>
          <div className="flex-1 flex flex-col">
            <div className="bg-white shadow-sm border-b">
              {/* Topbar placeholder */}
            </div>
            <main className="flex-1 p-6">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement de l'administration...</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  // Afficher un loader pendant le chargement
  if (loading || !authInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'administration...</p>
        </div>
      </div>
    )
  }

  // Si non authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirection vers la connexion...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
