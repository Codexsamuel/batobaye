"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingCart,
  Package,
  Star,
  Filter,
  Grid,
  List,
  Heart,
  Eye,
  ShoppingBag,
  Truck,
  Shield,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import WhatsAppBuyModal from "@/components/WhatsAppBuyModal"
import ProductActionButtons from "@/components/ProductActionButtons"

  const mockProducts = [
  {
    id: 1,
    name: "Réfrigérateur Brigo 350L",
    price: 450000,
    oldPrice: 520000,
    category: "Réfrigérateurs",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    image: "/placeholder.svg",
    features: ["No Frost", "Économie d'énergie", "Grande capacité"],
    description: "Réfrigérateur moderne avec technologie No Frost pour une conservation optimale de vos aliments.",
  },
  {
    id: 2,
    name: "Congélateur Hisense 200L",
    price: 320000,
    oldPrice: 380000,
    category: "Congélateurs",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    image: "/placeholder.svg",
    features: ["Congélation rapide", "Économie d'énergie", "Facile à nettoyer"],
    description: "Congélateur performant pour conserver vos aliments sur le long terme.",
  },
  {
    id: 3,
    name: 'TV Samsung 55" QLED',
    price: 380000,
    oldPrice: 450000,
    category: "Téléviseurs",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    image: "/placeholder.svg",
    features: ["4K Ultra HD", "Smart TV", "HDR"],
    description: "Téléviseur haute définition avec technologie QLED pour une expérience visuelle exceptionnelle.",
  },
  {
    id: 4,
    name: "Chauffe-eau Ariston 100L",
    price: 85000,
    oldPrice: 95000,
    category: "Chauffe-eau",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    image: "/placeholder.svg",
    features: ["Résistance blindée", "Thermostat réglable", "Protection anti-corrosion"],
    description: "Chauffe-eau électrique fiable pour votre confort quotidien.",
  },
  {
    id: 5,
    name: "Cuisinière 4 feux + Four",
    price: 180000,
    oldPrice: 220000,
    category: "Cuisinières",
    rating: 4.5,
    reviews: 78,
    inStock: false,
    image: "/placeholder.svg",
    features: ["4 feux", "Four intégré", "Allumage électronique"],
    description: "Cuisinière complète pour tous vos besoins culinaires.",
  },
  {
    id: 6,
    name: "Lave-linge 8kg",
    price: 250000,
    oldPrice: 280000,
    category: "Lave-linge",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    image: "/placeholder.svg",
    features: ["8kg de capacité", "15 programmes", "Économie d'eau"],
    description: "Lave-linge performant pour un linge toujours propre.",
  },
]

  

const filters = [
  { name: "Prix", options: ["Tous", "0-100k", "100k-300k", "300k-500k", "500k+"] },
  { name: "Marque", options: ["Toutes", "Brigo", "Hisense", "Samsung", "Ariston"] },
  { name: "Disponibilité", options: ["Tous", "En stock", "Sur commande"] },
  { name: "Note", options: ["Toutes", "4+ étoiles", "3+ étoiles"] },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")

  // Charger les produits depuis l'API
  useEffect(() => {
      const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?status=active')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data)
      } else {
        // Utiliser les produits mockés en cas d'erreur
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
      // Utiliser les produits mockés en cas d'erreur
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  loadProducts()
}, [])

  const categories = [
    { id: "all", name: "Tous les produits", icon: "🏠", count: products.length },
    { id: "refrigerateurs", name: "Réfrigérateurs", icon: "❄️", count: products.filter(p => p.category === "Réfrigérateurs").length },
    { id: "congelateurs", name: "Congélateurs", icon: "🧊", count: products.filter(p => p.category === "Congélateurs").length },
    { id: "televiseurs", name: "Téléviseurs", icon: "📺", count: products.filter(p => p.category === "Téléviseurs").length },
    { id: "chauffe-eau", name: "Chauffe-eau", icon: "🔥", count: products.filter(p => p.category === "Chauffe-eau").length },
    { id: "cuisinieres", name: "Cuisinières", icon: "🍳", count: products.filter(p => p.category === "Cuisinières").length },
    { id: "lave-linge", name: "Lave-linge", icon: "👕", count: products.filter(p => p.category === "Lave-linge").length },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || 
                           product.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return b.reviews - a.reviews // popular
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Optimisé */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-batobaye-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-batobaye-dark">BATOBAYE</h1>
                <p className="text-xs text-gray-600">Market</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <nav className="hidden lg:flex space-x-8 ml-8">
                <Link href="/" className="text-sm text-gray-700 hover:text-batobaye-primary transition-colors">
                  Accueil
                </Link>
                <Link href="/products" className="text-sm text-batobaye-primary font-semibold">
                  Produits
                </Link>
                <Link href="/about" className="text-sm text-gray-700 hover:text-batobaye-primary transition-colors">
                  À propos
                </Link>
                <Link href="/contact" className="text-sm text-gray-700 hover:text-batobaye-primary transition-colors">
                  Contact
                </Link>
              </nav>

              <div className="flex items-center space-x-3">
                <Button className="text-xs px-3 py-2">
                  <Phone className="w-3 h-3 mr-1" />
                  +237 672 02 77 44
                </Button>
                <Link href="/admin">
                  <Button className="bg-batobaye-primary hover:bg-batobaye-light text-xs px-3 py-2">
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-batobaye-primary to-batobaye-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Produits</h1>
            <p className="text-xl mb-8 text-orange-100">
              Découvrez notre gamme complète d'électroménager de qualité
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900 border-0 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? "bg-batobaye-primary hover:bg-batobaye-light" : ""}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <Badge className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Sort */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Trier par:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popularité</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="name">Nom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
              </span>
              <div className="flex border rounded-lg">
                <Button variant={viewMode === "grid" ? "default" : "ghost"}
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-batobaye-primary hover:bg-batobaye-light" : ""}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === "list" ? "default" : "ghost"}
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-batobaye-primary hover:bg-batobaye-light" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-400" />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {product.oldPrice && (
                          <Badge className="bg-red-500 text-white">-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</Badge>
                        )}
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>

                      {/* Wishlist Button */}
                      <Button className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-batobaye-primary transition-colors">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xl font-bold text-batobaye-primary">
                            {formatPrice(product.price)}
                          </p>
                          {product.oldPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(product.oldPrice)}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant={product.inStock ? "default" : "secondary"}
                          className={product.inStock ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {product.inStock ? "En stock" : "Sur commande"}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <ProductActionButtons 
                          product={{
                            id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            description: product.description,
                            category: product.category,
                            stock: product.stock
                          }}
                          layout="dropdown"
                        />
                        <Link href={`/products/${product.id}`}>
                          <Button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex space-x-6">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-3">{product.description}</p>
                            
                            <div className="flex items-center mb-3">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                {product.rating} ({product.reviews} avis)
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                              {product.features?.map((feature: string, index: number) => (
                                <Badge key={index} className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="mb-3">
                              <p className="text-2xl font-bold text-batobaye-primary">
                                {formatPrice(product.price)}
                              </p>
                              {product.oldPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  {formatPrice(product.oldPrice)}
                                </p>
                              )}
                            </div>
                            
                            <Badge
                              variant={product.inStock ? "default" : "secondary"}
                              className={product.inStock ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {product.inStock ? "En stock" : "Sur commande"}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <ProductActionButtons 
                            product={{
                              id: product.id.toString(),
                              name: product.name,
                              price: product.price,
                              description: product.description,
                              category: product.category,
                              stock: product.stock
                            }}
                            layout="dropdown"
                            className="flex-1"
                          />
                          <Link href={`/products/${product.id}`}>
                            <Button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                              <Eye className="w-4 h-4 mr-2" />
                              Voir détails
                            </Button>
                          </Link>
                          <Button className="bg-transparent hover:bg-gray-100 p-2">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Choisir Batobaye ?</h2>
            <p className="text-lg text-gray-600">Notre engagement envers la qualité et le service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-batobaye-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison gratuite dans tout le Cameroun sous 24-48h</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-batobaye-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Garantie 2 Ans</h3>
              <p className="text-gray-600">Tous nos produits bénéficient d'une garantie de 2 ans</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-batobaye-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Installation Gratuite</h3>
              <p className="text-gray-600">Installation et configuration incluses pour tous les produits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-batobaye-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'Aide pour Choisir ?</h2>
          <p className="text-xl mb-8 text-orange-200">
            Notre équipe d'experts est là pour vous conseiller
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+237672027744">
              <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                <Phone className="w-5 h-5 mr-2" />
                Appelez-nous
              </Button>
            </a>
            <a href="https://wa.me/237672027744" target="_blank" rel="noopener noreferrer">
              <Button className="border-white text-white hover:bg-white hover:text-batobaye-dark">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-batobaye-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BATOBAYE</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre partenaire de confiance pour tous vos besoins en électroménager au Cameroun.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Produits</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Réfrigérateurs</li>
                <li>Congélateurs</li>
                <li>Téléviseurs</li>
                <li>Chauffe-eau</li>
                <li>Cuisinières</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Livraison</li>
                <li>Installation</li>
                <li>Maintenance</li>
                <li>Garantie</li>
                <li>Support client</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +237 672 02 77 44
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@batobaye.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Douala, Cameroun
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Batobaye Market. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 