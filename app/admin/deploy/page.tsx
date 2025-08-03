'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Rocket, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  ExternalLink,
  GitBranch,
  Clock,
  Globe,
  Settings,
  Database,
  Code,
  Zap,
  Download,
  Upload,
  Play,
  Pause,
  Trash2,
  Eye,
  Activity,
  Server,
  Shield
} from 'lucide-react'

interface Deployment {
  id: string
  status: 'ready' | 'building' | 'error' | 'deployed'
  environment: 'production' | 'preview' | 'development'
  branch: string
  commit: string
  created_at: Date
  deployed_at?: Date
  url?: string
  build_time?: number
  error_message?: string
}

interface ProjectInfo {
  name: string
  id: string
  url: string
  framework: string
  region: string
  plan: string
  domains: string[]
  environment_variables: number
  functions: number
}

export default function DeployManagement() {
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: 'batobaye',
    id: 'proj_batobaye_123',
    url: 'https://batobaye.vercel.app',
    framework: 'Next.js',
    region: 'iad1',
    plan: 'Pro',
    domains: ['batobaye.vercel.app', 'www.batobaye.cm'],
    environment_variables: 12,
    functions: 8
  })
  const [deploying, setDeploying] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState<'production' | 'preview'>('production')

  // Données d'exemple
  const sampleDeployments: Deployment[] = [
    {
      id: 'dep_123',
      status: 'deployed',
      environment: 'production',
      branch: 'main',
      commit: 'a1b2c3d',
      created_at: new Date('2024-01-15T10:30:00'),
      deployed_at: new Date('2024-01-15T10:35:00'),
      url: 'https://batobaye.vercel.app',
      build_time: 120
    },
    {
      id: 'dep_124',
      status: 'ready',
      environment: 'preview',
      branch: 'feature/new-design',
      commit: 'e4f5g6h',
      created_at: new Date('2024-01-15T09:15:00'),
      url: 'https://feature-new-design-batobaye.vercel.app',
      build_time: 95
    },
    {
      id: 'dep_125',
      status: 'error',
      environment: 'preview',
      branch: 'bugfix/login',
      commit: 'i7j8k9l',
      created_at: new Date('2024-01-15T08:45:00'),
      error_message: 'Build failed: TypeScript compilation error'
    }
  ]

  useEffect(() => {
    setDeployments(sampleDeployments)
  }, [])

  const handleDeploy = async () => {
    setDeploying(true)
    
    // Simulation de déploiement
    const newDeployment: Deployment = {
      id: `dep_${Date.now()}`,
      status: 'building',
      environment: selectedEnvironment,
      branch: 'main',
      commit: 'latest',
      created_at: new Date()
    }
    
    setDeployments(prev => [newDeployment, ...prev])
    
    try {
      // Appel à notre API Vercel
      const response = await fetch('/api/vercel/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          environment: selectedEnvironment,
          branch: 'main'
        })
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        // Déploiement lancé avec succès
        setTimeout(() => {
          setDeployments(prev => prev.map(dep => 
            dep.id === newDeployment.id 
              ? { ...dep, status: 'deployed', deployed_at: new Date(), url: 'https://batobaye.vercel.app', build_time: 150 }
              : dep
          ))
          setDeploying(false)
        }, 3000)
      } else {
        // Erreur de déploiement
        setDeployments(prev => prev.map(dep => 
          dep.id === newDeployment.id 
            ? { ...dep, status: 'error', error_message: data.error || 'Erreur lors du lancement du déploiement Vercel' }
            : dep
        ))
        setDeploying(false)
      }
    } catch (error) {
      // Erreur réseau
      setDeployments(prev => prev.map(dep => 
        dep.id === newDeployment.id 
          ? { ...dep, status: 'error', error_message: 'Erreur de connexion au service Vercel' }
          : dep
      ))
      setDeploying(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800'
      case 'ready': return 'bg-blue-100 text-blue-800'
      case 'building': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return <CheckCircle className="w-4 h-4" />
      case 'ready': return <CheckCircle className="w-4 h-4" />
      case 'building': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'error': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark">Déploiement Vercel</h1>
          <p className="text-gray-600">Gérez vos déploiements et votre infrastructure</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configuration
          </Button>
          <Button onClick={handleDeploy} disabled={deploying}>
            {deploying ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Rocket className="w-4 h-4 mr-2" />
            )}
            {deploying ? 'Déploiement...' : 'Déployer'}
          </Button>
        </div>
      </div>

      {/* Informations du projet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{projectInfo.name}</div>
                <div className="text-sm text-gray-600">Projet</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Server className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{projectInfo.framework}</div>
                <div className="text-sm text-gray-600">Framework</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Code className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{projectInfo.functions}</div>
                <div className="text-sm text-gray-600">Fonctions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{projectInfo.plan}</div>
                <div className="text-sm text-gray-600">Plan</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration de déploiement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Configuration de Déploiement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Environnement</label>
                <select
                  value={selectedEnvironment}
                  onChange={(e) => setSelectedEnvironment(e.target.value as any)}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="production">Production</option>
                  <option value="preview">Preview</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Branche</label>
                <select className="w-full p-2 border rounded mt-1">
                  <option value="main">main</option>
                  <option value="develop">develop</option>
                  <option value="feature/new-design">feature/new-design</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Variables d'environnement</label>
                <div className="text-sm text-gray-600 mt-1">
                  {projectInfo.environment_variables} variables configurées
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Domaines</label>
                <div className="space-y-1 mt-1">
                  {projectInfo.domains.map((domain) => (
                    <div key={domain} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{domain}</span>
                      <Badge variant="outline">Actif</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Région</label>
                <div className="text-sm text-gray-600 mt-1">
                  {projectInfo.region} (US East)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historique des déploiements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Historique des Déploiements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(deployment.status)}
                      <Badge className={getStatusColor(deployment.status)}>
                        {deployment.status === 'deployed' ? 'Déployé' :
                         deployment.status === 'ready' ? 'Prêt' :
                         deployment.status === 'building' ? 'En cours' :
                         deployment.status === 'error' ? 'Erreur' : 'Inconnu'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{deployment.branch}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{deployment.commit}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {deployment.url && (
                      <Button onClick={() => window.open(deployment.url, '_blank')}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                    )}
                    <Button size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Environnement:</span> {deployment.environment}
                  </div>
                  <div>
                    <span className="font-medium">Créé:</span> {deployment.created_at.toLocaleString()}
                  </div>
                  {deployment.build_time && (
                    <div>
                      <span className="font-medium">Temps de build:</span> {formatDuration(deployment.build_time)}
                    </div>
                  )}
                </div>
                
                {deployment.error_message && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800 font-medium">Erreur de build</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{deployment.error_message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2" />
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Download className="w-6 h-6" />
              <span className="text-sm font-medium">Backup</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Upload className="w-6 h-6" />
              <span className="text-sm font-medium">Restore</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Database className="w-6 h-6" />
              <span className="text-sm font-medium">Database</span>
            </Button>
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Settings className="w-6 h-6" />
              <span className="text-sm font-medium">Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 