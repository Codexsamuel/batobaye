'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  GitBranch, 
  GitPullRequest,
  FileText,
  Save,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  MessageSquare,
  Download,
  Upload,
  Folder,
  Code,
  Image,
  File
} from 'lucide-react'

interface GitHubFile {
  name: string
  path: string
  type: 'file' | 'dir'
  size?: number
  sha?: string
  content?: string
  encoding?: string
}

interface Commit {
  sha: string
  message: string
  author: string
  date: string
}

export default function GitHubFileManager() {
  const [files, setFiles] = useState<GitHubFile[]>([])
  const [currentPath, setCurrentPath] = useState('')
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [commits, setCommits] = useState<Commit[]>([])
  const [branches, setBranches] = useState<string[]>([])
  const [currentBranch, setCurrentBranch] = useState('main')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const commonPaths = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/globals.css',
    'tailwind.config.ts',
    'next.config.mjs',
    'package.json',
    'README.md',
    'components/',
    'lib/',
    'public/'
  ]

  useEffect(() => {
    loadBranches()
    loadCommits()
  }, [])

  const loadBranches = async () => {
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list-branches' })
      })
      
      if (response.ok) {
        const data = await response.json()
        setBranches(data.branches || ['main'])
      }
    } catch (error) {
      console.error('Erreur chargement branches:', error)
    }
  }

  const loadCommits = async () => {
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list-commits' })
      })
      
      if (response.ok) {
        const data = await response.json()
        setCommits(data.commits || [])
      }
    } catch (error) {
      console.error('Erreur chargement commits:', error)
    }
  }

  const loadFile = async (path: string) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/github?path=${encodeURIComponent(path)}`)
      
      if (!response.ok) {
        throw new Error('Fichier non trouvé ou accès refusé')
      }
      
      const data = await response.json()
      
      if (data.type === 'file') {
        const content = Buffer.from(data.content, 'base64').toString('utf-8')
        setSelectedFile({
          name: data.name,
          path: data.path,
          type: 'file',
          size: data.size,
          sha: data.sha,
          content: content,
          encoding: data.encoding
        })
        setFileContent(content)
        setCurrentPath(path)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const saveFile = async () => {
    if (!selectedFile || !fileContent.trim()) return
    
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await fetch('/api/github', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: selectedFile.path,
          content: fileContent,
          message: `Mise à jour de ${selectedFile.path} depuis l'admin`,
          sha: selectedFile.sha
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde')
      }
      
      const data = await response.json()
      
      // Mettre à jour le SHA
      setSelectedFile(prev => prev ? { ...prev, sha: data.content.sha } : null)
      setSuccess('Fichier sauvegardé avec succès sur GitHub !')
      
      // Recharger les commits
      loadCommits()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde')
    } finally {
      setLoading(false)
    }
  }

  const createBranch = async () => {
    const branchName = `admin-edit-${Date.now()}`
    
    try {
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-branch',
          branchName,
          baseBranch: currentBranch
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création de branche')
      }
      
      setSuccess(`Branche ${branchName} créée avec succès !`)
      loadBranches()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de branche')
    }
  }

  const createPullRequest = async () => {
    const branchName = `admin-edit-${Date.now()}`
    
    try {
      // Créer d'abord la branche
      await createBranch()
      
      // Puis créer la pull request
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-pull-request',
          title: `Mise à jour depuis l'admin - ${selectedFile?.path}`,
          body: `Modification effectuée depuis l'interface admin\n\nFichier: ${selectedFile?.path}\nBranche: ${branchName}`,
          headBranch: branchName,
          baseBranch: currentBranch
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création de la pull request')
      }
      
      const data = await response.json()
      setSuccess(`Pull request créée avec succès ! URL: ${data.html_url}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de la pull request')
    }
  }

  const getFileIcon = (path: string) => {
    if (path.endsWith('.tsx') || path.endsWith('.ts') || path.endsWith('.js')) return <Code className="w-4 h-4" />
    if (path.endsWith('.css') || path.endsWith('.scss')) return <Code className="w-4 h-4" />
    if (path.endsWith('.json') || path.endsWith('.md')) return <FileText className="w-4 h-4" />
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.webp')) return <Image className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-batobaye-dark">Gestionnaire GitHub</h2>
          <p className="text-gray-600">Gérez vos fichiers directement depuis l'interface admin</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <GitBranch className="w-3 h-3 mr-1" />
            {currentBranch}
          </Badge>
          <Button onClick={() => window.open('https://github.com/Codexsamuel/batobaye', '_blank')}>
            <GitBranch className="w-4 h-4 mr-2" />
            Voir sur GitHub
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de navigation */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Folder className="w-5 h-5 mr-2" />
                Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium">Chemin actuel</label>
                  <Input
                    value={currentPath}
                    onChange={(e) => setCurrentPath(e.target.value)}
                    placeholder="app/page.tsx"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Fichiers courants</label>
                  <div className="space-y-1 mt-2">
                    {commonPaths.map((path) => (
                      <Button key={path}
                        className="w-full justify-start"
                        onClick={() => loadFile(path)}
                        disabled={loading}
                      >
                        {getFileIcon(path)}
                        <span className="ml-2 truncate">{path}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                Branches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {branches.map((branch) => (
                  <div
                    key={branch}
                    className={`flex items-center justify-between p-2 rounded ${
                      branch === currentBranch ? 'bg-batobaye-primary text-white' : 'bg-gray-50'
                    }`}
                  >
                    <span className="text-sm">{branch}</span>
                    {branch === currentBranch && <CheckCircle className="w-4 h-4" />}
                  </div>
                ))}
                <Button onClick={createBranch} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle branche
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Éditeur de fichier */}
        <div className="lg:col-span-2">
          {selectedFile ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getFileIcon(selectedFile.path)}
                    <span className="ml-2">{selectedFile.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {selectedFile.size} bytes
                    </Badge>
                    <Badge variant="outline">
                      SHA: {selectedFile.sha?.substring(0, 8)}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Contenu du fichier</label>
                    <Textarea
                      value={fileContent}
                      onChange={(e) => setFileContent(e.target.value)}
                      className="font-mono text-sm h-96 mt-1"
                      placeholder="Contenu du fichier..."
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button onClick={saveFile} disabled={loading || !fileContent.trim()}>
                        {loading ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Sauvegarder
                      </Button>
                      <Button onClick={createPullRequest} disabled={loading}>
                        <GitPullRequest className="w-4 h-4 mr-2" />
                        Pull Request
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {fileContent.length} caractères
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Sélectionnez un fichier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Sélectionnez un fichier dans la liste pour commencer l'édition</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Historique des commits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Historique des commits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {commits.slice(0, 5).map((commit) => (
              <div key={commit.sha} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{commit.message}</p>
                    <p className="text-xs text-gray-500">
                      {commit.author} • {new Date(commit.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge className="text-xs">
                  {commit.sha.substring(0, 8)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Messages de statut */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 font-medium">Erreur</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-green-800 font-medium">Succès</span>
          </div>
          <p className="text-green-700 mt-1">{success}</p>
        </div>
      )}
    </div>
  )
} 