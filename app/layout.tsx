import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Batobaye Market - Électroménager et Électronique',
  description: 'Votre destination pour l\'électroménager et l\'électronique de qualité. Livraison gratuite, garantie 2 ans, support 24/7.',
  keywords: 'électroménager, électronique, réfrigérateur, télévision, machine à laver, Cameroun, Douala',
  authors: [{ name: 'Batobaye Market' }],
  creator: 'Batobaye Market',
  publisher: 'Batobaye Market',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://batobaye.shop'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Batobaye Market - Électroménager et Électronique',
    description: 'Votre destination pour l\'électroménager et l\'électronique de qualité. Livraison gratuite, garantie 2 ans, support 24/7.',
    url: 'https://batobaye.shop',
    siteName: 'Batobaye Market',
    images: [
      {
        url: '/images/BATOBAYE LOGO.jpeg',
        width: 1200,
        height: 630,
        alt: 'Batobaye Market Logo',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batobaye Market - Électroménager et Électronique',
    description: 'Votre destination pour l\'électroménager et l\'électronique de qualité.',
    images: ['/images/BATOBAYE LOGO.jpeg'],
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
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Contenu principal */}
          <main>
            {children}
          </main>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
