"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  RefreshCw,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Hash,
  HashTag,
  HashTag1,
  HashTag2,
  HashTag3,
  HashTag4,
  HashTag5,
  HashTag6,
  HashTag7,
  HashTag8,
  HashTag9,
  HashTag10,
  HashTag11,
  HashTag12,
  HashTag13,
  HashTag14,
  HashTag15,
  HashTag16,
  HashTag17,
  HashTag18,
  HashTag19,
  HashTag20,
  HashTag21,
  HashTag22,
  HashTag23,
  HashTag24,
  HashTag25,
  HashTag26,
  HashTag27,
  HashTag28,
  HashTag29,
  HashTag30,
  HashTag31,
  HashTag32,
  HashTag33,
  HashTag34,
  HashTag35,
  HashTag36,
  HashTag37,
  HashTag38,
  HashTag39,
  HashTag40,
  HashTag41,
  HashTag42,
  HashTag43,
  HashTag44,
  HashTag45,
  HashTag46,
  HashTag47,
  HashTag48,
  HashTag49,
  HashTag50,
  HashTag51,
  HashTag52,
  HashTag53,
  HashTag54,
  HashTag55,
  HashTag56,
  HashTag57,
  HashTag58,
  HashTag59,
  HashTag60,
  HashTag61,
  HashTag62,
  HashTag63,
  HashTag64,
  HashTag65,
  HashTag66,
  HashTag67,
  HashTag68,
  HashTag69,
  HashTag70,
  HashTag71,
  HashTag72,
  HashTag73,
  HashTag74,
  HashTag75,
  HashTag76,
  HashTag77,
  HashTag78,
  HashTag79,
  HashTag80,
  HashTag81,
  HashTag82,
  HashTag83,
  HashTag84,
  HashTag85,
  HashTag86,
  HashTag87,
  HashTag88,
  HashTag89,
  HashTag90,
  HashTag91,
  HashTag92,
  HashTag93,
  HashTag94,
  HashTag95,
  HashTag96,
  HashTag97,
  HashTag98,
  HashTag99,
  HashTag100,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unitPrice: number
  supplier: string
  lastRestock: string
  nextRestock: string
  status: "normal" | "low" | "out" | "overstock"
  location: string
  barcode?: string
}

const mockInventory: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Réfrigérateur Brigo 350L",
    category: "Électroménager",
    currentStock: 15,
    minStock: 5,
    maxStock: 50,
    unitPrice: 450000,
    supplier: "Brigo Cameroun",
    lastRestock: "2024-01-10",
    nextRestock: "2024-01-25",
    status: "normal",
    location: "Entrepôt A - Zone 1",
  },
  {
    id: "INV-002",
    name: "Congélateur 200L",
    category: "Électroménager",
    currentStock: 3,
    minStock: 5,
    maxStock: 30,
    unitPrice: 320000,
    supplier: "Hisense Cameroun",
    lastRestock: "2024-01-08",
    nextRestock: "2024-01-20",
    status: "low",
    location: "Entrepôt A - Zone 2",
  },
  {
    id: "INV-003",
    name: "Cuisinière 4 feux",
    category: "Cuisine",
    currentStock: 0,
    minStock: 3,
    maxStock: 25,
    unitPrice: 280000,
    supplier: "Samsung Cameroun",
    lastRestock: "2024-01-05",
    nextRestock: "2024-01-15",
    status: "out",
    location: "Entrepôt B - Zone 1",
  },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      case "out":
        return "bg-red-100 text-red-800"
      case "overstock":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal"
      case "low":
        return "Stock Faible"
      case "out":
        return "Rupture"
      case "overstock":
        return "Surstock"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="w-4 h-4" />
      case "low":
        return <AlertTriangle className="w-4 h-4" />
      case "out":
        return <XCircle className="w-4 h-4" />
      case "overstock":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalItems = inventory.length
  const lowStockItems = inventory.filter(item => item.status === "low").length
  const outOfStockItems = inventory.filter(item => item.status === "out").length
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0)

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestion de Stock</h1>
          <p className="text-gray-600">Suivi des inventaires et alertes de réapprovisionnement</p>
        </div>

        {/* Actions principales */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter Stock
          </Button>
          <Button variant="outline">
            <Minus className="w-4 h-4 mr-2" />
            Sortie Stock
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Articles</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Stock Faible</p>
                  <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En Rupture</p>
                  <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valeur Stock</p>
                  <p className="text-2xl font-bold">{formatPrice(totalValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtres et Recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes les catégories</option>
                <option value="Électroménager">Électroménager</option>
                <option value="Cuisine">Cuisine</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="normal">Normal</option>
                <option value="low">Stock Faible</option>
                <option value="out">Rupture</option>
                <option value="overstock">Surstock</option>
              </select>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Période
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tableau des stocks */}
        <Card>
          <CardHeader>
            <CardTitle>Inventaire ({filteredInventory.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Stock Actuel</TableHead>
                  <TableHead>Seuil Min</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Prix Unitaire</TableHead>
                  <TableHead>Valeur Stock</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Prochain Réappro</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.id}</div>
                        <div className="text-xs text-gray-400">{item.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className={`font-semibold ${
                        item.currentStock <= item.minStock ? "text-red-600" : 
                        item.currentStock >= item.maxStock ? "text-blue-600" : "text-green-600"
                      }`}>
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        <div className="flex items-center">
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{getStatusText(item.status)}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{formatPrice(item.unitPrice)}</TableCell>
                    <TableCell className="font-semibold">
                      {formatPrice(item.currentStock * item.unitPrice)}
                    </TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(item.nextRestock).toLocaleDateString("fr-FR")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alertes de réapprovisionnement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Alertes de Réapprovisionnement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory.filter(item => item.status === "low" || item.status === "out").map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        Stock: {item.currentStock} / {item.minStock}
                      </div>
                    </div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Commander
                    </Button>
                  </div>
                ))}
                {inventory.filter(item => item.status === "low" || item.status === "out").length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucune alerte de réapprovisionnement</p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Calendar className="w-5 h-5 mr-2" />
                Réapprovisionnements Prévus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventory
                  .filter(item => new Date(item.nextRestock) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          Prévu: {new Date(item.nextRestock).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Confirmer
                      </Button>
                    </div>
                  ))}
                {inventory.filter(item => new Date(item.nextRestock) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length === 0 && (
                  <p className="text-gray-500 text-center py-4">Aucun réapprovisionnement prévu</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 