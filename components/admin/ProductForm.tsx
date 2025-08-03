'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Package, Save, X, Plus, Trash2 } from 'lucide-react'
import ImageUpload from './ImageUpload'

interface ProductFormProps {
  product?: any
  onSave: (productData: any) => void
  onCancel: () => void
  isLoading?: boolean
}

const categories = [
  { value: 'Réfrigérateurs', label: 'Réfrigérateurs' },
  { value: 'Congélateurs', label: 'Congélateurs' },
  { value: 'Téléviseurs', label: 'Téléviseurs' },
  { value: 'Chauffe-eau', label: 'Chauffe-eau' },
  { value: 'Cuisinières', label: 'Cuisinières' },
  { value: 'Lave-linge', label: 'Lave-linge' },
]

const brands = [
  'Samsung', 'LG', 'Hisense', 'Ariston', 'Brigo', 'Whirlpool', 'Bosch', 'Electrolux'
]

export default function ProductForm({ product, onSave, onCancel, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    stock_quantity: '',
    category: '',
    brand: '',
    model: '',
    image_url: '',
    images: [] as string[],
    specifications: {} as Record<string, any>,
    status: 'active' as 'active' | 'inactive' | 'out_of_stock'
  })

  const [specifications, setSpecifications] = useState<Array<{ key: string; value: string }>>([])

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        original_price: product.original_price?.toString() || '',
        stock_quantity: product.stock_quantity?.toString() || '',
        category: product.category || '',
        brand: product.brand || '',
        model: product.model || '',
        image_url: product.image_url || '',
        images: product.images || [],
        specifications: product.specifications || {},
        status: product.status || 'active'
      })

      // Convertir les spécifications en tableau pour l'édition
      if (product.specifications) {
        const specsArray = Object.entries(product.specifications).map(([key, value]) => ({
          key,
          value: value as string
        }))
        setSpecifications(specsArray)
      }
    }
  }, [product])

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }])
  }

  const removeSpecification = (index: number) => {
    const newSpecs = specifications.filter((_, i) => i !== index)
    setSpecifications(newSpecs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convertir les spécifications en objet
    const specsObject: Record<string, any> = {}
    specifications.forEach(spec => {
      if (spec.key && spec.value) {
        specsObject[spec.key] = spec.value
      }
    })

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: parseFloat(formData.original_price),
      stock_quantity: parseInt(formData.stock_quantity),
      specifications: specsObject,
      image_url: formData.images[0] || formData.image_url // Utiliser la première image comme image principale
    }

    onSave(productData)
  }

  const formatPrice = (price: string) => {
    const num = parseFloat(price)
    if (isNaN(num)) return ''
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(num)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="specifications">Spécifications</TabsTrigger>
          <TabsTrigger value="pricing">Prix & Stock</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Réfrigérateur Samsung 350L"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Marque</Label>
                  <Select value={formData.brand} onValueChange={(value) => handleInputChange('brand', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une marque" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modèle</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Ex: RT35K5530S8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Description détaillée du produit..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status === 'active'}
                  onCheckedChange={(checked) => 
                    handleInputChange('status', checked ? 'active' : 'inactive')
                  }
                />
                <Label htmlFor="status">Produit actif</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images du produit</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={formData.images}
                onImagesChange={(images) => handleInputChange('images', images)}
                maxImages={5}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spécifications techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder="Propriété (ex: Capacité)"
                    value={spec.key}
                    onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Valeur (ex: 350L)"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button"
                    onClick={() => removeSpecification(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              <Button type="button"
                onClick={addSpecification}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une spécification
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prix et stock</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Prix de vente (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="450000"
                    required
                  />
                  {formData.price && (
                    <p className="text-sm text-gray-600">{formatPrice(formData.price)}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="original_price">Prix original (FCFA) *</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => handleInputChange('original_price', e.target.value)}
                    placeholder="520000"
                    required
                  />
                  {formData.original_price && (
                    <p className="text-sm text-gray-600">{formatPrice(formData.original_price)}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock_quantity">Quantité en stock *</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => handleInputChange('stock_quantity', e.target.value)}
                    placeholder="15"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Statut du stock</Label>
                  <div className="flex items-center space-x-2">
                    {parseInt(formData.stock_quantity) > 0 ? (
                      <Badge className="bg-green-100 text-green-800">En stock</Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-800">Rupture de stock</Badge>
                    )}
                  </div>
                </div>
              </div>

              {formData.price && formData.original_price && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Résumé des prix</h4>
                  <div className="space-y-1 text-sm">
                    <p>Prix original: {formatPrice(formData.original_price)}</p>
                    <p>Prix de vente: {formatPrice(formData.price)}</p>
                    <p>Économie: {formatPrice((parseFloat(formData.original_price) - parseFloat(formData.price)).toString())}</p>
                    <p>Réduction: {Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100)}%</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button type="button" onClick={onCancel}>
          <X className="w-4 h-4 mr-2" />
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Enregistrement...' : (product ? 'Mettre à jour' : 'Créer le produit')}
        </Button>
      </div>
    </form>
  )
} 