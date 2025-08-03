"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import ProductActionButtons from "@/components/ProductActionButtons"
import ContactInfo from "@/components/ContactInfo"
import DLSolutionsBadge from "@/components/DLSolutionsBadge"

const featuredProducts = [
  {
    id: 1,
    name: "Réfrigérateur Brigo 350L",
    price: 450000,
    originalPrice: 520000,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 124,
    category: "Réfrigérateurs",
    discount: 13,
    inStock: true,
  },
  {
    id: 2,
    name: "Congélateur Hisense 200L",
    price: 320000,
    originalPrice: 380000,
    image: "/placeholder.svg",
    rating: 4.6,
    reviews: 89,
    category: "Congélateurs",
    discount: 16,
    inStock: true,
  },
  {
    id: 3,
    name: 'TV Samsung 55" QLED',
    price: 380000,
    originalPrice: 450000,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 156,
    category: "Téléviseurs",
    discount: 15,
    inStock: true,
  },
  {
    id: 4,
    name: "Chauffe-eau Ariston 100L",
    price: 85000,
    originalPrice: 95000,
    image: "/placeholder.svg",
    rating: 4.7,
    reviews: 203,
    category: "Chauffe-eau",
    discount: 11,
    inStock: false,
  },
]

const categories = [
  { name: "Réfrigérateurs", icon: "❄️", count: 156, color: "bg-blue-50" },
  { name: "Congélateurs", icon: "🧊", count: 89, color: "bg-cyan-50" },
  { name: "Téléviseurs", icon: "📺", count: 234, color: "bg-purple-50" },
  { name: "Chauffe-eau", icon: "🔥", count: 67, color: "bg-orange-50" },
  { name: "Cuisinières", icon: "🍳", count: 123, color: "bg-red-50" },
  { name: "Lave-linge", icon: "👕", count: 78, color: "bg-green-50" },
]

const testimonials = [
  {
    name: "Jean Mbarga",
    location: "Douala, Akwa",
    rating: 5,
    comment: "Excellent service ! Mon réfrigérateur Brigo fonctionne parfaitement depuis 2 ans.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Marie Nguemo",
    location: "Douala, Akwa",
    rating: 5,
    comment: "Livraison rapide et installation professionnelle. Je recommande !",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Pierre Essomba",
    location: "Douala, Akwa",
    rating: 5,
    comment: "Prix compétitifs et qualité garantie. Service client exceptionnel.",
    avatar: "/placeholder-user.jpg",
  },
]

const stats = [
  { number: "5000+", label: "Clients Satisfaits" },
  { number: "1000+", label: "Produits Livrés" },
  { number: "24/7", label: "Support Client" },
  { number: "2 Ans", label: "Garantie" },
]

const searchSuggestions = [
  {
    category: "Réfrigérateurs",
    items: [
      { text: "Réfrigérateur Brigo 350L", highlight: "350L - No Frost", price: "450 000 FCFA" },
      { text: "Réfrigérateur Samsung 400L", highlight: "400L - Side by Side", price: "520 000 FCFA" },
    ]
  },
  {
    category: "Téléviseurs",
    items: [
      { text: "TV Samsung 55\" QLED", highlight: "4K - Smart TV", price: "380 000 FCFA" },
      { text: "TV LG 65\" OLED", highlight: "4K - OLED", price: "650 000 FCFA" },
    ]
  },
  {
    category: "Cuisinières",
    items: [
      { text: "Cuisinière 4 feux + Four", highlight: "Gaz - Électrique", price: "180 000 FCFA" },
      { text: "Cuisinière 6 feux + Four", highlight: "Gaz - Électrique", price: "220 000 FCFA" },
    ]
  }
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // Charger le nombre d'articles dans le panier
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cartData = localStorage.getItem('batobaye_cart')
        if (cartData) {
          const cart = JSON.parse(cartData)
          setCartCount(cart.itemCount || 0)
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du panier:', error)
      }
    }

    // Écouter les changements du localStorage
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        try {
          const cartData = localStorage.getItem('batobaye_cart')
          if (cartData) {
            const cart = JSON.parse(cartData)
            setCartCount(cart.itemCount || 0)
          }
        } catch (error) {
          console.error('Erreur lors de la lecture du panier:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleSearch = (query: string) => {
    setSearchTerm(query)
    
    if (query.length === 0) {
      setSearchResults([])
      return
    }

    // Recherche simple dans les produits vedettes
    const results = featuredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    )

    setSearchResults(results)
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        {i < rating ? '⭐' : '☆'}
      </span>
    ))
  }

  const handleClickOutside = () => {
    setShowSearchSuggestions(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo - Réduit */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/images/BATOBAYE LOGO.jpeg" 
                    alt="Batobatye Lolo Logo" 
                    width={40} 
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-bold text-batobaye-dark">BATOBAYE</span>
              </Link>
            </div>

            {/* Navigation Desktop - Optimisée avec meilleur espacement */}
            <nav className="hidden lg:flex items-center space-x-6 ml-6">
              <Link href="/" className="text-sm text-batobaye-dark hover:text-batobaye-primary font-medium transition-colors duration-200">
                Accueil
              </Link>
              <Link href="/products" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors duration-200">
                Produits
              </Link>
              <Link href="/about" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors duration-200">
                À Propos
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors duration-200">
                Contact
              </Link>
              <Link href="/services-developpement" className="text-sm text-batobaye-primary hover:text-batobaye-dark font-semibold transition-colors duration-200">
                Services DL Solutions
              </Link>
              <Link href="/cart" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors duration-200">
                🛒 Panier
              </Link>
              <Link href="/orders" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors duration-200">
                📦 Commandes
              </Link>
            </nav>

            {/* Search Bar Avancée - Modernisée avec meilleur design */}
            <div className="hidden md:flex items-center space-x-3 flex-1 max-w-md mx-6">
              <div className="relative w-full group">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10 group-focus-within:text-batobaye-primary transition-colors duration-200">🔍</span>
                <Input
                  placeholder="🔍 Rechercher produits..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-12 pr-12 bg-white/95 backdrop-blur-sm border-2 border-gray-200 focus:border-batobaye-primary focus:ring-4 focus:ring-batobaye-primary/10 transition-all duration-300 text-sm rounded-xl shadow-sm hover:shadow-md focus:shadow-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSearchResults([])
                      setShowSearchSuggestions(false)
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:scale-110 transition-all duration-200"
                  >
                    ✕
                  </button>
                )}
                
                {/* Suggestions de Recherche */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-batobaye-primary rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {searchTerm.length === 0 ? (
                      // Suggestions par défaut
                      <div className="p-4">
                        <div className="text-sm font-semibold text-gray-500 mb-3">💡 Suggestions populaires</div>
                        {searchSuggestions.map((category, catIndex) => (
                          <div key={catIndex} className="mb-4">
                            <div className="text-xs font-bold text-batobaye-primary mb-2">{category.category}</div>
                            {category.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                onClick={() => {
                                  setSearchTerm(item.text)
                                  setShowSearchSuggestions(false)
                                }}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900">{item.text}</div>
                                  <div className="text-xs text-batobaye-primary font-semibold">{item.highlight}</div>
                                </div>
                                <div className="text-sm font-bold text-batobaye-dark">{item.price}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ) : searchResults.length > 0 ? (
                      // Résultats de recherche
                      <div className="p-4">
                        <div className="text-sm font-semibold text-gray-500 mb-3">
                          🔍 Résultats pour "{searchTerm}" ({searchResults.length})
                        </div>
                        {searchResults.map((result, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSearchTerm(result.name || result.text)
                              setShowSearchSuggestions(false)
                            }}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded cursor-pointer transition-colors border-b border-gray-100"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-batobaye-primary/10 rounded-lg flex items-center justify-center">
                                📦
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{result.name}</div>
                                <div className="text-sm text-batobaye-primary font-semibold">{result.category}</div>
                              </div>
                            </div>
                            <div className="text-sm font-bold text-batobaye-dark">
                              {formatPrice(result.price)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Aucun résultat
                      <div className="p-4 text-center text-gray-500">
                        <span className="text-2xl mb-2 block">📦</span>
                        <div>Aucun produit trouvé pour "{searchTerm}"</div>
                        <div className="text-sm">Essayez avec d'autres mots-clés</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions - Modernisées avec animations */}
            <div className="flex items-center space-x-3">
              <Link href="/cart" className="relative group">
                <Button className="relative px-4 py-2 text-sm bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-batobaye-primary transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
                  🛒
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white animate-pulse">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/admin/register">
                  <Button className="border-2 border-batobaye-primary text-batobaye-primary hover:bg-batobaye-primary hover:text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md font-medium">
                    S'inscrire
                  </Button>
                </Link>
                <Link href="/admin/login">
                  <Button className="bg-batobaye-primary hover:bg-batobaye-light text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md font-medium">
                    Se Connecter
                  </Button>
                </Link>
              </div>
              <Button
                className="lg:hidden px-3 py-2 text-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? '✕' : '☰'}
              </Button>
            </div>
          </div>

          {/* Mobile Menu - Optimisé */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="text-sm text-batobaye-dark hover:text-batobaye-primary font-medium transition-colors">
                  Accueil
                </Link>
                <Link href="/products" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors">
                  Produits
                </Link>
                <Link href="/about" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors">
                  À Propos
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors">
                  Contact
                </Link>
                <Link href="/cart" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors">
                  🛒 Panier
                </Link>
                <Link href="/orders" className="text-sm text-gray-600 hover:text-batobaye-primary font-medium transition-colors">
                  📦 Commandes
                </Link>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <Link href="/admin/register">
                      <Button className="w-full border-batobaye-primary text-batobaye-primary hover:bg-batobaye-primary hover:text-white text-sm py-2">
                        S'inscrire
                      </Button>
                    </Link>
                    <Link href="/admin/login">
                      <Button className="w-full bg-batobaye-primary hover:bg-batobaye-light text-white text-sm py-2">
                        Se Connecter
                      </Button>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Améliorée avec meilleur contraste et animations */}
      <section className="bg-gradient-to-br from-batobaye-primary via-orange-500 to-batobaye-light text-white relative overflow-hidden">
        {/* Effet de fond animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                Votre Partenaire Électroménager
                <span className="block text-white/95">de Confiance</span>
              </h1>
              <p className="text-xl mb-8 text-white/90 leading-relaxed">
                Découvrez notre large gamme de produits électroménagers de qualité. 
                Livraison gratuite et installation professionnelle dans tout le Cameroun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="bg-white text-batobaye-primary hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg px-8 py-3 text-lg font-semibold">
                    Voir Nos Produits →
                  </Button>
                </Link>
                <Link href="/about">
                  <Button className="border-2 border-white text-white hover:bg-white hover:text-batobaye-primary transform hover:scale-105 transition-all duration-200 px-8 py-3 text-lg font-semibold">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-up-delayed">
              {/* Barre de Recherche Hero - Modernisée */}
              <div className="bg-white/98 rounded-3xl p-8 backdrop-blur-sm shadow-2xl border border-white/20">
                <div className="text-center mb-6">
                  <span className="text-5xl mb-4 block animate-bounce">🔍</span>
                  <h3 className="text-2xl font-bold mb-2 text-batobaye-dark">Trouvez Votre Électroménager</h3>
                  <p className="text-gray-600">Recherchez parmi des milliers de produits</p>
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="🔍 Que recherchez-vous ?"
                    className="text-lg border-2 border-gray-200 focus:border-batobaye-primary focus:ring-2 focus:ring-batobaye-primary/20 transition-all duration-200"
                  />
                  <Button className="w-full bg-batobaye-primary hover:bg-batobaye-light text-white transform hover:scale-105 transition-all duration-200 py-3 text-lg font-semibold shadow-lg">
                    Rechercher 🔍
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <ContactInfo />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-batobaye-dark mb-4">
              Nos Catégories de Produits
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre large gamme d'électroménagers et d'électronique
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/products?category=${category.name}`}>
                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer border-0 bg-white">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center text-2xl`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-batobaye-dark mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} produits</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-batobaye-dark mb-4">
              Produits Vedettes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos produits les plus populaires et les mieux notés
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-shadow border-0">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        -{product.discount}%
                      </Badge>
                    )}
                    {!product.inStock && (
                      <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
                        Rupture
                      </Badge>
                    )}
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-batobaye-dark mb-2 group-hover:text-batobaye-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-batobaye-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <ProductActionButtons 
                    product={{
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      description: product.name,
                      category: product.category,
                      stock: product.inStock ? 10 : 0
                    }}
                    layout="dropdown"
                    className="w-full"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-batobaye-primary text-batobaye-text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold mb-2 text-batobaye-text-light">{stat.number}</div>
                <div className="text-batobaye-text-light font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-batobaye-dark mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-lg font-semibold text-gray-600">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-batobaye-dark">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-3">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-batobaye-dark text-batobaye-text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer votre maison ?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits qui ont choisi Batobaye Market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-batobaye-primary hover:bg-batobaye-light text-batobaye-text-light">
                Commencer les Achats
                →
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="border-batobaye-text-light text-batobaye-text-light hover:bg-batobaye-text-light hover:text-batobaye-dark">
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Batobaye Market</h3>
              <p className="text-gray-300">
                Votre destination pour l'électroménager et l'électronique de qualité.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/products" className="text-gray-300 hover:text-white">Produits</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-white">À propos</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Service client</Link></li>
                <li><Link href="/orders" className="text-gray-300 hover:text-white">Suivi commande</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Garantie</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>📞 +237 672 027 744</p>
                <p>📍 Douala, Cameroun</p>
                <p>🕒 Lun-Sam: 8h-18h</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Batobaye Market. Tous droits réservés.</p>
            {/* Empreinte digitale DL Solutions */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400">
                🚀 Propulsé par{' '}
                <a 
                  href="https://www.daveandlucesolutions.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                >
                  DL Solutions Sarl
                </a>
                {' '}🇨🇲
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Experts en transformation digitale • Développement web & mobile
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Badge DL Solutions */}
      <DLSolutionsBadge position="bottom-right" variant="floating" />
    </div>
  )
}
