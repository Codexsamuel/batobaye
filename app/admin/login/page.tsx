"use client"

import { useState, useEffect } from "react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulation de connexion
    setTimeout(() => {
      setLoading(false)
      // Redirection vers le dashboard
      window.location.href = "/admin"
    }, 1000)
  }

  // Rendu côté serveur - afficher un loader simple
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la page de connexion...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion Administrateur
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Batobaye Market - Administration
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-center text-lg font-semibold text-gray-800 mb-6">Accès sécurisé</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@batobaye.shop"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Identifiants de test : admin@batobaye.shop / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
