"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateAiResponse(prompt: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"), // Using GPT-4o for advanced capabilities
      prompt: prompt,
      system:
        "You are Kodee, a helpful and sophisticated AI assistant for Batobaye Market. Your goal is to assist users with tasks related to e-commerce, product management, marketing content generation, and data analysis. Provide concise, accurate, and actionable responses. If a request is outside your scope, politely state so.",
    })
    return { success: true, reply: text }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      success: false,
      reply:
        "Désolé, une erreur est survenue lors de la génération de la réponse de l'IA. Veuillez réessayer plus tard.",
    }
  }
}
