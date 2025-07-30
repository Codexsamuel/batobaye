"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockProducts = [
  { id: 1, name: "iPhone 15 Pro Max", category: "Smartphones", price: 1299000 },
  { id: 2, name: "Samsung Galaxy S24", category: "Smartphones", price: 899000 },
  { id: 3, name: "MacBook Air M3", category: "Informatique", price: 1199000 },
  { id: 4, name: "iPad Pro", category: "Informatique", price: 799000 },
  { id: 5, name: "AirPods Pro", category: "Audio", price: 299000 },
]

interface SearchBarProps {
  onClose?: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof mockProducts>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (query.length > 2) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleClose = () => {
    setQuery("")
    setIsOpen(false)
    onClose?.()
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

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-gray-700 bg-gray-800">
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="p-4 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{product.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                        <span className="text-batobaye-primary font-semibold">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isOpen && results.length === 0 && query.length > 2 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-gray-700 bg-gray-800">
          <CardContent className="p-4 text-center">
            <p className="text-gray-400">Aucun produit trouvé pour "{query}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
