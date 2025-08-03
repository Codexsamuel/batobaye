'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

interface NavigationProps {
  activePage?: 'home' | 'products' | 'about' | 'contact'
}

export function Navigation({ activePage = 'home' }: NavigationProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo - Optimisé */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <Image 
                  src="/images/BATOBAYE LOGO.jpeg" 
                  alt="Batobatye Lolo Logo" 
                  width={40} 
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-batobaye-dark">BATOBAYE</span>
            </Link>
          </div>

          {/* Navigation Desktop - Optimisée */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                activePage === 'home' 
                  ? 'text-batobaye-dark' 
                  : 'text-gray-600 hover:text-batobaye-primary'
              }`}
            >
              Accueil
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-medium transition-colors ${
                activePage === 'products' 
                  ? 'text-batobaye-dark' 
                  : 'text-gray-600 hover:text-batobaye-primary'
              }`}
            >
              Produits
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${
                activePage === 'about' 
                  ? 'text-batobaye-dark' 
                  : 'text-gray-600 hover:text-batobaye-primary'
              }`}
            >
              À Propos
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${
                activePage === 'contact' 
                  ? 'text-batobaye-dark' 
                  : 'text-gray-600 hover:text-batobaye-primary'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions - Optimisées */}
          <div className="flex items-center space-x-3">
            <Button className="text-xs px-3 py-2">
              <Phone className="w-3 h-3 mr-1" />
              +237 672 02 77 44
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/admin/register">
                <Button className="border-batobaye-primary text-batobaye-primary hover:bg-batobaye-primary hover:text-white text-xs px-3 py-2">
                  S'inscrire
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button className="bg-batobaye-primary hover:bg-batobaye-light text-white text-xs px-3 py-2">
                  Se Connecter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 