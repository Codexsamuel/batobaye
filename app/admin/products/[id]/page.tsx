"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Edit,
  Trash2,
  Save,
  Upload,
  Eye,
  Star,
  ShoppingCart,
  BarChart3,
  Clock,
  DollarSign,
  Copy,
  Package,
  Warehouse,
  ImageIcon as ImageIconLucide,
  Target,
  Bot,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data (doit être le même que dans app/admin/page.tsx pour la cohérence)
const mockProducts = [
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
    description:
      "Le réfrigérateur Brigo 350L est idéal pour les familles. Il offre une grande capacité de stockage, une faible consommation d'énergie et un design moderne. Doté de la technologie No Frost, il assure une conservation optimale de vos aliments sans formation de givre.",
    images: [
      "/placeholder.svg?height=300&width=300&text=Brigo+Front",
      "/placeholder.svg?height=300&width=300&text=Brigo+Side",
      "/placeholder.svg?height=300&width=300&text=Brigo+Inside",
    ],
    minStock: 5,
    maxStock: 100,
    cost: 350000,
    margin: 28.5,
    metaTitle: "Réfrigérateur Brigo 350L - Acheter au Cameroun",
    metaDescription:
      "Découvrez le réfrigérateur Brigo 350L, grande capacité, faible consommation. Livraison rapide à Douala et Oyem.",
    keywords: "réfrigérateur, brigo, 350l, électroménager, douala, oyem",
    reviews: [
      {
        id: 1,
        author: "Fatima Z.",
        rating: 5,
        comment: "Excellent produit, très spacieux et silencieux.",
        date: "2024-01-10",
      },
      {
        id: 2,
        author: "Marc A.",
        rating: 4,
        comment: "Bon rapport qualité-prix, livraison rapide.",
        date: "2023-12-28",
      },
    ],
    stockHistory: [
      { date: "2024-01-01", type: "initial", quantity: 20, user: "admin" },
      { date: "2024-01-05", type: "sale", quantity: -5, user: "system" },
      { date: "2024-01-10", type: "sale", quantity: -3, user: "system" },
    ],
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
    description:
      "Plongez au cœur de l'action avec la TV Samsung 55\" QLED. Des couleurs éclatantes, un contraste profond et une résolution 4K UHD pour une expérience visuelle immersive. Idéale pour le cinéma et le gaming.",
    images: [
      "/placeholder.svg?height=300&width=300&text=Samsung+TV+Front",
      "/placeholder.svg?height=300&width=300&text=Samsung+TV+Side",
    ],
    minStock: 3,
    maxStock: 50,
    cost: 300000,
    margin: 26.6,
    metaTitle: 'TV Samsung 55" QLED - Acheter en ligne',
    metaDescription:
      'Découvrez la TV Samsung 55" QLED 4K UHD. Couleurs éclatantes, expérience immersive. Livraison rapide.',
    keywords: "tv, samsung, qled, 55 pouces, 4k, télévision",
    reviews: [
      {
        id: 3,
        author: "Sophie K.",
        rating: 5,
        comment: "Image incroyable, son immersif. Très contente !",
        date: "2024-01-08",
      },
    ],
    stockHistory: [
      { date: "2024-01-01", type: "initial", quantity: 10, user: "admin" },
      { date: "2024-01-07", type: "sale", quantity: -2, user: "system" },
    ],
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
    description:
      "Le congélateur 200L est parfait pour stocker vos provisions. Compact et économe en énergie, il s'intègre facilement dans n'importe quelle cuisine. Idéal pour les petits espaces ou comme congélateur d'appoint.",
    images: [
      "/placeholder.svg?height=300&width=300&text=Congelateur+Front",
      "/placeholder.svg?height=300&width=300&text=Congelateur+Open",
    ],
    minStock: 2,
    maxStock: 30,
    cost: 250000,
    margin: 28.0,
    metaTitle: "Congélateur 200L - Petit prix",
    metaDescription: "Congélateur 200L compact et économe. Idéal pour petits espaces. Livraison rapide.",
    keywords: "congélateur, 200l, petit, pas cher, électroménager",
    reviews: [],
    stockHistory: [
      { date: "2023-12-01", type: "initial", quantity: 50, user: "admin" },
      { date: "2024-01-01", type: "sale", quantity: -40, user: "system" },
      { date: "2024-01-10", type: "sale", quantity: -10, user: "system" },
    ],
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
    description:
      "Le chauffe-eau électrique 100L Thermor assure une eau chaude instantanée pour toute la famille. Facile à installer et doté d'une excellente isolation pour des économies d'énergie. Fiabilité et durabilité garanties.",
    images: [
      "/placeholder.svg?height=300&width=300&text=Chauffe-eau+Front",
      "/placeholder.svg?height=300&width=300&text=Chauffe-eau+Side",
    ],
    minStock: 5,
    maxStock: 20,
    cost: 60000,
    margin: 41.6,
    metaTitle: "Chauffe-eau 100L Thermor - Achat en ligne",
    metaDescription:
      "Chauffe-eau électrique 100L Thermor. Eau chaude instantanée, économies d'énergie. Livraison rapide.",
    keywords: "chauffe-eau, 100l, thermor, électrique, eau chaude",
    reviews: [
      {
        id: 4,
        author: "David N.",
        rating: 5,
        comment: "Très bon chauffe-eau, chauffe vite et tient bien la chaleur.",
        date: "2023-11-20",
      },
    ],
    stockHistory: [
      { date: "2024-01-01", type: "initial", quantity: 10, user: "admin" },
      { date: "2024-01-08", type: "sale", quantity: -7, user: "system" },
    ],
  },
]

const categories = [
  { id: 1, name: "Réfrigérateurs", products: 156, status: "Actif", icon: "❄️" },
  { id: 2, name: "Téléviseurs", products: 89, status: "Actif", icon: "📺" },
  { id: 3, name: "Congélateurs", products: 234, status: "Actif", icon: "🧊" },
  { id: 4, name: "Chauffe-eau", products: 67, status: "Actif", icon: "🔥" },
  { id: 5, name: "Cuisinières", products: 123, status: "Actif", icon: "🍳" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "En stock":
      return "bg-green-100 text-green-800"
    case "Stock faible":
      return "bg-yellow-100 text-yellow-800"
    case "Rupture":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const productId = Number.parseInt(params.id as string)

  const [product, setProduct] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProduct, setEditedProduct] = useState<any>(null)
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false)

  useEffect(() => {
    const foundProduct = mockProducts.find((p) => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
      setEditedProduct({ ...foundProduct }) // Initialize editedProduct with current product data
    } else {
      // Handle product not found, e.g., redirect to 404 or product list
      router.push("/admin/products")
    }
  }, [productId, router])

  const handleSave = () => {
    // In a real app, you would send editedProduct to your API
    console.log("Saving product:", editedProduct)
    setProduct({ ...editedProduct }) // Update local state
    setIsEditing(false)
    // Show a toast notification for success
  }

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ?`)) {
      // In a real app, send delete request to API
      console.log("Deleting product:", product.id)
      router.push("/admin/products") // Redirect to product list after deletion
    }
  }

  const handleDuplicate = () => {
    // In a real app, send duplicate request to API
    console.log("Duplicating product:", product.id)
    // Redirect to new product page or show success
    alert(`Produit "${product.name}" dupliqué ! (Nouvel ID simulé)`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Chargement du produit...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-batobaye-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-batobaye-dark">{product.name}</h1>
            <p className="text-gray-600 mt-1">Détails et gestion du produit</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Annuler
              </Button>
              <Button className="bg-batobaye-primary hover:bg-batobaye-light" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Dupliquer
              </Button>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 bg-transparent"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
              <Button className="bg-batobaye-primary hover:bg-batobaye-light" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={productId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="inventory">Inventaire</TabsTrigger>
                <TabsTrigger value="media">Médias</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="stats">Statistiques & Avis</TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general" className="space-y-6 mt-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2 text-orange-500" />
                      Informations Générales
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-name">Nom du produit</Label>
                        <Input
                          id="product-name"
                          value={editedProduct?.name || ""}
                          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-sku">Code SKU</Label>
                        <Input
                          id="product-sku"
                          value={editedProduct?.sku || ""}
                          onChange={(e) => setEditedProduct({ ...editedProduct, sku: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="product-category">Catégorie</Label>
                        <Select
                          value={editedProduct?.category || ""}
                          onValueChange={(value) => setEditedProduct({ ...editedProduct, category: value })}
                          disabled={!isEditing}
                        >
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
                        <Label htmlFor="product-price">Prix (FCFA)</Label>
                        <Input
                          id="product-price"
                          type="number"
                          value={editedProduct?.price || ""}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, price: Number.parseFloat(e.target.value) })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="product-supplier">Fournisseur</Label>
                        <Input
                          id="product-supplier"
                          value={editedProduct?.supplier || ""}
                          onChange={(e) => setEditedProduct({ ...editedProduct, supplier: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        value={editedProduct?.description || ""}
                        onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                        disabled={!isEditing}
                        className="min-h-[150px]"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="product-status"
                        checked={editedProduct?.status === "En stock"}
                        onCheckedChange={(checked) =>
                          setEditedProduct({ ...editedProduct, status: checked ? "En stock" : "Rupture" })
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor="product-status">Produit en stock</Label>
                    </div>
                    {isEditing && (
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={() => setIsAIAssistantOpen(true)}
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        Générer description avec IA
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inventory Tab */}
              <TabsContent value="inventory" className="space-y-6 mt-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Warehouse className="w-5 h-5 mr-2 text-indigo-500" />
                      Gestion de l'Inventaire
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="current-stock">Stock Actuel</Label>
                        <Input
                          id="current-stock"
                          type="number"
                          value={editedProduct?.stock || 0}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, stock: Number.parseInt(e.target.value) })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="min-stock">Stock Minimum</Label>
                        <Input
                          id="min-stock"
                          type="number"
                          value={editedProduct?.minStock || 0}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, minStock: Number.parseInt(e.target.value) })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-stock">Stock Maximum</Label>
                        <Input
                          id="max-stock"
                          type="number"
                          value={editedProduct?.maxStock || 0}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, maxStock: Number.parseInt(e.target.value) })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cost-price">Prix d'Achat (FCFA)</Label>
                        <Input
                          id="cost-price"
                          type="number"
                          value={editedProduct?.cost || 0}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, cost: Number.parseFloat(e.target.value) })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="margin-percent">Marge (%)</Label>
                        <Input
                          id="margin-percent"
                          type="number"
                          value={editedProduct?.margin || 0}
                          onChange={(e) =>
                            setEditedProduct({ ...editedProduct, margin: Number.parseFloat(e.target.value) })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-6 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-gray-600" />
                      Historique des Mouvements
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantité</TableHead>
                          <TableHead>Utilisateur</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {product.stockHistory.map((move: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{move.date}</TableCell>
                            <TableCell>
                              <Badge
                                className={`${
                                  move.type === "sale"
                                    ? "bg-red-100 text-red-800"
                                    : move.type === "initial"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {move.type}
                              </Badge>
                            </TableCell>
                            <TableCell className={move.quantity < 0 ? "text-red-600" : "text-green-600"}>
                              {move.quantity > 0 ? `+${move.quantity}` : move.quantity}
                            </TableCell>
                            <TableCell>{move.user}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-6 mt-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ImageIconLucide className="w-5 h-5 mr-2 text-rose-500" />
                      Images du Produit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {editedProduct?.images?.map((img: string, index: number) => (
                        <div key={index} className="relative group">
                          <img
                            src={img || "/placeholder.svg"}
                            alt={`Product Image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow-md"
                          />
                          {isEditing && (
                            <Button
                              size="icon"
                              variant="destructive"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => {
                                const newImages = editedProduct.images.filter((_: string, i: number) => i !== index)
                                setEditedProduct({ ...editedProduct, images: newImages })
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-batobaye-primary transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Glissez vos images ici ou cliquez pour ajouter</p>
                        <p className="text-sm text-gray-500">PNG, JPG jusqu'à 10MB</p>
                        <Input type="file" multiple className="hidden" /> {/* Hidden file input */}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO Tab */}
              <TabsContent value="seo" className="space-y-6 mt-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-teal-500" />
                      Optimisation SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="meta-title">Titre SEO</Label>
                      <Input
                        id="meta-title"
                        value={editedProduct?.metaTitle || ""}
                        onChange={(e) => setEditedProduct({ ...editedProduct, metaTitle: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta-description">Description SEO</Label>
                      <Textarea
                        id="meta-description"
                        value={editedProduct?.metaDescription || ""}
                        onChange={(e) => setEditedProduct({ ...editedProduct, metaDescription: e.target.value })}
                        disabled={!isEditing}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="keywords">Mots-clés (séparés par des virgules)</Label>
                      <Input
                        id="keywords"
                        value={editedProduct?.keywords || ""}
                        onChange={(e) => setEditedProduct({ ...editedProduct, keywords: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    {isEditing && (
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={() => setIsAIAssistantOpen(true)}
                      >
                        <Bot className="w-4 h-4 mr-2" />
                        Optimiser SEO avec IA
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stats & Reviews Tab */}
              <TabsContent value="stats" className="space-y-6 mt-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                      Statistiques du Produit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <ShoppingCart className="w-8 h-8 text-blue-500 mb-2" />
                        <span className="text-2xl font-bold">{product.sales}</span>
                        <p className="text-sm text-gray-600">Ventes</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <Eye className="w-8 h-8 text-orange-500 mb-2" />
                        <span className="text-2xl font-bold">{product.views}</span>
                        <p className="text-sm text-gray-600">Vues</p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <DollarSign className="w-8 h-8 text-green-500 mb-2" />
                        <span className="text-2xl font-bold">{formatPrice(product.price * product.sales)}</span>
                        <p className="text-sm text-gray-600">Revenus Estimés</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mt-6 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      Avis Clients ({product.reviews.length})
                    </h3>
                    {product.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                            </div>
                            <p className="font-medium text-gray-800">{review.author}</p>
                            <p className="text-gray-700 italic">"{review.comment}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Aucun avis pour ce produit pour le moment.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Assistant Modal (same as in admin/page.tsx) */}
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
