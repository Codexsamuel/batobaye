"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  BookOpen, DollarSign, RefreshCw, Settings, Check, X, Clock, 
  Activity, TrendingUp, TrendingDown, FileText, Calculator,
  Download, Upload, Eye, Edit, Plus, AlertCircle
} from "lucide-react"

const sageStats = {
  totalRevenue: 15847000,
  totalExpenses: 8750000,
  netProfit: 7097000,
  pendingInvoices: 23,
  lastSync: "2024-01-15 14:30",
  nextSync: "2024-01-15 15:00"
}

const recentTransactions = [
  {
    id: "TXN-001",
    type: "Vente",
    amount: 450000,
    customer: "Jean Mbarga",
    date: "2024-01-15 14:30",
    status: "completed",
    sageId: "SAGE-2024-001"
  },
  {
    id: "TXN-002",
    type: "Achat",
    amount: -320000,
    supplier: "Fournisseur ABC",
    date: "2024-01-15 13:45",
    status: "pending",
    sageId: "SAGE-2024-002"
  },
  {
    id: "TXN-003",
    type: "Vente",
    amount: 180000,
    customer: "Marie Nguemo",
    date: "2024-01-15 12:20",
    status: "completed",
    sageId: "SAGE-2024-003"
  }
]

const pendingInvoices = [
  {
    id: "INV-001",
    customer: "Jean Mbarga",
    amount: 450000,
    dueDate: "2024-01-20",
    status: "pending",
    daysOverdue: 0
  },
  {
    id: "INV-002",
    customer: "Pierre Essomba",
    amount: 320000,
    dueDate: "2024-01-18",
    status: "overdue",
    daysOverdue: 2
  },
  {
    id: "INV-003",
    customer: "Marie Nguemo",
    amount: 180000,
    dueDate: "2024-01-25",
    status: "pending",
    daysOverdue: 0
  }
]

export default function SageIntegration() {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = () => {
    setIsSyncing(true)
    // Simuler une synchronisation
    setTimeout(() => {
      setIsSyncing(false)
    }, 3000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-teal-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Intégration Sage Compta
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white border-0">
                <Calculator className="w-3 h-3 mr-1" />
                Comptabilité
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configuration
              </Button>
              <Button 
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white border-0"
                onClick={handleSync}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Synchronisation...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Synchroniser
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(sageStats.totalRevenue)}</p>
                    <p className="text-sm text-green-600">+23.5% ce mois</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dépenses</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(sageStats.totalExpenses)}</p>
                    <p className="text-sm text-red-600">+12.3% ce mois</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bénéfice net</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(sageStats.netProfit)}</p>
                    <p className="text-sm text-green-600">+18.7% ce mois</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Factures en attente</p>
                    <p className="text-2xl font-bold text-gray-900">{sageStats.pendingInvoices}</p>
                    <p className="text-sm text-orange-600">À traiter</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Transactions Récentes</span>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'Vente' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {transaction.type === 'Vente' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{transaction.type}</h4>
                          <p className="text-sm text-gray-600">
                            {transaction.type === 'Vente' ? transaction.customer : transaction.supplier}
                          </p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatPrice(transaction.amount)}
                        </p>
                        <Badge className={`text-xs ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        } border capitalize`}>
                          {transaction.status === 'completed' ? 'Terminé' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Invoices */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Factures en Attente</span>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 border">
                    {pendingInvoices.length} factures
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{invoice.customer}</h4>
                        <p className="text-sm text-gray-600">Échéance: {invoice.dueDate}</p>
                        {invoice.daysOverdue > 0 && (
                          <p className="text-xs text-red-600">
                            En retard de {invoice.daysOverdue} jour(s)
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(invoice.amount)}</p>
                        <Badge className={`text-xs ${
                          invoice.status === 'overdue' 
                            ? 'bg-red-100 text-red-800 border-red-200' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        } border capitalize`}>
                          {invoice.status === 'overdue' ? 'En retard' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Synchronization Status */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Synchronisation Sage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Dernière synchronisation</div>
                      <div className="text-sm text-gray-600">{sageStats.lastSync}</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200 border">
                      ✓ Réussi
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Prochaine synchronisation</div>
                      <div className="text-sm text-gray-600">{sageStats.nextSync}</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                      Programmé
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Statut de la connexion</div>
                      <div className="text-sm text-gray-600">Sage 100</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200 border">
                      ✓ Connecté
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Actions rapides</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Importer
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      Aperçu
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Settings className="w-4 h-4 mr-2" />
                      Config
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Reports */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Rapports Financiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                  <FileText className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">Rapport de Ventes</div>
                    <div className="text-sm opacity-90">Analyse des ventes</div>
                  </div>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0">
                  <Calculator className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">Bilan Comptable</div>
                    <div className="text-sm opacity-90">État financier</div>
                  </div>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                  <TrendingUp className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">Analyse de Rentabilité</div>
                    <div className="text-sm opacity-90">Performance business</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 