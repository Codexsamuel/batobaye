import { NextRequest, NextResponse } from 'next/server'
import { 
  createSale, 
  addSaleItem, 
  getAllSales, 
  getSaleById, 
  getSaleItems,
  getProductById,
  initCommercialDatabase 
} from '@/lib/db-commercial'

export async function GET(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (id) {
      const saleId = parseInt(id)
      const sale = await getSaleById(saleId)
      if (!sale) {
        return NextResponse.json(
          { success: false, error: 'Vente non trouvée' },
          { status: 404 }
        )
      }
      
      const saleItems = await getSaleItems(saleId)
      return NextResponse.json({
        success: true,
        data: { sale, items: saleItems }
      })
    }
    
    const sales = await getAllSales()
    return NextResponse.json({
      success: true,
      data: sales,
      count: sales.length
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des ventes:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des ventes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const body = await request.json()
    
    // Validation des données
    if (!body.customer_name || !body.customer_phone || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Données de vente incomplètes' },
        { status: 400 }
      )
    }
    
    // Calculer les totaux
    let totalAmount = 0
    let totalCost = 0
    
    for (const item of body.items) {
      const product = await getProductById(item.product_id)
      if (!product) {
        return NextResponse.json(
          { success: false, error: `Produit ${item.product_id} non trouvé` },
          { status: 400 }
        )
      }
      
      if (product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Stock insuffisant pour ${product.name}` },
          { status: 400 }
        )
      }
      
      totalAmount += item.quantity * product.selling_price
      totalCost += item.quantity * product.purchase_price
    }
    
    const discountAmount = body.discount_amount || 0
    const taxAmount = body.tax_amount || 0
    const finalAmount = totalAmount - discountAmount + taxAmount
    
    // Créer la vente
    const saleData = {
      customer_name: body.customer_name,
      customer_phone: body.customer_phone,
      customer_email: body.customer_email,
      sale_date: new Date(),
      total_amount: totalAmount,
      discount_amount: discountAmount,
      tax_amount: taxAmount,
      final_amount: finalAmount,
      payment_method: body.payment_method || 'cash',
      payment_status: body.payment_status || 'paid',
      sale_type: body.sale_type || 'in_store',
      notes: body.notes || ''
    }
    
    const sale = await createSale(saleData)
    
    // Ajouter les articles de vente
    const saleItems = []
    for (const item of body.items) {
      const product = await getProductById(item.product_id)
      if (!product) continue
      
      const unitPrice = product.selling_price
      const totalPrice = item.quantity * unitPrice
      const costPrice = product.purchase_price
      const profit = totalPrice - (item.quantity * costPrice)
      
      const saleItem = await addSaleItem({
        sale_id: sale.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
        cost_price: costPrice,
        profit: profit
      })
      
      saleItems.push(saleItem)
    }
    
    return NextResponse.json({
      success: true,
      data: { sale, items: saleItems },
      message: 'Vente créée avec succès'
    }, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la vente:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la vente' },
      { status: 500 }
    )
  }
} 