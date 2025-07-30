"use client"
import { useState } from "react"
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
  Bot,
  Database,
  Shield,
  Activity,
  ImageIcon,
  Palette,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Save,
  Zap,
  Target,
  Server,
  HardDrive,
  MessageSquare,
  MoreHorizontal,
  MessageCircle,
  Home,
  BarChart,
  Wrench,
  FileText,
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
import { Topbar } from "@/components/admin/Topbar" // Keep this import
import { AssistantIA } from "@/components/admin/AssistantIA" // Keep this import

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

const menuSections = [
  {
    title: "Tableau de Bord",
    items: [
      { id: "dashboard", name: "Vue d'ensemble", href: "/admin", icon: Home, color: "text-blue-500" },
      { id: "analytics", name: "Analytics", href: "/admin/analytics", icon: BarChart, color: "text-green-500" },
      // { id: "reports", name: "Rapports", href: "/admin/reports", icon: PieChart, color: "text-purple-500" },
    ],
  },
  {
    title: "E-Commerce",
    items: [
      { id: "products", name: "Produits", href: "/admin/products", icon: Package, color: "text-orange-500" },
      // { id: "categories", name: "Catégories", href: "/admin/categories", icon: Tag, color: "text-pink-500" },
      // { id: "inventory", name: "Inventaire", icon: Warehouse, color: "text-indigo-500" },
      // { id: "orders", name: "Commandes", icon: ShoppingCart, color: "text-blue-600" },
      // { id: "customers", name: "Clients", icon: Users, color: "text-cyan-500" },
    ],
  },
  {
    title: "Gestion Site Web",
    items: [
      // { id: "pages", name: "Pages", icon: Layout, color: "text-emerald-500" },
      { id: "content", name: "Contenu", href: "/admin/content", icon: FileText, color: "text-amber-500" },
      { id: "media", name: "Médias", href: "/admin/media", icon: ImageIcon, color: "text-rose-500" },
      // { id: "seo", name: "SEO", icon: Target, color: "text-teal-500" },
      { id: "design", name: "Apparence", href: "/admin/design", icon: Palette, color: "text-violet-500" },
    ],
  },
  {
    title: "Outils Avancés",
    items: [
      { id: "ai-assistant", name: "Assistant IA", href: "/admin/ia", icon: Bot, color: "text-purple-600" },
      // { id: "bulk-actions", name: "Actions Groupées", icon: Layers, color: "text-indigo-400" },
      // { id: "import-export", name: "Import/Export", icon: RefreshCw, color: "text-cyan-400" },
      // { id: "api", name: "API", icon: Code, color: "text-emerald-400" },
    ],
  },
  {
    title: "Système",
    items: [
      // { id: "users", name: "Utilisateurs", icon: UserCheck, color: "text-slate-500" },
      // { id: "security", name: "Sécurité", icon: Shield, color: "text-red-500" },
      { id: "maintenance", name: "Maintenance", href: "/admin/maintenance", icon: Wrench, color: "text-gray-500" },
      // { id: "logs", name: "Logs Système", icon: Terminal, color: "text-green-400" },
      // { id: "backup", name: "Sauvegardes", icon: CloudDownload, color: "text-blue-500" },
    ],
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
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

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} /> {/* Use the new Topbar */}
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
                      {
                        name: "Nouveau Produit",
                        icon: Plus,
                        action: () => {
                          setIsAddProductOpen(true)
                          console.log("Nouveau Produit clicked")
                        },
                      },
                      {
                        name: "Voir Commandes",
                        icon: ShoppingCart,
                        action: () => {
                          setActiveTab("orders")
                          console.log("Voir Commandes clicked")
                        },
                      },
                      {
                        name: "Gérer Stock",
                        icon: Database,
                        action: () => {
                          setActiveTab("inventory")
                          console.log("Gérer Stock clicked")
                        },
                      },
                      {
                        name: "Analytics",
                        icon: BarChart3,
                        action: () => {
                          setActiveTab("analytics")
                          console.log("Analytics clicked")
                        },
                      },
                      {
                        name: "Messages",
                        icon: MessageSquare,
                        action: () => {
                          setActiveTab("messages")
                          console.log("Messages clicked")
                        },
                      },
                      {
                        name: "Maintenance",
                        icon: Settings,
                        action: () => {
                          setActiveTab("maintenance")
                          console.log("Maintenance clicked")
                        },
                      },
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
                  <Select onValueChange={(value) => console.log(`Filtered by category: ${value}`)}>
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
                  <Button variant="outline" onClick={() => console.log("Exporter button clicked")}>
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                  <Button variant="outline" onClick={() => console.log("Importer button clicked")}>
                    <Upload className="w-4 h-4 mr-2" />
                    Importer
                  </Button>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-batobaye-primary hover:bg-batobaye-light"
                        onClick={() => console.log("Nouveau Produit button clicked")}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Produit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                        <DialogDescription>Remplissez toutes les informations du produit ci-dessous</DialogDescription>
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
                              <p className="text-gray-600 mb-2">Glissez vos images ici ou cliquez pour sélectionner</p>
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
                        <Button
                          className="bg-batobaye-primary hover:bg-batobaye-light"
                          onClick={() => console.log("Enregistrer nouveau produit clicked")}
                        >
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
                              <Link href={`/admin/products/${product.id}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => console.log(`View product ${product.id} clicked`)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => console.log(`Edit product ${product.id} clicked`)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                                onClick={() => console.log(`Delete product ${product.id} clicked`)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => console.log(`More actions for product ${product.id} clicked`)}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
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

          {/* Inventory Management (Placeholder) */}
          {activeTab === "inventory" && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Gestion de l'Inventaire</h2>
              <p className="text-gray-600">Ce module sera développé pour gérer le stock des produits.</p>
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
                          <Button
                            size="sm"
                            className="bg-batobaye-primary hover:bg-batobaye-light"
                            onClick={() => console.log(`Réapprovisionner ${product.name} clicked`)}
                          >
                            Réapprovisionner
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Orders Management (Placeholder) */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
              <p className="text-gray-600">Ce module sera développé pour gérer les commandes clients.</p>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={(value) => console.log(`Filtered orders by status: ${value}`)}>
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
                  <Button
                    className="bg-batobaye-primary hover:bg-batobaye-light"
                    onClick={() => console.log("Nouvelle Commande clicked")}
                  >
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
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => console.log(`View order ${order.id} clicked`)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => console.log(`Edit order ${order.id} clicked`)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => console.log(`Message customer for order ${order.id} clicked`)}
                              >
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

          {/* Apparence Module (Placeholder) */}
          {activeTab === "design" && (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Gestion de l'Apparence</h2>
              <p className="text-gray-600">
                Ce module permettra de modifier les couleurs, les polices et les visuels de votre site.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Thème et Couleurs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primary-color">Couleur Primaire</Label>
                    <Input id="primary-color" type="color" defaultValue="#FF8C00" />
                  </div>
                  <div>
                    <Label htmlFor="secondary-color">Couleur Secondaire</Label>
                    <Input id="secondary-color" type="color" defaultValue="#FFA500" />
                  </div>
                  <Button
                    className="bg-batobaye-primary hover:bg-batobaye-light"
                    onClick={() => console.log("Sauvegarder couleurs clicked")}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder Couleurs
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Content Module (Placeholder) */}
          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Gestion du Contenu</h2>
              <p className="text-gray-600">
                Ce module vous permettra de modifier les textes des pages, titres et slogans.
              </p>
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
                        <Switch
                          id="hero-active"
                          defaultChecked
                          onCheckedChange={(checked) => console.log(`Hero section active: ${checked}`)}
                        />
                        <Label htmlFor="hero-active">Section active</Label>
                      </div>
                      <Button
                        className="bg-batobaye-primary hover:bg-batobaye-light"
                        onClick={() => console.log("Sauvegarder Hero section clicked")}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}

          {/* Statistics Module (Placeholder) */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Statistiques</h2>
              <p className="text-gray-600">
                Ce module affichera les visites, clics, top produits et autres données analytiques.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visites du Site</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">48,392</p>
                    <p className="text-sm text-gray-500">+18.7% par rapport au mois dernier</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Produits les Plus Vus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li>1. Réfrigérateur Brigo 350L (1250 vues)</li>
                      <li>2. Congélateur 200L (2100 vues)</li>
                      <li>3. TV Samsung 55" QLED (890 vues)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* AI Assistant Module */}
          {activeTab === "ai-assistant" && (
            <motion.div
              key="ai-assistant"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">🧠 Kodee – Assistant IA</h2>
              <p className="text-gray-600">
                Votre assistant intelligent pour générer des descriptions, optimiser les prix et créer du contenu
                marketing.
              </p>
              <AssistantIA /> {/* Render the AssistantIA component */}
            </motion.div>
          )}

          {/* Media Module (Placeholder) */}
          {activeTab === "media" && (
            <motion.div
              key="media"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Gestion des Médias</h2>
              <p className="text-gray-600">
                Ce module vous permettra d'ajouter, de supprimer et de gérer les images et autres fichiers multimédias.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Télécharger des Médias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Glissez vos images ici ou cliquez pour sélectionner</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF, MP4 jusqu'à 50MB</p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => console.log("Sélectionner fichiers clicked")}
                    >
                      Sélectionner des fichiers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Settings Module (Placeholder) */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Paramètres</h2>
              <p className="text-gray-600">
                Ce module gérera les paramètres techniques et le style avancé de votre plateforme.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres Généraux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="site-name">Nom du Site</Label>
                    <Input id="site-name" defaultValue="Batobaye Market V2" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email de Contact</Label>
                    <Input id="contact-email" type="email" defaultValue="contact@batobaye.com" />
                  </div>
                  <Button
                    className="bg-batobaye-primary hover:bg-batobaye-light"
                    onClick={() => console.log("Sauvegarder paramètres généraux clicked")}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </Button>
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
                      <Button className="w-full" onClick={() => console.log("Créer Sauvegarde clicked")}>
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
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col bg-transparent"
                      onClick={() => console.log("Vider Cache clicked")}
                    >
                      <RefreshCw className="w-6 h-6 mb-2" />
                      Vider Cache
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col bg-transparent"
                      onClick={() => console.log("Optimiser DB clicked")}
                    >
                      <Database className="w-6 h-6 mb-2" />
                      Optimiser DB
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col bg-transparent"
                      onClick={() => console.log("Logs Système clicked")}
                    >
                      <Activity className="w-6 h-6 mb-2" />
                      Logs Système
                    </Button>
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col bg-transparent"
                      onClick={() => console.log("Configuration clicked")}
                    >
                      <Settings className="w-6 h-6 mb-2" />
                      Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
