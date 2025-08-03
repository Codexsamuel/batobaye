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
  Star,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Brain,
  Zap
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    confidence?: number
    category?: 'reclamation' | 'sav' | 'produit' | 'general' | 'clarification' | 'greeting'
    suggestedActions?: string[]
    reasoning?: string
    context?: any
  }
}

interface AIResponse {
  message: string
  intent: string
  confidence: number
  category: 'reclamation' | 'sav' | 'produit' | 'general' | 'clarification' | 'greeting'
  suggestedActions?: string[]
  followUpQuestions?: string[]
  reasoning?: string
  context?: any
}

export default function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Bonjour ! Je suis l'assistant IA de Batobaye Market.\n\nJe peux vous aider avec :\n• 🛒 Informations sur nos produits\n• 📦 Statut de commande et livraison\n• 💰 Prix et promotions\n• 🔧 Support technique\n• 📞 Contact et horaires\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      metadata: {
        intent: 'greeting',
        confidence: 1,
        category: 'greeting',
        suggestedActions: ['produits', 'prix', 'livraison', 'contact']
      }
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationContext, setConversationContext] = useState<any>({})
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

  // Advanced AI processing logic with reasoning like Kodee
  const processUserMessage = async (userMessage: string): Promise<AIResponse> => {
    const lowerMessage = userMessage.toLowerCase().trim()
    
    // Context analysis and reasoning
    const context = analyzeContext(lowerMessage, conversationContext)
    const reasoning = generateReasoning(lowerMessage, context)
    
    // Intent recognition with advanced logic
    const intents = [
      {
        keywords: ['réclamation', 'plainte', 'problème', 'défaut', 'cassé', 'ne marche pas', 'erreur', 'litige', 'déçu', 'insatisfait'],
        intent: 'reclamation',
        category: 'reclamation' as const,
        confidence: 0.9,
        reasoning: 'Détection de mots-clés liés aux problèmes et insatisfactions'
      },
      {
        keywords: ['sav', 'réparation', 'garantie', 'maintenance', 'service', 'technique', 'panne', 'dysfonctionnement', 'réparer'],
        intent: 'sav',
        category: 'sav' as const,
        confidence: 0.85,
        reasoning: 'Détection de besoins de service après-vente'
      },
      {
        keywords: ['produit', 'prix', 'disponible', 'acheter', 'commander', 'livraison', 'réfrigérateur', 'téléviseur', 'cuisinière', 'congélateur', 'lave-linge'],
        intent: 'produit',
        category: 'produit' as const,
        confidence: 0.8,
        reasoning: 'Détection d\'intérêt pour les produits'
      },
      {
        keywords: ['agent', 'humain', 'parler', 'téléphone', 'appeler', 'contact', 'vraie personne'],
        intent: 'contact_human',
        category: 'general' as const,
        confidence: 0.9,
        reasoning: 'Demande de contact avec un agent humain'
      },
      {
        keywords: ['bonjour', 'salut', 'hello', 'hi', 'coucou'],
        intent: 'greeting',
        category: 'greeting' as const,
        confidence: 0.95,
        reasoning: 'Salutation détectée'
      }
    ]

    // Find best matching intent with reasoning
    let bestIntent = intents[0]
    let maxConfidence = 0
    let bestReasoning = ''

    for (const intent of intents) {
      const keywordMatches = intent.keywords.filter(keyword => 
        lowerMessage.includes(keyword)
      ).length
      
      if (keywordMatches > 0) {
        const confidence = Math.min(0.95, intent.confidence + (keywordMatches * 0.1))
        if (confidence > maxConfidence) {
          maxConfidence = confidence
          bestIntent = intent
          bestReasoning = intent.reasoning
        }
      }
    }

    // Handle very short or unclear messages
    if (lowerMessage.length < 3 || maxConfidence < 0.3) {
      return {
        message: `Je ne suis pas sûr de comprendre votre demande. Pouvez-vous préciser ?

Je peux vous aider avec :
• 📦 **Produits** : Informations, prix, disponibilité
• 🛠️ **SAV** : Réparations, garantie, maintenance  
• ⚠️ **Réclamations** : Problèmes, litiges, remboursements
• 📞 **Contact** : Connexion avec un agent

Ou tapez "agent" pour parler à un humain directement.`,
        intent: 'clarification',
        confidence: 0.3,
        category: 'clarification',
        suggestedActions: ['Voir nos produits', 'Service après-vente', 'Contacter un agent'],
        reasoning: 'Message trop court ou ambigu, demande de clarification'
      }
    }

    // Generate contextual response with reasoning
    let response: AIResponse

    switch (bestIntent.intent) {
      case 'greeting':
        response = {
          message: `👋 Bonjour ! Comment puis-je vous aider aujourd'hui ? 

Je suis là pour vous assister avec :
• 🛒 **Produits** : Réfrigérateurs, Téléviseurs, Cuisinières
• 💰 **Prix** : Devis, promotions, paiement en plusieurs fois
• 🚚 **Livraison** : Gratuite > 100,000 FCFA, installation incluse
• 🔧 **SAV** : Garantie 2 ans, réparations, maintenance
• 📞 **Contact** : Connexion avec un agent humain

Que souhaitez-vous faire ?`,
          intent: 'greeting',
          confidence: maxConfidence,
          category: 'greeting',
          suggestedActions: ['Voir nos produits', 'Demander un devis', 'Service après-vente', 'Contacter un agent'],
          reasoning: bestReasoning
        }
        break

      case 'reclamation':
        response = {
          message: `Je comprends que vous avez une réclamation. Pour mieux vous aider, j'ai besoin de quelques informations :

• Quel produit est concerné ?
• Quand avez-vous fait l'achat ?
• Quel est le problème exact ?
• Avez-vous votre facture ou numéro de commande ?

En attendant, voici nos procédures de réclamation :
📋 **Réclamation standard** : Traitement sous 48h
🔄 **Remboursement** : Sous 5 jours ouvrables
📞 **Urgence** : Contact direct au +237 XXX XXX XXX

Souhaitez-vous que je vous connecte à un agent spécialisé en réclamations ?`,
          intent: 'reclamation',
          confidence: maxConfidence,
          category: 'reclamation',
          suggestedActions: ['Connecter à un agent', 'Créer un ticket', 'Voir nos garanties'],
          followUpQuestions: ['Avez-vous votre facture ?', 'Le produit est-il encore sous garantie ?'],
          reasoning: bestReasoning
        }
        break

      case 'sav':
        response = {
          message: `Service Après-Vente Batobaye Market à votre service ! 

🔧 **Nos services SAV :**
• Réparation sur site (Douala, Yaoundé)
• Pièces détachées originales
• Garantie étendue disponible
• Maintenance préventive

📋 **Pour une intervention :**
• Numéro de série du produit
• Description du problème
• Adresse d'intervention
• Disponibilité

⏰ **Délais d'intervention :**
• Urgence : 24h
• Standard : 48-72h
• Maintenance : 1 semaine

Voulez-vous programmer une intervention ou avez-vous besoin d'informations sur nos garanties ?`,
          intent: 'sav',
          confidence: maxConfidence,
          category: 'sav',
          suggestedActions: ['Programmer intervention', 'Voir garanties', 'Demander devis'],
          followUpQuestions: ['Quel est le numéro de série ?', 'Le problème est-il urgent ?'],
          reasoning: bestReasoning
        }
        break

      case 'produit':
        response = {
          message: `Parfait ! Je peux vous présenter nos produits phares :

🛍️ **Nos Catégories :**
• Réfrigérateurs (Samsung, LG, Midea)
• Téléviseurs (4K, Smart TV, 55" à 75")
• Cuisinières (Gaz, Électrique, Mixte)
• Congélateurs (Côte à côte, Armoire)
• Lave-linge (Automatique, Semi-auto)

💰 **Offres actuelles :**
• Livraison gratuite > 100,000 FCFA
• Installation professionnelle incluse
• Garantie 2 ans minimum
• Paiement en 3x sans frais

🎯 **Produits populaires :**
• Samsung RT38K501J8A (Réfrigérateur)
• LG 55NANO75SQA (Téléviseur 4K)
• Midea MC-FS4018 (Cuisinière 4 feux)

Quel type de produit vous intéresse ? Je peux vous donner des détails spécifiques !`,
          intent: 'produit',
          confidence: maxConfidence,
          category: 'produit',
          suggestedActions: ['Voir catalogue complet', 'Demander devis', 'Vérifier disponibilité'],
          followUpQuestions: ['Quel est votre budget ?', 'Quelle marque préférez-vous ?'],
          reasoning: bestReasoning
        }
        break

      case 'contact_human':
        response = {
          message: `Bien sûr ! Je vais vous connecter à un agent humain.

📞 **Contact direct :**
• Téléphone : +237 XXX XXX XXX
• WhatsApp : +237 XXX XXX XXX
• Email : contact@batobaye.com

📍 **Nos showrooms :**
• Douala : Rue XXX, Quartier XXX
• Yaoundé : Avenue XXX, Centre-ville

⏰ **Horaires d'ouverture :**
• Lundi-Samedi : 8h-20h
• Dimanche : 9h-18h

Un agent va vous contacter dans les 5 minutes. En attendant, puis-je vous aider avec autre chose ?`,
          intent: 'contact_human',
          confidence: maxConfidence,
          category: 'general',
          suggestedActions: ['Attendre l\'appel', 'Laisser un message', 'Prendre RDV'],
          reasoning: bestReasoning
        }
        break

      default:
        response = {
          message: `Je ne suis pas sûr de comprendre votre demande. Pouvez-vous préciser ?

Je peux vous aider avec :
• 📦 **Produits** : Informations, prix, disponibilité
• 🛠️ **SAV** : Réparations, garantie, maintenance  
• ⚠️ **Réclamations** : Problèmes, litiges, remboursements
• 📞 **Contact** : Connexion avec un agent

Ou tapez "agent" pour parler à un humain directement.`,
          intent: 'clarification',
          confidence: 0.3,
          category: 'clarification',
          suggestedActions: ['Voir nos produits', 'Service après-vente', 'Contacter un agent'],
          reasoning: 'Intention non reconnue, demande de clarification'
        }
    }

    return response
  }

  // Context analysis function
  const analyzeContext = (message: string, currentContext: any) => {
    const context = { ...currentContext }
    
    // Track conversation flow
    if (message.includes('produit') || message.includes('prix')) {
      context.productInterest = true
    }
    if (message.includes('problème') || message.includes('réclamation')) {
      context.hasIssue = true
    }
    if (message.includes('agent') || message.includes('humain')) {
      context.wantsHuman = true
    }
    
    return context
  }

  // Reasoning generation function
  const generateReasoning = (message: string, context: any) => {
    let reasoning = ''
    
    if (message.length < 3) {
      reasoning = 'Message trop court, demande de clarification'
    } else if (context.wantsHuman) {
      reasoning = 'Utilisateur demande un contact humain'
    } else if (context.hasIssue) {
      reasoning = 'Utilisateur signale un problème'
    } else if (context.productInterest) {
      reasoning = 'Utilisateur s\'intéresse aux produits'
    } else {
      reasoning = 'Analyse contextuelle standard'
    }
    
    return reasoning
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    setInputValue('')
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      // Simulate AI processing delay with reasoning
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const aiResponse = await processUserMessage(userMessage)
      
      // Update conversation context
      setConversationContext((prev: any) => ({
        ...prev,
        lastIntent: aiResponse.intent,
        lastCategory: aiResponse.category
      }))
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.message,
        timestamp: new Date(),
        metadata: {
          intent: aiResponse.intent,
          confidence: aiResponse.confidence,
          category: aiResponse.category,
          suggestedActions: aiResponse.suggestedActions,
          reasoning: aiResponse.reasoning
        }
      }
      
      setMessages(prev => [...prev, assistantMsg])
    } catch (error) {
      console.error('Error processing message:', error)
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Désolé, j'ai rencontré une erreur. Veuillez réessayer ou contacter directement notre équipe au +237 XXX XXX XXX.",
        timestamp: new Date(),
        metadata: {
          intent: 'error',
          confidence: 0,
          category: 'general',
          reasoning: 'Erreur technique lors du traitement'
        }
      }
      
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestedAction = (action: string) => {
    setInputValue(action)
    handleSendMessage()
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-batobaye-primary hover:bg-batobaye-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-batobaye-primary text-white rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">Assistant IA Batobaye</span>
              <Badge className="text-xs bg-white/20">
                <Zap className="w-3 h-3 mr-1" />
                IA
              </Badge>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-batobaye-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    
                    {/* Reasoning indicator for assistant messages */}
                    {message.metadata?.reasoning && message.role === 'assistant' && (
                      <div className="mt-2 text-xs text-gray-500 italic">
                        💭 {message.metadata.reasoning}
                      </div>
                    )}
                    
                    {/* Suggested Actions */}
                    {message.metadata?.suggestedActions && message.role === 'assistant' && (
                      <div className="mt-3 space-y-2">
                        {message.metadata.suggestedActions.map((action, index) => (
                          <Button
                            key={index}
                            onClick={() => handleSuggestedAction(action)}
                            variant="outline"
                            size="sm"
                            className="w-full text-xs bg-white hover:bg-gray-50"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 animate-pulse" />
                      <span className="text-sm text-gray-600">Assistant en train de réfléchir...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

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
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-batobaye-primary hover:bg-batobaye-primary/90"
                >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="cursor-pointer hover:bg-gray-200 text-xs"
                onClick={() => handleSuggestedAction("Je veux voir vos produits")}
              >
                📦 Produits
              </Badge>
              <Badge className="cursor-pointer hover:bg-gray-200 text-xs"
                onClick={() => handleSuggestedAction("J'ai un problème avec un produit")}
              >
                🛠️ SAV
              </Badge>
              <Badge className="cursor-pointer hover:bg-gray-200 text-xs"
                onClick={() => handleSuggestedAction("Je veux parler à un agent")}
              >
                📞 Agent
              </Badge>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 