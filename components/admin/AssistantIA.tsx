"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Bot } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAiResponse } from "@/actions/ai" // Import the Server Action

export function AssistantIA() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAsk = async () => {
    if (msg.trim() === "") return

    setIsLoading(true)
    setReply("") // Clear previous reply
    try {
      const result = await generateAiResponse(msg)
      if (result.success) {
        setReply(result.reply)
      } else {
        setReply(result.reply) // Display error message from server action
      }
    } catch (error) {
      console.error("Error calling AI Server Action:", error)
      setReply("Désolé, une erreur inattendue est survenue lors de la communication avec l'IA.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            Kodee – Assistant IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ai-prompt">Votre demande à l'IA</Label>
            <Textarea
              id="ai-prompt"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="w-full p-2 border mb-2 min-h-[120px]"
              placeholder="Ex. Rédige une description de congélateur Hisense 450L en mettant l'accent sur ses avantages pour les familles camerounaises..."
            />
          </div>
          <Button
            onClick={handleAsk}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            disabled={isLoading || msg.trim() === ""}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                Génération en cours...
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 mr-2" />
                Générer avec IA
              </>
            )}
          </Button>
          {reply && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200 text-gray-800">
              <h3 className="font-semibold mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                Réponse de Kodee :
              </h3>
              <p>{reply}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
