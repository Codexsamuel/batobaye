import { NextRequest, NextResponse } from 'next/server'
import { initCommercialDatabase, createSale, addSaleItem, createPayment, updateStock } from '@/lib/db-commercial'

export async function POST(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const body = await request.json()
    
    // Validation des données de paiement
    if (!body.customer || !body.items || !body.paymentMethod) {
      return NextResponse.json(
        { success: false, error: 'Données de paiement incomplètes' },
        { status: 400 }
      )
    }

    const { customer, items, paymentMethod, shippingAddress } = body

    // Calculer les totaux
    let subtotal = 0
    for (const item of items) {
      subtotal += item.price * item.quantity
    }

    const shipping = 15000 // Frais de livraison fixes
    const tax = subtotal * 0.195 // TVA 19.5%
    const total = subtotal + shipping + tax

    // Créer la vente
    const saleData = {
      customer_name: `${customer.firstName} ${customer.lastName}`,
      customer_phone: customer.phone,
      customer_email: customer.email,
      sale_date: new Date(),
      total_amount: subtotal,
      discount_amount: 0,
      tax_amount: tax,
      final_amount: total,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cash' ? 'pending' as const : 'paid' as const,
      sale_type: 'online' as const,
      notes: `Livraison: ${shippingAddress.address}, ${shippingAddress.city}`
    }

    const sale = await createSale(saleData)

    // Ajouter les articles de vente
    for (const item of items) {
      await addSaleItem({
        sale_id: sale.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        cost_price: item.costPrice || item.price * 0.7, // Estimation du coût
        profit: (item.price - (item.costPrice || item.price * 0.7)) * item.quantity
      })

      // Mettre à jour le stock
      await updateStock(
        item.id,
        -item.quantity,
        'sale',
        sale.id,
        `Vente en ligne - Commande ${sale.id}`
      )
    }

    // Créer l'enregistrement de paiement
    if (paymentMethod !== 'cash') {
      await createPayment({
        reference_type: 'sale',
        reference_id: sale.id,
        amount: total,
        payment_method: paymentMethod,
        payment_date: new Date(),
        notes: `Paiement en ligne - ${paymentMethod}`
      })
    }

    // Logique spécifique selon le mode de paiement
    let paymentStatus: 'paid' | 'pending' = 'paid'
    let paymentNotes = `Paiement en ligne - ${paymentMethod}`

    switch (paymentMethod) {
      case 'orange_money':
        paymentNotes = 'Paiement via Orange Money - Traitement automatique'
        break
      case 'mtn_mobile_money':
        paymentNotes = 'Paiement via MTN Mobile Money - Traitement automatique'
        break
      case 'visa':
      case 'mastercard':
        paymentNotes = `Paiement carte ${paymentMethod.toUpperCase()} - Traitement sécurisé`
        break
      case 'paypal':
        paymentNotes = 'Paiement via PayPal - Traitement international'
        break
      default:
        paymentStatus = 'pending'
        paymentNotes = `Paiement ${paymentMethod} - En attente de confirmation`
    }

    // Générer le numéro de commande
    const orderNumber = `CMD-${new Date().getFullYear()}-${sale.id.toString().padStart(3, '0')}`

    return NextResponse.json({
      success: true,
      orderId: sale.id,
      orderNumber,
      total,
      paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
      message: 'Commande créée avec succès'
    })

  } catch (error) {
    console.error('Erreur lors du traitement du paiement:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement du paiement' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('orderId')

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'ID de commande requis' },
        { status: 400 }
      )
    }

    // Ici vous pourriez récupérer les détails de la commande
    // Pour l'instant, retournons une réponse simulée
    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        status: 'processing',
        paymentStatus: 'paid'
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de la commande' },
      { status: 500 }
    )
  }
} 