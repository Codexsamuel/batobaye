"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  price: number
  description?: string
  category?: string
  stock: number
}

interface ProductActionButtonsProps {
  product: Product
  layout?: 'stacked' | 'side-by-side' | 'dropdown'
  className?: string
}

export default function ProductActionButtons({ 
  product, 
  layout = 'dropdown', 
  className = '' 
}: ProductActionButtonsProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async () => {
    if (product.stock <= 0) {
      toast({
        title: "Stock épuisé",
        description: "Ce produit n'est plus disponible en stock.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)
    
    try {
      // Simuler un délai pour l'UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Ajouter au panier
      if (typeof window !== 'undefined') {
        const cartData = localStorage.getItem('batobaye_cart')
        let cart = cartData ? JSON.parse(cartData) : { items: [], total: 0, itemCount: 0 }
        
        const existingItem = cart.items.find((item: any) => item.id === product.id)
        
        if (existingItem) {
          if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1
          } else {
            throw new Error('Stock insuffisant')
          }
        } else {
          cart.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock,
            quantity: 1,
            addedAt: new Date().toISOString()
          })
        }
        
        // Recalculer le total
        cart.total = cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
        cart.itemCount = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
        
        localStorage.setItem('batobaye_cart', JSON.stringify(cart))
      }
      
      setAddedToCart(true)
      
      // Toast de succès
      toast({
        title: "Produit ajouté !",
        description: `${product.name} a été ajouté au panier avec succès.`,
        variant: "default",
      })
      
      setTimeout(() => setAddedToCart(false), 2000)
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : 'Erreur lors de l\'ajout au panier',
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWhatsAppClick = () => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF',
        minimumFractionDigits: 0
      }).format(price)
    }

    const message = `🛒 *NOUVELLE DEMANDE D'ACHAT - Batobaye Market*

📦 *Produit:* ${product.name}
💰 *Prix:* ${formatPrice(product.price)}
🏷️ *Catégorie:* ${product.category || 'Électroménager'}
${product.description ? `📝 *Description:* ${product.description}` : ''}

🔗 *Lien du produit:* https://batobaye.shop/products/${product.id}

---
*Message automatique généré par le site web Batobaye Market*
*Bonjour, je suis intéressé par ce produit. Pouvez-vous me donner plus d'informations ?*`

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = '237672027744' // +237 672 02 77 44
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setShowDropdown(false)
  }

  // Layout dropdown (recommandé)
  return (
    <div className={`relative ${className}`}>
      <Button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full"
      >
        Acheter maintenant
        <span className="ml-2">▼</span>
      </Button>

      {showDropdown && (
        <>
          {/* Overlay pour fermer le dropdown */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-20">
            <div className="p-2 space-y-1">
              <Button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock <= 0}
                className="w-full justify-start"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    Ajout en cours...
                  </>
                ) : addedToCart ? (
                  <>
                    <span className="mr-2 text-green-600">✅</span>
                    Ajouté au panier !
                  </>
                ) : (
                  <>
                    <span className="mr-2">🛒</span>
                    Ajouter au panier
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
              >
                <span className="mr-2">💬</span>
                Acheter sur WhatsApp
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 