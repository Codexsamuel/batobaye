"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  Settings,
  LogOut,
  Bot,
  Sparkles,
  Users,
  Database,
  Shield,
  Activity,
  ImageIcon,
  Code,
  Palette,
  Bell,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Save,
  Zap,
  Target,
  Layers,
  Server,
  HardDrive,
  UserCheck,
  MessageSquare,
  Star,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  MessageCircle,
  Home,
  PieChart,
  BarChart,
  Tag,
  Warehouse,
  Layout,
  Type,
  Send,
  CloudDownload,
  Wrench,
  Terminal,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Mock data étendu
const stats = [
  {
    title: "Chiffre d'Affaires",
    value: "15,847,000 FCFA",
    change: "+23.5%",
    icon: DollarSign,
    color: "text-green-600",
    trend: "up",
  },
  {
    title: "Commandes Totales",
    value: "2,847",
    change: "+12.3%",
    icon: ShoppingCart,
    color: "text-blue-600",
    trend: "up",
  },
  {
    title: "Produits Actifs",
    value: "1,542",
    change: "+45",
    icon: Package,
    color: "text-purple-600",
    trend: "up",
  },
  {
    title: "Visiteurs Uniques",
    value: "48,392",
    change: "+18.7%",
    icon: Eye,
    color: "text-orange-600",
    trend: "up",
  },
  {
    title: "Taux de Conversion",
    value: "3.2%",
    change: "+0.8%",
    icon: Target,
    color: "text-indigo-600",
    trend: "up",
  },
  {
    title: "Stock Total",
    value: "12,847",
    change: "-234",
    icon: Database,
    color: "text-red-600",
    trend: "down",
  },
]

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
  {
    id: 3,
    name: "Congélateur 200L",
    category: "Congélateurs",
    price: 320000,
    stock: 0,
    status: "Rupture",
    image: "/placeholder.svg?height=50&width=50",
    sku: "CNG-200-003",
    supplier: "Electro Plus",
    lastUpdated: "2024-01-13",
    sales: 67,
    views: 2100,
  },
  {
    id: 4,
    name: "Chauffe-eau 100L",
    category: "Chauffe-eau",
    price: 85000,
    stock: 3,
    status: "Stock faible",
    image: "/placeholder.svg?height=50&width=50",
    sku: "CHE-100-004",
    supplier: "Thermor",
    lastUpdated: "2024-01-12",
    sales: 12,
    views: 456,
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
  {
    id: "CMD-2024-002",
    customer: "Marie Nguema",
    products: ["Chauffe-eau 100L"],
    total: 85000,
    status: "Livré",
    date: "2024-01-14",
    phone: "+241 6 58 14 39 09",
    location: "Oyem, Gabon",
  },
]

const categories = [
  { id: 1, name: "Réfrigérateurs", products: 156, status: "Actif", icon: "❄️" },
  { id: 2, name: "Téléviseurs", products: 89, status: "Actif", icon: "📺" },
  { id: 3, name: "Congélateurs", products: 234, status: "Actif", icon: "🧊" },
  { id: 4, name: "Chauffe-eau", products: 67, status: "Actif", icon: "🔥" },
  { id: 5, name: "Cuisinières", products: 123, status: "Actif", icon: "🍳" },
]

const systemLogs = [
  {
    id: 1,
    type: "info",
    message: "Nouveau produit ajouté: Brigo 450L",
    timestamp: "2024-01-15 14:30:25",
    user: "admin",
  },
  {
    id: 2,
    type: "warning",
    message: "Stock faible: Chauffe-eau 100L (3 unités)",
    timestamp: "2024-01-15 12:15:10",
    user: "system",
  },
  {
    id: 3,
    type: "error",
    message: "Erreur de synchronisation avec le fournisseur Samsung",
    timestamp: "2024-01-15 09:45:33",
    user: "system",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [globalSearch, setGlobalSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
      // Recherche dans les produits
      const productResults = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase()),
        )
        .map((p) => ({ ...p, type: "product" }))

      // Recherche dans les commandes
      const orderResults = orders
        .filter(
          (o) =>
            o.id.toLowerCase().includes(query.toLowerCase()) || o.customer.toLowerCase().includes(query.toLowerCase()),
        )
        .map((o) => ({ ...o, type: "order" }))

      // Recherche dans les sections du menu
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En stock":
        return "bg-green-100 text-green-800"
      case "Stock faible":
        return "bg-yellow-100 text-yellow-800"
      case "Rupture":
        return "bg-red-100 text-red-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Livré":
        return "bg-green-100 text-green-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const menuSections = [
    {
      title: "Tableau de Bord",
      items: [
        { id: "dashboard", name: "Vue d'ensemble", icon: Home, color: "text-blue-500" },
        { id: "analytics", name: "Analytics", icon: BarChart, color: "text-green-500" },
        { id: "reports", name: "Rapports", icon: PieChart, color: "text-purple-500" },
      ],
    },
    {
      title: "E-Commerce",
      items: [
        { id: "products", name: "Produits", icon: Package, color: "text-orange-500" },
        { id: "categories", name: "Catégories", icon: Tag, color: "text-pink-500" },
        { id: "inventory", name: "Inventaire", icon: Warehouse, color: "text-indigo-500" },
        { id: "orders", name: "Commandes", icon: ShoppingCart, color: "text-blue-600" },
        { id: "customers", name: "Clients", icon: Users, color: "text-cyan-500" },
      ],
    },
    {
      title: "Gestion Site Web",
      items: [
        { id: "pages", name: "Pages", icon: Layout, color: "text-emerald-500" },
        { id: "content", name: "Contenu", icon: Type, color: "text-amber-500" },
        { id: "media", name: "Médias", icon: ImageIcon, color: "text-rose-500" },
        { id: "seo", name: "SEO", icon: Target, color: "text-teal-500" },
        { id: "design", name: "Design", icon: Palette, color: "text-violet-500" },
      ],
    },
    {
      title: "Communication",
      items: [
        { id: "messages", name: "Messages", icon: MessageCircle, color: "text-green-600" },
        { id: "notifications", name: "Notifications", icon: Bell, color: "text-yellow-500" },
        { id: "reviews", name: "Avis Clients", icon: Star, color: "text-orange-400" },
        { id: "newsletter", name: "Newsletter", icon: Send, color: "text-blue-400" },
      ],
    },
    {
      title: "Système",
      items: [
        { id: "users", name: "Utilisateurs", icon: UserCheck, color: "text-slate-500" },
        { id: "security", name: "Sécurité", icon: Shield, color: "text-red-500" },
        { id: "maintenance", name: "Maintenance", icon: Wrench, color: "text-gray-500" },
        { id: "logs", name: "Logs Système", icon: Terminal, color: "text-green-400" },
        { id: "backup", name: "Sauvegardes", icon: CloudDownload, color: "text-blue-500" },
      ],
    },
    {
      title: "Outils Avancés",
      items: [
        { id: "ai-assistant", name: "Assistant IA", icon: Bot, color: "text-purple-600" },
        { id: "bulk-actions", name: "Actions Groupées", icon: Layers, color: "text-indigo-400" },
        { id: "import-export", name: "Import/Export", icon: RefreshCw, color: "text-cyan-400" },
        { id: "api", name: "API", icon: Code, color: "text-emerald-400" },
      ],
    },
  ]

  // Keyboard shortcut for search
  useEffect(() => {
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Enhanced Sidebar */}
      <motion.div
        className={`${
          sidebarCollapsed ? "w-20" : "w-80"
        } bg-batobaye-dark text-white transition-all duration-300 flex flex-col shadow-2xl`}
        initial={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-batobaye-primary rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-batobaye-primary">BATOBAYE</h1>
                <p className="text-xs text-orange-300">ADMIN PANEL</p>
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

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className="mb-8">
              {!sidebarCollapsed && (
                <h3 className="px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                  <div className="w-4 h-0.5 bg-gray-600 mr-2"></div>
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center px-3" : "px-6"
                    } py-3 text-left rounded-lg mx-3 transition-all duration-200 group relative ${
                      activeTab === item.id
                        ? "bg-batobaye-primary text-white shadow-lg"
                        : "hover:bg-white/10 text-gray-300 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`${sidebarCollapsed ? "" : "mr-3"} relative`}>
                      <item.icon
                        className={`w-5 h-5 transition-colors ${
                          activeTab === item.id ? "text-white" : `${item.color} group-hover:text-white`
                        }`}
                      />
                      {activeTab === item.id && (
                        <div className="absolute -inset-1 bg-white/20 rounded-full blur-sm"></div>
                      )}
                    </div>
                    {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
                    {activeTab === item.id && <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <Button
            variant="outline"
            className={`${
              sidebarCollapsed ? "w-full px-2" : "w-full"
            } border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent`}
          >
            <LogOut className="w-4 h-4" />
            {!sidebarCollapsed && <span className="ml-2">Déconnexion</span>}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Header with Global Search */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-3xl font-bold text-batobaye-dark flex items-center">
                  {menuSections.flatMap((s) => s.items).find((item) => item.id === activeTab)?.icon && (
                    <div className="mr-3">
                      {React.createElement(
                        menuSections.flatMap((s) => s.items).find((item) => item.id === activeTab)?.icon || Home,
                        {
                          className: `w-8 h-8 ${menuSections.flatMap((s) => s.items).find((item) => item.id === activeTab)?.color || "text-batobaye-primary"}`,
                        },
                      )}
                    </div>
                  )}
                  {menuSections.flatMap((s) => s.items).find((item) => item.id === activeTab)?.name || "Dashboard"}
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
                            }}
                          >
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              {result.type === "product" && <Package className="w-5 h-5 text-orange-500" />}
                              {result.type === "order" && <ShoppingCart className="w-5 h-5 text-blue-500" />}
                              {result.type === "menu" && <result.icon className={`w-5 h-5 ${result.color}`} />}
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
                <Button size="sm" variant="outline" className="bg-transparent border-gray-200 hover:bg-gray-50">
                  <Bell className="w-4 h-4 mr-2" />
                  <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">3</Badge>
                </Button>
                <Button size="sm" variant="outline" className="bg-transparent border-gray-200 hover:bg-gray-50">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
              </div>

              <Button
                onClick={() => setIsAIAssistantOpen(true)}
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
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Dashboard Overview */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                              <p className="text-2xl font-bold text-batobaye-dark mt-1">{stat.value}</p>
                              <div className="flex items-center mt-2">
                                <span className={`text-sm ${stat.color} font-medium`}>{stat.change}</span>
                                {stat.trend === "up" ? (
                                  <TrendingUp className={`w-4 h-4 ml-1 ${stat.color}`} />
                                ) : (
                                  <TrendingUp className={`w-4 h-4 ml-1 ${stat.color} rotate-180`} />
                                )}
                              </div>
                            </div>
                            <div className={`p-3 rounded-full bg-gray-100`}>
                              <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-batobaye-primary" />
                      Actions Rapides
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {[
                        { name: "Nouveau Produit", icon: Plus, action: () => setIsAddProductOpen(true) },
                        { name: "Voir Commandes", icon: ShoppingCart, action: () => setActiveTab("orders") },
                        { name: "Gérer Stock", icon: Database, action: () => setActiveTab("inventory") },
                        { name: "Analytics", icon: BarChart3, action: () => setActiveTab("analytics") },
                        { name: "Messages", icon: MessageSquare, action: () => setActiveTab("messages") },
                        { name: "Maintenance", icon: Settings, action: () => setActiveTab("maintenance") },
                      ].map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-batobaye-primary/10 hover:border-batobaye-primary bg-transparent"
                          onClick={action.action}
                        >
                          <action.icon className="w-6 h-6" />
                          <span className="text-sm font-medium">{action.name}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity & System Status */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>Activité Récente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {systemLogs.slice(0, 5).map((log) => (
                          <div key={log.id} className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                log.type === "error"
                                  ? "bg-red-500"
                                  : log.type === "warning"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{log.message}</p>
                              <p className="text-xs text-gray-500">{log.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle>État du Système</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: "Serveur Web", status: "Opérationnel", color: "green" },
                          { name: "Base de Données", status: "Opérationnel", color: "green" },
                          { name: "API WhatsApp", status: "Opérationnel", color: "green" },
                          { name: "Système de Paiement", status: "Maintenance", color: "yellow" },
                          { name: "Sauvegarde Auto", status: "Opérationnel", color: "green" },
                        ].map((system, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{system.name}</span>
                            <Badge
                              className={`${
                                system.color === "green"
                                  ? "bg-green-100 text-green-800"
                                  : system.color === "yellow"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {system.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Products Management */}
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Products Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Rechercher un produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les catégories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer
                    </Button>
                    <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                          <Plus className="w-4 h-4 mr-2" />
                          Nouveau Produit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                          <DialogDescription>
                            Remplissez toutes les informations du produit ci-dessous
                          </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="general" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="general">Général</TabsTrigger>
                            <TabsTrigger value="inventory">Inventaire</TabsTrigger>
                            <TabsTrigger value="media">Médias</TabsTrigger>
                            <TabsTrigger value="seo">SEO</TabsTrigger>
                          </TabsList>
                          <TabsContent value="general" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Nom du produit</Label>
                                <Input id="name" placeholder="Ex: Réfrigérateur Brigo 350L" />
                              </div>
                              <div>
                                <Label htmlFor="sku">Code SKU</Label>
                                <Input id="sku" placeholder="Ex: BRG-350-001" />
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="category">Catégorie</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((cat) => (
                                      <SelectItem key={cat.id} value={cat.name}>
                                        {cat.icon} {cat.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="price">Prix (FCFA)</Label>
                                <Input id="price" type="number" placeholder="450000" />
                              </div>
                              <div>
                                <Label htmlFor="supplier">Fournisseur</Label>
                                <Input id="supplier" placeholder="Ex: Brigo Cameroun" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                id="description"
                                placeholder="Description détaillée du produit..."
                                className="min-h-[100px]"
                              />
                            </div>
                          </TabsContent>
                          <TabsContent value="inventory" className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="stock">Stock Initial</Label>
                                <Input id="stock" type="number" placeholder="15" />
                              </div>
                              <div>
                                <Label htmlFor="min-stock">Stock Minimum</Label>
                                <Input id="min-stock" type="number" placeholder="5" />
                              </div>
                              <div>
                                <Label htmlFor="max-stock">Stock Maximum</Label>
                                <Input id="max-stock" type="number" placeholder="100" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="cost">Prix d'Achat</Label>
                                <Input id="cost" type="number" placeholder="350000" />
                              </div>
                              <div>
                                <Label htmlFor="margin">Marge (%)</Label>
                                <Input id="margin" type="number" placeholder="28.5" />
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="media" className="space-y-4">
                            <div>
                              <Label>Images du produit</Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">
                                  Glissez vos images ici ou cliquez pour sélectionner
                                </p>
                                <p className="text-sm text-gray-500">PNG, JPG jusqu'à 10MB</p>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="seo" className="space-y-4">
                            <div>
                              <Label htmlFor="meta-title">Titre SEO</Label>
                              <Input id="meta-title" placeholder="Titre optimisé pour les moteurs de recherche" />
                            </div>
                            <div>
                              <Label htmlFor="meta-description">Description SEO</Label>
                              <Textarea
                                id="meta-description"
                                placeholder="Description optimisée pour les moteurs de recherche..."
                              />
                            </div>
                            <div>
                              <Label htmlFor="keywords">Mots-clés</Label>
                              <Input id="keywords" placeholder="réfrigérateur, brigo, électroménager" />
                            </div>
                          </TabsContent>
                        </Tabs>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
                            Annuler
                          </Button>
                          <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                            <Save className="w-4 h-4 mr-2" />
                            Enregistrer
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Products Table */}
                <Card className="shadow-lg">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">
                              <input type="checkbox" className="rounded" />
                            </TableHead>
                            <TableHead>Produit</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Catégorie</TableHead>
                            <TableHead>Prix</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Ventes</TableHead>
                            <TableHead>Vues</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <input type="checkbox" className="rounded" />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div>
                                    <span className="font-medium">{product.name}</span>
                                    <p className="text-sm text-gray-500">{product.supplier}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{product.sku}</code>
                              </TableCell>
                              <TableCell>{product.category}</TableCell>
                              <TableCell className="font-semibold">{formatPrice(product.price)}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <span>{product.stock}</span>
                                  {product.stock <= 5 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                </div>
                              </TableCell>
                              <TableCell>{product.sales}</TableCell>
                              <TableCell>{product.views}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Link href={`/admin/products/${product.id}`}>
                                    <Button size="sm" variant="outline">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </Link>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 hover:text-red-700 bg-transparent"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Inventory Management */}
            {activeTab === "inventory" && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Valeur Stock Total</p>
                          <p className="text-2xl font-bold">847M FCFA</p>
                        </div>
                        <Database className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Produits en Rupture</p>
                          <p className="text-2xl font-bold text-red-600">23</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Stock Faible</p>
                          <p className="text-2xl font-bold text-yellow-600">45</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Mouvements Aujourd'hui</p>
                          <p className="text-2xl font-bold text-green-600">156</p>
                        </div>
                        <Activity className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertes Stock</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products
                        .filter((p) => p.stock <= 5)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <AlertTriangle className="w-5 h-5 text-yellow-500" />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-600">Stock restant: {product.stock} unités</p>
                              </div>
                            </div>
                            <Button size="sm" className="bg-batobaye-primary hover:bg-batobaye-light">
                              Réapprovisionner
                            </Button>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Orders Management */}
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
                  <div className="flex items-center space-x-2">
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filtrer par statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="pending">En cours</SelectItem>
                        <SelectItem value="delivered">Livré</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Commande
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commande</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Produits</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <code className="bg-gray-100 px-2 py-1 rounded">{order.id}</code>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.customer}</p>
                                <p className="text-sm text-gray-500">{order.phone}</p>
                                <p className="text-sm text-gray-500">{order.location}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {order.products.map((product, index) => (
                                  <p key={index} className="text-sm">
                                    {product}
                                  </p>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MessageCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* System Maintenance */}
            {activeTab === "maintenance" && (
              <motion.div
                key="maintenance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Server className="w-5 h-5 mr-2" />
                        Serveur
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>CPU</span>
                          <span>45%</span>
                        </div>
                        <Progress value={45} />
                        <div className="flex justify-between">
                          <span>RAM</span>
                          <span>67%</span>
                        </div>
                        <Progress value={67} />
                        <div className="flex justify-between">
                          <span>Disque</span>
                          <span>23%</span>
                        </div>
                        <Progress value={23} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <HardDrive className="w-5 h-5 mr-2" />
                        Sauvegardes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Dernière sauvegarde</span>
                          <Badge className="bg-green-100 text-green-800">Aujourd'hui</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Taille</span>
                          <span>2.4 GB</span>
                        </div>
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Créer Sauvegarde
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Sécurité
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>SSL</span>
                          <Badge className="bg-green-100 text-green-800">Actif</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Firewall</span>
                          <Badge className="bg-green-100 text-green-800">Actif</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>2FA</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Inactif</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Outils de Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                        <RefreshCw className="w-6 h-6 mb-2" />
                        Vider Cache
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                        <Database className="w-6 h-6 mb-2" />
                        Optimiser DB
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                        <Activity className="w-6 h-6 mb-2" />
                        Logs Système
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col bg-transparent">
                        <Settings className="w-6 h-6 mb-2" />
                        Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Content Management */}
            {activeTab === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <Tabs defaultValue="homepage" className="w-full">
                  <TabsList>
                    <TabsTrigger value="homepage">Page d'Accueil</TabsTrigger>
                    <TabsTrigger value="about">À Propos</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                    <TabsTrigger value="footer">Footer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="homepage" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Section Hero</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="hero-title">Titre Principal</Label>
                          <Input
                            id="hero-title"
                            defaultValue="Votre Partenaire Électroménager"
                            className="text-lg font-bold"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hero-subtitle">Sous-titre</Label>
                          <Textarea
                            id="hero-subtitle"
                            defaultValue="🔎 Fournisseur sûr, de qualité et à petit prix
📍 Douala, Akwa & Oyem, Gabon
⚡ Gros & détail | Qualité garantie | Prix imbattables
📦 Livraison et expédition partout"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="hero-active" defaultChecked />
                          <Label htmlFor="hero-active">Section active</Label>
                        </div>
                        <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                          <Save className="w-4 h-4 mr-2" />
                          Sauvegarder
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
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
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Générer descriptions produits",
                "Optimiser les prix",
                "Analyser les tendances",
                "Suggestions marketing",
                "Gérer les stocks",
                "Répondre aux clients",
                "Créer du contenu SEO",
                "Analyser la concurrence",
                "Optimiser les performances",
              ].map((suggestion, index) => (
                <Button key={index} variant="outline" size="sm" className="text-left justify-start bg-transparent">
                  {suggestion}
                </Button>
              ))}
            </div>
            <div>
              <Label htmlFor="ai-prompt">Votre demande à l'IA</Label>
              <Textarea
                id="ai-prompt"
                placeholder="Ex: Génère une description SEO pour le réfrigérateur Brigo 350L en mettant l'accent sur ses avantages pour les familles camerounaises..."
                className="min-h-[120px]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAIAssistantOpen(false)}>
                Fermer
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Bot className="w-4 h-4 mr-2" />
                Générer avec IA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
