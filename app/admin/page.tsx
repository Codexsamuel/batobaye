"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Target,
  Plus,
  Eye,
  Edit,
} from "lucide-react"

const stats = [
  {
    title: "Chiffre d'Affaires",
    value: "15,847,000 FCFA",
    change: "+23.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Commandes Totales",
    value: "2,847",
    change: "+12.3%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Produits Actifs",
    value: "1,542",
    change: "+45",
    icon: Package,
    color: "text-purple-600",
  },
  {
    title: "Taux de Conversion",
    value: "3.2%",
    change: "+0.8%",
    icon: Target,
    color: "text-indigo-600",
  },
]

const orders = [
  {
    id: "CMD-2024-001",
    customer: "Jean Mbarga",
    products: ["Réfrigérateur Brigo 350L"],
    total: 450000,
    status: "En cours",
    date: "2024-01-15",
  },
  {
    id: "CMD-2024-002",
    customer: "Marie Nguemo",
    products: ["Congélateur 200L"],
    total: 320000,
    status: "Livré",
    date: "2024-01-14",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "Livré":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Rendu côté serveur - afficher un loader simple
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'administration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar simplifié */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Batobaye Admin</h1>
          </div>
          <nav className="mt-6">
            <div className="px-6 py-2">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Tableau de bord
              </button>
            </div>
            <div className="px-6 py-2">
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "products" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Produits
              </button>
            </div>
            <div className="px-6 py-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "orders" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Commandes
              </button>
            </div>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col">
          {/* Topbar simplifié */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {activeTab === "dashboard" && "Tableau de Bord"}
              {activeTab === "products" && "Gestion des Produits"}
              {activeTab === "orders" && "Gestion des Commandes"}
            </h2>
          </div>

          {/* Contenu */}
          <main className="flex-1 p-6">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
                
                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-green-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Commandes récentes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes Récentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commande</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <code className="bg-gray-100 px-2 py-1 rounded">{order.id}</code>
                            </TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Gestion des Produits</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau Produit
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Interface de gestion des produits à venir...</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Gestion des Commandes</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Commande
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commande</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>
                              <code className="bg-gray-100 px-2 py-1 rounded">{order.id}</code>
                            </TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="font-semibold">{formatPrice(order.total)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
