"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Database, Package, Users, ShoppingCart, Download, Upload, 
  RefreshCw, Trash2, Eye, Edit, Plus, Search, Filter,
  HardDrive, Server, Shield, Activity, Clock, Check, X
} from "lucide-react"

const databaseStats = [
  {
    name: "Produits",
    count: 1542,
    size: "2.3 MB",
    status: "active",
    lastUpdate: "2024-01-15 14:30"
  },
  {
    name: "Clients",
    count: 2847,
    size: "1.8 MB",
    status: "active",
    lastUpdate: "2024-01-15 14:25"
  },
  {
    name: "Commandes",
    count: 15847,
    size: "5.2 MB",
    status: "active",
    lastUpdate: "2024-01-15 14:20"
  },
  {
    name: "Transactions",
    count: 12563,
    size: "3.1 MB",
    status: "active",
    lastUpdate: "2024-01-15 14:15"
  }
]

const backups = [
  {
    id: "backup-001",
    name: "Sauvegarde complète",
    date: "2024-01-15 14:00",
    size: "12.4 MB",
    status: "completed",
    type: "full"
  },
  {
    id: "backup-002",
    name: "Sauvegarde incrémentale",
    date: "2024-01-14 14:00",
    size: "2.1 MB",
    status: "completed",
    type: "incremental"
  },
  {
    id: "backup-003",
    name: "Sauvegarde automatique",
    date: "2024-01-13 14:00",
    size: "11.8 MB",
    status: "completed",
    type: "full"
  }
]

export default function DatabaseManager() {
  const [selectedTable, setSelectedTable] = useState("products")
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Database className="h-8 w-8 text-orange-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Gestion de Base de Données
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                <Shield className="w-3 h-3 mr-1" />
                Sécurisé
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0">
                <Download className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Database Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {databaseStats.map((stat) => (
              <Card key={stat.name} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.count.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{stat.size}</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Database className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge className={`text-xs ${
                      stat.status === 'active' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-red-100 text-red-800 border-red-200'
                    } border`}>
                      {stat.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                    <span className="text-xs text-gray-500">{stat.lastUpdate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tables Management */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestion des Tables</span>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Table
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Rechercher une table..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Table</TableHead>
                        <TableHead>Enregistrements</TableHead>
                        <TableHead>Taille</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {databaseStats.map((table) => (
                        <TableRow key={table.name} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{table.name}</TableCell>
                          <TableCell>{table.count.toLocaleString()}</TableCell>
                          <TableCell>{table.size}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              table.status === 'active' 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-red-100 text-red-800 border-red-200'
                            } border`}>
                              {table.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Backup Management */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sauvegardes</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Restaurer
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {backups.map((backup) => (
                    <div key={backup.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{backup.name}</h4>
                        <Badge className={`text-xs ${
                          backup.status === 'completed' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        } border`}>
                          {backup.status === 'completed' ? 'Terminé' : 'En cours'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{backup.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taille:</span>
                          <span>{backup.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="capitalize">{backup.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Télécharger
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Database Health */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Santé de la Base de Données</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Performance</h3>
                  <p className="text-2xl font-bold text-green-600">98%</p>
                  <p className="text-sm text-gray-600">Excellent</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Disponibilité</h3>
                  <p className="text-2xl font-bold text-blue-600">99.9%</p>
                  <p className="text-sm text-gray-600">Très bon</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <HardDrive className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Espace</h3>
                  <p className="text-2xl font-bold text-orange-600">75%</p>
                  <p className="text-sm text-gray-600">Utilisé</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Sauvegarde automatique terminée</p>
                    <p className="text-sm text-gray-600">Il y a 2 heures</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 border">
                    Succès
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Nouveau produit ajouté</p>
                    <p className="text-sm text-gray-600">Il y a 4 heures</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                    Info
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Optimisation de la base de données</p>
                    <p className="text-sm text-gray-600">Il y a 6 heures</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 border">
                    Maintenance
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 