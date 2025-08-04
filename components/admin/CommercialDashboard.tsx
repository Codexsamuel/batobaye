"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown,
  BarChart3, PieChart, LineChart, Calendar, Clock, AlertCircle, 
  CheckCircle, XCircle, RefreshCw, Download, Upload, Filter,
  MoreHorizontal, ChevronRight, ChevronLeft, Star, Heart, 
  MessageSquare, Phone, Mail, MapPin, Globe, Wifi, Lock, Unlock,
  Key, UserCheck, UserX, UserPlus, UserMinus, ShoppingBag, Receipt,
  Calculator, Wallet, PiggyBank, Target, Database, Server, HardDrive,
  Shield, Activity, Settings, Zap, FileText, CreditCard, Truck, Store
} from "lucide-react"

// Données de démonstration pour le dashboard commercial
const commercialStats = [
  {
    title: "Chiffre d'Affaires",
    value: "15,847,000 FCFA",
    change: "+23.5%",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    trend: "up"
  },
  {
    title: "Commandes",
    value: "2,847",
    change: "+12.3%",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    trend: "up"
  },
  {
    title: "Clients",
    value: "1,542",
    change: "+8.7%",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    trend: "up"
  },
  {
    title: "Produits",
    value: "3,284",
    change: "+15.2%",
    icon: Package,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    trend: "up"
  }
]

const topProducts = [
  {
    name: "Réfrigérateur Brigo 350L",
    sales: 45,
    revenue: 20250000,
    growth: "+23%",
    stock: 12
  },
  {
    name: "Congélateur 200L",
    sales: 38,
    revenue: 12160000,
    growth: "+18%",
    stock: 8
  },
  {
    name: "Gazinière 4 feux",
    sales: 32,
    revenue: 6400000,
    growth: "+15%",
    stock: 15
  },
  {
    name: "Mixeur électrique",
    sales: 28,
    revenue: 2800000,
    growth: "+12%",
    stock: 25
  }
]

const recentTransactions = [
  {
    id: "TXN-001",
    customer: "Jean Mbarga",
    amount: 450000,
    type: "Vente",
    status: "Complétée",
    date: "2024-01-15 14:30"
  },
  {
    id: "TXN-002",
    customer: "Marie Nguemo",
    amount: 320000,
    type: "Vente",
    status: "Complétée",
    date: "2024-01-15 13:45"
  },
  {
    id: "TXN-003",
    customer: "Pierre Essomba",
    amount: 180000,
    type: "Vente",
    status: "En cours",
    date: "2024-01-15 12:20"
  },
  {
    id: "TXN-004",
    customer: "Fournisseur ABC",
    amount: -2500000,
    type: "Achat",
    status: "Complétée",
    date: "2024-01-15 11:15"
  }
]

const alerts = [
  {
    type: "warning",
    title: "Stock Faible",
    message: "Réfrigérateur Brigo 350L - Il ne reste que 3 unités",
    icon: AlertCircle
  },
  {
    type: "success",
    title: "Objectif Atteint",
    message: "Vous avez atteint 95% de votre objectif de vente mensuel",
    icon: CheckCircle
  },
  {
    type: "info",
    title: "Nouveau Client",
    message: "Marie Nguemo a effectué sa première commande",
    icon: UserPlus
  }
]

export default function CommercialDashboard() {
  const [isLoading, setIsLoading] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complétée":
        return "bg-green-100 text-green-800 border-green-200"
      case "En cours":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Annulée":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Commercial</h2>
          <p className="text-gray-600 mt-1">Gestion complète de votre activité commerciale</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setIsLoading(true)}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commercialStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge 
                  className={`${
                    stat.trend === "up" 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : "bg-red-100 text-red-800 border-red-200"
                  } border`}
                >
                  {stat.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produits les plus vendus */}
        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Produits les Plus Vendus</CardTitle>
              <Button variant="outline" size="sm">
                Voir tous →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Ventes</TableHead>
                  <TableHead>Revenus</TableHead>
                  <TableHead>Croissance</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sales}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatPrice(product.revenue)}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 border-green-200 border">
                        {product.growth}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{product.stock}</span>
                        {product.stock < 10 && (
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Alertes et notifications */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Alertes & Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start space-x-3">
                    <alert.icon className="h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{alert.title}</h4>
                      <p className="text-sm mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions récentes */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Transactions Récentes</CardTitle>
            <Button variant="outline" size="sm">
              Voir toutes →
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client/Fournisseur</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                      {transaction.id}
                    </code>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.customer}</TableCell>
                  <TableCell className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPrice(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${
                      transaction.type === "Vente" 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-blue-100 text-blue-800 border-blue-200"
                    } border`}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(transaction.status)} border`}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {transaction.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
          <ShoppingCart className="h-8 w-8" />
          <div>
            <div className="font-semibold">Nouvelle Vente</div>
            <div className="text-sm opacity-90">Créer une vente</div>
          </div>
        </Button>

        <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0">
          <Package className="h-8 w-8" />
          <div>
            <div className="font-semibold">Gestion Stock</div>
            <div className="text-sm opacity-90">Vérifier les stocks</div>
          </div>
        </Button>

        <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
          <BarChart3 className="h-8 w-8" />
          <div>
            <div className="font-semibold">Rapports</div>
            <div className="text-sm opacity-90">Générer des rapports</div>
          </div>
        </Button>

        <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
          <Users className="h-8 w-8" />
          <div>
            <div className="font-semibold">Clients</div>
            <div className="text-sm opacity-90">Gérer les clients</div>
          </div>
        </Button>
      </div>
    </div>
  )
} 