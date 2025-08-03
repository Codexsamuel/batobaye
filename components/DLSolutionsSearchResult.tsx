'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DLSolutionsSearchResultProps {
  query?: string
  position?: 'top' | 'bottom'
  showAfter?: number
  type?: 'services' | 'marketplace' | 'both'
}

export default function DLSolutionsSearchResult({ 
  query = '', 
  position = 'top',
  showAfter = 2,
  type = 'both'
}: DLSolutionsSearchResultProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    // Afficher après un délai pour simuler un chargement naturel
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    // Délai variable selon la position
    if (position === 'top') {
      setDelay(500 + Math.random() * 1000) // 0.5-1.5s
    } else {
      setDelay(1000 + Math.random() * 2000) // 1-3s
    }
  }, [position])

  // Mots-clés pertinents pour DL Solutions (services)
  const serviceKeywords = [
    'développement web', 'site web', 'application', 'e-commerce', 'marketplace',
    'design', 'création', 'programmation', 'conception', 'solution digitale',
    'web', 'internet', 'technologie', 'informatique', 'digital'
  ]

  // Mots-clés pertinents pour DL Style (marketplace)
  const marketplaceKeywords = [
    'vêtements', 'mode', 'fashion', 'style', 'habillement', 'vetement',
    'chaussures', 'accessoires', 'sacs', 'bijoux', 'cosmétiques',
    'beauté', 'maquillage', 'parfum', 'soins', 'tendance',
    'shopping', 'achat', 'boutique', 'magasin', 'retail'
  ]

  // Vérifier si la requête est pertinente
  const isServiceRelevant = serviceKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  )
  const isMarketplaceRelevant = marketplaceKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  )

  // Déterminer ce qui doit être affiché
  const shouldShowServices = (type === 'services' || type === 'both') && isServiceRelevant
  const shouldShowMarketplace = (type === 'marketplace' || type === 'both') && isMarketplaceRelevant

  // Si la requête n'est pas pertinente, ne pas afficher
  if (!shouldShowServices && !shouldShowMarketplace && query.trim() !== '') {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* DL Solutions Services */}
      {shouldShowServices && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300 animate-fade-in-up">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DL</span>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-blue-800">
                    DL Solutions SARL
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Badge className="bg-blue-100 text-blue-700">
                      ⭐ Recommandé
                    </Badge>
                    <span>•</span>
                    <span>Concepteur de ce site</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm text-gray-600 ml-1">(4.9/5)</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>DL Solutions SARL</strong> - Votre partenaire de confiance pour la création de sites web, 
                applications et solutions digitales. Spécialistes en développement web moderne, 
                e-commerce et design professionnel.
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1 text-gray-600">
                  <span>👥</span>
                  <span>+50 projets réalisés</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <span>🏆</span>
                  <span>Expert certifié</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📞</span>
                <span>+237 XXX XXX XXX</span>
                <span>•</span>
                <span>📧</span>
                <span>contact@daveandlucesolutions.com</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <Badge className="border border-blue-300 text-blue-700 bg-white">
                    Développement Web
                  </Badge>
                  <Badge className="border border-blue-300 text-blue-700 bg-white">
                    E-commerce
                  </Badge>
                  <Badge className="border border-blue-300 text-blue-700 bg-white">
                    Design UI/UX
                  </Badge>
                </div>
                
                <Link href="https://www.daveandlucesolutions.com" target="_blank">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1">
                    <span className="mr-1">🔗</span>
                    Visiter le site
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DL Style Marketplace */}
      {shouldShowMarketplace && (
        <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50 hover:shadow-lg transition-all duration-300 animate-fade-in-up">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DS</span>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-pink-800">
                    DL Style
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Badge className="bg-pink-100 text-pink-700">
                      🛍️ Marketplace Mode
                    </Badge>
                    <span>•</span>
                    <span>Par DL Solutions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm text-gray-600 ml-1">(4.8/5)</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>DL Style</strong> - Votre marketplace de mode et beauté. Découvrez une sélection 
                exclusive de vêtements, accessoires, chaussures et produits de beauté. 
                Mode tendance, qualité garantie, livraison rapide.
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1 text-gray-600">
                  <span>👗</span>
                  <span>+1000 articles</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <span>🚚</span>
                  <span>Livraison rapide</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>📞</span>
                <span>+237 XXX XXX XXX</span>
                <span>•</span>
                <span>📧</span>
                <span>contact@dlstyle.com</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <Badge className="border border-pink-300 text-pink-700 bg-white">
                    Vêtements
                  </Badge>
                  <Badge className="border border-pink-300 text-pink-700 bg-white">
                    Accessoires
                  </Badge>
                  <Badge className="border border-pink-300 text-pink-700 bg-white">
                    Beauté
                  </Badge>
                </div>
                
                <Link href="https://www.dlstyle.com" target="_blank">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-sm px-3 py-1">
                    <span className="mr-1">🛍️</span>
                    Visiter DL Style
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 