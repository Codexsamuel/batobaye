import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/hooks/useAuth'
import { initializeAuthSystem } from '@/lib/auth'
import DLSolutionsSchema from '@/components/DLSolutionsSchema'
import DLSolutionsManager, { DLSolutionsAutoInit } from '@/components/DLSolutionsManager'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Batobaye Market - Votre marché en ligne de confiance',
  description: 'Découvrez notre sélection de produits de qualité : électroménager, téléphones, vêtements et plus encore. Livraison rapide et service client exceptionnel.',
  keywords: 'marché en ligne, électroménager, téléphones, vêtements, Cameroun, Douala, Yaoundé',
  authors: [
    { name: 'DL Solutions', url: 'https://www.daveandlucesolutions.com' },
    { name: 'Batobaye Market' }
  ],
  creator: 'DL Solutions - Dave and Luce Solutions SARL',
  publisher: 'Batobaye Market',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/BATOBAYE LOGO.jpeg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/BATOBAYE LOGO.jpeg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/BATOBAYE LOGO.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://batobaye-market.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Batobaye Market - Votre marché en ligne de confiance',
    description: 'Découvrez notre sélection de produits de qualité : électroménager, téléphones, vêtements et plus encore.',
    url: 'https://batobaye-market.com',
    siteName: 'Batobaye Market',
    images: [
      {
        url: '/images/batobaye-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Batobaye Market - Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batobaye Market - Votre marché en ligne de confiance',
    description: 'Découvrez notre sélection de produits de qualité : électroménager, téléphones, vêtements et plus encore.',
    images: ['/images/batobaye-logo.jpg'],
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
  other: {
    designer: 'DL Solutions - Dave and Luce Solutions SARL',
    copyright: '© 2024 Batobaye Market. Tous droits réservés.',
  },
}

// Initialiser le système d'authentification au chargement du serveur
if (typeof window === 'undefined') {
  initializeAuthSystem()
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <DLSolutionsSchema />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/images/BATOBAYE LOGO.jpeg" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
          <DLSolutionsManager 
            showBadge={true}
            badgePosition="bottom-right"
            badgeVariant="floating"
            showLogo={true}
            logoPosition="top-right"
            showSearchResults={true}
            searchResultType="both"
            enableAnalytics={true}
            enableSEO={true}
            enableBranding={true}
          />
          <DLSolutionsAutoInit />
        </AuthProvider>
      </body>
    </html>
  )
}
