'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, Loader2 } from 'lucide-react'

interface WhatsAppBuyButtonProps {
  product: {
    id: string
    name: string
    price: number
    description?: string
    image?: string
    category?: string
  }
  className?: string
}

export default function WhatsAppBuyButton({ product, className = '' }: WhatsAppBuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price)
  }

  const generateWhatsAppMessage = () => {
    const message = `🛒 *NOUVELLE DEMANDE D'ACHAT - Batobaye Market*

📦 *Produit:* ${product.name}
💰 *Prix:* ${formatPrice(product.price)}
🏷️ *Catégorie:* ${product.category || 'Électroménager'}
${product.description ? `📝 *Description:* ${product.description}` : ''}

🔗 *Lien du produit:* https://batobaye-market.com/products/${product.id}

👤 *Client:* [Nom du client]
📱 *Téléphone:* [Numéro du client]

---
*Message automatique généré par le site web Batobaye Market*
*Répondez rapidement pour assister le client*`

    return encodeURIComponent(message)
  }

  const handleWhatsAppRedirect = async () => {
    setIsLoading(true)
    
    try {
      // Numéro WhatsApp de Batobaye Market (à configurer)
      const whatsappNumber = '237672027744' // +237 672 02 77 44
      const message = generateWhatsAppMessage()
      
      // URL WhatsApp avec message pré-rempli
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
      
      // Ouvrir WhatsApp dans un nouvel onglet
      window.open(whatsappUrl, '_blank')
      
      // Optionnel: Ajouter un délai pour l'animation de chargement
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      
    } catch (error) {
      console.error('Erreur lors de la redirection WhatsApp:', error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleWhatsAppRedirect}
      disabled={isLoading}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <MessageCircle className="w-4 h-4 mr-2" />
      )}
      {isLoading ? 'Redirection...' : 'Acheter sur WhatsApp'}
    </Button>
  )
} 