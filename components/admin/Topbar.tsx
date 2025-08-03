"use client"

import React from "react"
import {
  Search,
  X,
  Bell,
  MessageCircle,
  Bot,
  Home,
  Package,
  Palette,
  FileText,
  BarChart,
  ImageIcon,
  Sparkles,
  Settings,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AssistantIA } from "@/components/admin/AssistantIA" // Keep this import

// Mock data for search results (can be passed as props or fetched)
const products = [
  {
    id: 1,
    name: "Réfrigérateur Brigo 350L",
    category: "Réfrigérateurs",
    price: 450000,
    stock: 15,
    status: "En stock",
    image: "/placeholder.svg?height=50&width=50",
    sku: "BRG-350-001",
    supplier: "Brigo Cameroun",
    lastUpdated: "2024-01-15",
    sales: 45,
    views: 1250,
  },
  {
    id: 2,
    name: 'TV Samsung 55" QLED',
    category: "Téléviseurs",
    price: 380000,
    stock: 8,
    status: "En stock",
    image: "/placeholder.svg?height=50&width=50",
    sku: "SAM-55Q-002",
    supplier: "Samsung Afrique",
    lastUpdated: "2024-01-14",
    sales: 23,
    views: 890,
  },
]

const orders = [
  {
    id: "CMD-2024-001",
    customer: "Jean Mbarga",
    products: ["Brigo 350L", 'TV Samsung 55"'],
    total: 830000,
    status: "En cours",
    date: "2024-01-15",
    phone: "+237 672 02 77 44",
    location: "Douala, Akwa",
  },
]

const menuSections = [
  {
    title: "Tableau de Bord",
    items: [
      { id: "dashboard", name: "Vue d'ensemble", href: "/admin", icon: Home, color: "text-blue-500" },
      { id: "analytics", name: "Analytics", href: "/admin/analytics", icon: BarChart, color: "text-green-500" },
    ],
  },
  {
    title: "E-Commerce",
    items: [{ id: "products", name: "Produits", href: "/admin/products", icon: Package, color: "text-orange-500" }],
  },
  {
    title: "Gestion Site Web",
    items: [
      { id: "content", name: "Contenu", href: "/admin/content", icon: FileText, color: "text-amber-500" },
      { id: "media", name: "Médias", href: "/admin/media", icon: ImageIcon, color: "text-rose-500" },
      { id: "design", name: "Apparence", href: "/admin/design", icon: Palette, color: "text-violet-500" },
    ],
  },
  {
    title: "Outils Avancés",
    items: [{ id: "ai-assistant", name: "Assistant IA", href: "/admin/ia", icon: Bot, color: "text-purple-600" }],
  },
  {
    title: "Système",
    items: [{ id: "settings", name: "Paramètres", href: "/admin/settings", icon: Settings, color: "text-gray-500" }],
  },
]

interface TopbarProps {
  activeTab: string
  setActiveTab: (tabId: string) => void
}

export function Topbar({ activeTab, setActiveTab }: TopbarProps) {
  const [globalSearch, setGlobalSearch] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = React.useState(false) // Keep this state

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleGlobalSearch = (query: string) => {
    setGlobalSearch(query)
    if (query.length > 2) {
      const productResults = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase()),
        )
        .map((p) => ({ ...p, type: "product" }))

      const orderResults = orders
        .filter(
          (o) =>
            o.id.toLowerCase().includes(query.toLowerCase()) || o.customer.toLowerCase().includes(query.toLowerCase()),
        )
        .map((o) => ({ ...o, type: "order" }))

      const menuResults = menuSections
        .flatMap((section) => section.items)
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .map((item) => ({ ...item, type: "menu" }))

      setSearchResults([...productResults, ...orderResults, ...menuResults])
      setIsSearchOpen(true)
    } else {
      setSearchResults([])
      setIsSearchOpen(false)
    }
  }

  const currentTabInfo = menuSections.flatMap((s) => s.items).find((item) => item.id === activeTab)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const searchInput = document.querySelector('input[placeholder*="Rechercher"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-3xl font-bold text-batobaye-dark flex items-center">
              {currentTabInfo?.icon && (
                <div className="mr-3">
                  {React.createElement(currentTabInfo.icon, {
                    className: `w-8 h-8 ${currentTabInfo.color || "text-batobaye-primary"}`,
                  })}
                </div>
              )}
              {currentTabInfo?.name || "Dashboard"}
            </h1>
            <p className="text-gray-600 mt-1">Plateforme de gestion complète Batobaye Market</p>
          </div>

          {/* Global Search Bar */}
          <div className="relative flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher produits, commandes, clients, fonctions..."
                value={globalSearch}
                onChange={(e) => handleGlobalSearch(e.target.value)}
                className="pl-12 pr-12 py-3 bg-gray-50 border-gray-200 rounded-xl text-lg focus:ring-2 focus:ring-batobaye-primary focus:border-batobaye-primary transition-all duration-300"
              />
              {globalSearch && (
                <button
                  onClick={() => {
                    setGlobalSearch("")
                    setIsSearchOpen(false)
                    console.log("Clear search button clicked")
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400">
                <kbd className="px-2 py-1 text-xs bg-gray-200 rounded">Ctrl+K</kbd>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Résultats de recherche ({searchResults.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        onClick={() => {
                          if (result.type === "menu") {
                            setActiveTab(result.id)
                          }
                          setIsSearchOpen(false)
                          setGlobalSearch("")
                          console.log(`Search result clicked: ${result.name || result.customer || result.id}`)
                        }}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {result.type === "product" && <Package className="w-5 h-5 text-orange-500" />}
                          {result.type === "order" && <div className="w-5 h-5 text-blue-500">CMD</div>}
                          {result.type === "menu" &&
                            React.createElement(result.icon, { className: `w-5 h-5 ${result.color}` })}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{result.name || result.customer || result.id}</p>
                          <p className="text-sm text-gray-500">
                            {result.type === "product" && `${result.category} - ${formatPrice(result.price)}`}
                            {result.type === "order" && `Commande - ${formatPrice(result.total)}`}
                            {result.type === "menu" && "Fonction du système"}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400 uppercase font-medium">{result.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isSearchOpen && searchResults.length === 0 && globalSearch.length > 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-6 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucun résultat trouvé pour "{globalSearch}"</p>
                <p className="text-sm text-gray-400 mt-1">Essayez avec d'autres mots-clés</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button className="bg-transparent border-gray-200 hover:bg-gray-50"
              onClick={() => console.log("Notifications button clicked")}
            >
              <Bell className="w-4 h-4 mr-2" />
              <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">3</Badge>
            </Button>
            <Button className="bg-transparent border-gray-200 hover:bg-gray-50"
              onClick={() => console.log("Messages button clicked")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </div>

          <Button
            onClick={() => {
              setIsAIAssistantOpen(true)
              console.log("Assistant IA button clicked")
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
          >
            <Bot className="w-4 h-4 mr-2" />
            Assistant IA
          </Button>
          <div className="w-10 h-10 bg-batobaye-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-semibold">A</span>
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      <Dialog open={isAIAssistantOpen} onOpenChange={setIsAIAssistantOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
              Assistant IA Batobaye - Plateforme Complète
            </DialogTitle>
            <DialogDescription>
              Votre assistant intelligent pour gérer tous les aspects de votre marketplace
            </DialogDescription>
          </DialogHeader>
          <AssistantIA /> {/* Render the AssistantIA component directly */}
        </DialogContent>
      </Dialog>
    </header>
  )
}
