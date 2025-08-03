"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  Eye,
  MousePointer,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap
} from 'lucide-react'

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const analyticsData = {
    overview: {
      revenue: { current: 15847000, previous: 12834000, change: 23.5 },
      orders: { current: 2847, previous: 2534, change: 12.3 },
      customers: { current: 1247, previous: 1089, change: 14.5 },
      conversion: { current: 3.2, previous: 2.4, change: 33.3 }
    },
    topProducts: [
      { name: 'Réfrigérateur Samsung 350L', sales: 156, revenue: 23400000, growth: 12.5 },
      { name: 'TV LG 55" 4K', sales: 89, revenue: 17800000, growth: 8.7 },
      { name: 'Cuisinière 4 feux + Four', sales: 234, revenue: 42120000, growth: 15.2 },
      { name: 'Congélateur Hisense 200L', sales: 67, revenue: 21440000, growth: 5.3 },
      { name: 'Chauffe-eau Ariston 100L', sales: 189, revenue: 16065000, growth: 18.9 }
    ],
    traffic: {
      sources: [
        { source: 'Google Search', visitors: 4567, percentage: 45.2 },
        { source: 'Direct', visitors: 2341, percentage: 23.1 },
        { source: 'Facebook', visitors: 1234, percentage: 12.2 },
        { source: 'WhatsApp', visitors: 987, percentage: 9.8 },
        { source: 'Autres', visitors: 987, percentage: 9.7 }
      ],
      pages: [
        { page: 'Page d\'accueil', views: 12345, unique: 8765 },
        { page: 'Produits', views: 9876, unique: 6543 },
        { page: 'À propos', views: 5432, unique: 4321 },
        { page: 'Contact', views: 3456, unique: 2987 }
      ]
    },
    sales: {
      daily: [
        { date: '2024-01-01', sales: 450000, orders: 12 },
        { date: '2024-01-02', sales: 520000, orders: 15 },
        { date: '2024-01-03', sales: 380000, orders: 11 },
        { date: '2024-01-04', sales: 610000, orders: 18 },
        { date: '2024-01-05', sales: 490000, orders: 14 },
        { date: '2024-01-06', sales: 720000, orders: 22 },
        { date: '2024-01-07', sales: 680000, orders: 20 }
      ]
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark flex items-center">
            <BarChart3 className="w-8 h-8 mr-3 text-blue-500" />
            Analytics
          </h1>
          <p className="text-gray-600 mt-1">Analysez les performances de votre boutique</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Période
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Zap className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.revenue.current.toLocaleString()} FCFA</div>
            <div className="flex items-center text-sm">
              {analyticsData.overview.revenue.change > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              )}
              <span className={analyticsData.overview.revenue.change > 0 ? "text-green-600" : "text-red-600"}>
                +{analyticsData.overview.revenue.change}%
              </span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.orders.current.toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+{analyticsData.overview.orders.change}%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.customers.current.toLocaleString()}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+{analyticsData.overview.customers.change}%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <Target className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.conversion.current}%</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+{analyticsData.overview.conversion.change}%</span>
              <span className="text-gray-500 ml-1">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="traffic">Trafic</TabsTrigger>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des Ventes</CardTitle>
                <CardDescription>Performance des 7 derniers jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Graphique des ventes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sources de Trafic</CardTitle>
                <CardDescription>D'où viennent vos visiteurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.traffic.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{source.visitors.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{source.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Produits les Plus Vendus</CardTitle>
              <CardDescription>Top 5 des produits par chiffre d'affaires</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-batobaye-primary rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sales} ventes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{product.revenue.toLocaleString()} FCFA</div>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-green-600">+{product.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pages les Plus Visitées</CardTitle>
                <CardDescription>Performance des pages de votre site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.traffic.pages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{page.page}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{page.views.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{page.unique.toLocaleString()} uniques</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Géographie des Visiteurs</CardTitle>
                <CardDescription>Répartition géographique</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Carte géographique</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Ventes</CardTitle>
              <CardDescription>Analyse détaillée des ventes quotidiennes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.sales.daily.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-batobaye-primary rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{new Date(day.date).toLocaleDateString('fr-FR')}</div>
                        <div className="text-sm text-gray-500">{day.orders} commandes</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{day.sales.toLocaleString()} FCFA</div>
                      <Badge variant="secondary">{day.orders} commandes</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 