import { NextRequest, NextResponse } from 'next/server'
import { cinetpayService, generateCinetPayTransactionId, formatCinetPayAmount } from '@/lib/cinetpay'
import { initCommercialDatabase, createSale, addSaleItem, createPayment, updateStock } from '@/lib/db-commercial'

export async function POST(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const body = await request.json()
    
    // Validation des données
    if (!body.customer || !body.items || !body.amount) {
      return NextResponse.json(
        { success: false, error: 'Données de paiement incomplètes' },
        { status: 400 }
      )
    }

    const { customer, items, amount, currency = 'XAF' } = body

    // Générer un ID de transaction unique
    const transactionId = generateCinetPayTransactionId()
    
    // Formater le montant pour CinetPay (en centimes)
    const formattedAmount = formatCinetPayAmount(amount)

    // Créer la vente dans notre base de données
    const saleData = {
      customer_name: `${customer.firstName} ${customer.lastName}`,
      customer_phone: customer.phone,
      customer_email: customer.email,
      sale_date: new Date(),
      total_amount: amount,
      discount_amount: 0,
      tax_amount: amount * 0.195, // TVA 19.5%
      final_amount: amount,
      payment_method: 'cinetpay' as const,
      payment_status: 'pending' as const,
      sale_type: 'online' as const,
      notes: `CinetPay - Transaction ID: ${transactionId}`
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
        cost_price: item.costPrice || item.price * 0.7,
        profit: (item.price - (item.costPrice || item.price * 0.7)) * item.quantity
      })
    }

    // Préparer les données pour CinetPay
    const paymentData = {
      amount: formattedAmount,
      currency: currency as 'XAF',
      description: `Commande Batobaye - ${items.length} article(s)`,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://batobaye.shop'}/payment/success?transaction_id=${transactionId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://batobaye.shop'}/payment/cancel?transaction_id=${transactionId}`,
      notifyUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://batobaye.shop'}/api/cinetpay/notify`,
      transactionId: transactionId,
      customerName: `${customer.firstName} ${customer.lastName}`,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      customerCity: customer.city,
      customerCountry: 'CM',
      channels: 'ALL' as const,
      custom: sale.id.toString() // Pour identifier la vente dans la notification
    }

    // Initialiser le paiement avec CinetPay
    const cinetpayResponse = await cinetpayService.initiatePayment(paymentData)

    // Enregistrer le token de paiement
    await createPayment({
      reference_type: 'sale',
      reference_id: sale.id,
      amount: amount,
      payment_method: 'cinetpay' as const,
      payment_date: new Date(),
      notes: `CinetPay - Token: ${cinetpayResponse.data.payment_token}`
    })

    return NextResponse.json({
      success: true,
      transactionId: transactionId,
      paymentUrl: cinetpayResponse.data.payment_url,
      paymentToken: cinetpayResponse.data.payment_token,
      saleId: sale.id,
      message: 'Paiement CinetPay initialisé avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du paiement CinetPay:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'initialisation du paiement' },
      { status: 500 }
    )
  }
}

// Webhook pour recevoir les notifications de CinetPay
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Vérifier le statut du paiement
    const { transaction_id, token } = body
    
    if (!transaction_id || !token) {
      return NextResponse.json({ success: false, error: 'Données manquantes' }, { status: 400 })
    }

    const statusResponse = await cinetpayService.checkPaymentStatus(transaction_id, token)
    
    if (statusResponse.data.status === 'SUCCESSFUL') {
      // Mettre à jour le statut de la vente
      // Ici vous devriez mettre à jour votre base de données
      console.log('Paiement réussi:', statusResponse.data)
    }

    return NextResponse.json({ success: true, status: statusResponse.data.status })

  } catch (error) {
    console.error('Erreur lors de la vérification du statut CinetPay:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    )
  }
} 