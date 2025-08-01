'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Image, 
  Settings, 
  Globe, 
  Edit, 
  Save, 
  Plus, 
  Trash2,
  Eye,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Database,
  Code,
  Palette,
  Type,
  Layout,
  Smartphone,
  Monitor
} from 'lucide-react'

interface PageContent {
  id: string
  title: string
  content: string
  meta_description: string
  keywords: string[]
  status: 'published' | 'draft' | 'archived'
  last_modified: Date
  seo_score: number
}

interface SiteSettings {
  site_name: string
  site_description: string
  logo_url: string
  favicon_url: string
  primary_color: string
  secondary_color: string
  contact_email: string
  contact_phone: string
  address: string
  social_media: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  analytics: {
    google_analytics_id?: string
    facebook_pixel_id?: string
  }
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('pages')
  const [pages, setPages] = useState<PageContent[]>([])
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Batobaye Market',
    site_description: 'Votre partenaire électroménager de confiance',
    logo_url: '/images/BATOBAYE LOGO.jpeg',
    favicon_url: '/favicon.ico',
    primary_color: '#2563eb',
    secondary_color: '#1e40af',
    contact_email: 'contact@batobaye.cm',
    contact_phone: '+237 672 02 77 44',
    address: 'Douala, Cameroun',
    social_media: {},
    analytics: {}
  })
  const [loading, setLoading] = useState(false)
  const [editingPage, setEditingPage] = useState<PageContent | null>(null)

  // Pages par défaut
  const defaultPages: PageContent[] = [
    {
      id: 'home',
      title: 'Accueil',
      content: 'Bienvenue chez Batobaye Market, votre partenaire électroménager de confiance au Cameroun.',
      meta_description: 'Batobaye Market - Électroménager de qualité au Cameroun. Réfrigérateurs, téléviseurs, cuisinières et plus.',
      keywords: ['électroménager', 'Cameroun', 'réfrigérateur', 'téléviseur', 'cuisinière'],
      status: 'published',
      last_modified: new Date(),
      seo_score: 85
    },
    {
      id: 'about',
      title: 'À propos',
      content: 'Batobaye Market est une entreprise spécialisée dans la vente d\'électroménager de qualité.',
      meta_description: 'Découvrez l\'histoire et les valeurs de Batobaye Market, votre spécialiste électroménager au Cameroun.',
      keywords: ['à propos', 'histoire', 'valeurs', 'équipe'],
      status: 'published',
      last_modified: new Date(),
      seo_score: 78
    },
    {
      id: 'contact',
      title: 'Contact',
      content: 'Contactez-nous pour toute question ou demande de devis.',
      meta_description: 'Contactez Batobaye Market. Adresse, téléphone, email. Service client disponible.',
      keywords: ['contact', 'adresse', 'téléphone', 'email'],
      status: 'published',
      last_modified: new Date(),
      seo_score: 92
    }
  ]

  useEffect(() => {
    setPages(defaultPages)
  }, [])

  const handleSavePage = (page: PageContent) => {
    setPages(prev => prev.map(p => p.id === page.id ? page : p))
    setEditingPage(null)
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark">Gestion du Contenu</h1>
          <p className="text-gray-600">Gérez le contenu de votre site web sans code</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="media">Médias</TabsTrigger>
        </TabsList>

        {/* Gestion des pages */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Pages du Site
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {pages.map((page) => (
                  <div key={page.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{page.title}</h3>
                        <p className="text-sm text-gray-600">{page.meta_description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(page.status)}>
                          {page.status === 'published' ? 'Publié' : 
                           page.status === 'draft' ? 'Brouillon' : 'Archivé'}
                        </Badge>
                        <Badge className={getSeoScoreColor(page.seo_score)}>
                          SEO: {page.seo_score}/100
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingPage(page)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Dernière modification: {page.last_modified.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres du site */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Informations Générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nom du site</label>
                  <Input
                    value={settings.site_name}
                    onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
                    placeholder="Nom du site"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={settings.site_description}
                    onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                    placeholder="Description du site"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email de contact</label>
                  <Input
                    value={settings.contact_email}
                    onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Téléphone</label>
                  <Input
                    value={settings.contact_phone}
                    onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                    placeholder="+237 XXX XXX XXX"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Adresse</label>
                  <Textarea
                    value={settings.address}
                    onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Adresse complète"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Apparence */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Apparence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Logo URL</label>
                  <Input
                    value={settings.logo_url}
                    onChange={(e) => setSettings(prev => ({ ...prev, logo_url: e.target.value }))}
                    placeholder="/images/logo.png"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Favicon URL</label>
                  <Input
                    value={settings.favicon_url}
                    onChange={(e) => setSettings(prev => ({ ...prev, favicon_url: e.target.value }))}
                    placeholder="/favicon.ico"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Couleur primaire</label>
                    <Input
                      type="color"
                      value={settings.primary_color}
                      onChange={(e) => setSettings(prev => ({ ...prev, primary_color: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Couleur secondaire</label>
                    <Input
                      type="color"
                      value={settings.secondary_color}
                      onChange={(e) => setSettings(prev => ({ ...prev, secondary_color: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SEO */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Optimisation SEO
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Analyse SEO globale */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85</div>
                    <div className="text-sm text-gray-600">Score SEO Global</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Pages Indexées</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">98%</div>
                    <div className="text-sm text-gray-600">Performance Mobile</div>
                  </div>
                </div>

                {/* Recommandations SEO */}
                <div>
                  <h4 className="font-semibold mb-3">Recommandations SEO</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm">Ajoutez des mots-clés à la page "À propos"</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm">Toutes les pages ont des meta descriptions</span>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm">Structure des titres optimisée</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestion des médias */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Gestion des Médias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload de fichiers */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Glissez-déposez vos fichiers ici ou cliquez pour sélectionner
                  </p>
                  <Button variant="outline" className="mt-2">
                    Sélectionner des fichiers
                  </Button>
                </div>

                {/* Bibliothèque de médias */}
                <div>
                  <h4 className="font-semibold mb-3">Bibliothèque de médias</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['logo.png', 'hero.jpg', 'product1.jpg', 'product2.jpg'].map((file) => (
                      <div key={file} className="border rounded-lg p-2">
                        <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-xs truncate">{file}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal d'édition de page */}
      {editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Éditer {editingPage.title}</h2>
              <Button variant="outline" onClick={() => setEditingPage(null)}>
                Fermer
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titre</label>
                <Input
                  value={editingPage.title}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contenu</label>
                <Textarea
                  value={editingPage.content}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, content: e.target.value } : null)}
                  rows={6}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Meta Description</label>
                <Textarea
                  value={editingPage.meta_description}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, meta_description: e.target.value } : null)}
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Mots-clés (séparés par des virgules)</label>
                <Input
                  value={editingPage.keywords.join(', ')}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, keywords: e.target.value.split(', ').filter(k => k.trim()) } : null)}
                  placeholder="mot-clé1, mot-clé2, mot-clé3"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Statut</label>
                <select
                  value={editingPage.status}
                  onChange={(e) => setEditingPage(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                  className="w-full p-2 border rounded"
                >
                  <option value="published">Publié</option>
                  <option value="draft">Brouillon</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setEditingPage(null)}>
                Annuler
              </Button>
              <Button onClick={() => handleSavePage(editingPage)}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 