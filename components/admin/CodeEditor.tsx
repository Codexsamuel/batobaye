'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Code, 
  Save, 
  RefreshCw, 
  GitBranch, 
  GitPullRequest,
  FileText,
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Upload
} from 'lucide-react'

interface FileInfo {
  path: string
  content: string
  sha: string
  size: number
  encoding: string
}

interface CodeEditorProps {
  filePath?: string
  onSave?: (content: string) => void
}

export default function CodeEditor({ filePath, onSave }: CodeEditorProps) {
  const [currentFile, setCurrentFile] = useState<FileInfo | null>(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedFile, setSelectedFile] = useState(filePath || '')

  const commonFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/globals.css',
    'tailwind.config.ts',
    'next.config.mjs',
    'package.json',
    'README.md'
  ]

  const loadFile = async (path: string) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch(`/api/github?path=${encodeURIComponent(path)}`)
      
      if (!response.ok) {
        throw new Error('Fichier non trouvé ou accès refusé')
      }
      
      const data = await response.json()
      
      // Décoder le contenu base64
      const decodedContent = Buffer.from(data.content, 'base64').toString('utf-8')
      
      setCurrentFile({
        path: data.path,
        content: decodedContent,
        sha: data.sha,
        size: data.size,
        encoding: data.encoding
      })
      
      setContent(decodedContent)
      setSelectedFile(path)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const saveFile = async () => {
    if (!currentFile || !content.trim()) return
    
    setSaving(true)
    setError('')
    setSuccess('')
    
    try {
      const response = await fetch('/api/github', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: currentFile.path,
          content: content,
          message: `Mise à jour de ${currentFile.path} depuis l'admin`,
          sha: currentFile.sha
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde')
      }
      
      const data = await response.json()
      
      // Mettre à jour le SHA pour les prochaines modifications
      setCurrentFile(prev => prev ? { ...prev, sha: data.content.sha } : null)
      setSuccess('Fichier sauvegardé avec succès sur GitHub !')
      
      if (onSave) {
        onSave(content)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const createBranch = async () => {
    if (!currentFile) return
    
    setLoading(true)
    setError('')
    
    try {
      const branchName = `admin-edit-${Date.now()}`
      
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create-branch',
          branchName
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la création de branche')
      }
      
      setSuccess(`Branche ${branchName} créée avec succès !`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création de branche')
    } finally {
      setLoading(false)
    }
  }

  const createPullRequest = async () => {
    if (!currentFile) return
    
    setLoading(true)
    setError('')
    
    try {
      const branchName = `admin-edit-${Date.now()}`
      
      // Créer d'abord la branche
      await createBranch()
      
      // Puis créer la pull request
      const response = await fetch('/api/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create-pull-request',
          title: `Mise à jour de ${currentFile.path}`,
          body: `Modification effectuée depuis l'interface admin\n\nFichier: ${currentFile.path}`,
          headBranch: branchName,
          baseBranch: 'main'
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (filePath) {
      loadFile(filePath)
    }
  }, [filePath])

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-batobaye-dark">Éditeur de Code</h2>
          <p className="text-gray-600">Modifiez directement les fichiers de votre site</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => window.open('https://github.com/Codexsamuel/batobaye', '_blank')}>
            <GitBranch className="w-4 h-4 mr-2" />
            Voir sur GitHub
          </Button>
        </div>
      </div>

      {/* Sélection de fichier */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Sélectionner un fichier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Fichier à éditer</label>
              <div className="flex space-x-2 mt-1">
                <Input
                  value={selectedFile}
                  onChange={(e) => setSelectedFile(e.target.value)}
                  placeholder="app/page.tsx"
                  className="flex-1"
                />
                <Button onClick={() => loadFile(selectedFile)} disabled={loading || !selectedFile}>
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Fichiers courants</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {commonFiles.map((file) => (
                  <Button key={file}
                    onClick={() => loadFile(file)}
                    disabled={loading}
                  >
                    {file}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Éditeur de code */}
      {currentFile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                {currentFile.path}
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  {currentFile.size} bytes
                </Badge>
                <Badge variant="outline">
                  SHA: {currentFile.sha.substring(0, 8)}
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Contenu du fichier</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="font-mono text-sm h-96 mt-1"
                  placeholder="Contenu du fichier..."
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button onClick={saveFile} disabled={saving || !content.trim()}>
                    {saving ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Sauvegarder
                  </Button>
                  <Button onClick={createBranch} disabled={loading}>
                    <GitBranch className="w-4 h-4 mr-2" />
                    Nouvelle branche
                  </Button>
                  <Button onClick={createPullRequest} disabled={loading}>
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    Pull Request
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  {content.length} caractères
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Comment utiliser l'éditeur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Sélectionnez un fichier</strong> dans la liste ou tapez le chemin</p>
            <p>• <strong>Modifiez le contenu</strong> directement dans l'éditeur</p>
            <p>• <strong>Sauvegardez</strong> pour pousser les changements sur GitHub</p>
            <p>• <strong>Créez une branche</strong> pour travailler en isolation</p>
            <p>• <strong>Pull Request</strong> pour revoir les changements avant merge</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 