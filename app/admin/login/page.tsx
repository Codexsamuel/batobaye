"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, ShoppingBag, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("admin")
  const [password, setPassword] = useState("@Batobaye2025")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation des identifiants
    if (email === "admin" && password === "@Batobaye2025") {
      // Simulate login process
      setTimeout(() => {
        setIsLoading(false)
        router.push("/admin")
      }, 2000)
    } else {
      // Identifiants incorrects
      setTimeout(() => {
        setIsLoading(false)
        alert("Identifiants incorrects. Utilisez : admin / @Batobaye2025")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-batobaye-dark via-gray-900 to-batobaye-brown flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-batobaye-primary rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-batobaye-dark">BATOBAYE ADMIN</CardTitle>
            <CardDescription className="text-gray-600">
              Connectez-vous à votre dashboard d'administration
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-batobaye-primary hover:bg-batobaye-light text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="bg-batobaye-primary/10 border border-batobaye-primary/20 rounded-lg p-4 mb-4">
                <p className="text-sm text-batobaye-dark font-medium">
                  <strong>Identifiants par défaut :</strong>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Email : <code className="bg-gray-100 px-2 py-1 rounded">admin</code>
                </p>
                <p className="text-sm text-gray-600">
                  Mot de passe : <code className="bg-gray-100 px-2 py-1 rounded">@Batobaye2025</code>
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Mot de passe oublié ?{" "}
                <a href="#" className="text-batobaye-primary hover:underline">
                  Réinitialiser
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">© 2024 Batobaye Market. Tous droits réservés.</p>
        </div>
      </motion.div>
    </div>
  )
}
