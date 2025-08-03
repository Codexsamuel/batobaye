"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle, ArrowLeft, RefreshCw, Phone } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const transactionId = searchParams.get('transaction_id')

  useEffect(() => {
    if (transactionId) {
      setPaymentDetails({
        transactionId,
        amount: '450,000 FCFA',
        date: new Date().toLocaleDateString('fr-FR')
      })
      setLoading(false)
    }
  }, [transactionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du paiement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Paiement Annulé
          </CardTitle>
          <CardDescription className="text-gray-600">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Détails de la transaction */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm">{paymentDetails?.transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Montant:</span>
              <span className="font-semibold text-gray-900">{paymentDetails?.amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date:</span>
              <span className="text-sm">{paymentDetails?.date}</span>
            </div>
          </div>

          {/* Informations */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Que s'est-il passé ?</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Vous avez annulé le paiement</li>
              <li>• Aucun montant n'a été débité</li>
              <li>• Votre commande n'a pas été confirmée</li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
              <Link href="/checkout">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer le paiement
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-blue-900 mb-2">Besoin d'aide ?</h4>
            <p className="text-sm text-blue-800 mb-3">
              Notre équipe est là pour vous aider avec votre paiement.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="tel:+237672027744">
                <Phone className="w-4 h-4 mr-2" />
                Appeler le support
              </Link>
            </Button>
          </div>

          {/* Contact */}
          <div className="text-center text-sm text-gray-500">
            <p>Ou contactez-nous au <span className="font-semibold">+237 672 02 77 44</span></p>
            <p>Email: <span className="font-semibold">contact@batobaye.shop</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 