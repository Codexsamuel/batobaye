"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Search, 
  ShoppingCart, 
  Star, 
  ArrowRight, 
  Package, 
  Truck, 
  Shield, 
  Users, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  X,
  Heart,
  Eye
} from "lucide-react"
import { useState } from "react"

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
    location: "Yaoundé, Centre",
    rating: 5,
    comment: "Livraison rapide et installation professionnelle. Je recommande !",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Pierre Essomba",
    location: "Bafoussam, Ouest",
    rating: 4,
    comment: "Prix compétitifs et produits de qualité. Service client au top.",
    avatar: "/placeholder-user.jpg",
  },
]

const stats = [
  { number: "15,000+", label: "Clients Satisfaits" },
  { number: "50,000+", label: "Produits Vendus" },
  { number: "10+", label: "Années d'Expérience" },
  { number: "24/7", label: "Support Client" },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  // Données de recherche optimisées pour attirer le public
  const searchSuggestions = [
    {
      category: "🔥 Produits Populaires",
      items: [
        { text: "Réfrigérateur Samsung", highlight: "Livraison Gratuite", price: "450,000 FCFA" },
        { text: "Téléviseur LG 55\"", highlight: "Installation Incluse", price: "380,000 FCFA" },
        { text: "Cuisinière 4 Feux", highlight: "Garantie 2 Ans", price: "120,000 FCFA" },
        { text: "Congélateur Side by Side", highlight: "Économie d'Énergie", price: "280,000 FCFA" }
      ]
    },
    {
      category: "⚡ Offres Spéciales",
      items: [
        { text: "Pack Électroménager Complet", highlight: "-30% de Réduction", price: "850,000 FCFA" },
        { text: "Réfrigérateur + Congélateur", highlight: "Offre Limitée", price: "520,000 FCFA" },
        { text: "Téléviseur + Home Cinéma", highlight: "Cadeau Inclus", price: "450,000 FCFA" }
      ]
    },
    {
      category: "🚚 Services Premium",
      items: [
        { text: "Livraison Express 24h", highlight: "Gratuite >100k FCFA", price: "Disponible" },
        { text: "Installation Professionnelle", highlight: "Techniciens Certifiés", price: "Incluse" },
        { text: "Garantie Étendue", highlight: "Jusqu'à 5 Ans", price: "Sur Demande" },
        { text: "Financement 0%", highlight: "12 Mois", price: "Sans Intérêts" }
      ]
    }
  ]

  // Fonction de recherche intelligente
  const handleSearch = (query: string) => {
    setSearchTerm(query)
    
    if (query.length > 2) {
      // Recherche dans les produits
      const results = featuredProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      
      // Ajouter des suggestions basées sur la recherche
      const suggestions = searchSuggestions.flatMap(cat => 
        cat.items.filter(item => 
          item.text.toLowerCase().includes(query.toLowerCase())
        )
      )
      
      setSearchResults([...results, ...suggestions])
      setShowSearchSuggestions(true)
    } else {
      setSearchResults([])
      setShowSearchSuggestions(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  // Fermer les suggestions quand on clique ailleurs
  const handleClickOutside = () => {
    setTimeout(() => setShowSearchSuggestions(false), 200)
  }

  return (
    <div className="min-h-screen bg-white" onClick={handleClickOutside}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center mr-12">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/images/BATOBAYE LOGO.jpeg" 
                    alt="Batobatye Lolo Logo" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-bold text-batobaye-dark">BATOBAYE</span>
              </Link>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-batobaye-dark hover:text-batobaye-primary font-medium">
                Accueil
              </Link>
              <Link href="/products" className="text-gray-600 hover:text-batobaye-primary font-medium">
                Produits
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-batobaye-primary font-medium">
                À Propos
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-batobaye-primary font-medium">
                Contact
              </Link>
            </nav>

            {/* Search Bar Avancée */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Input
                  placeholder="🔍 Rechercher réfrigérateurs, téléviseurs, cuisinières..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="pl-10 pr-10 bg-white border-2 border-gray-200 focus:border-batobaye-primary focus:ring-2 focus:ring-batobaye-primary/20 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSearchResults([])
                      setShowSearchSuggestions(false)
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
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
                                <Package className="w-5 h-5 text-batobaye-primary" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{result.name || result.text}</div>
                                <div className="text-xs text-batobaye-primary font-semibold">
                                  {result.highlight || `${result.category} • ${result.inStock ? 'En Stock' : 'Rupture'}`}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-batobaye-dark">
                                {result.price || formatPrice(result.originalPrice)}
                              </div>
                              {result.discount && (
                                <div className="text-xs text-green-600 font-semibold">-{result.discount}%</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Aucun résultat
                      <div className="p-4 text-center">
                        <div className="text-gray-500 mb-2">😕 Aucun résultat trouvé</div>
                        <div className="text-sm text-gray-400">Essayez avec d'autres mots-clés</div>
                        <div className="mt-3 space-y-1">
                          <div className="text-xs text-batobaye-primary">💡 Suggestions :</div>
                          <div className="text-xs text-gray-500">réfrigérateur, téléviseur, cuisinière, congélateur</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <Button className="bg-batobaye-primary hover:bg-batobaye-light text-white">
                Se Connecter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="text-batobaye-dark hover:text-batobaye-primary font-medium">
                  Accueil
                </Link>
                <Link href="/products" className="text-gray-600 hover:text-batobaye-primary font-medium">
                  Produits
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-batobaye-primary font-medium">
                  À Propos
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-batobaye-primary font-medium">
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-batobaye-primary to-batobaye-light text-batobaye-text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-batobaye-text-light">
                Votre Partenaire Électroménager
                <span className="block text-batobaye-text-light">de Confiance</span>
              </h1>
              <p className="text-lg mb-8 text-batobaye-text-light opacity-90">
                Découvrez notre large gamme de produits électroménagers de qualité. 
                Livraison gratuite et installation professionnelle dans tout le Cameroun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-batobaye-text-light text-batobaye-primary hover:bg-gray-100">
                  Voir Nos Produits
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-batobaye-text-light text-batobaye-text-light hover:bg-batobaye-text-light hover:text-batobaye-primary">
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Barre de Recherche Hero */}
              <div className="bg-white/95 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                <div className="text-center mb-6">
                  <Search className="w-12 h-12 mx-auto mb-4 text-batobaye-primary" />
                  <h3 className="text-2xl font-bold mb-2 text-batobaye-dark">Trouvez Votre Électroménager</h3>
                  <p className="text-gray-600">Recherche intelligente avec les meilleures offres</p>
                </div>
                
                {/* Barre de recherche hero */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="🔍 Que cherchez-vous ? (réfrigérateur, téléviseur, cuisinière...)"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowSearchSuggestions(true)}
                    className="pl-12 pr-12 py-4 text-lg bg-white border-2 border-batobaye-primary focus:ring-2 focus:ring-batobaye-primary/20"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setSearchResults([])
                        setShowSearchSuggestions(false)
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Mots-clés populaires */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Réfrigérateur', 'Téléviseur', 'Cuisinière', 'Congélateur', 'Chauffe-eau'].map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => handleSearch(keyword)}
                      className="px-3 py-1 bg-batobaye-primary/10 text-batobaye-primary rounded-full text-sm font-medium hover:bg-batobaye-primary hover:text-white transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>

                {/* Avantages rapides */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="text-sm font-semibold text-gray-900">Livraison Gratuite</div>
                    <div className="text-xs text-gray-600">{'>'}100k FCFA</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-sm font-semibold text-gray-900">Garantie 2 Ans</div>
                    <div className="text-xs text-gray-600">Incluse</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-batobaye-dark mb-4">
              Explorez Nos Catégories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trouvez facilement ce que vous cherchez parmi nos catégories spécialisées
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className={`${category.color} hover:shadow-lg transition-all duration-300 cursor-pointer border-0`}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-batobaye-dark mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} produits</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-batobaye-dark mb-2">
                Produits Vedettes
              </h2>
              <p className="text-gray-600">Nos produits les plus populaires et les mieux notés</p>
            </div>
            <Button variant="outline" className="border-batobaye-primary text-batobaye-primary hover:bg-batobaye-primary hover:text-white">
              Voir Tout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400" />
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
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-batobaye-dark mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
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
                    <Button className="w-full bg-batobaye-primary hover:bg-batobaye-light text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter au Panier
                    </Button>
                  </div>
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
              <Button size="lg" className="bg-batobaye-primary hover:bg-batobaye-light text-batobaye-text-light">
                Commencer les Achats
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-batobaye-text-light text-batobaye-text-light hover:bg-batobaye-text-light hover:text-batobaye-dark">
              Nous Contacter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-batobaye-dark text-batobaye-text-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/images/BATOBAYE LOGO.jpeg" 
                    alt="Batobatye Lolo Logo" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold">BATOBAYE</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre partenaire électroménager de confiance au Cameroun depuis plus de 10 ans.
              </p>
                              <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-batobaye-text-light">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-batobaye-text-light">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-batobaye-text-light">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-batobaye-text-light">
                    <Youtube className="w-4 h-4" />
                  </Button>
                </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produits</h3>
                              <ul className="space-y-2 text-gray-400">
                  <li><Link href="#" className="hover:text-batobaye-text-light">Réfrigérateurs</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Congélateurs</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Téléviseurs</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Chauffe-eau</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Cuisinières</Link></li>
                </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
                              <ul className="space-y-2 text-gray-400">
                  <li><Link href="/contact" className="hover:text-batobaye-text-light">Contact</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Livraison</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Installation</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">Garantie</Link></li>
                  <li><Link href="#" className="hover:text-batobaye-text-light">FAQ</Link></li>
                </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+237 672 02 77 44</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>contact@batobaye.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Douala, Cameroun</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Batobaye. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
