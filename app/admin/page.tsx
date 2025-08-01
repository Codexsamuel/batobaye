"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Topbar } from "@/components/admin/Topbar"
import { AssistantIA } from "@/components/admin/AssistantIA"
import {
  BarChart3,
  Package,
  ShoppingCart,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  DollarSign,
  Target,
  Database,
  Server,
  HardDrive,
  Shield,
  Activity,
  Settings,
  Zap,
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
  const [searchTerm, setSearchTerm] = useState("")

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

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-batobaye-dark mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <span className={`text-sm ${stat.color} font-medium`}>{stat.change}</span>
                          <TrendingUp className={`w-4 h-4 ml-1 ${stat.color}`} />
                        </div>
                      </div>
                      <div className="p-3 rounded-full bg-gray-100">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-batobaye-primary" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("products")}
                  >
                    <Plus className="w-6 h-6" />
                    <span className="text-sm font-medium">Nouveau Produit</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="text-sm font-medium">Voir Commandes</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("analytics")}
                  >
                    <BarChart3 className="w-6 h-6" />
                    <span className="text-sm font-medium">Analytics</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("maintenance")}
                  >
                    <Settings className="w-6 h-6" />
                    <span className="text-sm font-medium">Maintenance</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Gestion des Produits</h2>
              <Button className="bg-batobaye-primary hover:bg-batobaye-light">
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
              <Button className="bg-batobaye-primary hover:bg-batobaye-light">
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
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
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

        {activeTab === "ai-assistant" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">🧠 Kodee – Assistant IA</h2>
            <p className="text-gray-600">
              Votre assistant intelligent pour générer des descriptions et optimiser les prix.
            </p>
            <AssistantIA />
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Statistiques</h2>
            <p className="text-gray-600">
              Ce module affichera les visites, clics, top produits et autres données analytiques.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visites du Site</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">48,392</p>
                  <p className="text-sm text-gray-500">+18.7% par rapport au mois dernier</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Produits les Plus Vus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>1. Réfrigérateur Brigo 350L (1250 vues)</li>
                    <li>2. Congélateur 200L (2100 vues)</li>
                    <li>3. TV Samsung 55" QLED (890 vues)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Maintenance Système</h2>
            <p className="text-gray-600">Outils de maintenance et surveillance du système.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="w-5 h-5 mr-2" />
                    Serveur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>CPU</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RAM</span>
                      <span>67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HardDrive className="w-5 h-5 mr-2" />
                    Sauvegardes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Dernière sauvegarde</span>
                      <Badge className="bg-green-100 text-green-800">Aujourd'hui</Badge>
                    </div>
                    <Button className="w-full">
                      Créer Sauvegarde
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>SSL</span>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Firewall</span>
                      <Badge className="bg-green-100 text-green-800">Actif</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
