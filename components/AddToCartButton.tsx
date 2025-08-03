"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Check, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AddToCartButtonProps {
  productId: number
  productName: string
  price: number
  stock: number
  onAddToCart?: (productId: number, quantity: number) => void
  className?: string
}

export default function AddToCartButton({
  productId,
  productName,
  price,
  stock,
  onAddToCart,
  className = ""
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (stock === 0) {
      toast({
        title: "Stock épuisé",
        description: "Ce produit n'est plus disponible en stock.",
        variant: "destructive",
      })
      return
    }

    setIsAdding(true)
    
    try {
      // Simulation d'un délai d'ajout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Appeler la fonction de callback
      onAddToCart?.(productId, quantity)
      
      // Toast de succès
      toast({
        title: "Produit ajouté !",
        description: `${productName} (${quantity}x) a été ajouté au panier avec succès.`,
        variant: "default",
      })
      
      setIsAdding(false)
      setIsAdded(true)
      
      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setIsAdded(false)
        setQuantity(1)
      }, 2000)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout au panier",
        variant: "destructive",
      })
      setIsAdding(false)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity)
    }
  }

  if (stock === 0) {
    return (
      <div className={`flex items-center justify-center p-3 bg-gray-100 rounded-lg ${className}`}>
        <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
        <span className="text-sm text-gray-600">Rupture de stock</span>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Contrôles de quantité */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Quantité:</span>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-8 p-0"
          >
            -
          </Button>
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>
          <Button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= stock}
            className="w-8 h-8 p-0"
          >
            +
          </Button>
        </div>
      </div>

      {/* Stock disponible */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Stock disponible:</span>
        <Badge className={stock < 5 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
          {stock} en stock
        </Badge>
      </div>

      {/* Bouton d'ajout */}
      <Button
        onClick={handleAddToCart}
        disabled={isAdding || isAdded || stock === 0}
        className={`w-full ${
          isAdded 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
      >
        {isAdding ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Ajout en cours...
          </div>
        ) : isAdded ? (
          <div className="flex items-center">
            <Check className="w-4 h-4 mr-2" />
            Ajouté au panier !
          </div>
        ) : (
          <div className="flex items-center">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ajouter au panier
          </div>
        )}
      </Button>

      {/* Prix total */}
      <div className="text-center">
        <span className="text-sm text-gray-600">Total: </span>
        <span className="font-semibold text-lg">
          {(price * quantity).toLocaleString()} FCFA
        </span>
      </div>

      {/* Avertissement stock faible */}
      {stock < 5 && stock > 0 && (
        <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center text-sm text-yellow-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Stock limité - Plus que {stock} disponible{stock > 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  )
} 