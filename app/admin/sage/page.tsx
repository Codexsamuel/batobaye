'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  TrendingUp, 
  Package, 
  DollarSign, 
  FileText,
  BookOpen,
  BarChart3,
  Users,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Settings,
  Zap
} from 'lucide-react'
import SageProductManager from '@/components/admin/SageProductManager'
import SageAccountingDashboard from '@/components/admin/SageAccountingDashboard'

const modules = [
  {
    id: 'products',
    name: 'Gestion Produits',
    description: 'Création et gestion des produits avec calculs automatiques',
    icon: Package,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    status: 'active'
  },
  {
    id: 'accounting',
    name: 'Comptabilité',
    description: 'Gestion comptable complète avec journaux et bilans',
    icon: Calculator,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    status: 'active'
  },
  {
    id: 'sales',
    name: 'Ventes & Facturation',
    description: 'Gestion des ventes, devis et factures',
    icon: ShoppingCart,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    status: 'active'
  },
  {
    id: 'inventory',
    name: 'Gestion Stock',
    description: 'Suivi des stocks et alertes de réapprovisionnement',
    icon: Package,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    status: 'active'
  },
  {
    id: 'suppliers',
    name: 'Fournisseurs',
    description: 'Gestion des fournisseurs et commandes',
    icon: Users,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    status: 'active'
  },
  {
    id: 'reports',
    name: 'Rapports & Analytics',
    description: 'Tableaux de bord et analyses commerciales',
    icon: BarChart3,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    status: 'active'
  }
]

export default function SageAdminPage() {
  const [activeModule, setActiveModule] = useState('overview')

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'products':
        return <SageProductManager />
      case 'accounting':
        return <SageAccountingDashboard />
      case 'sales':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Module Ventes & Facturation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Module en cours de développement...</p>
            </CardContent>
          </Card>
        )
      case 'inventory':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Module Gestion Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Module en cours de développement...</p>
            </CardContent>
          </Card>
        )
      case 'suppliers':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Module Fournisseurs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Module en cours de développement...</p>
            </CardContent>
          </Card>
        )
      case 'reports':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Module Rapports & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Module en cours de développement...</p>
            </CardContent>
          </Card>
        )
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Système SAGE SAARI</h2>
              <p className="text-gray-600 mb-8">
                Gestion commerciale complète inspirée de SAGE SAARI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card 
                  key={module.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveModule(module.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${module.bgColor}`}>
                        <module.icon className={`w-6 h-6 ${module.color}`} />
                      </div>
                      <Badge variant={module.status === 'active' ? 'default' : 'secondary'}>
                        {module.status === 'active' ? 'Actif' : 'En développement'}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{module.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Fonctionnalités SAGE SAARI Implémentées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">✅ Calculs Commerciaux</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Calcul automatique HT/TVA/TTC</li>
                      <li>• Calcul des marges bénéficiaires</li>
                      <li>• Gestion des remises</li>
                      <li>• Calcul des seuils de réapprovisionnement</li>
                      <li>• Valorisation des stocks (CUMP)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">✅ Gestion Comptable</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Journal comptable</li>
                      <li>• Bilan simplifié</li>
                      <li>• Compte de résultat</li>
                      <li>• Gestion TVA</li>
                      <li>• Export des rapports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {activeModule !== 'overview' && (
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setActiveModule('overview')}
              className="mb-4"
            >
              ← Retour au tableau de bord
            </Button>
            <h2 className="text-2xl font-bold">
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
          </div>
        </div>
      )}

      {renderModuleContent()}
    </div>
  )
} 