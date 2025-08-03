"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Eye, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const orders = [
    {
      id: 'ORD-001',
      customer: {
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+237 690 12 34 56',
        address: 'Akwa, Douala, Cameroun'
      },
      products: [
        { name: 'Réfrigérateur Samsung 350L', quantity: 1, price: 450000 },
        { name: 'TV LG 55" 4K', quantity: 1, price: 380000 }
      ],
      total: 830000,
      status: 'pending',
      paymentStatus: 'paid',
      orderDate: '2024-01-15T10:30:00',
      deliveryDate: '2024-01-17T14:00:00',
      shippingAddress: 'Akwa, Douala, Cameroun',
      notes: 'Livraison en matinée préférée'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Marie Nguemo',
        email: 'marie.nguemo@email.com',
        phone: '+237 691 23 45 67',
        address: 'Bali, Douala, Cameroun'
      },
      products: [
        { name: 'Cuisinière 4 feux + Four', quantity: 1, price: 180000 }
      ],
      total: 180000,
      status: 'processing',
      paymentStatus: 'paid',
      orderDate: '2024-01-14T15:45:00',
      deliveryDate: '2024-01-16T10:00:00',
      shippingAddress: 'Bali, Douala, Cameroun',
      notes: ''
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Pierre Mbarga',
        email: 'pierre.mbarga@email.com',
        phone: '+237 692 34 56 78',
        address: 'Deido, Douala, Cameroun'
      },
      products: [
        { name: 'Congélateur Hisense 200L', quantity: 1, price: 320000 },
        { name: 'Chauffe-eau Ariston 100L', quantity: 1, price: 85000 }
      ],
      total: 405000,
      status: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2024-01-13T09:15:00',
      deliveryDate: '2024-01-15T16:30:00',
      shippingAddress: 'Deido, Douala, Cameroun',
      notes: 'Appeler avant livraison'
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Sophie Etoa',
        email: 'sophie.etoa@email.com',
        phone: '+237 693 45 67 89',
        address: 'Bonamoussadi, Douala, Cameroun'
      },
      products: [
        { name: 'Lave-linge 8kg', quantity: 1, price: 250000 }
      ],
      total: 250000,
      status: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2024-01-12T11:20:00',
      deliveryDate: '2024-01-14T13:15:00',
      shippingAddress: 'Bonamoussadi, Douala, Cameroun',
      notes: 'Livraison effectuée avec succès'
    },
    {
      id: 'ORD-005',
      customer: {
        name: 'David Nkeng',
        email: 'david.nkeng@email.com',
        phone: '+237 694 56 78 90',
        address: 'Makepe, Douala, Cameroun'
      },
      products: [
        { name: 'TV Samsung 55" QLED', quantity: 1, price: 380000 }
      ],
      total: 380000,
      status: 'cancelled',
      paymentStatus: 'refunded',
      orderDate: '2024-01-11T14:30:00',
      deliveryDate: null,
      shippingAddress: 'Makepe, Douala, Cameroun',
      notes: 'Commande annulée par le client'
    }
  ]

  const statuses = [
    { id: 'all', name: 'Toutes les commandes', count: orders.length },
    { id: 'pending', name: 'En attente', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', name: 'En traitement', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', name: 'Expédiée', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', name: 'Livrée', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', name: 'Annulée', count: orders.filter(o => o.status === 'cancelled').length }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center"><Clock className="w-3 h-3 mr-1" />En attente</Badge>
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 flex items-center"><Package className="w-3 h-3 mr-1" />En traitement</Badge>
      case 'shipped':
        return <Badge className="bg-purple-100 text-purple-800 flex items-center"><Truck className="w-3 h-3 mr-1" />Expédiée</Badge>
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800 flex items-center"><CheckCircle className="w-3 h-3 mr-1" />Livrée</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 flex items-center"><AlertCircle className="w-3 h-3 mr-1" />Annulée</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'refunded':
        return <Badge className="bg-blue-100 text-blue-800">Remboursé</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Échoué</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark flex items-center">
            <ShoppingCart className="w-8 h-8 mr-3 text-blue-500" />
            Gestion des Commandes
          </h1>
          <p className="text-gray-600 mt-1">Suivez et gérez toutes vos commandes</p>
        </div>
        <div className="flex space-x-2">
          <Button className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Package className="w-4 h-4 mr-2" />
            Nouvelle Commande
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="flex items-center text-sm">
              <span className="text-green-600">+12%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(orders.reduce((sum, o) => sum + o.total, 0) / 1000000).toFixed(1)}M FCFA
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600">+8.5%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-yellow-600">À traiter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livrées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="flex items-center text-sm">
              <span className="text-green-600">+15.2%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres et Recherche</CardTitle>
          <CardDescription>Trouvez rapidement vos commandes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par ID, nom client, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date
              </Button>
              <Button variant="outline">
                Trier
              </Button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {statuses.map((status) => (
              <Button key={status.id}
                variant={selectedStatus === status.id ? "default" : "outline"}
                onClick={() => setSelectedStatus(status.id)}
                className="flex items-center"
              >
                {status.name}
                <Badge className="ml-2">
                  {status.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      {getStatusBadge(order.status)}
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-batobaye-primary">
                        {order.total.toLocaleString()} FCFA
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.products.length} produit{order.products.length > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{order.customer.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{order.customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{order.customer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{order.shippingAddress}</span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{product.name} x{product.quantity}</span>
                        <span className="font-medium">{product.price.toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Commande: {formatDate(order.orderDate)}</span>
                      {order.deliveryDate && (
                        <span>Livraison: {formatDate(order.deliveryDate)}</span>
                      )}
                    </div>
                    {order.notes && (
                      <span className="italic">"{order.notes}"</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2 lg:ml-6">
                  <Button className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    Voir détails
                  </Button>
                  <Button className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    Traiter
                  </Button>
                  <Button className="flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    Expédier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune commande trouvée</h3>
            <p className="text-gray-500 mb-4">
              Aucune commande ne correspond à vos critères de recherche.
            </p>
            <Button>
              <Package className="w-4 h-4 mr-2" />
              Créer une commande
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 