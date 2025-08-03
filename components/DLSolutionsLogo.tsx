'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DLSolutionsLogoProps {
  className?: string
}

export default function DLSolutionsLogo({ className = '' }: DLSolutionsLogoProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Afficher le logo immédiatement au chargement
    setIsVisible(true)

    // Cycle d'apparition/disparition toutes les 60 secondes
    const interval = setInterval(() => {
      setIsVisible(prev => !prev)
    }, 60000) // 60 secondes

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            rotateY: 90,
            transition: {
              duration: 0.6,
              ease: "easeIn"
            }
          }}
          className={`relative ${className}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {/* Logo circulaire 3D */}
          <motion.div
            className="relative w-8 h-8 cursor-pointer group"
            whileHover={{ scale: 1.1, rotateY: 15 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              rotateY: [0, 5, 0, -5, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            onClick={() => window.open('https://www.daveandlucesolutions.com', '_blank')}
          >
            {/* Cercle de fond avec effet 3D */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
              {/* Reflet 3D */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
              <div className="absolute top-2 left-2 w-1 h-1 bg-white/50 rounded-full"></div>
            </div>

            {/* Cercle principal */}
            <div className="absolute inset-0.5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-inner">
              {/* Icône cible/bullseye */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Cercle extérieur */}
                  <div className="w-4 h-4 border-2 border-white/80 rounded-full"></div>
                  {/* Cercle intérieur */}
                  <div className="absolute top-1 left-1 w-2 h-2 border border-white/90 rounded-full"></div>
                  {/* Centre avec flèche */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-white rounded-full"></div>
                  {/* Flèche discrète */}
                  <div className="absolute top-0.5 left-1.5 w-0.5 h-1 bg-white/70 transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Effet de brillance */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
              animate={{
                x: [-20, 20, -20],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
          </motion.div>

          {/* Tooltip subtil */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 text-white text-xs rounded-lg shadow-xl backdrop-blur-sm border border-gray-700/50 whitespace-nowrap z-50"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="font-medium">🚀 Par DL Solutions 🇨🇲</span>
                </div>
                <div className="text-gray-300 text-xs mt-1">
                  Concepteur du Market
                </div>
                <div className="text-blue-400 text-xs mt-1 font-medium">
                  Cliquez pour visiter
                </div>
                {/* Flèche du tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 