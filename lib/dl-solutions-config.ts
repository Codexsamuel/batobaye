// Configuration DL Solutions
export const DL_SOLUTIONS_CONFIG = {
  // Informations de base
  company: {
    name: 'DL Solutions SARL',
    fullName: 'Dave and Luce Solutions SARL',
    website: 'https://www.daveandlucesolutions.com',
    email: 'contact@daveandlucesolutions.com',
    phone: '+237 XXX XXX XXX',
    address: {
      city: 'Douala',
      country: 'Cameroun',
      countryCode: 'CM'
    },
    description: 'Experts en transformation digitale - Développement web & mobile',
    founded: '2024',
    services: [
      'Développement Web',
      'Applications Mobile',
      'E-commerce',
      'Design UI/UX',
      'Consulting Digital',
      'Formation'
    ]
  },

  // Configuration du branding
  branding: {
    primaryColor: '#2563eb', // Blue
    secondaryColor: '#ec4899', // Pink
    accentColor: '#f59e0b', // Amber
    logo: {
      url: '/images/dl-solutions-logo.png',
      alt: 'DL Solutions Logo'
    },
    badge: {
      text: '🚀 Par DL Solutions 🇨🇲',
      link: 'https://www.daveandlucesolutions.com'
    }
  },

  // Configuration des composants
  components: {
    badge: {
      enabled: true,
      position: 'bottom-right',
      variant: 'floating',
      showOnHover: false
    },
    logo: {
      enabled: true,
      position: 'top-right',
      animation: true,
      tooltip: true
    },
    searchResults: {
      enabled: true,
      type: 'both', // 'services' | 'marketplace' | 'both'
      position: 'top',
      showAfter: 2
    }
  },

  // Configuration SEO
  seo: {
    enabled: true,
    schema: {
      enabled: true,
      type: 'WebSite',
      author: true,
      creator: true
    },
    meta: {
      designer: 'DL Solutions - Dave and Luce Solutions SARL',
      poweredBy: 'DL Solutions',
      version: '1.0.0'
    }
  },

  // Configuration Analytics
  analytics: {
    enabled: true,
    tracking: {
      pageViews: true,
      searchQueries: true,
      userInteractions: true,
      performance: true
    },
    storage: {
      type: 'localStorage',
      maxEntries: 100,
      retention: '30d'
    }
  },

  // Configuration des services
  services: {
    webDevelopment: {
      name: 'Développement Web',
      description: 'Sites web modernes et applications web performantes',
      keywords: ['développement web', 'site web', 'application', 'programmation'],
      url: 'https://www.daveandlucesolutions.com/services/web-development'
    },
    mobileDevelopment: {
      name: 'Applications Mobile',
      description: 'Applications iOS et Android natives et hybrides',
      keywords: ['mobile', 'application', 'iOS', 'Android', 'app'],
      url: 'https://www.daveandlucesolutions.com/services/mobile-development'
    },
    ecommerce: {
      name: 'E-commerce',
      description: 'Solutions e-commerce complètes et personnalisées',
      keywords: ['e-commerce', 'boutique en ligne', 'marketplace', 'vente en ligne'],
      url: 'https://www.daveandlucesolutions.com/services/ecommerce'
    },
    design: {
      name: 'Design UI/UX',
      description: 'Interfaces utilisateur modernes et expériences optimisées',
      keywords: ['design', 'UI', 'UX', 'interface', 'création'],
      url: 'https://www.daveandlucesolutions.com/services/design'
    }
  },

  // Configuration du marketplace DL Style
  marketplace: {
    name: 'DL Style',
    description: 'Marketplace de mode et beauté',
    url: 'https://www.dlstyle.com',
    keywords: ['mode', 'fashion', 'vêtements', 'beauté', 'shopping'],
    services: [
      'Vêtements',
      'Accessoires',
      'Chaussures',
      'Beauté',
      'Cosmétiques'
    ]
  },

  // Configuration des projets
  projects: {
    batobayeMarket: {
      name: 'Batobaye Market',
      description: 'Marketplace d\'électroménager et électronique',
      url: 'https://batobaye-market.com',
      type: 'E-commerce',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      features: [
        'Catalogue produits',
        'Panier d\'achat',
        'Paiements en ligne',
        'Interface admin',
        'Gestion des commandes'
      ]
    }
  },

  // Configuration des événements
  events: {
    search: {
      enabled: true,
      tracking: true
    },
    click: {
      enabled: true,
      tracking: true
    },
    scroll: {
      enabled: false,
      tracking: false
    }
  },

  // Configuration des performances
  performance: {
    lazyLoading: true,
    preloading: false,
    caching: true,
    optimization: true
  }
}

// Fonctions utilitaires
export const DL_SOLUTIONS_UTILS = {
  // Vérifier si une requête est pertinente pour DL Solutions
  isRelevantQuery: (query: string): boolean => {
    const relevantKeywords = [
      'développement', 'web', 'site', 'application', 'programmation',
      'design', 'création', 'conception', 'solution', 'digitale',
      'e-commerce', 'boutique', 'marketplace', 'mobile', 'app'
    ]
    
    return relevantKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    )
  },

  // Vérifier si une requête est pertinente pour DL Style
  isStyleRelevantQuery: (query: string): boolean => {
    const styleKeywords = [
      'mode', 'fashion', 'vêtements', 'vetement', 'habillement',
      'chaussures', 'accessoires', 'sacs', 'bijoux', 'cosmétiques',
      'beauté', 'maquillage', 'parfum', 'soins', 'tendance'
    ]
    
    return styleKeywords.some(keyword => 
      query.toLowerCase().includes(keyword.toLowerCase())
    )
  },

  // Formater les données analytics
  formatAnalyticsData: (data: any) => {
    return {
      ...data,
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('dl_solutions_session_id') || 
                 Math.random().toString(36).substring(2, 15),
      version: DL_SOLUTIONS_CONFIG.seo.meta.version
    }
  },

  // Générer un ID de session
  generateSessionId: (): string => {
    const sessionId = Math.random().toString(36).substring(2, 15)
    sessionStorage.setItem('dl_solutions_session_id', sessionId)
    return sessionId
  }
}

// Types TypeScript
export interface DL_SOLUTIONS_CONFIG_TYPE {
  company: {
    name: string
    fullName: string
    website: string
    email: string
    phone: string
    address: {
      city: string
      country: string
      countryCode: string
    }
    description: string
    founded: string
    services: string[]
  }
  branding: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    logo: {
      url: string
      alt: string
    }
    badge: {
      text: string
      link: string
    }
  }
  components: {
    badge: {
      enabled: boolean
      position: string
      variant: string
      showOnHover: boolean
    }
    logo: {
      enabled: boolean
      position: string
      animation: boolean
      tooltip: boolean
    }
    searchResults: {
      enabled: boolean
      type: string
      position: string
      showAfter: number
    }
  }
  seo: {
    enabled: boolean
    schema: {
      enabled: boolean
      type: string
      author: boolean
      creator: boolean
    }
    meta: {
      designer: string
      poweredBy: string
      version: string
    }
  }
  analytics: {
    enabled: boolean
    tracking: {
      pageViews: boolean
      searchQueries: boolean
      userInteractions: boolean
      performance: boolean
    }
    storage: {
      type: string
      maxEntries: number
      retention: string
    }
  }
} 