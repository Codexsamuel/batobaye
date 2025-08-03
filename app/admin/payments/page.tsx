"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

interface Payment {
  id: number
  reference_type: string
  reference_id: number
  amount: number
  payment_method: string
  payment_date: string
  notes: string
}

interface Sale {
  id: number
  customer_name: string
  customer_phone: string
  customer_email?: string
  sale_date: string
  total_amount: number
  payment_status: string
  payment_method: string
  notes: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchPayments()
    fetchSales()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments')
      if (response.ok) {
        const data = await response.json()
        setPayments(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paiements:', error)
    }
  }

  const fetchSales = async () => {
    try {
      const response = await fetch('/api/sales')
      if (response.ok) {
        const data = await response.json()
        setSales(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des ventes:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Échoué</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customer_phone.includes(searchTerm) ||
                         sale.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || sale.payment_status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const totalRevenue = sales
    .filter(sale => sale.payment_status === 'paid')
    .reduce((sum, sale) => sum + sale.total_amount, 0)

  const pendingPayments = sales.filter(sale => sale.payment_status === 'pending').length
  const successfulPayments = sales.filter(sale => sale.payment_status === 'paid').length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Paiements CinetPay</h1>
          <p className="text-gray-600">Gestion des paiements et transactions</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatAmount(totalRevenue)}</div>
            <p className="text-xs text-gray-600">Tous les paiements réussis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paiements Réussis</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulPayments}</div>
            <p className="text-xs text-gray-600">Transactions confirmées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-gray-600">Paiements en cours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Succès</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {sales.length > 0 ? Math.round((successfulPayments / sales.length) * 100) : 0}%
            </div>
            <p className="text-xs text-gray-600">Paiements réussis</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par client, téléphone, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Tous les statuts</option>
              <option value="paid">Payé</option>
              <option value="pending">En attente</option>
              <option value="failed">Échoué</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des ventes */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions Récentes</CardTitle>
          <CardDescription>
            Liste des ventes et leurs statuts de paiement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sale.customer_name}</div>
                      <div className="text-sm text-gray-500">{sale.customer_phone}</div>
                      {sale.customer_email && (
                        <div className="text-sm text-gray-500">{sale.customer_email}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatAmount(sale.total_amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {sale.payment_method === 'cinetpay' ? 'CinetPay' : sale.payment_method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(sale.payment_status)}
                      {getStatusBadge(sale.payment_status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDate(sale.sale_date)}
                  </TableCell>
                  <TableCell>
                    <Button size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 