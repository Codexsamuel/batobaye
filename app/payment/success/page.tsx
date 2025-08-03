"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft, Package, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const transactionId = searchParams.get('transaction_id')

  useEffect(() => {
    if (transactionId) {
      // Ici vous pouvez vérifier le statut du paiement avec CinetPay
      // Pour l'instant, on simule un succès
      setPaymentDetails({
        transactionId,
        amount: '450,000 FCFA',
        date: new Date().toLocaleDateString('fr-FR'),
        method: 'CinetPay'
      })
      setLoading(false)
    }
  }, [transactionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du paiement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Paiement Réussi !
          </CardTitle>
          <CardDescription className="text-gray-600">
            Votre commande a été confirmée et sera traitée dans les plus brefs délais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Détails du paiement */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm">{paymentDetails?.transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Montant:</span>
              <span className="font-semibold text-green-600">{paymentDetails?.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date:</span>
              <span className="text-sm">{paymentDetails?.date}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Méthode:</span>
              <span className="text-sm flex items-center">
                <CreditCard className="w-4 h-4 mr-1" />
                {paymentDetails?.method}
              </span>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Prochaines étapes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Vous recevrez un email de confirmation</li>
              <li>• Notre équipe vous contactera pour la livraison</li>
              <li>• Suivez votre commande dans votre espace client</li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/orders">
                <Package className="w-4 h-4 mr-2" />
                Suivre ma commande
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuer les achats
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-gray-500">
            <p>Besoin d'aide ?</p>
            <p>Contactez-nous au <span className="font-semibold">+237 672 02 77 44</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 