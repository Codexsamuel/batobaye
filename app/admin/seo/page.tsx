"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  RefreshCw,
  Download,
  Upload,
  Settings,
  BarChart3,
  Globe,
  Tag,
  Star,
  DollarSign,
  Package,
  TrendingUp,
  AlertCircle,
  Info,
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

// Types
interface ProductSEO {
  id: number
  name: string
  url: string
  hasOffers: boolean
  hasReviews: boolean
  hasAggregateRating: boolean
  price?: number
  currency?: string
  rating?: number
  reviewCount?: number
  status: "valid" | "warning" | "error"
  lastChecked: string
}

interface SchemaValidation {
  productId: number
  productName: string
  issues: string[]
  score: number
  recommendations: string[]
}

export default function SEOPage() {
  const [products, setProducts] = useState<ProductSEO[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isValidating, setIsValidating] = useState(false)
  const [validationResults, setValidationResults] = useState<SchemaValidation[]>([])

  // Mock data pour les produits SEO
  const mockProductsSEO: ProductSEO[] = [
    {
      id: 1,
      name: "Réfrigérateur Brigo 350L",
      url: "/products/1",
      hasOffers: true,
      hasReviews: true,
      hasAggregateRating: true,
      price: 450000,
      currency: "XAF",
      rating: 4.8,
      reviewCount: 124,
      status: "valid",
      lastChecked: "2024-01-15"
    },
    {
      id: 2,
      name: "Congélateur Hisense 200L",
      url: "/products/2",
      hasOffers: true,
      hasReviews: false,
      hasAggregateRating: true,
      price: 320000,
      currency: "XAF",
      rating: 4.6,
      reviewCount: 89,
      status: "warning",
      lastChecked: "2024-01-14"
    },
    {
      id: 3,
      name: 'TV Samsung 55" QLED',
      url: "/products/3",
      hasOffers: false,
      hasReviews: false,
      hasAggregateRating: false,
      price: 380000,
      currency: "XAF",
      rating: 4.9,
      reviewCount: 156,
      status: "error",
      lastChecked: "2024-01-13"
    }
  ]

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProducts(mockProductsSEO)
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error)
        setProducts(mockProductsSEO)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "error":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: products.length,
    valid: products.filter(p => p.status === "valid").length,
    warning: products.filter(p => p.status === "warning").length,
    error: products.filter(p => p.status === "error").length,
    score: Math.round((products.filter(p => p.status === "valid").length / products.length) * 100)
  }

  const validateAllProducts = async () => {
    setIsValidating(true)
    try {
      // Simuler la validation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const results: SchemaValidation[] = products.map(product => {
        const issues: string[] = []
        const recommendations: string[] = []
        
        if (!product.hasOffers) {
          issues.push("Offres manquantes")
          recommendations.push("Ajouter les informations de prix et disponibilité")
        }
        
        if (!product.hasReviews && !product.hasAggregateRating) {
          issues.push("Avis et notes manquants")
          recommendations.push("Ajouter des avis clients ou une note moyenne")
        }
        
        if (!product.hasReviews) {
          issues.push("Avis clients manquants")
          recommendations.push("Ajouter des avis clients")
        }
        
        const score = Math.max(0, 100 - (issues.length * 25))
        
        return {
          productId: product.id,
          productName: product.name,
          issues,
          score,
          recommendations
        }
      })
      
      setValidationResults(results)
    } catch (error) {
      console.error('Erreur lors de la validation:', error)
    } finally {
      setIsValidating(false)
    }
  }

  const generateSchemaForProduct = (product: ProductSEO) => {
    const schema: any = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "offers": {
        "@type": "Offer",
        "priceCurrency": product.currency || "XAF",
        "price": product.price?.toString() || "0",
        "availability": "https://schema.org/InStock"
      }
    }
    
    if (product.hasAggregateRating) {
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": product.rating?.toString() || "0",
        "reviewCount": product.reviewCount?.toString() || "0"
      }
    }
    
    return JSON.stringify(schema, null, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-batobaye-dark">SEO & Schema.org</h1>
            <p className="text-gray-600 mt-1">Gestion des balisages et optimisation pour Google Search Console</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              onClick={validateAllProducts}
              disabled={isValidating}
              className="bg-batobaye-primary hover:bg-batobaye-light"
            >
              {isValidating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <BarChart3 className="w-4 h-4 mr-2" />
              )}
              {isValidating ? "Validation..." : "Valider tout"}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Score SEO</p>
                      <p className="text-2xl font-bold text-batobaye-primary">{stats.score}%</p>
                    </div>
                    <div className="w-12 h-12 bg-batobaye-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-batobaye-primary" />
                    </div>
                  </div>
                  <Progress value={stats.score} className="mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Produits valides</p>
                      <p className="text-2xl font-bold text-green-600">{stats.valid}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avertissements</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.warning}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Erreurs</p>
                      <p className="text-2xl font-bold text-red-600">{stats.error}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert pour Google Search Console */}
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Erreur Google Search Console détectée :</strong> "Either 'offers', 'review', or 'aggregateRating' should be specified". 
                Utilisez cette page pour corriger les balisages Schema.org de vos produits.
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products">Produits</TabsTrigger>
                <TabsTrigger value="validation">Validation</TabsTrigger>
                <TabsTrigger value="schema">Générateur Schema</TabsTrigger>
              </TabsList>

              {/* Products Tab */}
              <TabsContent value="products" className="space-y-6 mt-6">
                {/* Filters */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="valid">Valides</SelectItem>
                          <SelectItem value="warning">Avertissements</SelectItem>
                          <SelectItem value="error">Erreurs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Products Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Produits et leur balisage Schema.org</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Produit</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Offres</TableHead>
                          <TableHead>Avis</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.url}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(product.status)}>
                                {getStatusIcon(product.status)}
                                <span className="ml-1 capitalize">{product.status}</span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {product.hasOffers ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className="text-sm">
                                  {product.hasOffers ? "✓" : "✗"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {product.hasReviews ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className="text-sm">
                                  {product.hasReviews ? "✓" : "✗"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {product.hasAggregateRating ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-red-500" />
                                )}
                                <span className="text-sm">
                                  {product.hasAggregateRating ? "✓" : "✗"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Schema.org pour {product.name}</DialogTitle>
                                      <DialogDescription>
                                        Balisage JSON-LD généré pour ce produit
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-4">
                                      <Label>Code JSON-LD</Label>
                                      <Textarea
                                        value={generateSchemaForProduct(product)}
                                        readOnly
                                        className="font-mono text-sm h-64"
                                      />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Validation Tab */}
              <TabsContent value="validation" className="space-y-6 mt-6">
                {validationResults.length > 0 ? (
                  <div className="space-y-4">
                    {validationResults.map((result) => (
                      <Card key={result.productId}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{result.productName}</CardTitle>
                            <Badge className={result.score >= 80 ? "bg-green-100 text-green-800" : result.score >= 60 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                              Score: {result.score}/100
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {result.issues.length > 0 ? (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-red-600 mb-2">Problèmes détectés :</h4>
                                <ul className="space-y-1">
                                  {result.issues.map((issue, index) => (
                                    <li key={index} className="flex items-center text-sm text-red-600">
                                      <AlertCircle className="w-4 h-4 mr-2" />
                                      {issue}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold text-green-600 mb-2">Recommandations :</h4>
                                <ul className="space-y-1">
                                  {result.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-center text-sm text-green-600">
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Aucun problème détecté - Le balisage Schema.org est correct
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune validation effectuée</h3>
                      <p className="text-gray-600 mb-4">
                        Cliquez sur "Valider tout" pour analyser vos produits et détecter les problèmes de balisage Schema.org.
                      </p>
                      <Button onClick={validateAllProducts} disabled={isValidating}>
                        {isValidating ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <BarChart3 className="w-4 h-4 mr-2" />
                        )}
                        {isValidating ? "Validation..." : "Lancer la validation"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Schema Generator Tab */}
              <TabsContent value="schema" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Générateur de balisage Schema.org</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="productName">Nom du produit</Label>
                          <Input id="productName" placeholder="Ex: Réfrigérateur Brigo 350L" />
                        </div>
                        <div>
                          <Label htmlFor="productPrice">Prix (FCFA)</Label>
                          <Input id="productPrice" type="number" placeholder="450000" />
                        </div>
                        <div>
                          <Label htmlFor="productBrand">Marque</Label>
                          <Input id="productBrand" placeholder="Ex: Brigo" />
                        </div>
                        <div>
                          <Label htmlFor="productRating">Note moyenne</Label>
                          <Input id="productRating" type="number" step="0.1" min="0" max="5" placeholder="4.8" />
                        </div>
                        <div>
                          <Label htmlFor="productReviews">Nombre d'avis</Label>
                          <Input id="productReviews" type="number" placeholder="124" />
                        </div>
                        <div>
                          <Label htmlFor="productAvailability">Disponibilité</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="InStock">En stock</SelectItem>
                              <SelectItem value="OutOfStock">Rupture de stock</SelectItem>
                              <SelectItem value="PreOrder">Sur commande</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="productDescription">Description</Label>
                        <Textarea 
                          id="productDescription" 
                          placeholder="Description détaillée du produit..."
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                          <Download className="w-4 h-4 mr-2" />
                          Générer le Schema
                        </Button>
                        <Button variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Tester le Schema
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
} 