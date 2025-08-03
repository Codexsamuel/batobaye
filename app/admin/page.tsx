"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Topbar } from "@/components/admin/Topbar"
import { AssistantIA } from "@/components/admin/AssistantIA"
import CommercialDashboard from "@/components/admin/CommercialDashboard"
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

  // Rendu côté serveur - afficher un loader
  if (!isClient) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du tableau de bord...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" && (
          <CommercialDashboard />
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
                            <Button variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline">
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
                  <div className="text-2xl font-bold">12,847</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Taux de Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +0.8% par rapport au mois dernier
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Paramètres</h2>
            <p className="text-gray-600">
              Configurez les paramètres de votre boutique et de votre compte.
            </p>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600">Interface de paramètres à venir...</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
