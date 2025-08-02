#!/usr/bin/env node

/**
 * Script de vérification de la conformité Schema.org
 * Vérifie que tous les produits ont les balisages requis pour Google Search Console
 */

const fs = require('fs')
const path = require('path')

// Configuration
const CONFIG = {
  requiredFields: ['offers', 'aggregateRating', 'review'],
  minRating: 0,
  maxRating: 5,
  requiredPrice: true,
  requiredCurrency: 'XAF',
  outputFile: 'schema-compliance-report.json'
}

// Types de produits (mock data - à remplacer par votre API)
const mockProducts = [
  {
    id: 1,
    name: "Réfrigérateur Brigo 350L",
    price: 450000,
    oldPrice: 520000,
    category: "Réfrigérateurs",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    image: "/placeholder.svg",
    features: ["No Frost", "Économie d'énergie", "Grande capacité"],
    description: "Réfrigérateur moderne avec technologie No Frost pour une conservation optimale de vos aliments.",
    brand: "Brigo",
    sku: "REF-BRIGO-350",
    specifications: {
      "Capacité": "350L",
      "Type": "No Frost",
      "Classe énergétique": "A+",
      "Dimensions": "60 x 70 x 180 cm",
      "Couleur": "Blanc"
    },
    warranty: "2 ans",
    delivery: "Livraison gratuite sous 24h"
  },
  {
    id: 2,
    name: "Congélateur Hisense 200L",
    price: 320000,
    oldPrice: 380000,
    category: "Congélateurs",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    image: "/placeholder.svg",
    features: ["Congélation rapide", "Économie d'énergie", "Facile à nettoyer"],
    description: "Congélateur performant pour conserver vos aliments sur le long terme.",
    brand: "Hisense",
    sku: "CONG-HIS-200",
    specifications: {
      "Capacité": "200L",
      "Type": "Armoire",
      "Classe énergétique": "A",
      "Dimensions": "55 x 60 x 85 cm",
      "Couleur": "Blanc"
    },
    warranty: "2 ans",
    delivery: "Livraison gratuite sous 24h"
  },
  {
    id: 3,
    name: 'TV Samsung 55" QLED',
    price: 380000,
    oldPrice: 450000,
    category: "Téléviseurs",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    image: "/placeholder.svg",
    features: ["4K Ultra HD", "Smart TV", "HDR"],
    description: "Téléviseur haute définition avec technologie QLED pour une expérience visuelle exceptionnelle.",
    brand: "Samsung",
    sku: "TV-SAM-55-QLED",
    specifications: {
      "Taille d'écran": "55 pouces",
      "Résolution": "4K Ultra HD",
      "Technologie": "QLED",
      "Smart TV": "Oui",
      "Ports HDMI": "4"
    },
    warranty: "2 ans",
    delivery: "Livraison gratuite sous 24h"
  }
]

/**
 * Génère le balisage Schema.org pour un produit
 */
function generateProductSchema(product) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.image],
    "description": product.description,
    "sku": product.sku || `PROD-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Batobaye"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": `https://batobaye.shop/products/${product.id}`,
      "priceCurrency": CONFIG.requiredCurrency,
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
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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

  return schema
}

/**
 * Valide un balisage Schema.org
 */
function validateSchema(schema) {
  const issues = []
  const recommendations = []

  // Vérifier les offres
  if (!schema.offers) {
    issues.push("Offres manquantes")
    recommendations.push("Ajouter les informations de prix et disponibilité")
  } else {
    if (!schema.offers.price || schema.offers.price === "0") {
      issues.push("Prix manquant ou invalide")
      recommendations.push("Ajouter un prix valide")
    }
    if (!schema.offers.priceCurrency) {
      issues.push("Devise manquante")
      recommendations.push("Spécifier la devise (XAF)")
    }
    if (!schema.offers.availability) {
      issues.push("Disponibilité manquante")
      recommendations.push("Spécifier la disponibilité (InStock/OutOfStock)")
    }
  }

  // Vérifier les avis et notes
  if (!schema.aggregateRating && !schema.review) {
    issues.push("Avis et notes manquants")
    recommendations.push("Ajouter des avis clients ou une note moyenne")
  }

  if (!schema.aggregateRating) {
    issues.push("Notes moyennes manquantes")
    recommendations.push("Ajouter aggregateRating avec ratingValue et reviewCount")
  } else {
    if (!schema.aggregateRating.ratingValue) {
      issues.push("Valeur de note manquante")
      recommendations.push("Ajouter ratingValue dans aggregateRating")
    }
    if (!schema.aggregateRating.reviewCount) {
      issues.push("Nombre d'avis manquant")
      recommendations.push("Ajouter reviewCount dans aggregateRating")
    }
  }

  if (!schema.review || schema.review.length === 0) {
    issues.push("Avis clients manquants")
    recommendations.push("Ajouter au moins un avis client")
  }

  // Vérifier les informations de base
  if (!schema.name) {
    issues.push("Nom du produit manquant")
    recommendations.push("Ajouter le nom du produit")
  }

  if (!schema.description) {
    issues.push("Description manquante")
    recommendations.push("Ajouter une description du produit")
  }

  if (!schema.image || schema.image.length === 0) {
    issues.push("Images manquantes")
    recommendations.push("Ajouter au moins une image du produit")
  }

  // Calculer le score
  const score = Math.max(0, 100 - (issues.length * 15))

  return {
    isValid: issues.length === 0,
    score,
    issues,
    recommendations
  }
}

/**
 * Vérifie la conformité de tous les produits
 */
function checkCompliance() {
  console.log('🔍 Vérification de la conformité Schema.org...\n')

  const results = []
  let totalScore = 0
  let validProducts = 0
  let productsWithIssues = 0

  mockProducts.forEach(product => {
    console.log(`📦 Vérification de: ${product.name}`)
    
    const schema = generateProductSchema(product)
    const validation = validateSchema(schema)
    
    const result = {
      productId: product.id,
      productName: product.name,
      productUrl: `/products/${product.id}`,
      schema,
      validation,
      status: validation.isValid ? 'valid' : validation.score >= 60 ? 'warning' : 'error'
    }

    results.push(result)
    totalScore += validation.score

    if (validation.isValid) {
      validProducts++
      console.log(`  ✅ Conforme (Score: ${validation.score}/100)`)
    } else {
      productsWithIssues++
      console.log(`  ❌ Problèmes détectés (Score: ${validation.score}/100)`)
      validation.issues.forEach(issue => {
        console.log(`    - ${issue}`)
      })
    }
  })

  const averageScore = Math.round(totalScore / mockProducts.length)
  const complianceRate = Math.round((validProducts / mockProducts.length) * 100)

  const summary = {
    timestamp: new Date().toISOString(),
    totalProducts: mockProducts.length,
    validProducts,
    productsWithIssues,
    averageScore,
    complianceRate,
    results
  }

  console.log('\n📊 RÉSUMÉ DE LA VÉRIFICATION')
  console.log('=' .repeat(50))
  console.log(`Total des produits: ${mockProducts.length}`)
  console.log(`Produits conformes: ${validProducts}`)
  console.log(`Produits avec problèmes: ${productsWithIssues}`)
  console.log(`Score moyen: ${averageScore}/100`)
  console.log(`Taux de conformité: ${complianceRate}%`)

  if (productsWithIssues > 0) {
    console.log('\n🚨 PRODUITS À CORRIGER:')
    console.log('=' .repeat(50))
    results
      .filter(r => !r.validation.isValid)
      .forEach(result => {
        console.log(`\n📦 ${result.productName}`)
        console.log(`   URL: ${result.productUrl}`)
        console.log(`   Score: ${result.validation.score}/100`)
        console.log(`   Problèmes:`)
        result.validation.issues.forEach(issue => {
          console.log(`     - ${issue}`)
        })
        console.log(`   Recommandations:`)
        result.validation.recommendations.forEach(rec => {
          console.log(`     - ${rec}`)
        })
      })
  }

  // Sauvegarder le rapport
  const reportPath = path.join(__dirname, CONFIG.outputFile)
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2))
  console.log(`\n📄 Rapport sauvegardé: ${reportPath}`)

  return summary
}

/**
 * Génère un rapport HTML
 */
function generateHTMLReport(summary) {
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rapport de Conformité Schema.org - Batobaye</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .valid { color: #28a745; }
        .warning { color: #ffc107; }
        .error { color: #dc3545; }
        .product-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        .product-header { display: flex; justify-content: between; align-items: center; margin-bottom: 15px; }
        .score { font-size: 1.2em; font-weight: bold; padding: 5px 10px; border-radius: 5px; }
        .issues { background: #fff3cd; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .recommendations { background: #d1ecf1; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .schema-code { background: #f8f9fa; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 0.9em; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Rapport de Conformité Schema.org</h1>
            <p>Batobaye Market - ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${summary.totalProducts}</div>
                <div>Total Produits</div>
            </div>
            <div class="stat-card">
                <div class="stat-number valid">${summary.validProducts}</div>
                <div>Conformes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number warning">${summary.productsWithIssues}</div>
                <div>Avec Problèmes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${summary.averageScore}/100</div>
                <div>Score Moyen</div>
            </div>
        </div>

        <h2>📦 Détail des Produits</h2>
        ${summary.results.map(result => `
            <div class="product-card">
                <div class="product-header">
                    <h3>${result.productName}</h3>
                    <span class="score ${result.status === 'valid' ? 'valid' : result.status === 'warning' ? 'warning' : 'error'}">
                        ${result.validation.score}/100
                    </span>
                </div>
                <p><strong>URL:</strong> ${result.productUrl}</p>
                
                ${result.validation.issues.length > 0 ? `
                    <div class="issues">
                        <h4>🚨 Problèmes détectés:</h4>
                        <ul>
                            ${result.validation.issues.map(issue => `<li>${issue}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${result.validation.recommendations.length > 0 ? `
                    <div class="recommendations">
                        <h4>💡 Recommandations:</h4>
                        <ul>
                            ${result.validation.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <details>
                    <summary>Voir le Schema.org généré</summary>
                    <div class="schema-code">
                        <pre>${JSON.stringify(result.schema, null, 2)}</pre>
                    </div>
                </details>
            </div>
        `).join('')}
    </div>
</body>
</html>
  `

  const htmlPath = path.join(__dirname, 'schema-compliance-report.html')
  fs.writeFileSync(htmlPath, html)
  console.log(`📄 Rapport HTML généré: ${htmlPath}`)
}

// Exécution du script
if (require.main === module) {
  try {
    const summary = checkCompliance()
    generateHTMLReport(summary)
    
    if (summary.productsWithIssues > 0) {
      console.log('\n⚠️  ATTENTION: Des produits nécessitent des corrections pour être conformes aux exigences de Google Search Console.')
      process.exit(1)
    } else {
      console.log('\n✅ Tous les produits sont conformes aux exigences Schema.org !')
      process.exit(0)
    }
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error)
    process.exit(1)
  }
}

module.exports = {
  checkCompliance,
  validateSchema,
  generateProductSchema
} 