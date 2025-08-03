"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Package,
  Star,
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
  ArrowLeft,
  Star as StarFilled,
} from "lucide-react"
import Link from "next/link"
import ProductSchema from "@/components/ProductSchema"
import WhatsAppBuyModal from "@/components/WhatsAppBuyModal"
import ProductActionButtons from "@/components/ProductActionButtons"

// Types pour le produit
interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  category: string
  rating: number
  reviews: number
  inStock: boolean
  image: string
  images?: string[]
  features: string[]
  description: string
  brand?: string
  sku?: string
  specifications?: Record<string, string>
  warranty?: string
  delivery?: string
}

// Mock data pour les produits (à remplacer par l'API)
const mockProducts: Product[] = [
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
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    features: ["No Frost", "Économie d'énergie", "Grande capacité"],
    description: "Réfrigérateur moderne avec technologie No Frost pour une conservation optimale de vos aliments. Capacité de 350 litres avec compartiment congélateur intégré.",
    brand: "Brigo",
    sku: "REF-BRIGO-350",
    specifications: {
      "Capacité": "350L",
      "Type": "No Frost",
      "Classe énergétique": "A+",
      "Dimensions": "60 x 70 x 180 cm",
      "Couleur": "Blanc"
    },
    warranty: "2 ans",
    delivery: "Livraison gratuite sous 24h"
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
    images: ["/placeholder.svg", "/placeholder.svg"],
    features: ["Congélation rapide", "Économie d'énergie", "Facile à nettoyer"],
    description: "Congélateur performant pour conserver vos aliments sur le long terme. Idéal pour les familles nombreuses.",
    brand: "Hisense",
    sku: "CONG-HIS-200",
    specifications: {
      "Capacité": "200L",
      "Type": "Armoire",
      "Classe énergétique": "A",
      "Dimensions": "55 x 60 x 85 cm",
      "Couleur": "Blanc"
    },
    warranty: "2 ans",
    delivery: "Livraison gratuite sous 24h"
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
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    features: ["4K Ultra HD", "Smart TV", "HDR"],
    description: "Téléviseur haute définition avec technologie QLED pour une expérience visuelle exceptionnelle.",
    brand: "Samsung",
    sku: "TV-SAM-55-QLED",
    specifications: {
      "Taille d'écran": "55 pouces",
      "Résolution": "4K Ultra HD",
      "Technologie": "QLED",
      "Smart TV": "Oui",
      "Ports HDMI": "4"
    },
    warranty: "2 ans",
    delivery: "Livraison gratuite sous 24h"
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${productId}`)
        const data = await response.json()
        
        if (data.success) {
          setProduct(data.data)
        } else {
          // Utiliser les données mockées en cas d'erreur
          const mockProduct = mockProducts.find(p => p.id === productId)
          if (mockProduct) {
            setProduct(mockProduct)
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error)
        // Utiliser les données mockées en cas d'erreur
        const mockProduct = mockProducts.find(p => p.id === productId)
        if (mockProduct) {
          setProduct(mockProduct)
        }
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-batobaye-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produit non trouvé</h1>
          <p className="text-gray-600 mb-4">Le produit que vous recherchez n'existe pas.</p>
          <Link href="/products">
            <Button className="bg-batobaye-primary hover:bg-batobaye-light">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux produits
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0

  return (
    <>
      {/* Balisage JSON-LD Schema.org */}
      <ProductSchema product={product} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/products">
                  <Button size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="w-10 h-10 bg-batobaye-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-batobaye-dark">BATOBAYE</h1>
                  <p className="text-sm text-gray-600">Market</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <nav className="hidden md:flex space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-batobaye-primary">
                    Accueil
                  </Link>
                  <Link href="/products" className="text-batobaye-primary font-semibold">
                    Produits
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-batobaye-primary">
                    À propos
                  </Link>
                  <Link href="/contact" className="text-gray-700 hover:text-batobaye-primary">
                    Contact
                  </Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <Button size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    +237 672 02 77 44
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-batobaye-primary">Accueil</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-batobaye-primary">Produits</Link>
              <span className="mx-2">/</span>
              <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-batobaye-primary">
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="w-32 h-32 text-gray-400" />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-gray-200 rounded-lg flex items-center justify-center ${
                        selectedImage === index ? 'ring-2 ring-batobaye-primary' : ''
                      }`}
                    >
                      <Package className="w-8 h-8 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category and Brand */}
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{product.category}</Badge>
                {product.brand && (
                  <Badge variant="outline">{product.brand}</Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white">-{discount}%</Badge>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} avis)
                  </span>
                </div>
                <Link href="#reviews" className="text-sm text-batobaye-primary hover:underline">
                  Voir tous les avis
                </Link>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <p className="text-3xl font-bold text-batobaye-primary">
                    {formatPrice(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-xl text-gray-500 line-through">
                      {formatPrice(product.oldPrice)}
                    </p>
                  )}
                </div>
                {product.sku && (
                  <p className="text-sm text-gray-600">Référence: {product.sku}</p>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {product.inStock ? 'En stock' : 'Sur commande'}
                </span>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Caractéristiques</h3>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantité:</label>
                  <div className="flex items-center border rounded-lg">
                    <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2">{quantity}</span>
                    <Button onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <ProductActionButtons 
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      category: product.category,
                      stock: product.inStock ? 10 : 0
                    }}
                    layout="dropdown"
                    className="flex-1"
                  />
                  <Button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 p-2">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Delivery and Warranty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-batobaye-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Livraison gratuite</p>
                    <p className="text-sm text-gray-600">Sous 24-48h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-batobaye-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Garantie {product.warranty}</p>
                    <p className="text-sm text-gray-600">Installation incluse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                <TabsTrigger value="reviews">Avis ({product.reviews})</TabsTrigger>
                <TabsTrigger value="delivery">Livraison</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    {product.specifications ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                            <span className="font-medium text-gray-700">{key}</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">Aucune spécification disponible</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Avis clients</h3>
                        <p className="text-gray-600">{product.reviews} avis</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-batobaye-primary">{product.rating}</div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock reviews */}
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < 4 ? "fill-current" : ""}`}
                                  />
                                ))}
                              </div>
                              <span className="font-medium">Client satisfait</span>
                            </div>
                            <span className="text-sm text-gray-500">Il y a 2 semaines</span>
                          </div>
                          <p className="text-gray-700">
                            Excellent produit, livraison rapide et installation professionnelle. Je recommande vivement !
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="delivery" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Livraison gratuite</h4>
                        <p className="text-gray-600">Livraison gratuite dans tout le Cameroun sous 24-48h pour les commandes supérieures à 100,000 FCFA.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Installation incluse</h4>
                        <p className="text-gray-600">Installation et configuration professionnelles incluses pour tous les produits.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Garantie 2 ans</h4>
                        <p className="text-gray-600">Tous nos produits bénéficient d'une garantie de 2 ans avec support technique.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 bg-batobaye-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'Aide ?</h2>
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
      </div>
    </>
  )
} 