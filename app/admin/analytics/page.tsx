"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, DollarSign,
  ShoppingCart, Users, Package, Target, Calendar, Clock, Download,
  Filter, RefreshCw, Eye, EyeOff, Settings, Zap, Activity, Target as TargetIcon
} from "lucide-react"

// Données de démonstration pour les analytics
const analyticsData = {
  overview: {
    totalRevenue: 15847000,
    totalOrders: 2847,
    totalCustomers: 1542,
    conversionRate: 3.2,
    averageOrderValue: 5568,
    growthRate: 23.5
  },
  trends: [
    { month: "Jan", revenue: 12000000, orders: 2100, customers: 1200 },
    { month: "Fév", revenue: 13500000, orders: 2350, customers: 1280 },
    { month: "Mar", revenue: 14200000, orders: 2480, customers: 1320 },
    { month: "Avr", revenue: 15847000, orders: 2847, customers: 1542 }
  ],
  topProducts: [
    { name: "Réfrigérateur Brigo 350L", sales: 45, revenue: 20250000, growth: 23 },
    { name: "Congélateur 200L", sales: 38, revenue: 12160000, growth: 18 },
    { name: "Gazinière 4 feux", sales: 32, revenue: 6400000, growth: 15 },
    { name: "Mixeur électrique", sales: 28, revenue: 2800000, growth: 12 }
  ],
  customerSegments: [
    { segment: "Nouveaux", count: 450, percentage: 29 },
    { segment: "Réguliers", count: 892, percentage: 58 },
    { segment: "VIP", count: 200, percentage: 13 }
  ]
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [showDetails, setShowDetails] = useState(true)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(num)
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Avancés</h1>
          <p className="text-gray-600 mt-1">Analyses détaillées et insights business</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showDetails ? "Masquer détails" : "Afficher détails"}
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filtres de temps */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Période :</span>
            </div>
            <div className="flex space-x-1">
              {["7j", "30d", "90d", "1a"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={timeRange === range ? "bg-blue-600 text-white" : ""}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200 border">
                +{analyticsData.overview.growthRate}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(analyticsData.overview.totalRevenue)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Chiffre d'affaires</p>
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Panier moyen</span>
                  <span>{formatPrice(analyticsData.overview.averageOrderValue)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                +12.3%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analyticsData.overview.totalOrders)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Commandes totales</p>
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Taux de conversion</span>
                  <span>{analyticsData.overview.conversionRate}%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 border">
                +8.7%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analyticsData.overview.totalCustomers)}
            </div>
            <p className="text-sm text-gray-600 mt-1">Clients actifs</p>
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Nouveaux ce mois</span>
                  <span>+{formatNumber(450)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 border">
                +0.8%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analyticsData.overview.conversionRate}%
            </div>
            <p className="text-sm text-gray-600 mt-1">Taux de conversion</p>
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Objectif</span>
                  <span>4.0%</span>
                </div>
                <Progress value={80} className="mt-2" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Onglets d'analyses détaillées */}
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Tendances</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Produits</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Clients</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Performance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="w-5 h-5 mr-2" />
                  Évolution des Ventes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.trends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{trend.month}</div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(trend.orders)} commandes
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          {formatPrice(trend.revenue)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatNumber(trend.customers)} clients
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Croissance Mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Chiffre d'affaires</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-green-600">+23.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Commandes</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">+12.3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Clients</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                      </div>
                      <span className="text-sm font-semibold text-purple-600">+8.7%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Performance des Produits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-600">
                          {product.sales} ventes
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatPrice(product.revenue)}
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200 border">
                        +{product.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Segmentation Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.customerSegments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          'bg-purple-500'
                        }`}></div>
                        <span className="font-medium">{segment.segment}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatNumber(segment.count)}</div>
                        <div className="text-sm text-gray-600">{segment.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TargetIcon className="w-5 h-5 mr-2" />
                  Comportement Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Taux de rétention</div>
                      <div className="text-sm text-gray-600">Clients fidèles</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">87%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Fréquence d'achat</div>
                      <div className="text-sm text-gray-600">Par client/mois</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">2.3</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium">Valeur vie client</div>
                      <div className="text-sm text-gray-600">LTV moyen</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatPrice(125000)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Métriques de Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">98.5%</div>
                  <div className="text-sm text-gray-600">Disponibilité</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.8/5</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2.3s</div>
                  <div className="text-sm text-gray-600">Temps de réponse</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">95%</div>
                  <div className="text-sm text-gray-600">Objectifs atteints</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 