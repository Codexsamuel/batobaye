import Link from 'next/link'
import { ExternalLink, Heart, Code, Sparkles, Globe, Award } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-batobaye-dark via-batobaye-primary to-batobaye-dark text-white relative overflow-hidden">
      {/* Effet de fond décoratif */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Informations Batobaye */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏪</span>
              </div>
              <h3 className="text-xl font-bold">Batobaye Market</h3>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              Votre destination premium pour l'électroménager et l'électronique de qualité au Cameroun. 
              Service client exceptionnel et garantie totale.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-200">
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+237 612 345 678</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>contact@batobaye.com</span>
              </div>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <span>🔗</span>
              <span>Navigation</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Produits</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>À propos</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-white transition-colors duration-300 flex items-center space-x-2 group">
                  <span className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <span>⭐</span>
              <span>Nos services</span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-center space-x-2">
                <span>🚚</span>
                <span>Livraison gratuite</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🛡️</span>
                <span>Garantie 2 ans</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🔄</span>
                <span>Retour facile</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>💳</span>
                <span>Paiement sécurisé</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>🛠️</span>
                <span>Service après-vente</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Signature Dave and Luce Solutions - Section principale */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-200">
              © 2024 Batobaye Market. Tous droits réservés.
            </div>
            
            {/* Signature élégante et professionnelle */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center space-x-3 group">
                <div className="flex items-center space-x-2 text-sm text-gray-200 group-hover:text-white transition-colors duration-300">
                  <span>Conçu avec</span>
                  <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>par</span>
                </div>
                
                <Link 
                  href="https://www.daveandlucesolutions.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 px-6 py-3 rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Code className="w-5 h-5 text-blue-400" />
                      <span className="font-bold text-white text-lg">Dave & Luce</span>
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4 text-green-400" />
                      <Award className="w-4 h-4 text-orange-400" />
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                </Link>
              </div>
              
              {/* Sous-signature professionnelle */}
              <div className="text-center">
                <p className="text-xs text-gray-300 font-medium">
                  Solutions SARL • Développement Web & Applications • Innovation Technologique
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Créateurs d'expériences digitales exceptionnelles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 