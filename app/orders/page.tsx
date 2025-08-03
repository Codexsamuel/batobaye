"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle,
  Eye,
  Download,
  RefreshCw,
  ArrowLeft,
  Calendar,
  MapPin,
  CreditCard,
  Phone,
  Mail
} from 'lucide-react'
import Image from 'next/image'
import { cartManager, Order } from '@/lib/cart'

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Charger les commandes depuis localStorage
    setOrders(cartManager.getOrders())
    setLoading(false)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-600" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-600" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { text: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      confirmed: { text: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
      processing: { text: 'En cours', color: 'bg-blue-100 text-blue-800' },
      shipped: { text: 'Expédiée', color: 'bg-purple-100 text-purple-800' },
      delivered: { text: 'Livrée', color: 'bg-green-100 text-green-800' },
      cancelled: { text: 'Annulée', color: 'bg-red-100 text-red-800' }
    }

    const config = statusConfig[status]
    return <Badge className={config.color}>{config.text}</Badge>
  }

  const getPaymentStatusBadge = (status: Order['paymentStatus']) => {
    const statusConfig = {
      pending: { text: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      paid: { text: 'Payé', color: 'bg-green-100 text-green-800' },
      failed: { text: 'Échoué', color: 'bg-red-100 text-red-800' }
    }

    const config = statusConfig[status]
    return <Badge className={config.color}>{config.text}</Badge>
  }

  const getPaymentMethodIcon = (method: Order['paymentMethod']) => {
    switch (method) {
      case 'cash':
        return <CreditCard className="w-4 h-4" />
      case 'card':
        return <CreditCard className="w-4 h-4" />
      case 'mobile_money':
        return <Phone className="w-4 h-4" />
      case 'bank_transfer':
        return <CreditCard className="w-4 h-4" />
      case 'cinetpay':
        return <CreditCard className="w-4 h-4" />
      default:
        return <CreditCard className="w-4 h-4" />
    }
  }

  const getPaymentMethodText = (method: Order['paymentMethod']) => {
    const methodConfig = {
      cash: 'Espèces',
      card: 'Carte bancaire',
      mobile_money: 'Mobile Money',
      bank_transfer: 'Virement bancaire',
      cinetpay: 'CinetPay'
    }
    return methodConfig[method]
  }

  const filterOrdersByStatus = (status: Order['status'] | 'all') => {
    if (status === 'all') return orders
    return orders.filter(order => order.status === status)
  }

  const getOrderStats = () => {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stats = getOrderStats()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Commandes</h1>
              <p className="text-gray-600">
                Gérez et suivez vos commandes
              </p>
            </div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucune commande</h2>
            <p className="text-gray-600 mb-8">
              Vous n'avez pas encore passé de commande
            </p>
            <Button onClick={() => router.push('/products')}>
              Découvrir nos produits
            </Button>
          </div>
        ) : (
          <>
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total commandes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total dépensé</p>
                      <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
                    </div>
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Livrées</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.deliveredOrders}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Onglets des commandes */}
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">Toutes ({orders.length})</TabsTrigger>
                <TabsTrigger value="pending">En attente ({filterOrdersByStatus('pending').length})</TabsTrigger>
                <TabsTrigger value="processing">En cours ({filterOrdersByStatus('processing').length})</TabsTrigger>
                <TabsTrigger value="shipped">Expédiées ({filterOrdersByStatus('shipped').length})</TabsTrigger>
                <TabsTrigger value="delivered">Livrées ({filterOrdersByStatus('delivered').length})</TabsTrigger>
                <TabsTrigger value="cancelled">Annulées ({filterOrdersByStatus('cancelled').length})</TabsTrigger>
              </TabsList>

              {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                <TabsContent key={status} value={status} className="space-y-4">
                  {filterOrdersByStatus(status).map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.status)}
                              {getStatusBadge(order.status)}
                            </div>
                            <div>
                              <CardTitle className="text-lg">Commande {order.id}</CardTitle>
                              <p className="text-sm text-gray-600">
                                Passée le {formatDate(order.orderDate)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              {formatPrice(order.total)}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              {getPaymentMethodIcon(order.paymentMethod)}
                              {getPaymentStatusBadge(order.paymentStatus)}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        {/* Articles de la commande */}
                        <div className="space-y-4 mb-6">
                          <h4 className="font-semibold">Articles commandés</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                                <div className="relative w-12 h-12 flex-shrink-0">
                                  <Image
                                    src={item.image || '/placeholder.jpg'}
                                    alt={item.name}
                                    fill
                                    className="object-cover rounded"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = '/placeholder.jpg'
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{item.name}</p>
                                  <p className="text-sm text-gray-500">
                                    Qté: {item.quantity} • {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Informations de livraison */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              Adresse de livraison
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>{order.customerInfo.name}</p>
                              <p>{order.shippingAddress}</p>
                              <p>{order.customerInfo.city}</p>
                              <p>Tél: {order.customerInfo.phone}</p>
                              <p>Email: {order.customerInfo.email}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              Informations de livraison
                            </h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>Méthode: {getPaymentMethodText(order.paymentMethod)}</p>
                              {order.trackingNumber && (
                                <p>Numéro de suivi: {order.trackingNumber}</p>
                              )}
                              {order.estimatedDelivery && (
                                <p>Livraison estimée: {formatDate(order.estimatedDelivery)}</p>
                              )}
                              {order.notes && (
                                <p>Notes: {order.notes}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <Button onClick={() => setSelectedOrder(order)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Voir les détails
                            </Button>
                            <Button>
                              <Download className="w-4 h-4 mr-2" />
                              Télécharger
                            </Button>
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.items.length} article{order.items.length > 1 ? 's' : ''}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </>
        )}
      </div>

      {/* Modal de détails de commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Détails de la commande {selectedOrder.id}</h2>
                <Button onClick={() => setSelectedOrder(null)}>×</Button>
              </div>
              
              {/* Contenu détaillé de la commande */}
              <div className="space-y-6">
                {/* Statut et informations générales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Statut de la commande</h3>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedOrder.status)}
                      {getStatusBadge(selectedOrder.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Statut du paiement</h3>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(selectedOrder.paymentMethod)}
                      {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                    </div>
                  </div>
                </div>

                {/* Articles détaillés */}
                <div>
                  <h3 className="font-semibold mb-4">Articles commandés</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || '/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.quantity} × {formatPrice(item.price)}</p>
                          <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Résumé financier */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Résumé financier</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span className="text-green-600">Gratuite</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 