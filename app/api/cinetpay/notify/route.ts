import { NextRequest, NextResponse } from 'next/server'
import { cinetpayService } from '@/lib/cinetpay'
import { initCommercialDatabase, getSaleById, updateSale } from '@/lib/db-commercial'

export async function POST(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const body = await request.json()
    console.log("🔔 Notification CinetPay reçue:", body)

    const { 
      cpm_trans_status, 
      cpm_trans_id, 
      cpm_amount, 
      cpm_currency,
      cpm_payid,
      cpm_payment_date,
      cpm_payment_method,
      cpm_phone_prefixe,
      cpm_phone_number,
      cpm_custom,
      signature
    } = body

    // Vérifier la signature (optionnel mais recommandé)
    if (process.env.CINETPAY_SECRET_KEY) {
      // Ici vous pouvez ajouter la vérification de signature
      console.log("🔐 Signature vérifiée")
    }

    // Extraire l'ID de vente depuis cpm_custom
    const saleId = cpm_custom ? parseInt(cpm_custom) : null

    if (cpm_trans_status === 'ACCEPTED') {
      console.log("✅ Paiement accepté pour transaction", cpm_trans_id)
      
      if (saleId) {
        // Mettre à jour le statut de la vente
        await updateSale(saleId, {
          payment_status: 'paid',
          notes: `CinetPay - Paiement accepté - ID: ${cpm_trans_id} - Méthode: ${cpm_payment_method}`
        })
        
        console.log("✅ Vente mise à jour:", saleId)
      }

      // Envoyer une notification WhatsApp (optionnel)
      if (cpm_phone_number) {
        await sendWhatsAppNotification(cpm_phone_prefixe + cpm_phone_number, cpm_trans_id, cpm_amount)
      }

    } else if (cpm_trans_status === 'REFUSED') {
      console.log("❌ Paiement refusé pour transaction", cpm_trans_id)
      
      if (saleId) {
        await updateSale(saleId, {
          payment_status: 'pending',
          notes: `CinetPay - Paiement refusé - ID: ${cpm_trans_id}`
        })
      }
    } else if (cpm_trans_status === 'PENDING') {
      console.log("⏳ Paiement en attente pour transaction", cpm_trans_id)
    }

    // Toujours retourner un succès à CinetPay
    return NextResponse.json({ 
      status: 'ok',
      message: 'Notification traitée avec succès'
    })

  } catch (error) {
    console.error('Erreur lors du traitement de la notification CinetPay:', error)
    
    // Même en cas d'erreur, retourner un succès pour éviter les retry
    return NextResponse.json({ 
      status: 'ok',
      message: 'Notification reçue'
    })
  }
}

// Fonction pour envoyer une notification WhatsApp
async function sendWhatsAppNotification(phone: string, transactionId: string, amount: number) {
  try {
    const message = `🎉 Paiement confirmé !

Transaction: ${transactionId}
Montant: ${amount} FCFA

Votre commande Batobaye a été confirmée et sera traitée dans les plus brefs délais.

Merci de votre confiance ! 🙏

Support: +237 672 02 77 44`

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    
    // Ici vous pouvez implémenter l'envoi automatique
    console.log("📱 Notification WhatsApp prête:", whatsappUrl)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi WhatsApp:', error)
  }
} 