"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  GitBranch, Cloud, Download, Upload, RefreshCw, Settings, 
  Check, X, Clock, Activity, Globe, Lock, Unlock, Zap,
  GitCommit, GitPullRequest, GitMerge, GitBranch as GitBranchIcon
} from "lucide-react"

const gitStatus = {
  branch: "main",
  lastCommit: "feat: ajout page builder",
  lastCommitHash: "a1b2c3d4e5f6",
  lastCommitDate: "2024-01-15 14:30",
  status: "clean",
  ahead: 0,
  behind: 0
}

const vercelStatus = {
  status: "online",
  lastDeploy: "2024-01-15 14:00",
  deployTime: "2m 30s",
  environment: "production",
  url: "https://batobaye-market.com"
}

const recentDeployments = [
  {
    id: "deploy-001",
    commit: "feat: ajout page builder",
    hash: "a1b2c3d4e5f6",
    date: "2024-01-15 14:00",
    status: "success",
    duration: "2m 30s",
    environment: "production"
  },
  {
    id: "deploy-002",
    commit: "fix: correction bugs navigation",
    hash: "b2c3d4e5f6g7",
    date: "2024-01-14 16:00",
    status: "success",
    duration: "1m 45s",
    environment: "production"
  },
  {
    id: "deploy-003",
    commit: "feat: amélioration dashboard",
    hash: "c3d4e5f6g7h8",
    date: "2024-01-13 10:00",
    status: "failed",
    duration: "3m 15s",
    environment: "staging"
  }
]

export default function DeploymentHub() {
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = () => {
    setIsDeploying(true)
    // Simuler un déploiement
    setTimeout(() => {
      setIsDeploying(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GitBranch className="h-8 w-8 text-indigo-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Centre de Déploiement
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white border-0">
                <Cloud className="w-3 h-3 mr-1" />
                CI/CD
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualiser
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0"
                onClick={handleDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Déploiement...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Déployer
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Git Status</p>
                    <p className="text-2xl font-bold text-gray-900">{gitStatus.branch}</p>
                    <p className="text-sm text-gray-500">{gitStatus.status}</p>
                  </div>
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <GitBranch className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vercel Status</p>
                    <p className="text-2xl font-bold text-gray-900 capitalize">{vercelStatus.status}</p>
                    <p className="text-sm text-gray-500">{vercelStatus.environment}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Cloud className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Dernier Déploiement</p>
                    <p className="text-2xl font-bold text-gray-900">{vercelStatus.deployTime}</p>
                    <p className="text-sm text-gray-500">{vercelStatus.lastDeploy}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">URL Production</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{vercelStatus.url}</p>
                    <p className="text-sm text-gray-500">En ligne</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Git Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Git & GitHub
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Branche active</div>
                    <div className="text-sm text-gray-600">{gitStatus.branch}</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                    Actif
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Dernier commit</div>
                    <div className="text-sm text-gray-600">{gitStatus.lastCommit}</div>
                    <div className="text-xs text-gray-500 font-mono">{gitStatus.lastCommitHash}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 border">
                    ✓ Synchronisé
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Statut</div>
                    <div className="text-sm text-gray-600 capitalize">{gitStatus.status}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {gitStatus.ahead > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 border">
                        +{gitStatus.ahead}
                      </Badge>
                    )}
                    {gitStatus.behind > 0 && (
                      <Badge className="bg-red-100 text-red-800 border-red-200 border">
                        -{gitStatus.behind}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    Pull
                  </Button>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                    <GitCommit className="w-4 h-4 mr-2" />
                    Push
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vercel Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cloud className="w-5 h-5 mr-2" />
                  Vercel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Statut</div>
                    <div className="text-sm text-gray-600 capitalize">{vercelStatus.status}</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 border">
                    ✓ En ligne
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Environnement</div>
                    <div className="text-sm text-gray-600 capitalize">{vercelStatus.environment}</div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 border">
                    Production
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Dernier déploiement</div>
                    <div className="text-sm text-gray-600">{vercelStatus.lastDeploy}</div>
                    <div className="text-xs text-gray-500">{vercelStatus.deployTime}</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                    Réussi
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurer
                  </Button>
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    <Activity className="w-4 h-4 mr-2" />
                    Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Deployments */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Déploiements Récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDeployments.map((deployment) => (
                  <div key={deployment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        deployment.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {deployment.status === 'success' ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{deployment.commit}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="font-mono">{deployment.hash}</span>
                          <span>{deployment.date}</span>
                          <span>{deployment.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        deployment.status === 'success' 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-red-100 text-red-800 border-red-200'
                      } border capitalize`}>
                        {deployment.status}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 border capitalize">
                        {deployment.environment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deployment Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Actions de Déploiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0">
                  <Upload className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">Déployer en Production</div>
                    <div className="text-sm opacity-90">Déployer la version actuelle</div>
                  </div>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0">
                  <GitMerge className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">Déployer en Staging</div>
                    <div className="text-sm opacity-90">Tester avant production</div>
                  </div>
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
                  <Settings className="h-8 w-8" />
                  <div>
                    <div className="font-semibold">Configuration</div>
                    <div className="text-sm opacity-90">Paramètres de déploiement</div>
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