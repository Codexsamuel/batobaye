'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Zap,
  Target,
  Users,
  DollarSign,
  Activity,
  Eye,
  Settings,
  Download,
  RefreshCw
} from 'lucide-react'
import { dlManagementSystem, DLUtils } from '@/lib/dl-solutions-management'

interface AIDashboardData {
  operationalEfficiency: number
  financialHealth: number
  complianceScore: number
  customerSatisfaction: number
  innovationIndex: number
  sustainabilityScore: number
  aiConfidence: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  anomalies: string[]
  recommendations: string[]
  predictions: any
}

export default function DLManagementDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState<AIDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulation des données DL Solutions Management
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      
      // Données simulées pour la démonstration
      const mockData = {
        productivity: 85,
        quality: 92,
        deliveryTime: 88,
        profitability: 78,
        liquidity: 82,
        solvency: 87,
        customerSatisfaction: 89,
        innovationIndex: 75,
        sustainabilityScore: 83,
        salesHistory: [
          { amount: 450000, date: new Date('2024-01-15') },
          { amount: 320000, date: new Date('2024-01-14') },
          { amount: 280000, date: new Date('2024-01-13') },
          { amount: 380000, date: new Date('2024-01-12') },
          { amount: 420000, date: new Date('2024-01-11') },
          { amount: 350000, date: new Date('2024-01-10') }
        ]
      }

      try {
        const report = await dlManagementSystem.generatePerformanceReport(mockData)
        
        setDashboardData({
          operationalEfficiency: report.metrics.operationalEfficiency,
          financialHealth: report.metrics.financialHealth,
          complianceScore: report.metrics.complianceScore,
          customerSatisfaction: report.metrics.customerSatisfaction,
          innovationIndex: report.metrics.innovationIndex,
          sustainabilityScore: report.metrics.sustainabilityScore,
          aiConfidence: 0.92,
          riskLevel: 'low',
          anomalies: [],
          recommendations: report.recommendations,
          predictions: report.predictions
        })
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
        setLastUpdate(new Date())
      }
    }

    loadDashboardData()
  }, [])

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-orange-600 bg-orange-50'
      case 'critical': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const refreshData = async () => {
    setLoading(true)
    // Simuler un rafraîchissement
    setTimeout(() => {
      setLoading(false)
      setLastUpdate(new Date())
    }, 1000)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Chargement DL Solutions Management...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-blue-600">🚀 DL Solutions Management</h2>
          <p className="text-gray-600">ERP Intelligent avec IA Avancée - DL Solutions SARL Novacore</p>
          <p className="text-sm text-gray-500">
            Dernière mise à jour: {lastUpdate.toLocaleString('fr-FR')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Brain className="w-4 h-4 mr-1" />
            IA Active
          </Badge>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="ai">IA & Contrôle</TabsTrigger>
          <TabsTrigger value="compliance">Conformité</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* KPIs Principaux */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Opérationnelle</CardTitle>
                <Activity className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData?.operationalEfficiency || 0)}`}>
                  {dashboardData?.operationalEfficiency.toFixed(1)}%
                </div>
                <Progress value={dashboardData?.operationalEfficiency} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Productivité, Qualité, Délais
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Santé Financière</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData?.financialHealth || 0)}`}>
                  {dashboardData?.financialHealth.toFixed(1)}%
                </div>
                <Progress value={dashboardData?.financialHealth} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Rentabilité, Liquidité, Solvabilité
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conformité OHADA</CardTitle>
                <Shield className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData?.complianceScore || 0)}`}>
                  {dashboardData?.complianceScore.toFixed(1)}%
                </div>
                <Progress value={dashboardData?.complianceScore} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Normes comptables et fiscales
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Métriques Secondaires */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Satisfaction Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData?.customerSatisfaction || 0)}`}>
                  {dashboardData?.customerSatisfaction.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Basé sur les retours clients et la fidélisation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Index d'Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData?.innovationIndex || 0)}`}>
                  {dashboardData?.innovationIndex.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Adoption de nouvelles technologies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Durabilité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getScoreColor(dashboardData?.sustainabilityScore || 0)}`}>
                  {dashboardData?.sustainabilityScore.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Responsabilité sociale et environnementale
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contrôle IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Contrôle IA Avancé
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Confiance IA:</span>
                  <span className="font-semibold">{(dashboardData?.aiConfidence || 0) * 100}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Niveau de risque:</span>
                  <Badge className={getRiskColor(dashboardData?.riskLevel || 'low')}>
                    {dashboardData?.riskLevel?.toUpperCase() || 'LOW'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Anomalies détectées:</h4>
                  {dashboardData?.anomalies.length ? (
                    <ul className="text-sm text-red-600 space-y-1">
                      {dashboardData.anomalies.map((anomaly, index) => (
                        <li key={index} className="flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-2" />
                          {anomaly}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2" />
                      Aucune anomalie détectée
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recommandations IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Recommandations IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData?.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                      <Target className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Contrôle de Conformité OHADA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Vérifications Automatiques</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Normes comptables:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conforme
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conformité fiscale:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conforme
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Précision des stocks:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conforme
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rapports financiers:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conforme
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Traçabilité:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conforme
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Intégrité des données:</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Conforme
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Score Global de Conformité</h4>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">
                      {dashboardData?.complianceScore.toFixed(1)}%
                    </div>
                    <Progress value={dashboardData?.complianceScore} className="mt-4" />
                    <p className="text-sm text-gray-600 mt-2">
                      Conformité OHADA et réglementaire
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prédictions de Ventes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Prédictions IA - Ventes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {DLUtils.formatCurrency(dashboardData?.predictions?.nextMonthPrediction || 0)}
                  </div>
                  <p className="text-sm text-gray-600">Prédiction du mois prochain</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Tendance:</span>
                    <Badge className={
                      dashboardData?.predictions?.trend === 'up' ? 'bg-green-100 text-green-800' :
                      dashboardData?.predictions?.trend === 'down' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {dashboardData?.predictions?.trend === 'up' ? '↗️ Hausse' :
                       dashboardData?.predictions?.trend === 'down' ? '↘️ Baisse' :
                       '→ Stable'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Confiance:</span>
                    <span className="font-semibold">{(dashboardData?.predictions?.confidence || 0) * 100}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Facteurs d'analyse:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {dashboardData?.predictions?.factors?.map((factor, index) => (
                      <li key={index} className="flex items-center">
                        <Eye className="w-3 h-3 mr-2" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Insights IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Insights IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">🎯 Optimisation Recommandée</h4>
                    <p className="text-sm text-gray-700">
                      Augmenter les marges sur les produits à forte demande pour améliorer la rentabilité de 15%.
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">📈 Opportunité Détectée</h4>
                    <p className="text-sm text-gray-700">
                      Période de forte demande prévue pour les réfrigérateurs - Préparer les stocks.
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2">⚠️ Alerte Préventive</h4>
                    <p className="text-sm text-gray-700">
                      Risque de rupture de stock sur les machines à laver dans 2 semaines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer DL Solutions */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            🚀 <strong>DL Solutions Management v2.0</strong> - ERP Intelligent avec IA Avancée
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Développé par DL Solutions SARL - Novacore | Conformité OHADA | Contrôle IA en temps réel
          </p>
        </div>
      </div>
    </div>
  )
} 