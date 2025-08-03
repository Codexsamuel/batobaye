"use client"

import { useState, useEffect } from "react"

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Rendu côté serveur - afficher un loader simple
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'administration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar simplifié */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-800">Batobaye Admin</h1>
          </div>
          <nav className="mt-6">
            <div className="px-6 py-2">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-100 text-blue-700">
                Tableau de bord
              </button>
            </div>
            <div className="px-6 py-2">
              <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                Produits
              </button>
            </div>
            <div className="px-6 py-2">
              <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                Commandes
              </button>
            </div>
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col">
          {/* Topbar simplifié */}
          <div className="bg-white shadow-sm border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Tableau de Bord</h2>
          </div>

          {/* Contenu */}
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
              
              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-600">Chiffre d'Affaires</h3>
                    <span className="text-green-600">💰</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">15,847,000 FCFA</div>
                  <p className="text-xs text-gray-500">+23.5%</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-600">Commandes Totales</h3>
                    <span className="text-blue-600">🛒</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">2,847</div>
                  <p className="text-xs text-gray-500">+12.3%</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-600">Produits Actifs</h3>
                    <span className="text-purple-600">📦</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">1,542</div>
                  <p className="text-xs text-gray-500">+45</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-600">Taux de Conversion</h3>
                    <span className="text-indigo-600">🎯</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">3.2%</div>
                  <p className="text-xs text-gray-500">+0.8%</p>
                </div>
              </div>

              {/* Commandes récentes */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Commandes Récentes</h3>
                </div>
                <div className="p-6">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Commande</th>
                        <th className="text-left py-2">Client</th>
                        <th className="text-left py-2">Total</th>
                        <th className="text-left py-2">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">CMD-2024-001</code>
                        </td>
                        <td className="py-2">Jean Mbarga</td>
                        <td className="py-2 font-semibold">450,000 FCFA</td>
                        <td className="py-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">En cours</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">CMD-2024-002</code>
                        </td>
                        <td className="py-2">Marie Nguemo</td>
                        <td className="py-2 font-semibold">320,000 FCFA</td>
                        <td className="py-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Livré</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
