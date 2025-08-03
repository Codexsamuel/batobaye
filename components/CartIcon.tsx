"use client"

import { useState, useEffect } from 'react'

interface CartIconProps {
  className?: string
  onClick?: () => void
}

export default function CartIcon({ className = '', onClick }: CartIconProps) {
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    // Charger le nombre d'articles depuis le panier
    if (typeof window !== 'undefined') {
      try {
        const cartData = localStorage.getItem('batobaye_cart')
        if (cartData) {
          const cart = JSON.parse(cartData)
          setItemCount(cart.itemCount || 0)
        }
      } catch (error) {
        console.error('Erreur lors de la lecture du panier:', error)
      }
    }

    // Écouter les changements du localStorage
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        try {
          const cartData = localStorage.getItem('batobaye_cart')
          if (cartData) {
            const cart = JSON.parse(cartData)
            setItemCount(cart.itemCount || 0)
          }
        } catch (error) {
          console.error('Erreur lors de la lecture du panier:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Écouter les changements du panier dans la même fenêtre
    const interval = setInterval(() => {
      if (typeof window !== 'undefined') {
        try {
          const cartData = localStorage.getItem('batobaye_cart')
          if (cartData) {
            const cart = JSON.parse(cartData)
            if (cart.itemCount !== itemCount) {
              setItemCount(cart.itemCount || 0)
            }
          }
        } catch (error) {
          console.error('Erreur lors de la lecture du panier:', error)
        }
      }
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [itemCount])

  return (
    <div className={`relative ${className}`} onClick={onClick}>
      <span className="text-2xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </div>
  )
} 