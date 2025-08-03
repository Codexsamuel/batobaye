'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MessageCircle, Loader2, User, Phone, Mail } from 'lucide-react'

interface WhatsAppBuyModalProps {
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

export default function WhatsAppBuyModal({ product, className = '' }: WhatsAppBuyModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

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

👤 *Client:* ${formData.name || 'Non spécifié'}
📱 *Téléphone:* ${formData.phone || 'Non spécifié'}
📧 *Email:* ${formData.email || 'Non spécifié'}

💬 *Message du client:*
${formData.message || 'Aucun message'}

🔗 *Lien du produit:* https://batobaye-market.com/products/${product.id}

---
*Message automatique généré par le site web Batobaye Market*
*Répondez rapidement pour assister le client*`

    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Numéro WhatsApp de Batobaye Market
      const whatsappNumber = '237672027744' // +237 672 02 77 44
      const message = generateWhatsAppMessage()
      
      // URL WhatsApp avec message pré-rempli
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`
      
      // Ouvrir WhatsApp dans un nouvel onglet
      window.open(whatsappUrl, '_blank')
      
      // Fermer le modal après un délai
      setTimeout(() => {
        setIsOpen(false)
        setIsLoading(false)
        // Réinitialiser le formulaire
        setFormData({ name: '', phone: '', email: '', message: '' })
      }, 1500)
      
    } catch (error) {
      console.error('Erreur lors de la redirection WhatsApp:', error)
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`bg-green-600 hover:bg-green-700 text-white ${className}`}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Acheter sur WhatsApp
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-600" />
            Acheter {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Aperçu du produit */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900">{product.name}</h4>
            <p className="text-lg font-bold text-green-600">{formatPrice(product.price)}</p>
            {product.category && (
              <p className="text-sm text-gray-600">Catégorie: {product.category}</p>
            )}
          </div>

          {/* Formulaire client */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Nom complet *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Téléphone *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+237 6XX XX XX XX"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email (optionnel)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <textarea
                id="message"
                className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Décrivez vos besoins, questions ou demandes spéciales..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.name || !formData.phone}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ouvrir WhatsApp
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="text-xs text-gray-500 text-center">
            Vous serez redirigé vers WhatsApp pour finaliser votre commande avec notre équipe.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 