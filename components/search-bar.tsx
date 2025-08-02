"use client"

import { useState, useEffect } from "react"
import { Search, X, Package, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Données réelles des produits Batobaye
const realProducts = [
  {
    id: 1,
    name: "Réfrigérateur Brigo 350L",
    category: "Réfrigérateurs",
    price: 450000,
    originalPrice: 520000,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    discount: 13,
  },
  {
    id: 2,
    name: "Congélateur Hisense 200L",
    category: "Congélateurs",
    price: 320000,
    originalPrice: 380000,
    rating: 4.6,
    reviews: 89,
    inStock: true,
    discount: 16,
  },
  {
    id: 3,
    name: 'TV Samsung 55" QLED',
    category: "Téléviseurs",
    price: 380000,
    originalPrice: 450000,
    rating: 4.9,
    reviews: 156,
    inStock: true,
    discount: 15,
  },
  {
    id: 4,
    name: "Chauffe-eau Ariston 100L",
    category: "Chauffe-eau",
    price: 85000,
    originalPrice: 95000,
    rating: 4.7,
    reviews: 203,
    inStock: false,
    discount: 11,
  },
  {
    id: 5,
    name: "Cuisinière Samsung 4 feux",
    category: "Cuisinières",
    price: 180000,
    originalPrice: 220000,
    rating: 4.5,
    reviews: 67,
    inStock: true,
    discount: 18,
  },
  {
    id: 6,
    name: "Lave-linge LG 8kg",
    category: "Lave-linge",
    price: 250000,
    originalPrice: 280000,
    rating: 4.4,
    reviews: 89,
    inStock: true,
    discount: 11,
  },
]

interface SearchBarProps {
  onClose?: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof realProducts>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      // Simuler un délai de recherche pour une meilleure UX
      const timeoutId = setTimeout(() => {
        const filtered = realProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filtered)
        setIsOpen(true)
        setIsLoading(false)
      }, 150)

      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
      setIsOpen(false)
      setIsLoading(false)
    }
  }, [query])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleClose = () => {
    setQuery("")
    setIsOpen(false)
    onClose?.()
  }

  const handleProductClick = (productId: number) => {
    window.location.href = `/products/${productId}`
    handleClose()
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-batobaye-primary focus:border-batobaye-primary"
        />
        {query && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isLoading && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-gray-700 bg-gray-800">
          <CardContent className="p-4 text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-batobaye-primary mx-auto mb-2"></div>
            <p className="text-gray-400 text-sm">Recherche en cours...</p>
          </CardContent>
        </Card>
      )}

      {!isLoading && isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-gray-700 bg-gray-800">
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium">{product.name}</h4>
                        {product.discount > 0 && (
                          <Badge className="bg-green-500 text-white text-xs">
                            -{product.discount}%
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="destructive" className="text-xs">
                            Rupture
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-400">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-batobaye-primary font-semibold">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-gray-500 line-through text-sm">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-batobaye-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-batobaye-primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && isOpen && results.length === 0 && query.length > 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-gray-700 bg-gray-800">
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">Aucun produit trouvé pour "{query}"</p>
            <div className="mt-3">
              <Link
                href="/products"
                className="inline-flex items-center px-3 py-1 bg-batobaye-primary text-white rounded text-sm hover:bg-batobaye-primary/90 transition-colors"
              >
                Voir tous les produits
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
