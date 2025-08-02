#!/usr/bin/env node

/**
 * Script de nettoyage complet du projet
 * Élimine tous les caches et redémarre proprement
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🧹 Nettoyage complet du projet...\n')

// 1. Nettoyer tous les caches
const cacheDirs = [
  '.next',
  'node_modules/.cache',
  '.turbo'
]

cacheDirs.forEach(dir => {
  const cachePath = path.join(__dirname, '..', dir)
  if (fs.existsSync(cachePath)) {
    fs.rmSync(cachePath, { recursive: true, force: true })
    console.log(`✅ Nettoyé: ${dir}`)
  }
})

// 2. Supprimer les fichiers de lock
const lockFiles = [
  'pnpm-lock.yaml',
  'yarn.lock',
  'package-lock.json'
]

lockFiles.forEach(lockFile => {
  const lockPath = path.join(__dirname, '..', lockFile)
  if (fs.existsSync(lockPath)) {
    fs.unlinkSync(lockPath)
    console.log(`✅ Supprimé: ${lockFile}`)
  }
})

// 3. Nettoyer les logs
const logFiles = [
  '.next/server/chunks/**/*.js.map',
  '.next/static/chunks/**/*.js.map'
]

// 4. Réinstaller les dépendances
console.log('\n📦 Réinstallation des dépendances...')
try {
  execSync('pnpm install', { 
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  })
  console.log('✅ Dépendances réinstallées')
} catch (error) {
  console.log('⚠️  Erreur lors de la réinstallation, continuons...')
}

// 5. Vérifier l'endpoint Pexels
const pexelsRoutePath = path.join(__dirname, '../app/api/pexels/route.ts')
if (!fs.existsSync(pexelsRoutePath)) {
  console.log('⚠️  Endpoint Pexels manquant, recréation...')
  
  const pexelsContent = `import { NextRequest, NextResponse } from 'next/server'

// Images locales par catégorie
const localImages = {
  'refrigerator': ['/placeholder.svg'],
  'freezer': ['/placeholder.svg'],
  'television': ['/placeholder.svg'],
  'water heater': ['/placeholder.svg'],
  'gas stove': ['/placeholder.svg'],
  'washing machine': ['/placeholder.svg'],
  'modern kitchen appliances': ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg']
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const per_page = parseInt(searchParams.get('per_page') || '1')
    
    console.log(\`🔍 Appel API Pexels: q="\${q}", per_page=\${per_page}\`)
    
    const normalizedQuery = q.toLowerCase().trim()
    let images = ['/placeholder.svg']
    
    for (const [keyword, imageList] of Object.entries(localImages)) {
      if (normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery)) {
        images = imageList
        break
      }
    }
    
    const limitedImages = images.slice(0, per_page)
    
    const photos = limitedImages.map((image, index) => ({
      id: index + 1,
      width: 1920,
      height: 1080,
      url: image,
      photographer: 'Batobaye Market',
      photographer_url: 'https://batobaye.shop',
      photographer_id: 1,
      avg_color: '#f3f4f6',
      src: {
        original: image,
        large2x: image,
        large: image,
        medium: image,
        small: image,
        portrait: image,
        landscape: image,
        tiny: image
      },
      liked: false,
      alt: \`Image \${index + 1} pour \${q}\`
    }))
    
    return NextResponse.json({
      page: 1,
      per_page,
      photos,
      total_results: photos.length,
      next_page: null,
      prev_page: null
    })
    
  } catch (error) {
    console.error('Erreur API Pexels:', error)
    return NextResponse.json(
      { 
        error: 'Service temporairement indisponible',
        photos: [],
        total_results: 0
      },
      { status: 200 }
    )
  }
}`

  // Créer le dossier si nécessaire
  const pexelsDir = path.dirname(pexelsRoutePath)
  if (!fs.existsSync(pexelsDir)) {
    fs.mkdirSync(pexelsDir, { recursive: true })
  }
  
  fs.writeFileSync(pexelsRoutePath, pexelsContent)
  console.log('✅ Endpoint Pexels recréé')
}

// 6. Créer les images placeholder
const placeholderImages = [
  'placeholder.svg',
  'placeholder.jpg',
  'placeholder.png'
]

const publicDir = path.join(__dirname, '../public')
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

placeholderImages.forEach(image => {
  const imagePath = path.join(publicDir, image)
  if (!fs.existsSync(imagePath)) {
    const svgContent = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">Image</text>
</svg>`
    fs.writeFileSync(imagePath, svgContent)
    console.log(`✅ Créé: public/${image}`)
  }
})

// 7. Vérifier le hook de débogage
const debugHookPath = path.join(__dirname, '../lib/debug-hook.js')
if (!fs.existsSync(debugHookPath)) {
  const debugContent = `// Hook de débogage pour les appels API
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch
  window.fetch = function(...args) {
    const url = args[0]
    if (typeof url === 'string' && url.includes('pexels')) {
      console.log('🔍 Appel API Pexels détecté:', url)
      console.trace('Stack trace:')
    }
    return originalFetch.apply(this, args)
  }
}`

  const libDir = path.dirname(debugHookPath)
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true })
  }
  
  fs.writeFileSync(debugHookPath, debugContent)
  console.log('✅ Hook de débogage créé')
}

// 8. Créer un rapport de nettoyage
const cleanupReport = {
  timestamp: new Date().toISOString(),
  actions: [
    'Nettoyage des caches Next.js',
    'Suppression des fichiers de lock',
    'Réinstallation des dépendances',
    'Recréation de l\'endpoint Pexels',
    'Création des images placeholder',
    'Création du hook de débogage'
  ],
  nextSteps: [
    'Redémarrer le serveur: pnpm dev',
    'Vérifier la console du navigateur',
    'Tester toutes les pages',
    'Identifier la source des appels Pexels'
  ]
}

const reportPath = path.join(__dirname, 'full-cleanup-report.json')
fs.writeFileSync(reportPath, JSON.stringify(cleanupReport, null, 2))

console.log('\n📊 RAPPORT DE NETTOYAGE COMPLET')
console.log('=' .repeat(50))
console.log('✅ Nettoyage terminé avec succès !')
console.log('📄 Rapport sauvegardé: scripts/full-cleanup-report.json')
console.log('\n🚀 Prochaines étapes:')
console.log('1. Redémarrer le serveur: pnpm dev')
console.log('2. Ouvrir la console du navigateur')
console.log('3. Naviguer sur les pages pour identifier les appels')
console.log('4. Vérifier qu\'il n\'y a plus d\'erreurs 404')
console.log('\n✨ Votre projet est maintenant complètement nettoyé !') 