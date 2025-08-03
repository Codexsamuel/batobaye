"use client"

import React from "react"
import type { ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import Sidebar from "@/components/admin/Sidebar"
import { Topbar } from "@/components/admin/Topbar"
import { AuthProvider, useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

// Pages publiques qui ne nécessitent pas d'authentification
const PUBLIC_PAGES = ['/admin/login', '/admin/register']

// Composant de protection des routes
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Rediriger vers la page de connexion si pas authentifié
  React.useEffect(() => {
    if (!loading && !isAuthenticated && !PUBLIC_PAGES.includes(pathname)) {
      router.push('/admin/login')
    }
  }, [loading, isAuthenticated, router, pathname])

  // Si on est sur une page publique, afficher directement
  if (PUBLIC_PAGES.includes(pathname)) {
    return <>{children}</>
  }

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null
  }

  // Sinon, afficher le layout admin protégé
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}

// Contenu du layout admin (seulement pour les utilisateurs authentifiés)
function AdminLayoutContent({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get activeTab from URL search params, default to "dashboard"
  const initialTab = searchParams.get("tab") || "dashboard"
  const [activeTab, setActiveTab] = React.useState(initialTab)

  // Update URL when activeTab changes
  React.useEffect(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    if (activeTab && currentSearchParams.get("tab") !== activeTab) {
      currentSearchParams.set("tab", activeTab)
      router.replace(`${pathname}?${currentSearchParams.toString()}`)
    }
  }, [activeTab, pathname, router, searchParams])

  // Update activeTab when URL search params change (e.g., browser back/forward)
  React.useEffect(() => {
    const tabFromUrl = searchParams.get("tab")
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl)
    } else if (!tabFromUrl && activeTab !== "dashboard") {
      setActiveTab("dashboard")
    }
  }, [searchParams, activeTab])

  // Clone children to pass activeTab prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab } as { activeTab: string })
    }
    return child
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <SidebarInset>
              <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
                {childrenWithProps}
              </div>
            </SidebarInset>
          </Suspense>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Layout principal avec AuthProvider
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AuthProvider>
  )
}
