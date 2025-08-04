"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Bot, Brain, Lightbulb, TrendingUp, AlertCircle, CheckCircle, 
  Sparkles, Rocket, Crown, Gem, Trophy, Award, Medal, Star,
  MessageSquare, Send, Settings, Zap, Target, BarChart, PieChart
} from "lucide-react"

interface AIMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  insights?: string[]
}

const aiSuggestions = [
  {
    title: "Analyser les performances",
    description: "Obtenir un rapport détaillé sur vos métriques clés",
    icon: BarChart,
    color: "bg-blue-500"
  },
  {
    title: "Optimiser le stock",
    description: "Recommandations pour la gestion des inventaires",
    icon: Target,
    color: "bg-green-500"
  },
  {
    title: "Prédire les ventes",
    description: "Analyse prédictive basée sur les données historiques",
    icon: TrendingUp,
    color: "bg-purple-500"
  },
  {
    title: "Optimiser les prix",
    description: "Suggestions de tarification dynamique",
    icon: Gem,
    color: "bg-yellow-500"
  }
]

const aiInsights = [
  {
    type: "success",
    icon: TrendingUp,
    title: "Performance Exceptionnelle",
    description: "Votre taux de conversion a augmenté de 23% ce mois-ci",
    metric: "+23%"
  },
  {
    type: "warning",
    icon: AlertCircle,
    title: "Opportunité d'Amélioration",
    description: "5 produits nécessitent un réapprovisionnement urgent",
    metric: "5 produits"
  },
  {
    type: "info",
    icon: Lightbulb,
    title: "Tendance Détectée",
    description: "Les ventes de réfrigérateurs sont en hausse de 40%",
    metric: "+40%"
  }
]

export function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      type: "assistant",
      content: "Bonjour ! Je suis votre assistant IA personnel. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      insights: ["Performance", "Optimisation", "Prédiction"]
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulation de réponse IA
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "J'ai analysé votre demande. Voici mes recommandations basées sur vos données actuelles...",
        timestamp: new Date(),
        insights: ["Analyse", "Recommandation", "Action"]
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Assistant IA Premium</h3>
              <p className="text-sm text-purple-100">Intelligence artificielle avancée</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
            <Crown className="w-3 h-3 mr-1" />
            VIP
          </Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Insights IA */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
            Insights IA
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="flex items-start space-x-2">
                  <div className={`p-1.5 rounded ${
                    insight.type === "success" ? "bg-green-100" :
                    insight.type === "warning" ? "bg-yellow-100" :
                    "bg-blue-100"
                  }`}>
                    <insight.icon className={`h-4 w-4 ${
                      insight.type === "success" ? "text-green-600" :
                      insight.type === "warning" ? "text-yellow-600" :
                      "text-blue-600"
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium text-gray-900 truncate">{insight.title}</h5>
                      <Badge variant="secondary" className="text-xs">
                        {insight.metric}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions rapides */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Suggestions rapides</h4>
          <div className="grid grid-cols-2 gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start space-y-2 hover:border-purple-300 hover:bg-purple-50"
              >
                <div className={`p-2 rounded-lg ${suggestion.color}`}>
                  <suggestion.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{suggestion.title}</div>
                  <div className="text-xs text-gray-600">{suggestion.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Conversation IA</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.insights && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.insights.map((insight, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`text-xs ${
                            message.type === "user"
                              ? "bg-white bg-opacity-20 text-white border-white border-opacity-30"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {insight}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs p-3 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Posez une question à votre assistant IA..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 