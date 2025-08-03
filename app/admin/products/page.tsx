"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  TrendingUp,
  TrendingDown,
  Star,
  ShoppingCart,
  DollarSign,
  RefreshCw
} from 'lucide-react'

export default function ProductsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Charger les produits depuis l'API
  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data)
      } else {
        setError('Erreur lors du chargement des produits')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setError('Erreur lors du chargement des produits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Supprimer un produit
  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Recharger les produits
        loadProducts()
      } else {
        alert('Erreur lors de la suppression du produit')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression du produit')
    }
  }

  const mockProducts = [
    {
      id: 1,
      name: 'Réfrigérateur Samsung 350L',
      category: 'Réfrigérateurs',
      price: 450000,
      originalPrice: 520000,
      stock: 15,
      sales: 156,
      rating: 4.8,
      reviews: 203,
      status: 'active',
      image: '/images/placeholder.jpg'
    },
    {
      id: 2,
      name: 'TV Samsung 55" QLED',
      category: 'Téléviseurs',
      price: 380000,
      originalPrice: 450000,
      stock: 8,
      sales: 89,
      rating: 4.9,
      reviews: 156,
      status: 'active',
      image: '/images/placeholder.jpg'
    },
    {
      id: 3,
      name: 'Cuisinière 4 feux + Four',
      category: 'Cuisinières',
      price: 180000,
      originalPrice: 220000,
      stock: 0,
      sales: 234,
      rating: 4.7,
      reviews: 78,
      status: 'out_of_stock',
      image: '/images/placeholder.jpg'
    },
    {
      id: 4,
      name: 'Congélateur Hisense 200L',
      category: 'Congélateurs',
      price: 320000,
      originalPrice: 380000,
      stock: 12,
      sales: 67,
      rating: 4.6,
      reviews: 89,
      status: 'active',
      image: '/images/placeholder.jpg'
    },
    {
      id: 5,
      name: 'Chauffe-eau Ariston 100L',
      category: 'Chauffe-eau',
      price: 85000,
      originalPrice: 95000,
      stock: 25,
      sales: 189,
      rating: 4.5,
      reviews: 203,
      status: 'active',
      image: '/images/placeholder.jpg'
    },
    {
      id: 6,
      name: 'Lave-linge 8kg',
      category: 'Lave-linge',
      price: 250000,
      originalPrice: 280000,
      stock: 6,
      sales: 92,
      rating: 4.4,
      reviews: 92,
      status: 'active',
      image: '/images/placeholder.jpg'
    }
  ]

  const categories = [
    { id: 'all', name: 'Toutes les catégories', count: products.length },
    { id: 'refrigerateurs', name: 'Réfrigérateurs', count: products.filter(p => p.category === 'Réfrigérateurs').length },
    { id: 'televiseurs', name: 'Téléviseurs', count: products.filter(p => p.category === 'Téléviseurs').length },
    { id: 'cuisinieres', name: 'Cuisinières', count: products.filter(p => p.category === 'Cuisinières').length },
    { id: 'congelateurs', name: 'Congélateurs', count: products.filter(p => p.category === 'Congélateurs').length },
    { id: 'chauffe-eau', name: 'Chauffe-eau', count: products.filter(p => p.category === 'Chauffe-eau').length },
    { id: 'lave-linge', name: 'Lave-linge', count: products.filter(p => p.category === 'Lave-linge').length }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">En stock</Badge>
      case 'out_of_stock':
        return <Badge className="bg-red-100 text-red-800">Rupture</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Brouillon</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getDiscountPercentage = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark flex items-center">
            <Package className="w-8 h-8 mr-3 text-orange-500" />
            Gestion des Produits
          </h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadProducts}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            onClick={() => router.push('/admin/products/new')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouveau Produit
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Produits</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.sales, 0).toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+8.5%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(products.reduce((sum, p) => sum + (p.price * p.sales), 0) / 1000000).toFixed(1)}M FCFA
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+15.2%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+0.3</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres et Recherche</CardTitle>
          <CardDescription>Trouvez rapidement vos produits</CardDescription>
        </CardHeader>
        <CardContent>
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
            <div className="flex gap-2">
              <Button className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
              <Button variant="outline">
                Trier
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
              >
                {category.name}
                <Badge className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{product.category}</Badge>
                {getStatusBadge(product.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Product Image */}
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-batobaye-primary">
                      {product.price.toLocaleString()} FCFA
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()} FCFA
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  {product.originalPrice > product.price && (
                    <Badge className="bg-red-100 text-red-800 mb-2">
                      -{getDiscountPercentage(product.price, product.originalPrice)}%
                    </Badge>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{product.rating}</span>
                      <span className="text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <ShoppingCart className="w-4 h-4 text-blue-500 mr-1" />
                      <span>{product.sales} ventes</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-green-500 mr-1" />
                      <span>{product.stock} en stock</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                      <span>+12.5%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 mt-4">
                    <Button className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                    <Button className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Modifier
                    </Button>
                    <Button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500 mb-4">
              Aucun produit ne correspond à vos critères de recherche.
            </p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 