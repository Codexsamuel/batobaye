"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  Shield,
  CheckCircle,
  ArrowLeft,
  Truck,
  MapPin,
  User,
  Phone,
  Mail,
  Lock,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  popular?: boolean
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  // Données d'exemple du panier
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Réfrigérateur Samsung 350L',
      price: 450000,
      quantity: 1,
      image: '/placeholder.jpg'
    },
    {
      id: 2,
      name: 'TV LG 55" 4K',
      price: 380000,
      quantity: 1,
      image: '/placeholder.jpg'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 15000
  const tax = subtotal * 0.195 // TVA 19.5%
  const total = subtotal + shipping + tax

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'cinetpay',
      name: 'CinetPay',
      description: 'Orange Money, MTN Mobile Money, Visa, Mastercard, PayPal',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-green-600',
      popular: true
    }
  ]

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert('Veuillez sélectionner une méthode de paiement')
      return
    }

    setIsProcessing(true)
    
    try {
      // Préparer les données du client
      const customerData = {
        firstName: 'John', // À remplacer par les vraies données du formulaire
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+237672027744',
        address: 'Douala, Akwa',
        city: 'Douala'
      }

      // Appeler l'API CinetPay
      const response = await fetch('/api/cinetpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerData,
          items: cartItems,
          amount: total,
          currency: 'XAF'
        })
      })

      const result = await response.json()

      if (result.success) {
        // Rediriger vers la page de paiement CinetPay
        window.location.href = result.paymentUrl
      } else {
        alert('Erreur lors de l\'initialisation du paiement: ' + result.error)
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error)
      alert('Erreur lors du paiement. Veuillez réessayer.')
      setIsProcessing(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Paiement Réussi !</h2>
            <p className="text-gray-600 mb-6">
              Votre commande a été confirmée et sera traitée dans les plus brefs délais.
            </p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>Numéro de commande: <span className="font-semibold">CMD-2024-001</span></p>
              <p>Montant total: <span className="font-semibold">{total.toLocaleString()} FCFA</span></p>
            </div>
            <div className="mt-6 space-y-2">
              <Button asChild className="w-full">
                <Link href="/orders">Suivre ma commande</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/">Continuer les achats</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button asChild className="mb-4">
            <Link href="/cart" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au panier
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Finaliser la commande</h1>
          <p className="text-gray-600 mt-2">Complétez vos informations et choisissez votre mode de paiement</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de livraison et paiement */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations de livraison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Informations de livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Votre prénom" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Votre nom" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" placeholder="+237 XXX XXX XXX" />
                </div>
                <div>
                  <Label htmlFor="address">Adresse de livraison</Label>
                  <Input id="address" placeholder="Votre adresse complète" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" placeholder="Douala, Yaoundé..." />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Code postal</Label>
                    <Input id="postalCode" placeholder="Code postal" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Méthodes de paiement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Mode de paiement
                </CardTitle>
                <CardDescription>
                  Choisissez votre méthode de paiement préférée
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${method.color}`}>
                            {method.icon}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{method.name}</h3>
                              {method.popular && (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Populaire
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPaymentMethod === method.id
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedPaymentMethod === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Informations de sécurité */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Vos informations de paiement sont sécurisées et cryptées</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résumé de la commande */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Produits */}
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        {(item.price * item.quantity).toLocaleString()} FCFA
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totaux */}
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span>{shipping.toLocaleString()} FCFA</span>
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

                {/* Bouton de paiement */}
                <Button 
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || isProcessing}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Traitement en cours...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Payer {total.toLocaleString()} FCFA
                    </div>
                  )}
                </Button>

                {/* Informations supplémentaires */}
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>• Livraison gratuite pour les commandes {'>'} 500,000 FCFA</p>
                  <p>• Retour gratuit sous 14 jours</p>
                  <p>• Support client 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 