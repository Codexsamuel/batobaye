"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, TrendingUp, Clock, Star, Package, Zap } from "lucide-react"
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
    trending: true,
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
    trending: false,
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
    trending: true,
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
    trending: false,
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
    trending: true,
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
    trending: false,
    discount: 11,
  },
]

const recentSearches = ["Réfrigérateur", "TV Samsung", "Congélateur", "Chauffe-eau"]
const trendingSearches = ["Réfrigérateur Brigo 350L", "TV Samsung QLED", "Cuisinière Samsung"]

interface EnhancedSearchBarProps {
  onClose?: () => void
}

export function EnhancedSearchBar({ onClose }: EnhancedSearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof realProducts>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 0) {
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
      setIsOpen(isFocused)
      setIsLoading(false)
    }
  }, [query, isFocused])

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
    setIsFocused(false)
    setSelectedIndex(-1)
    onClose?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault()
      // Naviguer vers le produit sélectionné
      const selectedProduct = results[selectedIndex]
      window.location.href = `/products/${selectedProduct.id}`
    } else if (e.key === "Escape") {
      handleClose()
    }
  }

  const handleProductClick = (productId: number) => {
    window.location.href = `/products/${productId}`
    handleClose()
  }

  return (
    <div className="relative w-full max-w-md">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: isFocused ? 360 : 0 }}
          transition={{ duration: 0.6 }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
        >
          <Search className="text-gray-400 w-4 h-4" />
        </motion.div>

        <Input
          ref={inputRef}
          type="text"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-batobaye-primary focus:border-batobaye-primary transition-all duration-300 rounded-full"
        />

        <AnimatePresence>
          {(query || isFocused) && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-0">
                {query.length === 0 && (
                  <div className="p-4">
                    {/* Recent Searches */}
                    <div className="mb-4">
                      <div className="flex items-center mb-3">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Recherches récentes</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search, index) => (
                          <motion.button
                            key={search}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setQuery(search)}
                            className="px-3 py-1 bg-gray-100 hover:bg-batobaye-primary/10 text-gray-600 hover:text-batobaye-primary rounded-full text-sm transition-all duration-200"
                          >
                            {search}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Trending Searches */}
                    <div>
                      <div className="flex items-center mb-3">
                        <TrendingUp className="w-4 h-4 text-batobaye-primary mr-2" />
                        <span className="text-sm font-medium text-gray-700">Produits populaires</span>
                      </div>
                      <div className="space-y-2">
                        {trendingSearches.map((search, index) => (
                          <motion.button
                            key={search}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5, backgroundColor: "rgba(255, 160, 0, 0.1)" }}
                            onClick={() => setQuery(search)}
                            className="w-full flex items-center justify-between p-2 hover:bg-batobaye-primary/5 rounded-lg text-left transition-all duration-200"
                          >
                            <span className="text-gray-700">{search}</span>
                            <TrendingUp className="w-3 h-3 text-batobaye-primary" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-8 h-8 border-2 border-batobaye-primary/20 border-t-batobaye-primary rounded-full mx-auto mb-3"
                    />
                    <p className="text-gray-500 text-sm">Recherche en cours...</p>
                  </motion.div>
                )}

                {!isLoading && results.length > 0 && (
                  <div className="max-h-80 overflow-y-auto">
                    {results.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: "rgba(255, 160, 0, 0.05)", x: 5 }}
                        onClick={() => handleProductClick(product.id)}
                        className={`p-4 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-200 ${
                          selectedIndex === index ? "bg-batobaye-primary/10" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-gray-800 font-medium">{product.name}</h4>
                              {product.trending && (
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs">
                                    🔥 Populaire
                                  </Badge>
                                </motion.div>
                              )}
                              {product.discount > 0 && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  -{product.discount}%
                                </Badge>
                              )}
                              {!product.inStock && (
                                <Badge className="text-xs">
                                  Rupture
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className="text-xs">
                                {product.category}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">{product.rating}</span>
                                <span className="text-xs text-gray-400">({product.reviews})</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-batobaye-primary font-semibold">{formatPrice(product.price)}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through text-sm">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 bg-batobaye-primary/10 rounded-full flex items-center justify-center"
                          >
                            <Package className="w-4 h-4 text-batobaye-primary" />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {!isLoading && query.length > 2 && results.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 text-center">
                    <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun produit trouvé pour "{query}"</p>
                    <p className="text-sm text-gray-400 mt-1">Essayez avec d'autres mots-clés</p>
                    <div className="mt-4">
                      <Link
                        href="/products"
                        className="inline-flex items-center px-4 py-2 bg-batobaye-primary text-white rounded-lg hover:bg-batobaye-primary/90 transition-colors"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Voir tous les produits
                      </Link>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
