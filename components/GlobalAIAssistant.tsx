"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Clock,
  Star
} from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    confidence?: number
    suggestedActions?: string[]
  }
}

interface AIResponse {
  message: string
  intent: string
  confidence: number
  suggestedActions: string[]
  quickReplies: string[]
}

export default function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'assistant',
          content: `👋 Bonjour ! Je suis l'assistant IA de Batobaye Market. 

Je peux vous aider avec :
• 🛒 Informations sur nos produits
• 📦 Statut de commande et livraison
• 💰 Prix et promotions
• 🔧 Support technique
• 📞 Contact et horaires

Comment puis-je vous aider aujourd'hui ?`,
          timestamp: new Date(),
          metadata: {
            intent: 'greeting',
            confidence: 1,
            suggestedActions: ['produits', 'prix', 'livraison', 'contact']
          }
        }
      ])
    }
  }, [])

  // AI Processing Logic - Autonomous Processing
  const processUserInput = async (userInput: string): Promise<AIResponse> => {
    const input = userInput.toLowerCase().trim()
    
    // Intent Recognition with Autonomous Logic
    let intent = 'general'
    let confidence = 0.7
    let suggestedActions: string[] = []
    let quickReplies: string[] = []

    // Product-related queries
    if (input.includes('réfrigérateur') || input.includes('frigo') || input.includes('refrigerateur')) {
      intent = 'product_refrigerator'
      confidence = 0.95
      suggestedActions = ['voir_catalogue', 'demander_prix', 'comparer_marques']
      quickReplies = ['Prix des réfrigérateurs', 'Marques disponibles', 'Livraison gratuite']
    }
    else if (input.includes('téléviseur') || input.includes('tv') || input.includes('television')) {
      intent = 'product_tv'
      confidence = 0.95
      suggestedActions = ['voir_catalogue', 'demander_prix', 'installation']
      quickReplies = ['Prix des téléviseurs', 'Installation incluse', 'Garantie 2 ans']
    }
    else if (input.includes('cuisinière') || input.includes('cuisiniere') || input.includes('gaz')) {
      intent = 'product_stove'
      confidence = 0.95
      suggestedActions = ['voir_catalogue', 'demander_prix', 'installation']
      quickReplies = ['Prix des cuisinières', 'Installation gratuite', 'Service après-vente']
    }
    else if (input.includes('congélateur') || input.includes('congelateur')) {
      intent = 'product_freezer'
      confidence = 0.95
      suggestedActions = ['voir_catalogue', 'demander_prix']
      quickReplies = ['Prix des congélateurs', 'Livraison gratuite']
    }
    
    // Price-related queries
    else if (input.includes('prix') || input.includes('cout') || input.includes('tarif') || input.includes('combien')) {
      intent = 'pricing'
      confidence = 0.9
      suggestedActions = ['voir_catalogue', 'demander_devis', 'promotions']
      quickReplies = ['Catalogue complet', 'Promotions actuelles', 'Devis personnalisé']
    }
    
    // Delivery-related queries
    else if (input.includes('livraison') || input.includes('delivery') || input.includes('livrer') || input.includes('expédition')) {
      intent = 'delivery'
      confidence = 0.9
      suggestedActions = ['zones_livraison', 'delais_livraison', 'frais_livraison']
      quickReplies = ['Zones de livraison', 'Délais de livraison', 'Livraison gratuite']
    }
    
    // Contact-related queries
    else if (input.includes('contact') || input.includes('téléphone') || input.includes('adresse') || input.includes('où')) {
      intent = 'contact'
      confidence = 0.9
      suggestedActions = ['adresse_showroom', 'telephone', 'horaires']
      quickReplies = ['Adresse du showroom', 'Téléphone', 'Horaires d\'ouverture']
    }
    
    // Warranty and service queries
    else if (input.includes('garantie') || input.includes('sav') || input.includes('réparation') || input.includes('service')) {
      intent = 'warranty_service'
      confidence = 0.9
      suggestedActions = ['garantie_details', 'sav_contact', 'reparation']
      quickReplies = ['Garantie 2 ans', 'Service après-vente', 'Réparation']
    }
    
    // Order status queries
    else if (input.includes('commande') || input.includes('suivi') || input.includes('statut') || input.includes('order')) {
      intent = 'order_status'
      confidence = 0.9
      suggestedActions = ['suivi_commande', 'numero_commande']
      quickReplies = ['Suivi de commande', 'Numéro de commande']
    }
    
    // Greeting and general queries
    else if (input.includes('bonjour') || input.includes('salut') || input.includes('hello') || input.includes('aide')) {
      intent = 'greeting'
      confidence = 0.8
      suggestedActions = ['produits', 'services', 'contact']
      quickReplies = ['Nos produits', 'Nos services', 'Nous contacter']
    }

    // Generate contextual response based on intent
    let response = ''
    switch (intent) {
      case 'product_refrigerator':
        response = `🧊 **Réfrigérateurs Batobaye Market**

Nous proposons une large gamme de réfrigérateurs :
• Samsung - Innovation et design
• LG - Qualité et performance  
• Midea - Fiabilité et économie
• Hisense - Performance et prix

**Avantages Batobaye :**
✅ Livraison gratuite à Douala & Yaoundé
✅ Installation professionnelle incluse
✅ Garantie 2 ans
✅ Service après-vente 24/7

Voulez-vous connaître nos prix ou voir notre catalogue ?`
        break

      case 'product_tv':
        response = `📺 **Téléviseurs Batobaye Market**

Notre sélection de téléviseurs :
• Smart TV 4K - Expérience immersive
• LED Full HD - Qualité d'image exceptionnelle
• Toutes tailles : 32", 43", 55", 65"
• Marques premium : Samsung, LG, Hisense

**Services inclus :**
✅ Installation professionnelle
✅ Configuration complète
✅ Garantie 2 ans
✅ Support technique

Souhaitez-vous voir nos modèles ou connaître les prix ?`
        break

      case 'product_stove':
        response = `🔥 **Cuisinières Batobaye Market**

Nos cuisinières disponibles :
• 4 feux gaz - Économique
• 5 feux gaz - Performance
• Mixte gaz/électrique - Polyvalence
• Marques fiables : Midea, Samsung

**Avantages :**
✅ Installation gratuite
✅ Test complet avant livraison
✅ Garantie 2 ans
✅ Pièces détachées disponibles

Voulez-vous connaître nos prix ou réserver une installation ?`
        break

      case 'pricing':
        response = `💰 **Prix et Promotions Batobaye Market**

**Prix indicatifs :**
• Réfrigérateurs : 120,000 - 450,000 FCFA
• Téléviseurs : 180,000 - 380,000 FCFA
• Cuisinières : 85,000 - 120,000 FCFA
• Congélateurs : 95,000 - 280,000 FCFA

**Promotions actuelles :**
🎉 Livraison gratuite > 100,000 FCFA
🎉 Installation gratuite sur tous les produits
🎉 Garantie étendue offerte

**Paiement flexible :**
💳 Espèces, Carte, Mobile Money
📱 Paiement en plusieurs fois possible

Voulez-vous un devis personnalisé ?`
        break

      case 'delivery':
        response = `🚚 **Livraison Batobaye Market**

**Zones de livraison :**
✅ Douala - Livraison gratuite
✅ Yaoundé - Livraison gratuite
✅ Autres villes - Sur devis

**Délais de livraison :**
• En stock : 24-48h
• Sur commande : 3-7 jours
• Installation : Même jour

**Service premium :**
🎯 Livraison à domicile
🎯 Installation professionnelle
🎯 Test complet avant départ
🎯 Formation utilisateur

**Frais de livraison :**
💰 Gratuit > 100,000 FCFA
💰 5,000 FCFA < 100,000 FCFA

Voulez-vous réserver une livraison ?`
        break

      case 'contact':
        response = `📞 **Contact Batobaye Market**

**Showroom principal :**
📍 Akwa, Douala - Cameroun
📞 +237 672 02 77 44
📧 contact@batobaye.com

**Horaires d'ouverture :**
🕐 Lundi - Samedi : 8h00 - 20h00
🕐 Dimanche : 9h00 - 18h00

**Service client :**
💬 WhatsApp : +237 672 02 77 44
📱 Support 24/7 disponible

**Équipe :**
👨‍💼 Serge Batobaye - Fondateur
👥 Équipe technique qualifiée
👨‍🔧 Service après-vente dédié

Voulez-vous nous appeler ou nous rendre visite ?`
        break

      case 'warranty_service':
        response = `🛡️ **Garantie & Service Après-Vente**

**Garantie Batobaye :**
✅ 2 ans garantie complète
✅ Pièces et main d'œuvre incluses
✅ Service technique certifié
✅ Intervention à domicile

**Service après-vente :**
🔧 Réparation express
🔧 Maintenance préventive
🔧 Pièces détachées originales
🔧 Formation technique

**Contact SAV :**
📞 +237 672 02 77 44
🕐 24h/24 et 7j/7
🚗 Intervention sous 24h

**Engagement qualité :**
⭐ Satisfaction garantie
⭐ Produits certifiés
⭐ Service premium
⭐ Support technique

Avez-vous besoin d'assistance technique ?`
        break

      case 'order_status':
        response = `📦 **Suivi de Commande**

**Pour suivre votre commande :**
1️⃣ Numéro de commande requis
2️⃣ Vérification en temps réel
3️⃣ Mise à jour automatique

**Statuts possibles :**
🔄 En préparation
📦 En cours de livraison
✅ Livré et installé
⭐ Service après-vente

**Informations nécessaires :**
📋 Numéro de commande
📋 Nom du client
📋 Téléphone

**Suivi en ligne :**
🌐 Disponible 24h/24
📱 Notifications automatiques
📞 Support téléphonique

Pouvez-vous me donner votre numéro de commande ?`
        break

      default:
        response = `🤖 **Assistant Batobaye Market**

Je suis là pour vous aider ! Voici ce que je peux faire :

**Produits :** Réfrigérateurs, Téléviseurs, Cuisinières, Congélateurs
**Services :** Livraison gratuite, Installation, Garantie 2 ans
**Support :** Prix, Contact, Suivi commande, SAV

**Commandes rapides :**
• "Prix des réfrigérateurs"
• "Livraison gratuite"
• "Contact Batobaye"
• "Garantie 2 ans"

Comment puis-je vous aider plus précisément ?`
    }

    return {
      message: response,
      intent,
      confidence,
      suggestedActions,
      quickReplies
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Process with autonomous AI logic
      const aiResponse = await processUserInput(userMessage.content)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.message,
        timestamp: new Date(),
        metadata: {
          intent: aiResponse.intent,
          confidence: aiResponse.confidence,
          suggestedActions: aiResponse.suggestedActions
        }
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI processing error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Désolé, je rencontre un problème technique. Veuillez réessayer ou nous contacter directement au +237 672 02 77 44.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-batobaye-primary hover:bg-batobaye-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-batobaye-primary text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">Assistant Batobaye</span>
              <Badge variant="secondary" className="text-xs bg-white/20">
                IA
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsMinimized(!isMinimized)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.type === 'user'
                            ? 'bg-batobaye-primary text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'assistant' && (
                            <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="whitespace-pre-wrap text-sm">
                              {message.content}
                            </div>
                            {message.metadata?.suggestedActions && message.type === 'assistant' && (
                              <div className="mt-3 space-y-2">
                                <div className="text-xs text-gray-500">Actions suggérées :</div>
                                <div className="flex flex-wrap gap-2">
                                  {message.metadata.suggestedActions.map((action, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs h-7"
                                      onClick={() => handleQuickReply(action)}
                                    >
                                      {action}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          {message.type === 'user' && (
                            <User className="h-4 w-4 mt-1 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4" />
                          <div className="flex space-x-1">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            <span className="text-sm text-gray-600">En train d'écrire...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Actions */}
              {messages.length > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Actions rapides :</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickReply("Prix des réfrigérateurs")}
                    >
                      <Package className="h-3 w-3 mr-1" />
                      Réfrigérateurs
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickReply("Livraison gratuite")}
                    >
                      <Truck className="h-3 w-3 mr-1" />
                      Livraison
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickReply("Contact Batobaye")}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-batobaye-primary hover:bg-batobaye-primary/90"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
} 