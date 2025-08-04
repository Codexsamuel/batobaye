"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Layout, Package, MessageSquare, Home, ShoppingCart, User, 
  Plus, Edit, Eye, Save, Undo, Redo, Palette, Type, Image,
  ArrowUp, ArrowDown, Trash2, Copy, Settings, Zap
} from "lucide-react"

const pages = [
  {
    id: "home",
    name: "Page d'Accueil",
    description: "Page principale du site",
    status: "active",
    lastModified: "2024-01-15",
    sections: 8
  },
  {
    id: "products",
    name: "Page Produits",
    description: "Catalogue des produits",
    status: "active",
    lastModified: "2024-01-14",
    sections: 5
  },
  {
    id: "contact",
    name: "Page Contact",
    description: "Formulaire de contact",
    status: "draft",
    lastModified: "2024-01-13",
    sections: 3
  }
]

const components = [
  { id: "hero", name: "Section Héro", icon: Home, category: "Layout" },
  { id: "products-grid", name: "Grille Produits", icon: Package, category: "Content" },
  { id: "contact-form", name: "Formulaire Contact", icon: MessageSquare, category: "Forms" },
  { id: "testimonials", name: "Témoignages", icon: User, category: "Social" },
  { id: "newsletter", name: "Newsletter", icon: MessageSquare, category: "Marketing" },
  { id: "footer", name: "Pied de page", icon: Layout, category: "Layout" }
]

export default function PageBuilder() {
  const [selectedPage, setSelectedPage] = useState("home")
  const [activeTab, setActiveTab] = useState("pages")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Layout className="h-8 w-8 text-green-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Page Builder
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
                <Zap className="w-3 h-3 mr-1" />
                No-Code
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0">
                <Save className="w-4 h-4 mr-2" />
                Publier
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg min-h-screen">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pages">Pages</TabsTrigger>
              <TabsTrigger value="components">Composants</TabsTrigger>
            </TabsList>

            <TabsContent value="pages" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Pages du Site</h3>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {pages.map((page) => (
                    <Card 
                      key={page.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedPage === page.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                      }`}
                      onClick={() => setSelectedPage(page.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{page.name}</h4>
                            <p className="text-sm text-gray-600">{page.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={`text-xs ${
                                page.status === 'active' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              } border`}>
                                {page.status === 'active' ? 'Actif' : 'Brouillon'}
                              </Badge>
                              <span className="text-xs text-gray-500">{page.sections} sections</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="components" className="p-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Composants</h3>
                
                <div className="space-y-3">
                  {components.map((component) => (
                    <Card key={component.id} className="cursor-pointer hover:shadow-md transition-all">
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <component.icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{component.name}</h4>
                            <p className="text-xs text-gray-500">{component.category}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {pages.find(p => p.id === selectedPage)?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {pages.find(p => p.id === selectedPage)?.description}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline">
                  <Undo className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button variant="outline">
                  <Redo className="w-4 h-4 mr-2" />
                  Rétablir
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Zone de travail</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Palette className="w-4 h-4 mr-2" />
                      Style
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[600px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">
                      Zone de construction
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Glissez et déposez des composants ici pour construire votre page
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter une section
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Properties Panel */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Propriétés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Nom de la page</label>
                    <input 
                      type="text" 
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Nom de la page"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                      placeholder="Description de la page"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Statut</label>
                    <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                      <option value="draft">Brouillon</option>
                      <option value="active">Actif</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 