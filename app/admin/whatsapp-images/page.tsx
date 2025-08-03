"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Image as ImageIcon, 
  Download, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import Image from 'next/image'

interface WhatsAppImage {
  id: string
  originalName: string
  fileName: string
  filePath: string
  mimeType: string
  size: number
  source: 'whatsapp'
  senderPhone: string
  senderName: string
  receivedAt: string
  status: 'pending' | 'approved' | 'rejected'
  productId?: string
}

interface WhatsAppDocument {
  id: string
  originalName: string
  fileName: string
  filePath: string
  mimeType: string
  size: number
  source: 'whatsapp'
  senderPhone: string
  senderName: string
  receivedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function WhatsAppImagesPage() {
  const [images, setImages] = useState<WhatsAppImage[]>([])
  const [documents, setDocuments] = useState<WhatsAppDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedImage, setSelectedImage] = useState<WhatsAppImage | null>(null)

  useEffect(() => {
    fetchWhatsAppMedia()
  }, [])

  const fetchWhatsAppMedia = async () => {
    try {
      // Simuler la récupération des données
      // En production, cela viendrait de votre API
      const mockImages: WhatsAppImage[] = [
        {
          id: '1',
          originalName: 'produit1.jpg',
          fileName: 'whatsapp_1703123456789_produit1.jpg',
          filePath: '/uploads/whatsapp/whatsapp_1703123456789_produit1.jpg',
          mimeType: 'image/jpeg',
          size: 1024000,
          source: 'whatsapp',
          senderPhone: '+237672027744',
          senderName: 'Jean Dupont',
          receivedAt: '2024-01-15T10:30:00Z',
          status: 'pending'
        },
        {
          id: '2',
          originalName: 'refrigerateur.jpg',
          fileName: 'whatsapp_1703123456790_refrigerateur.jpg',
          filePath: '/uploads/whatsapp/whatsapp_1703123456790_refrigerateur.jpg',
          mimeType: 'image/jpeg',
          size: 2048000,
          source: 'whatsapp',
          senderPhone: '+237672027745',
          senderName: 'Marie Martin',
          receivedAt: '2024-01-15T11:15:00Z',
          status: 'approved',
          productId: '123'
        }
      ]

      const mockDocuments: WhatsAppDocument[] = [
        {
          id: '1',
          originalName: 'catalogue.pdf',
          fileName: 'whatsapp_1703123456789_catalogue.pdf',
          filePath: '/uploads/whatsapp/documents/whatsapp_1703123456789_catalogue.pdf',
          mimeType: 'application/pdf',
          size: 5120000,
          source: 'whatsapp',
          senderPhone: '+237672027744',
          senderName: 'Jean Dupont',
          receivedAt: '2024-01-15T10:30:00Z',
          status: 'pending'
        }
      ]

      setImages(mockImages)
      setDocuments(mockDocuments)
    } catch (error) {
      console.error('Erreur lors du chargement des médias WhatsApp:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approuvé</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejeté</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredImages = images.filter(image => {
    const matchesSearch = image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.senderPhone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || image.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.senderPhone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || document.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const handleApproveImage = async (imageId: string) => {
    try {
      // En production, appeler l'API pour approuver l'image
      console.log('Approuver image:', imageId)
      
      // Mettre à jour l'état local
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, status: 'approved' as const } : img
      ))
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error)
    }
  }

  const handleRejectImage = async (imageId: string) => {
    try {
      // En production, appeler l'API pour rejeter l'image
      console.log('Rejeter image:', imageId)
      
      // Mettre à jour l'état local
      setImages(prev => prev.map(img => 
        img.id === imageId ? { ...img, status: 'rejected' as const } : img
      ))
    } catch (error) {
      console.error('Erreur lors du rejet:', error)
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    try {
      // En production, appeler l'API pour supprimer l'image
      console.log('Supprimer image:', imageId)
      
      // Mettre à jour l'état local
      setImages(prev => prev.filter(img => img.id !== imageId))
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Images WhatsApp Business</h1>
          <p className="text-gray-600">Gestion des images et documents reçus via WhatsApp</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exporter
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images Reçues</CardTitle>
            <ImageIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{images.length}</div>
            <p className="text-xs text-gray-600">Total des images</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Reçus</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-gray-600">Total des documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {images.filter(img => img.status === 'pending').length + 
               documents.filter(doc => doc.status === 'pending').length}
            </div>
            <p className="text-xs text-gray-600">À traiter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvés</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {images.filter(img => img.status === 'approved').length + 
               documents.filter(doc => doc.status === 'approved').length}
            </div>
            <p className="text-xs text-gray-600">Validés</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par nom, téléphone, fichier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Contenu principal */}
      <Tabs defaultValue="images" className="space-y-6">
        <TabsList>
          <TabsTrigger value="images">
            <ImageIcon className="w-4 h-4 mr-2" />
            Images ({images.length})
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documents ({documents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Images Reçues via WhatsApp</CardTitle>
              <CardDescription>
                Images envoyées par les clients pour les produits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={image.filePath}
                        alt={image.originalName}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Fallback pour les images non trouvées
                          const target = e.target as HTMLImageElement
                          target.src = '/placeholder.jpg'
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusIcon(image.status)}
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-medium text-sm truncate">{image.originalName}</h3>
                        <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-gray-600">
                          <User className="w-3 h-3 mr-1" />
                          {image.senderName}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {image.senderPhone}
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(image.receivedAt)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {getStatusBadge(image.status)}
                        
                                                 <div className="flex space-x-1">
                           <Button
                             onClick={() => setSelectedImage(image)}
                           >
                             <Eye className="w-3 h-3" />
                           </Button>
                           
                           {image.status === 'pending' && (
                             <>
                               <Button
                                 onClick={() => handleApproveImage(image.id)}
                               >
                                 ✓
                               </Button>
                               <Button
                                 onClick={() => handleRejectImage(image.id)}
                               >
                                 ✗
                               </Button>
                             </>
                           )}
                           
                           <Button
                             onClick={() => handleDeleteImage(image.id)}
                           >
                             <Trash2 className="w-3 h-3" />
                           </Button>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredImages.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucune image trouvée
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents Reçus via WhatsApp</CardTitle>
              <CardDescription>
                Documents envoyés par les clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Expéditeur</TableHead>
                    <TableHead>Taille</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{document.originalName}</div>
                          <div className="text-sm text-gray-500">{document.mimeType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{document.senderName}</div>
                          <div className="text-sm text-gray-500">{document.senderPhone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatFileSize(document.size)}</TableCell>
                      <TableCell>{formatDate(document.receivedAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(document.status)}
                          {getStatusBadge(document.status)}
                        </div>
                      </TableCell>
                                             <TableCell>
                         <div className="flex space-x-1">
                           <Button>
                             <Download className="w-3 h-3" />
                           </Button>
                           <Button>
                             <Eye className="w-3 h-3" />
                           </Button>
                           <Button>
                             <Trash2 className="w-3 h-3" />
                           </Button>
                         </div>
                       </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucun document trouvé
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de visualisation d'image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedImage.originalName}</h3>
              <Button onClick={() => setSelectedImage(null)}>×</Button>
            </div>
            
            <div className="relative aspect-video mb-4">
              <Image
                src={selectedImage.filePath}
                alt={selectedImage.originalName}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="space-y-2 text-sm">
              <div><strong>Expéditeur:</strong> {selectedImage.senderName}</div>
              <div><strong>Téléphone:</strong> {selectedImage.senderPhone}</div>
              <div><strong>Date:</strong> {formatDate(selectedImage.receivedAt)}</div>
              <div><strong>Taille:</strong> {formatFileSize(selectedImage.size)}</div>
              <div><strong>Type:</strong> {selectedImage.mimeType}</div>
              <div><strong>Statut:</strong> {getStatusBadge(selectedImage.status)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 