'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  Send, 
  RefreshCw, 
  Lightbulb,
  Code,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  Copy
} from 'lucide-react'

interface AIAssistantProps {
  context?: string
  onSuggestion?: (suggestion: string) => void
}

export default function AIAssistant({ context, onSuggestion }: AIAssistantProps) {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])

  const quickPrompts = [
    "Optimise ce code pour les performances",
    "Ajoute des commentaires explicatifs",
    "Corrige les erreurs TypeScript",
    "Améliore l'accessibilité",
    "Optimise pour le SEO",
    "Ajoute la gestion d'erreurs",
    "Modernise le style CSS",
    "Ajoute des tests unitaires"
  ]

  const sendMessage = async () => {
    if (!message.trim()) return
    
    setLoading(true)
    const userMessage = message
    setMessage('')
    
    // Ajouter le message utilisateur à la conversation
    const updatedConversation = [...conversation, { role: 'user' as const, content: userMessage }]
    setConversation(updatedConversation)
    
    try {
      // Simulation d'une réponse IA (remplacez par votre API OpenAI)
      const aiResponse = await simulateAIResponse(userMessage, context)
      
      setResponse(aiResponse)
      setConversation([...updatedConversation, { role: 'assistant' as const, content: aiResponse }])
    } catch (error) {
      setResponse('Désolé, je ne peux pas répondre pour le moment. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const simulateAIResponse = async (userMessage: string, context?: string): Promise<string> => {
    // Simulation - remplacez par un vrai appel à OpenAI
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const responses = {
      'optimise': `Voici une version optimisée de votre code :

\`\`\`typescript
// Optimisations appliquées :
// 1. Memoization des composants
// 2. Lazy loading des images
// 3. Code splitting automatique
// 4. Optimisation des requêtes

import { memo, lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./HeavyComponent'))

export const OptimizedComponent = memo(({ data }) => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LazyComponent data={data} />
    </Suspense>
  )
})
\`\`\`

Ces optimisations amélioreront significativement les performances de votre application.`,

      'commentaires': `Voici votre code avec des commentaires explicatifs :

\`\`\`typescript
/**
 * Composant principal de la page d'accueil
 * Gère l'affichage des produits et la navigation
 */
export default function HomePage() {
  // État local pour gérer le chargement
  const [isLoading, setIsLoading] = useState(false)
  
  // Récupération des données depuis l'API
  const { data: products, error } = useSWR('/api/products', fetcher)
  
  // Gestion des erreurs de chargement
  if (error) return <ErrorComponent error={error} />
  
  return (
    <div className="container mx-auto">
      {/* En-tête avec navigation */}
      <Header />
      
      {/* Section principale des produits */}
      <main className="py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ProductGrid products={products} />
        )}
      </main>
    </div>
  )
}
\`\`\`

Les commentaires rendent le code plus maintenable et compréhensible.`,

      'typescript': `Voici les corrections TypeScript pour votre code :

\`\`\`typescript
// Types définis pour une meilleure sécurité
interface Product {
  id: string
  name: string
  price: number
  description?: string
  image?: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  className?: string
}

// Composant avec types stricts
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  className = ''
}) => {
  const handleClick = (): void => {
    onAddToCart(product)
  }

  return (
    <div className={\`product-card \${className}\`}>
      <h3>{product.name}</h3>
      <p>{product.price.toFixed(2)} €</p>
      <button onClick={handleClick}>
        Ajouter au panier
      </button>
    </div>
  )
}
\`\`\`

Ces corrections éliminent toutes les erreurs TypeScript et améliorent la sécurité du type.`,

      'accessibilité': `Voici les améliorations d'accessibilité pour votre code :

\`\`\`typescript
export const AccessibleComponent = () => {
  return (
    <div role="main" aria-label="Page principale">
      {/* Navigation avec ARIA labels */}
      <nav role="navigation" aria-label="Navigation principale">
        <ul>
          <li>
            <a href="/" aria-current="page">
              Accueil
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Formulaire accessible */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Adresse email
        </label>
        <input
          id="email"
          type="email"
          aria-describedby="email-help"
          aria-required="true"
        />
        <div id="email-help">
          Format : exemple@domaine.com
        </div>
        
        <button type="submit" aria-label="Envoyer le formulaire">
          Envoyer
        </button>
      </form>
      
      {/* Images avec alt text */}
      <img 
        src="/logo.png" 
        alt="Logo Batobaye Market"
        width="200"
        height="100"
      />
    </div>
  )
}
\`\`\`

Ces améliorations rendent votre site accessible aux utilisateurs de lecteurs d'écran.`
    }
    
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('optimise')) return responses.optimise
    if (lowerMessage.includes('commentaire')) return responses.commentaires
    if (lowerMessage.includes('typescript') || lowerMessage.includes('erreur')) return responses.typescript
    if (lowerMessage.includes('accessibilité') || lowerMessage.includes('aria')) return responses.accessibilité
    
    return `Je comprends votre demande : "${userMessage}"

Voici mes recommandations basées sur le contexte de votre projet Batobaye Market :

1. **Structure recommandée** : Utilisez des composants modulaires
2. **Performance** : Implémentez le lazy loading
3. **SEO** : Ajoutez des meta tags dynamiques
4. **Accessibilité** : Utilisez les attributs ARIA

Voulez-vous que je vous aide avec un aspect spécifique ?`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const applySuggestion = () => {
    if (response && onSuggestion) {
      onSuggestion(response)
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-batobaye-dark">Assistant IA</h2>
          <p className="text-gray-600">Obtenez de l'aide pour optimiser votre code</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-purple-50 text-purple-700">
            <Sparkles className="w-3 h-3 mr-1" />
            IA Avancée
          </Badge>
        </div>
      </div>

      {/* Conversation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Conversation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-batobaye-primary text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {msg.role === 'user' ? (
                      <span className="text-xs">Vous</span>
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="text-sm">IA en train de réfléchir...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Prompts rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Suggestions rapides
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <Button key={prompt}
                onClick={() => setMessage(prompt)}
                className="text-xs"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saisie de message */}
      <Card>
        <CardHeader>
          <CardTitle>Posez votre question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ex: Optimise ce code pour les performances, ajoute des commentaires, corrige les erreurs TypeScript..."
              rows={3}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
            <div className="flex justify-between items-center">
              <Button onClick={sendMessage} disabled={loading || !message.trim()}>
                {loading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                Envoyer
              </Button>
              <span className="text-xs text-gray-500">
                Appuyez sur Entrée pour envoyer
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Réponse de l'IA */}
      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                Réponse de l'IA
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => copyToClipboard(response)}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copier
                </Button>
                {onSuggestion && (
                  <Button onClick={applySuggestion}
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Appliquer
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono">{response}</pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Aide */}
      <Card>
        <CardHeader>
          <CardTitle>💡 Comment utiliser l'assistant IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• <strong>Posez des questions</strong> sur votre code ou vos besoins</p>
            <p>• <strong>Utilisez les suggestions rapides</strong> pour des demandes courantes</p>
            <p>• <strong>Copiez les réponses</strong> pour les utiliser dans votre code</p>
            <p>• <strong>Appliquez les suggestions</strong> directement dans l'éditeur</p>
            <p>• <strong>L'assistant comprend</strong> le contexte de votre projet Batobaye Market</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 