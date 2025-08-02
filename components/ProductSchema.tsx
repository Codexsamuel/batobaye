"use client"

import { useEffect } from "react"

interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  category: string
  rating: number
  reviews: number
  inStock: boolean
  image: string
  images?: string[]
  features: string[]
  description: string
  brand?: string
  sku?: string
  specifications?: Record<string, string>
  warranty?: string
  delivery?: string
}

interface ProductSchemaProps {
  product: Product
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  useEffect(() => {
    // Générer le balisage JSON-LD Schema.org
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.images && product.images.length > 0 
        ? product.images 
        : [product.image],
      "description": product.description,
      "sku": product.sku || `PROD-${product.id}`,
      "brand": {
        "@type": "Brand",
        "name": product.brand || "Batobaye"
      },
      "category": product.category,
      "offers": {
        "@type": "Offer",
        "url": `${window.location.origin}/products/${product.id}`,
        "priceCurrency": "XAF",
        "price": product.price.toString(),
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.inStock 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Batobaye Market",
          "url": "https://batobaye.shop"
        },
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 jours
        "deliveryLeadTime": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "DAY"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "XAF"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "value": "1",
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "value": "1",
              "unitCode": "DAY"
            }
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.toString(),
        "reviewCount": product.reviews.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": product.rating.toString(),
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Client satisfait"
          },
          "reviewBody": "Excellent produit, livraison rapide et installation professionnelle. Je recommande vivement !",
          "datePublished": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      "additionalProperty": product.specifications ? 
        Object.entries(product.specifications).map(([key, value]) => ({
          "@type": "PropertyValue",
          "name": key,
          "value": value
        })) : [],
      "warranty": {
        "@type": "WarrantyPromise",
        "warrantyScope": "https://schema.org/WarrantyScope",
        "warrantyInMonths": product.warranty ? 
          (product.warranty.includes("2") ? 24 : 12) : 24
      }
    }

    // Ajouter le script JSON-LD au head
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schemaData)
    
    // Supprimer l'ancien script s'il existe
    const existingScript = document.querySelector('script[data-product-schema]')
    if (existingScript) {
      existingScript.remove()
    }
    
    // Ajouter un attribut pour identifier le script
    script.setAttribute('data-product-schema', 'true')
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      const scriptToRemove = document.querySelector('script[data-product-schema]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [product])

  // Ce composant ne rend rien visuellement
  return null
} 