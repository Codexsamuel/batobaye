import React from 'react'

// Système de gestion du panier et des commandes
// Persistance locale avec localStorage

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
  stock: number
  addedAt: Date
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: Date
  customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  paymentMethod: 'cash' | 'card' | 'mobile_money' | 'bank_transfer' | 'cinetpay'
  paymentStatus: 'pending' | 'paid' | 'failed'
  shippingAddress: string
  trackingNumber?: string
  estimatedDelivery?: Date
  notes?: string
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

class CartManager {
  private readonly CART_KEY = 'batobaye_cart'
  private readonly ORDERS_KEY = 'batobaye_orders'

  // Gestion du panier
  getCart(): CartState {
    if (typeof window === 'undefined') {
      return { items: [], total: 0, itemCount: 0 }
    }

    try {
      const cartData = localStorage.getItem(this.CART_KEY)
      if (cartData) {
        const cart = JSON.parse(cartData)
        // Convertir les dates string en objets Date
        cart.items = cart.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        return cart
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du panier:', error)
    }

    return { items: [], total: 0, itemCount: 0 }
  }

  addToCart(product: {
    id: string
    name: string
    price: number
    image?: string
    category?: string
    stock: number
  }): CartState {
    const cart = this.getCart()
    const existingItem = cart.items.find(item => item.id === product.id)

    if (existingItem) {
      // Augmenter la quantité si le stock le permet
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1
      } else {
        throw new Error('Stock insuffisant')
      }
    } else {
      // Ajouter un nouvel article
      cart.items.push({
        ...product,
        quantity: 1,
        addedAt: new Date()
      })
    }

    this.updateCart(cart)
    return cart
  }

  updateQuantity(productId: string, quantity: number): CartState {
    const cart = this.getCart()
    const item = cart.items.find(item => item.id === productId)

    if (item) {
      if (quantity <= 0) {
        // Supprimer l'article si la quantité est 0 ou négative
        cart.items = cart.items.filter(item => item.id !== productId)
      } else if (quantity <= item.stock) {
        item.quantity = quantity
      } else {
        throw new Error('Quantité supérieure au stock disponible')
      }
    }

    this.updateCart(cart)
    return cart
  }

  removeFromCart(productId: string): CartState {
    const cart = this.getCart()
    cart.items = cart.items.filter(item => item.id !== productId)
    this.updateCart(cart)
    return cart
  }

  clearCart(): CartState {
    const emptyCart = { items: [], total: 0, itemCount: 0 }
    this.updateCart(emptyCart)
    return emptyCart
  }

  private updateCart(cart: CartState): void {
    // Calculer le total et le nombre d'articles
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error)
      }
    }
  }

  // Gestion des commandes
  getOrders(): Order[] {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const ordersData = localStorage.getItem(this.ORDERS_KEY)
      if (ordersData) {
        const orders = JSON.parse(ordersData)
        // Convertir les dates string en objets Date
        return orders.map((order: any) => ({
          ...order,
          orderDate: new Date(order.orderDate),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined
        }))
      }
    } catch (error) {
      console.error('Erreur lors de la lecture des commandes:', error)
    }

    return []
  }

  createOrder(
    customerInfo: Order['customerInfo'],
    paymentMethod: Order['paymentMethod'],
    shippingAddress: string,
    notes?: string
  ): Order {
    const cart = this.getCart()
    
    if (cart.items.length === 0) {
      throw new Error('Le panier est vide')
    }

    const order: Order = {
      id: `CMD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      items: [...cart.items],
      total: cart.total,
      status: 'pending',
      orderDate: new Date(),
      customerInfo,
      paymentMethod,
      paymentStatus: 'pending',
      shippingAddress,
      notes,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 jours
    }

    // Sauvegarder la commande
    const orders = this.getOrders()
    orders.unshift(order) // Ajouter au début de la liste
    this.saveOrders(orders)

    // Vider le panier
    this.clearCart()

    return order
  }

  updateOrderStatus(orderId: string, status: Order['status']): Order | null {
    const orders = this.getOrders()
    const orderIndex = orders.findIndex(order => order.id === orderId)

    if (orderIndex !== -1) {
      orders[orderIndex].status = status
      
      // Mettre à jour le statut de paiement si nécessaire
      if (status === 'confirmed') {
        orders[orderIndex].paymentStatus = 'paid'
      }
      
      this.saveOrders(orders)
      return orders[orderIndex]
    }

    return null
  }

  updatePaymentStatus(orderId: string, paymentStatus: Order['paymentStatus']): Order | null {
    const orders = this.getOrders()
    const orderIndex = orders.findIndex(order => order.id === orderId)

    if (orderIndex !== -1) {
      orders[orderIndex].paymentStatus = paymentStatus
      this.saveOrders(orders)
      return orders[orderIndex]
    }

    return null
  }

  addTrackingNumber(orderId: string, trackingNumber: string): Order | null {
    const orders = this.getOrders()
    const orderIndex = orders.findIndex(order => order.id === orderId)

    if (orderIndex !== -1) {
      orders[orderIndex].trackingNumber = trackingNumber
      this.saveOrders(orders)
      return orders[orderIndex]
    }

    return null
  }

  private saveOrders(orders: Order[]): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders))
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des commandes:', error)
      }
    }
  }

  // Utilitaires
  getOrderById(orderId: string): Order | null {
    const orders = this.getOrders()
    return orders.find(order => order.id === orderId) || null
  }

  getOrdersByStatus(status: Order['status']): Order[] {
    const orders = this.getOrders()
    return orders.filter(order => order.status === status)
  }

  getOrderStats() {
    const orders = this.getOrders()
    const totalOrders = orders.length
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
    const pendingOrders = orders.filter(order => order.status === 'pending').length
    const deliveredOrders = orders.filter(order => order.status === 'delivered').length

    return {
      totalOrders,
      totalSpent,
      pendingOrders,
      deliveredOrders,
      averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0
    }
  }

  // Export/Import pour sauvegarde
  exportData() {
    return {
      cart: this.getCart(),
      orders: this.getOrders()
    }
  }

  importData(data: { cart: CartState; orders: Order[] }) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.CART_KEY, JSON.stringify(data.cart))
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(data.orders))
      } catch (error) {
        console.error('Erreur lors de l\'importation des données:', error)
      }
    }
  }
}

// Instance globale
export const cartManager = new CartManager()

// Hooks React pour l'utilisation dans les composants
export const useCart = () => {
  const [cart, setCart] = React.useState<CartState>({ items: [], total: 0, itemCount: 0 })

  React.useEffect(() => {
    setCart(cartManager.getCart())
  }, [])

  const addToCart = (product: Parameters<typeof cartManager.addToCart>[0]) => {
    try {
      const newCart = cartManager.addToCart(product)
      setCart(newCart)
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    try {
      const newCart = cartManager.updateQuantity(productId, quantity)
      setCart(newCart)
      return { success: true }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
  }

  const removeFromCart = (productId: string) => {
    const newCart = cartManager.removeFromCart(productId)
    setCart(newCart)
  }

  const clearCart = () => {
    const newCart = cartManager.clearCart()
    setCart(newCart)
  }

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }
}

export const useOrders = () => {
  const [orders, setOrders] = React.useState<Order[]>([])

  React.useEffect(() => {
    setOrders(cartManager.getOrders())
  }, [])

  const createOrder = (orderData: Parameters<typeof cartManager.createOrder>) => {
    try {
      const newOrder = cartManager.createOrder(...orderData)
      setOrders(cartManager.getOrders())
      return { success: true, order: newOrder }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' }
    }
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrder = cartManager.updateOrderStatus(orderId, status)
    if (updatedOrder) {
      setOrders(cartManager.getOrders())
    }
    return updatedOrder
  }

  return {
    orders,
    createOrder,
    updateOrderStatus,
    getOrderById: cartManager.getOrderById,
    getOrderStats: cartManager.getOrderStats
  }
} 