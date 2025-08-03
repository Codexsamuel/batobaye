'use client'

import { useEffect, useState } from 'react'
import DLSolutionsBadge from './DLSolutionsBadge'
import DLSolutionsLogo from './DLSolutionsLogo'
import DLSolutionsSearchResult from './DLSolutionsSearchResult'

interface DLSolutionsManagerProps {
  // Configuration du badge
  showBadge?: boolean
  badgePosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  badgeVariant?: 'floating' | 'inline' | 'minimal'
  
  // Configuration du logo
  showLogo?: boolean
  logoPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  
  // Configuration des résultats de recherche
  showSearchResults?: boolean
  searchResultType?: 'services' | 'marketplace' | 'both'
  
  // Configuration générale
  enableAnalytics?: boolean
  enableSEO?: boolean
  enableBranding?: boolean
}

export default function DLSolutionsManager({
  showBadge = true,
  badgePosition = 'bottom-right',
  badgeVariant = 'floating',
  showLogo = true,
  logoPosition = 'top-right',
  showSearchResults = true,
  searchResultType = 'both',
  enableAnalytics = true,
  enableSEO = true,
  enableBranding = true
}: DLSolutionsManagerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentQuery, setCurrentQuery] = useState('')

  useEffect(() => {
    // Initialiser le gestionnaire DL Solutions
    setIsLoaded(true)
    
    // Analytics DL Solutions
    if (enableAnalytics && typeof window !== 'undefined') {
      // Tracker les visites DL Solutions
      const dlSolutionsVisit = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }
      
      // Stocker localement pour analytics
      try {
        const existingData = localStorage.getItem('dl_solutions_analytics')
        const analyticsData = existingData ? JSON.parse(existingData) : []
        analyticsData.push(dlSolutionsVisit)
        localStorage.setItem('dl_solutions_analytics', JSON.stringify(analyticsData.slice(-100))) // Garder les 100 derniers
      } catch (error) {
        console.log('DL Solutions Analytics: Erreur de stockage')
      }
    }

    // SEO DL Solutions
    if (enableSEO) {
      // Ajouter des métadonnées DL Solutions
      const dlSolutionsMeta = document.createElement('meta')
      dlSolutionsMeta.name = 'dl-solutions-version'
      dlSolutionsMeta.content = '1.0.0'
      document.head.appendChild(dlSolutionsMeta)
    }

    // Branding DL Solutions
    if (enableBranding) {
      // Ajouter des classes CSS pour le branding
      document.body.classList.add('dl-solutions-powered')
    }
  }, [enableAnalytics, enableSEO, enableBranding])

  // Écouter les changements de recherche
  useEffect(() => {
    const handleSearchChange = (event: CustomEvent) => {
      if (event.detail && event.detail.query) {
        setCurrentQuery(event.detail.query)
      }
    }

    window.addEventListener('dl-solutions-search', handleSearchChange as EventListener)
    return () => {
      window.removeEventListener('dl-solutions-search', handleSearchChange as EventListener)
    }
  }, [])

  if (!isLoaded) {
    return null
  }

  return (
    <>
      {/* Badge DL Solutions */}
      {showBadge && (
        <DLSolutionsBadge 
          position={badgePosition}
          variant={badgeVariant}
        />
      )}

      {/* Logo DL Solutions */}
      {showLogo && (
        <div className={`fixed ${logoPosition === 'top-right' ? 'top-4 right-4' : 
                         logoPosition === 'top-left' ? 'top-4 left-4' :
                         logoPosition === 'bottom-right' ? 'bottom-4 right-4' :
                         'bottom-4 left-4'} z-40`}>
          <DLSolutionsLogo />
        </div>
      )}

      {/* Résultats de recherche DL Solutions */}
      {showSearchResults && currentQuery && (
        <div className="fixed top-20 right-4 w-80 z-30">
          <DLSolutionsSearchResult 
            query={currentQuery}
            type={searchResultType}
            position="top"
          />
        </div>
      )}
    </>
  )
}

// Hook pour déclencher les événements DL Solutions
export function useDLSolutions() {
  const triggerSearch = (query: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dl-solutions-search', {
        detail: { query }
      }))
    }
  }

  const trackEvent = (eventName: string, data?: any) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dl-solutions-event', {
        detail: { eventName, data, timestamp: new Date().toISOString() }
      }))
    }
  }

  return {
    triggerSearch,
    trackEvent
  }
}

// Script d'initialisation automatique
export function DLSolutionsAutoInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ajouter le script d'initialisation automatique
      const script = document.createElement('script')
      script.innerHTML = `
        // DL Solutions Auto Initialization
        window.DLSolutions = {
          version: '1.0.0',
          init: function() {
            console.log('🚀 DL Solutions Manager initialisé');
          },
          track: function(event, data) {
            console.log('📊 DL Solutions Event:', event, data);
          }
        };
        window.DLSolutions.init();
      `
      document.head.appendChild(script)
    }
  }, [])

  return null
} 