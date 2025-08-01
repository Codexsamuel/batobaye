"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Store, 
  Mail, 
  Shield, 
  Palette, 
  Bell,
  Globe,
  CreditCard,
  Truck,
  Users,
  Database,
  Save,
  RefreshCw,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    store: {
      name: 'Batobaye Market',
      email: 'contact@batobaye.com',
      phone: '+237 672 02 77 44',
      address: 'Akwa, Douala, Cameroun',
      currency: 'FCFA',
      timezone: 'Africa/Douala'
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      orderConfirmation: true,
      lowStock: true,
      newCustomer: false
    },
    shipping: {
      freeShippingThreshold: 100000,
      defaultShippingCost: 5000,
      deliveryTime: '24-48h',
      allowPickup: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#FF8C00',
      logo: '/images/BATOBAYE LOGO.jpeg',
      favicon: '/favicon.ico'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5
    }
  })

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  const handleSave = () => {
    // Simuler la sauvegarde
    console.log('Sauvegarde des paramètres:', settings)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-batobaye-dark flex items-center">
            <Settings className="w-8 h-8 mr-3 text-gray-500" />
            Paramètres
          </h1>
          <p className="text-gray-600 mt-1">Configurez votre boutique</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          <Button onClick={handleSave} className="flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="store" className="flex items-center">
            <Store className="w-4 h-4 mr-2" />
            Boutique
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center">
            <Truck className="w-4 h-4 mr-2" />
            Livraison
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center">
            <Palette className="w-4 h-4 mr-2" />
            Apparence
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Avancé
          </TabsTrigger>
        </TabsList>

        {/* Store Settings */}
        <TabsContent value="store" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="w-5 h-5 mr-2" />
                Informations de la Boutique
              </CardTitle>
              <CardDescription>
                Configurez les informations de base de votre boutique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Nom de la boutique</Label>
                  <Input
                    id="storeName"
                    value={settings.store.name}
                    onChange={(e) => handleSettingChange('store', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail">Email de contact</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.store.email}
                    onChange={(e) => handleSettingChange('store', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storePhone">Téléphone</Label>
                  <Input
                    id="storePhone"
                    value={settings.store.phone}
                    onChange={(e) => handleSettingChange('store', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storeCurrency">Devise</Label>
                  <Input
                    id="storeCurrency"
                    value={settings.store.currency}
                    onChange={(e) => handleSettingChange('store', 'currency', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="storeAddress">Adresse</Label>
                <Input
                  id="storeAddress"
                  value={settings.store.address}
                  onChange={(e) => handleSettingChange('store', 'address', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Paramètres de Notifications
              </CardTitle>
              <CardDescription>
                Configurez comment vous recevez les notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications SMS</Label>
                    <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
                  </div>
                  <Switch
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'sms', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notifications push</Label>
                    <p className="text-sm text-gray-500">Recevoir les notifications push</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Types de notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Confirmation de commande</Label>
                      <p className="text-sm text-gray-500">Envoyer une confirmation lors d'une nouvelle commande</p>
                    </div>
                    <Switch
                      checked={settings.notifications.orderConfirmation}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'orderConfirmation', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Stock faible</Label>
                      <p className="text-sm text-gray-500">Alerter quand un produit est en stock faible</p>
                    </div>
                    <Switch
                      checked={settings.notifications.lowStock}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'lowStock', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Nouveau client</Label>
                      <p className="text-sm text-gray-500">Notifier lors de l'inscription d'un nouveau client</p>
                    </div>
                    <Switch
                      checked={settings.notifications.newCustomer}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'newCustomer', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Paramètres de Livraison
              </CardTitle>
              <CardDescription>
                Configurez les options de livraison
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeShippingThreshold">Seuil livraison gratuite (FCFA)</Label>
                  <Input
                    id="freeShippingThreshold"
                    type="number"
                    value={settings.shipping.freeShippingThreshold}
                    onChange={(e) => handleSettingChange('shipping', 'freeShippingThreshold', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="defaultShippingCost">Coût livraison par défaut (FCFA)</Label>
                  <Input
                    id="defaultShippingCost"
                    type="number"
                    value={settings.shipping.defaultShippingCost}
                    onChange={(e) => handleSettingChange('shipping', 'defaultShippingCost', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="deliveryTime">Délai de livraison</Label>
                  <Input
                    id="deliveryTime"
                    value={settings.shipping.deliveryTime}
                    onChange={(e) => handleSettingChange('shipping', 'deliveryTime', e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Autoriser le retrait en magasin</Label>
                  <p className="text-sm text-gray-500">Permettre aux clients de récupérer leur commande en magasin</p>
                </div>
                <Switch
                  checked={settings.shipping.allowPickup}
                  onCheckedChange={(checked) => handleSettingChange('shipping', 'allowPickup', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Apparence du Site
              </CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre boutique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">Thème</Label>
                  <select
                    id="theme"
                    className="w-full p-2 border rounded-md"
                    value={settings.appearance.theme}
                    onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                  >
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="auto">Automatique</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="primaryColor">Couleur principale</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    id="logo"
                    value={settings.appearance.logo}
                    onChange={(e) => handleSettingChange('appearance', 'logo', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="favicon">Favicon</Label>
                  <Input
                    id="favicon"
                    value={settings.appearance.favicon}
                    onChange={(e) => handleSettingChange('appearance', 'favicon', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Sécurité
              </CardTitle>
              <CardDescription>
                Paramètres de sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Authentification à deux facteurs</Label>
                  <p className="text-sm text-gray-500">Ajouter une couche de sécurité supplémentaire</p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('security', 'twoFactorAuth', checked)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sessionTimeout">Timeout session (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Expiration mot de passe (jours)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="loginAttempts">Tentatives de connexion</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Paramètres Avancés
              </CardTitle>
              <CardDescription>
                Paramètres techniques avancés
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-gray-500">Mettre le site en mode maintenance</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Cache</Label>
                    <p className="text-sm text-gray-500">Activer le cache pour améliorer les performances</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug</Label>
                    <p className="text-sm text-gray-500">Activer le mode debug</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Vider le cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Sauvegarder la base de données
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Réinitialiser tous les paramètres
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