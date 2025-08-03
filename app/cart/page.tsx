"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
  stock: number
  addedAt: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartState>({ items: [], total: 0, itemCount: 0 })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    // Charger le panier depuis localStorage
    if (typeof window !== 'undefined') {
      try {
        const cartData = localStorage.getItem('batobaye_cart')
        if (cartData) {
          const cart = JSON.parse(cartData)
          setCart(cart)
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du panier:', error)
      }
    }
    setLoading(false)
  }, [])

  const updateQuantity = (productId: string, newQuantity: number) => {
    setUpdating(productId)
    try {
      if (typeof window !== 'undefined') {
        const cartData = localStorage.getItem('batobaye_cart')
        let cart = cartData ? JSON.parse(cartData) : { items: [], total: 0, itemCount: 0 }
        
        const item = cart.items.find((item: CartItem) => item.id === productId)
        
        if (item) {
          if (newQuantity <= 0) {
            cart.items = cart.items.filter((item: CartItem) => item.id !== productId)
          } else if (newQuantity <= item.stock) {
            item.quantity = newQuantity
          } else {
            throw new Error('Quantité supérieure au stock disponible')
          }
        }
        
        // Recalculer le total
        cart.total = cart.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
        cart.itemCount = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
        
        localStorage.setItem('batobaye_cart', JSON.stringify(cart))
        setCart(cart)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error)
      alert(error instanceof Error ? error.message : 'Erreur inconnue')
    } finally {
      setUpdating(null)
    }
  }

  const removeItem = (productId: string) => {
    if (typeof window !== 'undefined') {
      const cartData = localStorage.getItem('batobaye_cart')
      let cart = cartData ? JSON.parse(cartData) : { items: [], total: 0, itemCount: 0 }
      
      cart.items = cart.items.filter((item: CartItem) => item.id !== productId)
      
      // Recalculer le total
      cart.total = cart.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0)
      cart.itemCount = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
      
      localStorage.setItem('batobaye_cart', JSON.stringify(cart))
      setCart(cart)
    }
  }

  const clearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      if (typeof window !== 'undefined') {
        const emptyCart = { items: [], total: 0, itemCount: 0 }
        localStorage.setItem('batobaye_cart', JSON.stringify(emptyCart))
        setCart(emptyCart)
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price)
  }

  const getStatusText = (item: CartItem) => {
    if (item.quantity > item.stock) {
      return 'Stock insuffisant'
    } else if (item.stock <= 5) {
      return 'Stock limité'
    } else {
      return 'En stock'
    }
  }

  const getStatusColor = (item: CartItem) => {
    if (item.quantity > item.stock) {
      return 'bg-red-100 text-red-800'
    } else if (item.stock <= 5) {
      return 'bg-yellow-100 text-yellow-800'
    } else {
      return 'bg-green-100 text-green-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-6xl mb-4">🛒</span>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">
              Ajoutez des produits à votre panier pour commencer vos achats
            </p>
            <div className="space-x-4">
              <Button onClick={() => router.push('/products')}>
                ← Continuer les achats
              </Button>
              <Button onClick={() => router.push('/')}>
                Retour à l'accueil
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button onClick={() => router.back()}>
              ← Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
              <p className="text-gray-600">
                {cart.itemCount} article{cart.itemCount > 1 ? 's' : ''} • {formatPrice(cart.total)}
              </p>
            </div>
          </div>
          <Button onClick={clearCart}>
            🗑️ Vider le panier
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Image du produit */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || '/placeholder.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.jpg'
                        }}
                      />
                    </div>

                    {/* Informations du produit */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.category}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(item)}>
                          {getStatusText(item)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Stock: {item.stock}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Contrôles de quantité */}
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id || item.quantity <= 1}
                      >
                        -
                      </Button>
                      
                      <div className="w-16 text-center">
                        {updating === item.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
                        ) : (
                          <span className="font-medium">{item.quantity}</span>
                        )}
                      </div>
                      
                      <Button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id || item.quantity >= item.stock}
                      >
                        +
                      </Button>
                    </div>

                    {/* Prix total et suppression */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <Button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        🗑️
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  🛒 Résumé de la commande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Détails des prix */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total ({cart.itemCount} article{cart.itemCount > 1 ? 's' : ''})</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>

                {/* Informations de livraison */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-blue-600">🚚</span>
                    <span className="font-medium text-blue-900">Livraison gratuite</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Livraison gratuite pour toute commande supérieure à 50 000 FCFA
                  </p>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push('/checkout')}
                    disabled={cart.items.some(item => item.quantity > item.stock)}
                  >
                    💳 Passer la commande
                  </Button>
                  
                  <Button 
                    className="w-full"
                    onClick={() => router.push('/products')}
                  >
                    Continuer les achats
                  </Button>
                </div>

                {/* Sécurité */}
                <div className="text-xs text-gray-500 text-center">
                  <p>🔒 Paiement sécurisé</p>
                  <p>📦 Livraison rapide</p>
                  <p>🔄 Retours gratuits</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Produits recommandés */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produits recommandés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ici vous pouvez ajouter des produits recommandés */}
            <div className="text-center text-gray-500 py-8">
              <p>Produits recommandés à venir...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 