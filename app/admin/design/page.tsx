'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Monitor, 
  Save, 
  RefreshCw,
  Eye,
  Download,
  Upload,
  Settings,
  Grid,
  Image,
  CheckCircle,
  AlertTriangle,
  Zap,
  Moon,
  Sun,
  Globe,
  Code
} from 'lucide-react'

interface ThemeSettings {
  primary_color: string
  secondary_color: string
  accent_color: string
  background_color: string
  text_color: string
  font_family: string
  font_size: string
  border_radius: string
  spacing: string
}

interface LayoutSettings {
  header_style: 'minimal' | 'standard' | 'extended'
  footer_style: 'simple' | 'detailed' | 'minimal'
  sidebar_position: 'left' | 'right' | 'none'
  container_width: 'narrow' | 'standard' | 'wide'
  navigation_style: 'horizontal' | 'vertical' | 'hamburger'
}

export default function DesignManagement() {
  const [activeTab, setActiveTab] = useState('theme')
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const [theme, setTheme] = useState<ThemeSettings>({
    primary_color: '#2563eb',
    secondary_color: '#1e40af',
    accent_color: '#f59e0b',
    background_color: '#ffffff',
    text_color: '#1f2937',
    font_family: 'Inter',
    font_size: '16px',
    border_radius: '8px',
    spacing: '1rem'
  })

  const [layout, setLayout] = useState<LayoutSettings>({
    header_style: 'standard',
    footer_style: 'detailed',
    sidebar_position: 'none',
    container_width: 'standard',
    navigation_style: 'horizontal'
  })

  const [customCSS, setCustomCSS] = useState(`/* CSS personnalisé */
.custom-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-button {
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.custom-card {
  backdrop-filter: blur(10px);
  background: rgba(255,255,255,0.9);
}`)

  const handleSaveTheme = async () => {
    setSaving(true)
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
  }

  const generateCSS = () => {
    return `
:root {
  --primary-color: ${theme.primary_color};
  --secondary-color: ${theme.secondary_color};
  --accent-color: ${theme.accent_color};
  --background-color: ${theme.background_color};
  --text-color: ${theme.text_color};
  --font-family: ${theme.font_family}, sans-serif;
  --font-size: ${theme.font_size};
  --border-radius: ${theme.border_radius};
  --spacing: ${theme.spacing};
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size);
  background-color: var(--background-color);
  color: var(--text-color);
}

.btn-primary {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
}

.btn-secondary {
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
}

.card {
  border-radius: var(--border-radius);
  padding: var(--spacing);
}

${customCSS}
    `.trim()
  }

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 
    'Montserrat', 'Source Sans Pro', 'Nunito', 'Ubuntu'
  ]

  const colorPresets = [
    { name: 'Batobaye Blue', primary: '#2563eb', secondary: '#1e40af', accent: '#f59e0b' },
    { name: 'Modern Green', primary: '#10b981', secondary: '#059669', accent: '#f59e0b' },
    { name: 'Elegant Purple', primary: '#8b5cf6', secondary: '#7c3aed', accent: '#f59e0b' },
    { name: 'Warm Orange', primary: '#f97316', secondary: '#ea580c', accent: '#2563eb' },
    { name: 'Professional Gray', primary: '#6b7280', secondary: '#4b5563', accent: '#f59e0b' }
  ]

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark">Design & Apparence</h1>
          <p className="text-gray-600">Personnalisez l'apparence de votre site web</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Masquer' : 'Aperçu'}
          </Button>
          <Button onClick={handleSaveTheme} disabled={saving}>
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Mode aperçu */}
      {previewMode && (
        <Card className="border-2 border-dashed border-batobaye-primary">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Aperçu en Temps Réel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: theme.background_color,
                    color: theme.text_color,
                    borderRadius: theme.border_radius,
                    fontFamily: theme.font_family
                  }}
                >
                  <h3 className="font-bold mb-2">Exemple de contenu</h3>
                  <p className="mb-3">Ceci est un aperçu de votre design personnalisé.</p>
                  <div className="flex space-x-2">
                    <Button 
                      style={{ backgroundColor: theme.primary_color }}
                      className="text-white"
                    >
                      Bouton Principal
                    </Button>
                    <Button style={{ 
                        borderColor: theme.secondary_color,
                        color: theme.secondary_color
                      }}
                    >
                      Bouton Secondaire
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm">
                  <h4 className="font-semibold mb-2">CSS Généré</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                    {generateCSS()}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Onglets principaux */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="theme">Thème</TabsTrigger>
          <TabsTrigger value="layout">Mise en page</TabsTrigger>
          <TabsTrigger value="typography">Typographie</TabsTrigger>
          <TabsTrigger value="advanced">Avancé</TabsTrigger>
        </TabsList>

        {/* Configuration du thème */}
        <TabsContent value="theme" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Couleurs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Couleurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Couleur primaire</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type="color"
                      value={theme.primary_color}
                      onChange={(e) => setTheme(prev => ({ ...prev, primary_color: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={theme.primary_color}
                      onChange={(e) => setTheme(prev => ({ ...prev, primary_color: e.target.value }))}
                      placeholder="#2563eb"
                    />
                  </div>
                </div>
                <div>
                  <Label>Couleur secondaire</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type="color"
                      value={theme.secondary_color}
                      onChange={(e) => setTheme(prev => ({ ...prev, secondary_color: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={theme.secondary_color}
                      onChange={(e) => setTheme(prev => ({ ...prev, secondary_color: e.target.value }))}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
                <div>
                  <Label>Couleur d'accent</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      type="color"
                      value={theme.accent_color}
                      onChange={(e) => setTheme(prev => ({ ...prev, accent_color: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={theme.accent_color}
                      onChange={(e) => setTheme(prev => ({ ...prev, accent_color: e.target.value }))}
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Préréglages de couleurs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Préréglages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {colorPresets.map((preset) => (
                    <Button key={preset.name}
                      className="justify-start h-auto p-3"
                      onClick={() => setTheme(prev => ({
                        ...prev,
                        primary_color: preset.primary,
                        secondary_color: preset.secondary,
                        accent_color: preset.accent
                      }))}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: preset.accent }}
                          />
                        </div>
                        <span className="text-sm">{preset.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mise en page */}
        <TabsContent value="layout" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="w-5 h-5 mr-2" />
                  Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Style d'en-tête</Label>
                  <select
                    value={layout.header_style}
                    onChange={(e) => setLayout(prev => ({ ...prev, header_style: e.target.value as any }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="minimal">Minimal</option>
                    <option value="standard">Standard</option>
                    <option value="extended">Étendu</option>
                  </select>
                </div>
                <div>
                  <Label>Style de pied de page</Label>
                  <select
                    value={layout.footer_style}
                    onChange={(e) => setLayout(prev => ({ ...prev, footer_style: e.target.value as any }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="simple">Simple</option>
                    <option value="detailed">Détaillé</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
                <div>
                  <Label>Largeur du conteneur</Label>
                  <select
                    value={layout.container_width}
                    onChange={(e) => setLayout(prev => ({ ...prev, container_width: e.target.value as any }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="narrow">Étroit</option>
                    <option value="standard">Standard</option>
                    <option value="wide">Large</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Grid className="w-5 h-5 mr-2" />
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Style de navigation</Label>
                  <select
                    value={layout.navigation_style}
                    onChange={(e) => setLayout(prev => ({ ...prev, navigation_style: e.target.value as any }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="horizontal">Horizontale</option>
                    <option value="vertical">Verticale</option>
                    <option value="hamburger">Menu hamburger</option>
                  </select>
                </div>
                <div>
                  <Label>Position de la barre latérale</Label>
                  <select
                    value={layout.sidebar_position}
                    onChange={(e) => setLayout(prev => ({ ...prev, sidebar_position: e.target.value as any }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="none">Aucune</option>
                    <option value="left">Gauche</option>
                    <option value="right">Droite</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Typographie */}
        <TabsContent value="typography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Police
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Famille de police</Label>
                  <select
                    value={theme.font_family}
                    onChange={(e) => setTheme(prev => ({ ...prev, font_family: e.target.value }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Taille de police de base</Label>
                  <select
                    value={theme.font_size}
                    onChange={(e) => setTheme(prev => ({ ...prev, font_size: e.target.value }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="14px">Petite (14px)</option>
                    <option value="16px">Moyenne (16px)</option>
                    <option value="18px">Grande (18px)</option>
                    <option value="20px">Très grande (20px)</option>
                  </select>
                </div>
                <div>
                  <Label>Aperçu de la typographie</Label>
                  <div 
                    className="p-4 border rounded mt-1"
                    style={{ 
                      fontFamily: theme.font_family,
                      fontSize: theme.font_size
                    }}
                  >
                    <h1 className="text-2xl font-bold mb-2">Titre principal</h1>
                    <h2 className="text-xl font-semibold mb-2">Sous-titre</h2>
                    <p className="mb-2">Ceci est un exemple de texte avec la police sélectionnée.</p>
                    <p className="text-sm text-gray-600">Et voici un texte plus petit.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Espacement & Bordures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Rayon de bordure</Label>
                  <select
                    value={theme.border_radius}
                    onChange={(e) => setTheme(prev => ({ ...prev, border_radius: e.target.value }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="0px">Aucun</option>
                    <option value="4px">Petit</option>
                    <option value="8px">Moyen</option>
                    <option value="12px">Grand</option>
                    <option value="16px">Très grand</option>
                  </select>
                </div>
                <div>
                  <Label>Espacement de base</Label>
                  <select
                    value={theme.spacing}
                    onChange={(e) => setTheme(prev => ({ ...prev, spacing: e.target.value }))}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="0.5rem">Compact</option>
                    <option value="1rem">Standard</option>
                    <option value="1.5rem">Largement espacé</option>
                    <option value="2rem">Très largement espacé</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Avancé */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                CSS Personnalisé
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>CSS personnalisé</Label>
                  <textarea
                    value={customCSS}
                    onChange={(e) => setCustomCSS(e.target.value)}
                    className="w-full h-64 p-3 border rounded font-mono text-sm"
                    placeholder="/* Votre CSS personnalisé ici */"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter CSS
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Importer CSS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 