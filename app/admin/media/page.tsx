'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Image, 
  Upload, 
  Download, 
  Trash2, 
  Copy, 
  Search, 
  Filter,
  Grid,
  List,
  Folder,
  File,
  Video,
  Music,
  Archive,
  Eye,
  Edit,
  Share,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface MediaFile {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'audio'
  size: number
  url: string
  thumbnail?: string
  uploaded_at: Date
  tags: string[]
  alt_text?: string
  description?: string
}

export default function MediaManagement() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Données d'exemple
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'logo-batobaye.png',
      type: 'image',
      size: 245760,
      url: '/images/BATOBAYE LOGO.jpeg',
      thumbnail: '/images/BATOBAYE LOGO.jpeg',
      uploaded_at: new Date('2024-01-15'),
      tags: ['logo', 'brand'],
      alt_text: 'Logo Batobaye Market',
      description: 'Logo principal de l\'entreprise'
    },
    {
      id: '2',
      name: 'hero-banner.jpg',
      type: 'image',
      size: 1024000,
      url: '/placeholder.jpg',
      thumbnail: '/placeholder.jpg',
      uploaded_at: new Date('2024-01-14'),
      tags: ['banner', 'hero'],
      alt_text: 'Bannière principale',
      description: 'Image de bannière pour la page d\'accueil'
    },
    {
      id: '3',
      name: 'product-catalog.pdf',
      type: 'document',
      size: 2048000,
      url: '/catalog.pdf',
      uploaded_at: new Date('2024-01-13'),
      tags: ['catalog', 'products'],
      description: 'Catalogue des produits'
    },
    {
      id: '4',
      name: 'team-photo.jpg',
      type: 'image',
      size: 512000,
      url: '/images/l equipe batobaye.webp',
      thumbnail: '/images/l equipe batobaye.webp',
      uploaded_at: new Date('2024-01-12'),
      tags: ['team', 'about'],
      alt_text: 'Équipe Batobaye',
      description: 'Photo de l\'équipe Batobaye'
    }
  ])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-6 h-6" />
      case 'video': return <Video className="w-6 h-6" />
      case 'audio': return <Music className="w-6 h-6" />
      case 'document': return <File className="w-6 h-6" />
      default: return <File className="w-6 h-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-blue-100 text-blue-800'
      case 'video': return 'bg-purple-100 text-purple-800'
      case 'audio': return 'bg-green-100 text-green-800'
      case 'document': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFileUpload = async (files: FileList) => {
    setUploading(true)
    
    // Simulation d'upload
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const newFile: MediaFile = {
        id: Date.now().toString() + i,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 
              file.type.startsWith('audio/') ? 'audio' : 'document',
        size: file.size,
        url: URL.createObjectURL(file),
        thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        uploaded_at: new Date(),
        tags: [],
        description: ''
      }
      
      setMediaFiles(prev => [newFile, ...prev])
      
      // Simulation de délai d'upload
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setUploading(false)
  }

  const handleDeleteFiles = () => {
    setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)))
    setSelectedFiles([])
  }

  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url)
  }

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = selectedFilter === 'all' || file.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0)

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark">Gestion des Médias</h1>
          <p className="text-gray-600">Gérez tous vos fichiers médias en un seul endroit</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Image className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{mediaFiles.filter(f => f.type === 'image').length}</div>
                <div className="text-sm text-gray-600">Images</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Video className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{mediaFiles.filter(f => f.type === 'video').length}</div>
                <div className="text-sm text-gray-600">Vidéos</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <File className="w-8 h-8 text-orange-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{mediaFiles.filter(f => f.type === 'document').length}</div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Archive className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <div className="text-2xl font-bold">{formatFileSize(totalSize)}</div>
                <div className="text-sm text-gray-600">Espace utilisé</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contrôles */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des fichiers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="all">Tous les types</option>
                <option value="image">Images</option>
                <option value="video">Vidéos</option>
                <option value="document">Documents</option>
                <option value="audio">Audio</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions en lot */}
      {selectedFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedFiles.length} fichier(s) sélectionné(s)
              </span>
              <div className="flex space-x-2">
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button onClick={handleDeleteFiles}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone d'upload */}
      <Card>
        <CardContent className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {uploading ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-batobaye-primary mr-2" />
                <span>Upload en cours...</span>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Glissez-déposez vos fichiers ici</h3>
                <p className="text-gray-600 mb-4">
                  ou cliquez pour sélectionner des fichiers depuis votre ordinateur
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Sélectionner des fichiers
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Formats supportés: JPG, PNG, GIF, PDF, MP4, MP3 (max 10MB par fichier)
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Liste des fichiers */}
      <Card>
        <CardHeader>
          <CardTitle>Bibliothèque de médias ({filteredFiles.length} fichiers)</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedFiles.includes(file.id) ? 'border-batobaye-primary bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => {
                    if (selectedFiles.includes(file.id)) {
                      setSelectedFiles(prev => prev.filter(id => id !== file.id))
                    } else {
                      setSelectedFiles(prev => [...prev, file.id])
                    }
                  }}
                >
                  <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                    {file.thumbnail ? (
                      <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>
                  <p className="text-xs truncate font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={getTypeColor(file.type)}>
                      {file.type}
                    </Badge>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        copyFileUrl(file.url)
                      }}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedFiles.includes(file.id) ? 'border-batobaye-primary bg-blue-50' : 'hover:border-gray-300'
                  }`}
                  onClick={() => {
                    if (selectedFiles.includes(file.id)) {
                      setSelectedFiles(prev => prev.filter(id => id !== file.id))
                    } else {
                      setSelectedFiles(prev => [...prev, file.id])
                    }
                  }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                    {file.thumbnail ? (
                      <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{file.name}</h4>
                    <p className="text-sm text-gray-600">
                      {formatFileSize(file.size)} • {file.uploaded_at.toLocaleDateString()}
                    </p>
                    {file.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {file.tags.map((tag) => (
                          <Badge key={tag} className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(file.type)}>
                      {file.type}
                    </Badge>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        copyFileUrl(file.url)
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        window.open(file.url, '_blank')
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 