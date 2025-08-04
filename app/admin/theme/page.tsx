"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Palette, Type, Layout, Eye, Save, Undo, Redo, Settings, 
  Droplets, FontSize, Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  Image, Sparkles, Zap, Check, X, Package
} from "lucide-react"

const colorPresets = [
  { name: "Classique", primary: "#3B82F6", secondary: "#8B5CF6", accent: "#10B981" },
  { name: "Moderne", primary: "#6366F1", secondary: "#EC4899", accent: "#F59E0B" },
  { name: "Naturel", primary: "#059669", secondary: "#7C3AED", accent: "#DC2626" },
  { name: "Élégant", primary: "#1F2937", secondary: "#6B7280", accent: "#F3F4F6" }
]

const fontPresets = [
  { name: "Inter", value: "Inter", category: "Sans-serif" },
  { name: "Roboto", value: "Roboto", category: "Sans-serif" },
  { name: "Open Sans", value: "Open Sans", category: "Sans-serif" },
  { name: "Poppins", value: "Poppins", category: "Sans-serif" },
  { name: "Playfair Display", value: "Playfair Display", category: "Serif" },
  { name: "Merriweather", value: "Merriweather", category: "Serif" }
]

export default function ThemeEditor() {
  const [activeTab, setActiveTab] = useState("colors")
  const [selectedPreset, setSelectedPreset] = useState("Classique")
  const [selectedFont, setSelectedFont] = useState("Inter")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Palette className="h-8 w-8 text-pink-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Éditeur de Thème
                </h1>
              </div>
              <Badge className="bg-gradient-to-r from-pink-400 to-rose-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Design System
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Aperçu
              </Button>
              <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white border-0">
                <Save className="w-4 h-4 mr-2" />
                Appliquer
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
              <TabsTrigger value="colors">Couleurs</TabsTrigger>
              <TabsTrigger value="typography">Typographie</TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Présets de couleurs</h3>
                  <div className="space-y-3">
                    {colorPresets.map((preset) => (
                      <Card 
                        key={preset.name}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPreset === preset.name ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                        }`}
                        onClick={() => setSelectedPreset(preset.name)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{preset.name}</h4>
                              <div className="flex items-center space-x-2 mt-2">
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accent }}></div>
                              </div>
                            </div>
                            {selectedPreset === preset.name && (
                              <Check className="w-5 h-5 text-pink-600" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Couleurs personnalisées</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Couleur principale</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="color" 
                          className="w-10 h-10 rounded border-2 border-gray-300"
                          defaultValue="#3B82F6"
                        />
                        <input 
                          type="text" 
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                          defaultValue="#3B82F6"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Couleur secondaire</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="color" 
                          className="w-10 h-10 rounded border-2 border-gray-300"
                          defaultValue="#8B5CF6"
                        />
                        <input 
                          type="text" 
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                          defaultValue="#8B5CF6"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Couleur d'accent</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <input 
                          type="color" 
                          className="w-10 h-10 rounded border-2 border-gray-300"
                          defaultValue="#10B981"
                        />
                        <input 
                          type="text" 
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                          defaultValue="#10B981"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="typography" className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Polices</h3>
                  <div className="space-y-3">
                    {fontPresets.map((font) => (
                      <Card 
                        key={font.value}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedFont === font.value ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                        }`}
                        onClick={() => setSelectedFont(font.value)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900" style={{ fontFamily: font.value }}>
                                {font.name}
                              </h4>
                              <p className="text-sm text-gray-500">{font.category}</p>
                            </div>
                            {selectedFont === font.value && (
                              <Check className="w-5 h-5 text-pink-600" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Paramètres</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Taille de base</label>
                      <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option value="14">14px</option>
                        <option value="16" selected>16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Hauteur de ligne</label>
                      <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option value="1.2">1.2</option>
                        <option value="1.4">1.4</option>
                        <option value="1.5" selected>1.5</option>
                        <option value="1.6">1.6</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Espacement des lettres</label>
                      <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm">
                        <option value="tight">Serré</option>
                        <option value="normal" selected>Normal</option>
                        <option value="wide">Large</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Preview Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Aperçu du thème</h2>
                <p className="text-gray-600 mt-1">Visualisez vos modifications en temps réel</p>
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
                <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </Button>
              </div>
            </div>

            {/* Preview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Aperçu du site</span>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Layout className="w-4 h-4 mr-2" />
                      Desktop
                    </Button>
                    <Button size="sm" variant="outline">
                      <Layout className="w-4 h-4 mr-2" />
                      Mobile
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  {/* Mock Header */}
                  <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-600 rounded"></div>
                        <h3 className="font-bold text-gray-900">Batobaye</h3>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Accueil</span>
                        <span className="text-gray-600">Produits</span>
                        <span className="text-gray-600">Contact</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Content */}
                  <div className="bg-gray-50 p-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                          Bienvenue chez Batobaye
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                          Votre partenaire de confiance pour tous vos besoins
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Découvrir nos produits
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <Package className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Qualité</h3>
                            <p className="text-gray-600">Produits de haute qualité</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <Zap className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Rapidité</h3>
                            <p className="text-gray-600">Livraison rapide</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                              <Check className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Fiabilité</h3>
                            <p className="text-gray-600">Service fiable</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Info */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Informations du thème</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Couleurs actives</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Principale</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          <span className="text-sm font-mono">#3B82F6</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Secondaire</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-600 rounded"></div>
                          <span className="text-sm font-mono">#8B5CF6</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Accent</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-600 rounded"></div>
                          <span className="text-sm font-mono">#10B981</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Typographie</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Police principale</span>
                        <span className="text-sm font-medium">Inter</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Taille de base</span>
                        <span className="text-sm font-medium">16px</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Hauteur de ligne</span>
                        <span className="text-sm font-medium">1.5</span>
                      </div>
                    </div>
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