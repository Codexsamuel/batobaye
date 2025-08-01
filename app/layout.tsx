import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Analytics from './analytics'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FF8C00',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://batobaye-market.com'),
  title: {
    default: 'Batobaye Market - Leader Électroménager Cameroun & Gabon | Réfrigérateurs, Téléviseurs, Cuisinières',
    template: '%s | Batobaye Market - Électroménager de Qualité'
  },
  description: 'Batobaye Market, leader de l\'électroménager au Cameroun et Gabon depuis 2019. Réfrigérateurs, congélateurs, téléviseurs, cuisinières, chauffe-eau. Livraison gratuite, installation professionnelle, garantie. Prix compétitifs, service client 24/7.',
  keywords: [
    'électroménager Cameroun',
    'réfrigérateur Douala',
    'téléviseur Cameroun',
    'cuisinière électrique',
    'congélateur Cameroun',
    'chauffe-eau Cameroun',
    'Batobaye Market',
    'électroménager Gabon',
    'livraison gratuite Cameroun',
    'installation électroménager',
    'garantie électroménager',
    'prix électroménager Cameroun',
    'magasin électroménager Douala',
    'réparation électroménager',
    'vente électroménager Afrique',
    'Serge Batobaye',
    'électroménager qualité',
    'service client Cameroun',
    'achat électroménager en ligne',
    'showroom électroménager'
  ],
  authors: [{ name: 'Serge Batobaye', url: 'https://batobaye-market.com' }],
  creator: 'Batobaye Market',
  publisher: 'Batobaye Market',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://batobaye-market.com',
    languages: {
      'fr-FR': 'https://batobaye-market.com',
      'en-US': 'https://batobaye-market.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://batobaye-market.com',
    siteName: 'Batobaye Market',
    title: 'Batobaye Market - Leader Électroménager Cameroun & Gabon',
    description: 'Leader de l\'électroménager au Cameroun et Gabon. Réfrigérateurs, téléviseurs, cuisinières. Livraison gratuite, installation professionnelle.',
    images: [
      {
        url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp',
        width: 1200,
        height: 630,
        alt: 'Entrée de Batobaye Market - Leader Électroménager Cameroun',
        type: 'image/webp',
      },
      {
        url: '/images/BATOBAYE LOGO.jpeg',
        width: 800,
        height: 800,
        alt: 'Logo Batobaye Market - Électroménager de Qualité',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@batobayemarket',
    creator: '@sergebatobaye',
    title: 'Batobaye Market - Leader Électroménager Cameroun & Gabon',
    description: 'Leader de l\'électroménager au Cameroun et Gabon. Réfrigérateurs, téléviseurs, cuisinières. Livraison gratuite, installation professionnelle.',
    images: ['https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp'],
  },
  category: 'Electronics & Appliances',
  classification: 'Business',
  other: {
    'geo.region': 'CM',
    'geo.placename': 'Douala',
    'geo.position': '4.0511;9.7679',
    'ICBM': '4.0511, 9.7679',
    'DC.title': 'Batobaye Market - Électroménager Cameroun',
    'DC.creator': 'Serge Batobaye',
    'DC.subject': 'Électroménager, Réfrigérateurs, Téléviseurs, Cameroun, Gabon',
    'DC.description': 'Leader de l\'électroménager au Cameroun et Gabon',
    'DC.publisher': 'Batobaye Market',
    'DC.contributor': 'Serge Batobaye',
    'DC.date': '2019',
    'DC.type': 'Text',
    'DC.format': 'text/html',
    'DC.identifier': 'https://batobaye-market.com',
    'DC.language': 'fr',
    'DC.coverage': 'Cameroun, Gabon',
    'DC.rights': 'Copyright 2024 Batobaye Market',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Batobaye Market',
    alternateName: 'Batobatye Lolo',
    description: 'Leader de l\'électroménager au Cameroun et Gabon depuis 2019. Spécialisé dans la vente de réfrigérateurs, congélateurs, téléviseurs, cuisinières et chauffe-eau.',
    url: 'https://batobaye-market.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://batobaye-market.com/images/BATOBAYE LOGO.jpeg',
      width: 800,
      height: 800,
    },
    image: [
      'https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp',
      'https://batobaye-market.com/images/BATOBAYE LOGO.jpeg'
    ],
    telephone: '+237 672 02 77 44',
    email: 'contact@batobaye.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Akwa',
      addressLocality: 'Douala',
      addressRegion: 'Littoral',
      addressCountry: 'CM',
      postalCode: '00000'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.0511,
      longitude: 9.7679
    },
    openingHours: 'Mo-Su 08:00-20:00',
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Mobile Money'],
    currenciesAccepted: 'XAF, USD, EUR',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Électroménager',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Réfrigérateurs',
            category: 'Électroménager'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Congélateurs',
            category: 'Électroménager'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Téléviseurs',
            category: 'Électronique'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Cuisinières',
            category: 'Électroménager'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Chauffe-eau',
            category: 'Électroménager'
          }
        }
      ]
    },
    founder: {
      '@type': 'Person',
      name: 'Serge Batobaye',
      jobTitle: 'Fondateur & CEO',
      worksFor: {
        '@type': 'Organization',
        name: 'Batobaye Market'
      }
    },
    foundingDate: '2019',
    numberOfEmployees: '10-50',
    areaServed: [
      {
        '@type': 'Country',
        name: 'Cameroun'
      },
      {
        '@type': 'Country',
        name: 'Gabon'
      }
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 4.0511,
        longitude: 9.7679
      },
      geoRadius: '1000 km'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '15000',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Client Satisfait'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Excellent service, produits de qualité, livraison rapide.'
      }
    ],
    sameAs: [
      'https://www.facebook.com/batobayemarket',
      'https://www.instagram.com/batobayemarket',
      'https://twitter.com/batobayemarket',
      'https://www.youtube.com/@batobayemarket'
    ]
  }

  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Additional Meta Tags for SEO */}
        <meta name="author" content="Serge Batobaye" />
        <meta name="copyright" content="Copyright 2024 Batobaye Market. Tous droits réservés." />
        <meta name="language" content="French" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Batobaye Market" />
        <meta name="application-name" content="Batobaye Market" />
        <meta name="msapplication-TileColor" content="#FF8C00" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#FF8C00" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Content-Language" content="fr" />
        
        {/* Performance Optimizations */}
        <link rel="preload" href="/images/BATOBAYE LOGO.jpeg" as="image" />
        <link rel="preload" href="https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp" as="image" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
