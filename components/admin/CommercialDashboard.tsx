'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react'

interface DashboardData {
  sales: {
    totalSales: number
    totalRevenue: number
    totalProfit: number
    averageSale: number
  }
  inventory: {
    totalProducts: number
    totalValue: number
    lowStockProducts: number
    outOfStockProducts: number
    lowStockList: any[]
  }
  suppliers: {
    totalSuppliers: number
    totalCredit: number
    suppliersWithCredit: number
    suppliersWithCreditList: any[]
  }
  cashRegister: {
    opening_amount: number
    total_sales: number
    total_payments: number
    status: string
  } | null
}

export default function CommercialDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/reports?type=dashboard')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
      } else {
        setError('Erreur lors du chargement des données')
      }
    } catch (error) {
      console.error('Erreur:', error)
      setError('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-batobaye-primary" />
        <span className="ml-2">Chargement du tableau de bord...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
        <p>{error}</p>
        <Button onClick={loadDashboardData} className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark">Tableau de Bord Commercial</h1>
          <p className="text-gray-600">Vue d'ensemble de votre activité commerciale</p>
        </div>
        <Button onClick={loadDashboardData} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(data.sales.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(data.sales.totalSales)} ventes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bénéfice Net</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(data.sales.totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              Marge: {data.sales.totalRevenue > 0 ? Math.round((data.sales.totalProfit / data.sales.totalRevenue) * 100) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur Stock</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(data.inventory.totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(data.inventory.totalProducts)} produits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crédit Fournisseurs</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(data.suppliers.totalCredit)}</div>
            <p className="text-xs text-muted-foreground">
              {formatNumber(data.suppliers.suppliersWithCredit)} fournisseurs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets détaillés */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="inventory">Stock</TabsTrigger>
          <TabsTrigger value="suppliers">Fournisseurs</TabsTrigger>
          <TabsTrigger value="cash">Caisse</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ventes récentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Résumé des Ventes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total des ventes:</span>
                  <span className="font-semibold">{formatNumber(data.sales.totalSales)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chiffre d'affaires:</span>
                  <span className="font-semibold">{formatPrice(data.sales.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bénéfice net:</span>
                  <span className="font-semibold text-green-600">{formatPrice(data.sales.totalProfit)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Panier moyen:</span>
                  <span className="font-semibold">{formatPrice(data.sales.averageSale)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Alertes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Alertes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.inventory.lowStockProducts > 0 && (
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-yellow-600 mr-2" />
                      <span>Stock faible</span>
                    </div>
                    <Badge variant="secondary">{data.inventory.lowStockProducts}</Badge>
                  </div>
                )}
                
                {data.inventory.outOfStockProducts > 0 && (
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span>Rupture de stock</span>
                    </div>
                    <Badge variant="destructive">{data.inventory.outOfStockProducts}</Badge>
                  </div>
                )}
                
                {data.suppliers.suppliersWithCredit > 0 && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-blue-600 mr-2" />
                      <span>Crédits fournisseurs</span>
                    </div>
                    <Badge variant="outline">{data.suppliers.suppliersWithCredit}</Badge>
                  </div>
                )}
                
                {(!data.inventory.lowStockProducts && !data.inventory.outOfStockProducts && !data.suppliers.suppliersWithCredit) && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Tout va bien !</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Gestion des Stocks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formatNumber(data.inventory.totalProducts)}</div>
                  <div className="text-sm text-gray-600">Total Produits</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{formatNumber(data.inventory.lowStockProducts)}</div>
                  <div className="text-sm text-gray-600">Stock Faible</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{formatNumber(data.inventory.outOfStockProducts)}</div>
                  <div className="text-sm text-gray-600">Rupture</div>
                </div>
              </div>
              
              {data.inventory.lowStockList.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Produits en stock faible:</h4>
                  <div className="space-y-2">
                    {data.inventory.lowStockList.slice(0, 5).map((product: any) => (
                      <div key={product.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{product.name}</span>
                        <Badge variant="secondary">{product.stock_quantity} en stock</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Fournisseurs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{formatNumber(data.suppliers.totalSuppliers)}</div>
                  <div className="text-sm text-gray-600">Total Fournisseurs</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{formatPrice(data.suppliers.totalCredit)}</div>
                  <div className="text-sm text-gray-600">Crédit Total</div>
                </div>
              </div>
              
              {data.suppliers.suppliersWithCreditList.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Fournisseurs avec crédit:</h4>
                  <div className="space-y-2">
                    {data.suppliers.suppliersWithCreditList.map((supplier: any) => (
                      <div key={supplier.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{supplier.name}</span>
                        <Badge variant="outline">{formatPrice(supplier.current_credit)}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                État de la Caisse
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.cashRegister ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formatPrice(data.cashRegister.opening_amount)}</div>
                      <div className="text-sm text-gray-600">Ouverture</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formatPrice(data.cashRegister.total_sales)}</div>
                      <div className="text-sm text-gray-600">Ventes</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Statut:</span>
                    <Badge variant={data.cashRegister.status === 'open' ? 'default' : 'secondary'}>
                      {data.cashRegister.status === 'open' ? 'Ouverte' : 'Fermée'}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <DollarSign className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Aucune caisse ouverte</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 