export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Batobaye Market",
    "alternateName": "Batobaye Électroménager",
    "description": "Magasin d'électroménager à Douala, Cameroun. Vente de réfrigérateurs, téléviseurs, cuisinières, congélateurs. Livraison gratuite, installation, garantie 2 ans.",
    "url": "https://batobaye-market.com",
    "telephone": "+237672027744",
    "email": "contact@batobaye-market.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Akwa",
      "addressLocality": "Douala",
      "addressRegion": "Littoral",
      "addressCountry": "CM",
      "postalCode": "00000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 4.0511,
      "longitude": 9.7679
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Mobile Money"],
    "currenciesAccepted": "XAF",
    "areaServed": {
      "@type": "City",
      "name": "Douala"
    },
    "serviceArea": {
      "@type": "City",
      "name": "Douala"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Électroménager",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Réfrigérateurs",
            "description": "Réfrigérateurs Samsung, LG, Midea"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Téléviseurs",
            "description": "Téléviseurs 4K, Smart TV"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Cuisinières",
            "description": "Cuisinières gaz et électriques"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Congélateurs",
            "description": "Congélateurs côte à côte et armoire"
          }
        }
      ]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "description": "Livraison gratuite pour commandes supérieures à 100,000 FCFA",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "0",
          "priceCurrency": "XAF"
        }
      },
      {
        "@type": "Offer",
        "description": "Installation professionnelle incluse",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "0",
          "priceCurrency": "XAF"
        }
      },
      {
        "@type": "Offer",
        "description": "Garantie 2 ans sur tous les produits",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": "0",
          "priceCurrency": "XAF"
        }
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Serge Batobaye"
    },
    "foundingDate": "2019",
    "image": [
      "https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp",
      "https://batobaye-market.com/images/BATOBAYE%20LOGO.jpeg"
    ],
    "logo": "https://batobaye-market.com/images/BATOBAYE%20LOGO.jpeg",
    "sameAs": [
      "https://www.facebook.com/batobayemarket",
      "https://wa.me/message/Q73TSI7SP3IXI1"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Client satisfait"
        },
        "reviewBody": "Excellent service, livraison rapide et installation professionnelle."
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 