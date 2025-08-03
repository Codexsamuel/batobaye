import { NextRequest, NextResponse } from 'next/server'

// Types
interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  paymentMethod: 'cinetpay' | 'cash' | 'mobile_money'
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

// Base de données simulée pour les commandes
let orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Jean Dupont',
    customerEmail: 'jean.dupont@email.com',
    customerPhone: '+237 612345678',
    items: [
      {
        productId: '1',
        productName: 'Réfrigérateur Samsung',
        quantity: 1,
        price: 250000
      }
    ],
    total: 250000,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'cinetpay',
    shippingAddress: 'Douala, Cameroun',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ORD-002',
    customerName: 'Marie Martin',
    customerEmail: 'marie.martin@email.com',
    customerPhone: '+237 698765432',
    items: [
      {
        productId: '2',
        productName: 'Machine à laver LG',
        quantity: 1,
        price: 180000
      },
      {
        productId: '3',
        productName: 'Télévision Sony',
        quantity: 1,
        price: 120000
      }
    ],
    total: 300000,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'mobile_money',
    shippingAddress: 'Yaoundé, Cameroun',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  }
]

// GET - Récupérer toutes les commandes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const customerEmail = searchParams.get('customerEmail')
    const limit = parseInt(searchParams.get('limit') || '50')
    const page = parseInt(searchParams.get('page') || '1')

    let filteredOrders = [...orders]

    // Filtrer par statut
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status)
    }

    // Filtrer par email client
    if (customerEmail) {
      filteredOrders = filteredOrders.filter(order => 
        order.customerEmail.toLowerCase().includes(customerEmail.toLowerCase())
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

    // Statistiques
    const stats = {
      total: filteredOrders.length,
      pending: filteredOrders.filter(o => o.status === 'pending').length,
      confirmed: filteredOrders.filter(o => o.status === 'confirmed').length,
      shipped: filteredOrders.filter(o => o.status === 'shipped').length,
      delivered: filteredOrders.filter(o => o.status === 'delivered').length,
      cancelled: filteredOrders.filter(o => o.status === 'cancelled').length,
      totalRevenue: filteredOrders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.total, 0)
    }

    return NextResponse.json({
      success: true,
      data: {
        orders: paginatedOrders,
        pagination: {
          page,
          limit,
          total: filteredOrders.length,
          totalPages: Math.ceil(filteredOrders.length / limit)
        },
        stats
      }
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer une nouvelle commande
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation des données
    if (!body.customerName || !body.customerEmail || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Données manquantes ou invalides' },
        { status: 400 }
      )
    }

    // Calculer le total
    const total = body.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)

    // Créer la nouvelle commande
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone || '',
      items: body.items,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: body.paymentMethod || 'cinetpay',
      shippingAddress: body.shippingAddress || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: 'Commande créée avec succès'
    }, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour une commande
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'ID de commande requis' },
        { status: 400 }
      )
    }

    const orderIndex = orders.findIndex(order => order.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    // Mettre à jour la commande
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: orders[orderIndex],
      message: 'Commande mise à jour avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la commande:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer une commande
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('id')

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'ID de commande requis' },
        { status: 400 }
      )
    }

    const orderIndex = orders.findIndex(order => order.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    const deletedOrder = orders.splice(orderIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedOrder,
      message: 'Commande supprimée avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 