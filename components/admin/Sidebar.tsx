"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Package,
  Palette,
  FileText,
  BarChart,
  Bot,
  ImageIcon,
  Settings,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  LogOut,
  ShoppingCart,
  Users,
  Tag,
  Warehouse,
  Layout,
  Target,
  Layers,
  RefreshCw,
  Code,
  UserCheck,
  Shield,
  Terminal,
  CloudDownload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"

export default function Sidebar() {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, logout, canAccessSection, isSuperAdmin } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  // Définir les sections du menu selon les permissions
  const getMenuSections = () => {
    const sections = [
      {
        title: "Tableau de Bord",
        items: [
          { id: "dashboard", name: "Vue d'ensemble", href: "/admin", icon: Home, color: "text-blue-500" },
          { id: "analytics", name: "Analytics", href: "/admin/analytics", icon: BarChart, color: "text-green-500" },
        ],
      },
      {
        title: "E-Commerce",
        items: [
          { id: "products", name: "Produits", href: "/admin/products", icon: Package, color: "text-orange-500" },
          { id: "orders", name: "Commandes", href: "/admin/orders", icon: ShoppingCart, color: "text-blue-600" },
        ],
      }
    ]

    // Section Gestion Site Web (accessible à tous les admins)
    if (canAccessSection('content') || canAccessSection('media') || canAccessSection('seo') || canAccessSection('design')) {
      sections.push({
        title: "Gestion Site Web",
        items: [
          ...(canAccessSection('content') ? [{ id: "content", name: "Contenu", href: "/admin/content", icon: FileText, color: "text-amber-500" }] : []),
          ...(canAccessSection('media') ? [{ id: "media", name: "Médias", href: "/admin/media", icon: ImageIcon, color: "text-rose-500" }] : []),
          ...(canAccessSection('seo') ? [{ id: "seo", name: "SEO & Schema", href: "/admin/seo", icon: Target, color: "text-teal-500" }] : []),
          ...(canAccessSection('design') ? [{ id: "design", name: "Apparence", href: "/admin/design", icon: Palette, color: "text-violet-500" }] : []),
        ].filter(item => item !== null)
      })
    }

    // Section Outils Avancés (Super Admin seulement)
    if (isSuperAdmin) {
      sections.push({
        title: "Outils Avancés",
        items: [
          { id: "ai-assistant", name: "Assistant IA", href: "/admin/ia", icon: Bot, color: "text-purple-600" },
          { id: "code-editor", name: "Éditeur de Code", href: "/admin/code", icon: Code, color: "text-emerald-400" },
          { id: "deploy", name: "Déploiement", href: "/admin/deploy", icon: CloudDownload, color: "text-green-500" },
        ],
      })
    }

    // Section Système
    const systemItems = []
    if (canAccessSection('settings')) {
      systemItems.push({ id: "settings", name: "Paramètres", href: "/admin/settings", icon: Settings, color: "text-gray-500" })
    }
    
    // Gestion des utilisateurs (Super Admin seulement)
    if (isSuperAdmin) {
      systemItems.push({ id: "users", name: "Utilisateurs", href: "/admin/users", icon: UserCheck, color: "text-slate-500" })
      systemItems.push({ id: "security", name: "Sécurité", href: "/admin/security", icon: Shield, color: "text-red-500" })
    }

    if (systemItems.length > 0) {
      sections.push({
        title: "Système",
        items: systemItems
      })
    }

    return sections
  }

  const menuSections = getMenuSections()

  return (
    <motion.aside
      className={`${
        sidebarCollapsed ? "w-20" : "w-64"
      } bg-batobaye-dark text-white transition-all duration-300 flex flex-col shadow-2xl`}
      initial={false}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-batobaye-primary rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-md font-bold text-batobaye-primary">BATOBAYE</h1>
              <p className="text-xs text-orange-300">
                {isSuperAdmin ? 'SUPER ADMIN' : 'ADMIN PANEL'}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-white hover:bg-white/10"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* User Info */}
      {!sidebarCollapsed && user && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  isSuperAdmin 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {isSuperAdmin ? 'Super Admin' : 'Admin'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-6">
            {!sidebarCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                <div className="w-3 h-0.5 bg-gray-600 mr-2"></div>
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? "justify-center px-2" : "px-4"
                  } py-2 text-left rounded-lg mx-2 transition-all duration-200 group relative ${
                    pathname === item.href
                      ? "bg-batobaye-primary text-white shadow-lg"
                      : "hover:bg-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  <div className={`${sidebarCollapsed ? "" : "mr-2"} relative`}>
                    <item.icon
                      className={`w-4 h-4 transition-colors ${
                        pathname === item.href ? "text-white" : `${item.color} group-hover:text-white`
                      }`}
                    />
                    {pathname === item.href && (
                      <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
                    )}
                  </div>
                  {!sidebarCollapsed && <span className="font-medium text-sm">{item.name}</span>}
                  {pathname === item.href && <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full"></div>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="outline"
          className={`${
            sidebarCollapsed ? "w-full px-2" : "w-full"
          } border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent`}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!sidebarCollapsed && <span className="ml-2">Déconnexion</span>}
        </Button>
      </div>
    </motion.aside>
  )
}
