"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  Package
} from 'lucide-react'
import Link from 'next/link'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  stock: number
}

interface CartProps {
  items?: CartItem[]
  onUpdateQuantity?: (id: number, quantity: number) => void
  onRemoveItem?: (id: number) => void
  onCheckout?: () => void
  showCheckoutButton?: boolean
}

export default function Cart({ 
  items = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  showCheckoutButton = true 
}: CartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items)

  useEffect(() => {
    setCartItems(items)
  }, [items])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    
    const item = cartItems.find(item => item.id === id)
    if (item && newQuantity > item.stock) return

    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
    
    onUpdateQuantity?.(id, newQuantity)
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    onRemoveItem?.(id)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500000 ? 0 : 15000 // Livraison gratuite au-dessus de 500k
  const tax = subtotal * 0.195 // TVA 19.5%
  const total = subtotal + shipping + tax

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Votre panier est vide</h3>
          <p className="text-gray-500 mb-6">
            Ajoutez des produits à votre panier pour commencer vos achats.
          </p>
          <Button asChild>
            <Link href="/products">
              <Package className="w-4 h-4 mr-2" />
              Découvrir nos produits
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Panier ({itemCount} article{itemCount > 1 ? 's' : ''})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Liste des articles */}
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.price.toLocaleString()} FCFA
                </p>
                {item.quantity > item.stock && (
                  <Badge className="bg-red-100 text-red-800 text-xs mt-1">
                    Stock insuffisant
                  </Badge>
                )}
              </div>
              
              {/* Contrôles de quantité */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="text-right">
                <p className="font-semibold">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </p>
              </div>
              
              <Button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Separator />

        {/* Résumé des coûts */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Sous-total</span>
            <span>{subtotal.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Livraison</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">Gratuit</span>
              ) : (
                `${shipping.toLocaleString()} FCFA`
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>TVA (19.5%)</span>
            <span>{tax.toLocaleString()} FCFA</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{total.toLocaleString()} FCFA</span>
          </div>
        </div>

        {/* Informations supplémentaires */}
        {shipping > 0 && (
          <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
            <p>💡 Livraison gratuite pour les commandes {'>'} 500,000 FCFA</p>
            <p>Il vous manque {(500000 - subtotal).toLocaleString()} FCFA pour la livraison gratuite</p>
          </div>
        )}

        {/* Boutons d'action */}
        {showCheckoutButton && (
          <div className="space-y-2">
            <Button 
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={cartItems.some(item => item.quantity > item.stock)}
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Passer la commande
            </Button>
            <Button asChild className="w-full">
              <Link href="/products">
                Continuer les achats
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 