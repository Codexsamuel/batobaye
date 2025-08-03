import { NextRequest, NextResponse } from 'next/server'
import { whatsappAPI, WhatsAppWebhookPayload } from '@/lib/whatsapp-business'

// Endpoint pour la vérification du webhook WhatsApp
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('hub.mode')
    const token = searchParams.get('hub.verify_token')
    const challenge = searchParams.get('hub.challenge')

    console.log('🔐 Vérification webhook WhatsApp:', { mode, token, challenge })

    // Vérifier le mode et le token
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('✅ Webhook WhatsApp vérifié avec succès')
      return new NextResponse(challenge, { status: 200 })
    } else {
      console.log('❌ Échec de la vérification du webhook WhatsApp')
      return new NextResponse('Forbidden', { status: 403 })
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du webhook WhatsApp:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Endpoint pour recevoir les messages WhatsApp
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📱 Webhook WhatsApp reçu:', JSON.stringify(body, null, 2))

    // Vérifier la signature du webhook (optionnel mais recommandé)
    const signature = request.headers.get('x-hub-signature-256')
    if (signature && process.env.WHATSAPP_VERIFY_TOKEN) {
      const isValid = whatsappAPI.verifyWebhookSignature(signature, JSON.stringify(body))
      if (!isValid) {
        console.log('❌ Signature webhook invalide')
        return new NextResponse('Unauthorized', { status: 401 })
      }
    }

    // Traiter les messages entrants
    if (body.object === 'whatsapp_business_account') {
      await whatsappAPI.processIncomingMessages(body as WhatsAppWebhookPayload)
    }

    // Toujours retourner un succès pour éviter les retry
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Erreur lors du traitement du webhook WhatsApp:', error)
    
    // Même en cas d'erreur, retourner un succès pour éviter les retry
    return new NextResponse('OK', { status: 200 })
  }
} 