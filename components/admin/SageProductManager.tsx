'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { 
  Calculator, 
  TrendingUp, 
  Package, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Edit,
  Save,
  Plus,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  Zap
} from 'lucide-react'
import { 
  calculateTaxes, 
  calculateProfit, 
  calculateReorderPoint,
  formatFCFA 
} from '@/lib/sage-calculations'

interface ProductFormData {
  name: string
  description: string
  category: string
  brand: string
  model: string
  purchase_price: number
  selling_price: number
  original_price: number
  tax_rate: number
  stock_quantity: number
  min_stock_level: number
  daily_consumption: number
  lead_time: number
  supplier_id: number
  image_url: string
  status: 'active' | 'inactive' | 'out_of_stock'
}

export default function SageProductManager() {
  const [activeTab, setActiveTab] = useState('create')
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: '',
    brand: '',
    model: '',
    purchase_price: 0,
    selling_price: 0,
    original_price: 0,
    tax_rate: 19.25, // TVA Cameroun
    stock_quantity: 0,
    min_stock_level: 5,
    daily_consumption: 1,
    lead_time: 7,
    supplier_id: 1,
    image_url: '',
    status: 'active'
  })

  const [calculations, setCalculations] = useState({
    profit: { margin: 0, marginPercentage: 0, profitPerUnit: 0 },
    taxes: { amountHT: 0, amountTVA: 0, amountTTC: 0 },
    stock: { reorderPoint: 0, safetyStock: 0 }
  })

  const [autoCalculate, setAutoCalculate] = useState(true)

  // Calculs automatiques SAGE SAARI
  useEffect(() => {
    if (!autoCalculate) return

    // Calcul de la marge
    const profit = calculateProfit(formData.purchase_price, formData.selling_price)
    
    // Calcul des taxes
    const taxes = calculateTaxes(formData.selling_price, formData.tax_rate, true)
    
    // Calcul du point de réapprovisionnement
    const reorderPoint = calculateReorderPoint(formData.daily_consumption, formData.lead_time)
    const safetyStock = Math.ceil(formData.daily_consumption * 0.5 * 1.65) // 50% variabilité, 95% niveau de service

    setCalculations({
      profit,
      taxes,
      stock: { reorderPoint, safetyStock }
    })
  }, [formData, autoCalculate])

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          specifications: {
            daily_consumption: formData.daily_consumption,
            lead_time: formData.lead_time,
            reorder_point: calculations.stock.reorderPoint,
            safety_stock: calculations.stock.safetyStock
          }
        }),
      })

      if (response.ok) {
        alert('Produit créé avec succès !')
        // Reset form
        setFormData({
          name: '',
          description: '',
          category: '',
          brand: '',
          model: '',
          purchase_price: 0,
          selling_price: 0,
          original_price: 0,
          tax_rate: 19.25,
          stock_quantity: 0,
          min_stock_level: 5,
          daily_consumption: 1,
          lead_time: 7,
          supplier_id: 1,
          image_url: '',
          status: 'active'
        })
      } else {
        alert('Erreur lors de la création du produit')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la création du produit')
    }
  }

  const getProfitColor = (percentage: number) => {
    if (percentage >= 30) return 'text-green-600'
    if (percentage >= 15) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStockStatus = () => {
    if (formData.stock_quantity === 0) return { status: 'Rupture', color: 'text-red-600', bg: 'bg-red-50' }
    if (formData.stock_quantity <= formData.min_stock_level) return { status: 'Stock Faible', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { status: 'En Stock', color: 'text-green-600', bg: 'bg-green-50' }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gestionnaire de Produits SAGE</h2>
          <p className="text-gray-600">Calculs automatiques et gestion commerciale avancée</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={autoCalculate}
            onCheckedChange={setAutoCalculate}
          />
          <Label>Calculs automatiques</Label>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Création Produit</TabsTrigger>
          <TabsTrigger value="calculations">Calculs SAGE</TabsTrigger>
          <TabsTrigger value="stock">Gestion Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Informations Produit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Réfrigérateur Samsung 350L"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Description détaillée du produit..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="refrigerateurs">Réfrigérateurs</SelectItem>
                        <SelectItem value="congelateurs">Congélateurs</SelectItem>
                        <SelectItem value="televiseurs">Téléviseurs</SelectItem>
                        <SelectItem value="cuisiniere">Cuisinières</SelectItem>
                        <SelectItem value="chauffe-eau">Chauffe-eau</SelectItem>
                        <SelectItem value="machines-a-laver">Machines à laver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="brand">Marque</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Ex: Samsung"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="model">Modèle</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Ex: RT35K5530S8"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prix et TVA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Prix et TVA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="purchase_price">Prix d'achat HT (FCFA) *</Label>
                  <Input
                    id="purchase_price"
                    type="number"
                    value={formData.purchase_price}
                    onChange={(e) => handleInputChange('purchase_price', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="selling_price">Prix de vente HT (FCFA) *</Label>
                  <Input
                    id="selling_price"
                    type="number"
                    value={formData.selling_price}
                    onChange={(e) => handleInputChange('selling_price', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="original_price">Prix barré HT (FCFA)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => handleInputChange('original_price', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="tax_rate">Taux de TVA (%)</Label>
                  <Select value={formData.tax_rate.toString()} onValueChange={(value) => handleInputChange('tax_rate', parseFloat(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% - Exonéré</SelectItem>
                      <SelectItem value="19.25">19.25% - Standard</SelectItem>
                      <SelectItem value="9.75">9.75% - Réduit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-batobaye-primary hover:bg-batobaye-light">
              <Save className="w-4 h-4 mr-2" />
              Créer le Produit
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="calculations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calculs de marge */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Marge Bénéficiaire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getProfitColor(calculations.profit.marginPercentage)}`}>
                    {calculations.profit.marginPercentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Marge brute</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Marge unitaire:</span>
                    <span className="font-semibold">{formatFCFA(calculations.profit.profitPerUnit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Prix d'achat:</span>
                    <span>{formatFCFA(formData.purchase_price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Prix de vente:</span>
                    <span>{formatFCFA(formData.selling_price)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculs de TVA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculs TVA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Prix HT:</span>
                    <span className="font-semibold">{formatFCFA(calculations.taxes.amountHT)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">TVA ({formData.tax_rate}%):</span>
                    <span className="font-semibold">{formatFCFA(calculations.taxes.amountTVA)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-semibold">Prix TTC:</span>
                    <span className="font-bold text-lg">{formatFCFA(calculations.taxes.amountTTC)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Indicateurs de performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Indicateurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Rentabilité:</span>
                    <Badge variant={calculations.profit.marginPercentage >= 20 ? "default" : "secondary"}>
                      {calculations.profit.marginPercentage >= 20 ? "Excellente" : "Correcte"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">TVA collectée:</span>
                    <span className="font-semibold">{formatFCFA(calculations.taxes.amountTVA)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Marge absolue:</span>
                    <span className="font-semibold">{formatFCFA(calculations.profit.margin)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stock" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gestion du stock */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Gestion du Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stock_quantity">Quantité en stock</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="min_stock_level">Stock minimum</Label>
                  <Input
                    id="min_stock_level"
                    type="number"
                    value={formData.min_stock_level}
                    onChange={(e) => handleInputChange('min_stock_level', parseInt(e.target.value) || 0)}
                    placeholder="5"
                  />
                </div>

                <div>
                  <Label htmlFor="daily_consumption">Consommation journalière</Label>
                  <Input
                    id="daily_consumption"
                    type="number"
                    step="0.1"
                    value={formData.daily_consumption}
                    onChange={(e) => handleInputChange('daily_consumption', parseFloat(e.target.value) || 0)}
                    placeholder="1"
                  />
                </div>

                <div>
                  <Label htmlFor="lead_time">Délai de livraison (jours)</Label>
                  <Input
                    id="lead_time"
                    type="number"
                    value={formData.lead_time}
                    onChange={(e) => handleInputChange('lead_time', parseInt(e.target.value) || 0)}
                    placeholder="7"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Alertes et seuils */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Alertes de Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg ${stockStatus.bg}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Statut actuel:</span>
                    <span className={`font-bold ${stockStatus.color}`}>{stockStatus.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Point de réapprovisionnement:</span>
                    <span className="font-semibold">{calculations.stock.reorderPoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Stock de sécurité:</span>
                    <span className="font-semibold">{calculations.stock.safetyStock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Seuil d'alerte:</span>
                    <span className="font-semibold">{formData.min_stock_level}</span>
                  </div>
                </div>

                {formData.stock_quantity <= formData.min_stock_level && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm text-yellow-800">
                        Stock faible ! Pensez à réapprovisionner.
                      </span>
                    </div>
                  </div>
                )}

                {formData.stock_quantity === 0 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-sm text-red-800">
                        Rupture de stock ! Réapprovisionnement urgent.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 