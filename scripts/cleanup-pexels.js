#!/usr/bin/env node

/**
 * Script de nettoyage des références Pexels
 * Supprime toutes les références à l'API Pexels et optimise le projet
 */

const fs = require('fs')
const path = require('path')

console.log('🧹 Nettoyage des références Pexels...\n')

// 1. Supprimer l'endpoint Pexels factice
const pexelsRoutePath = path.join(__dirname, '../app/api/pexels/route.ts')
if (fs.existsSync(pexelsRoutePath)) {
  fs.unlinkSync(pexelsRoutePath)
  console.log('✅ Supprimé: app/api/pexels/route.ts')
}

// 2. Supprimer le dossier pexels s'il existe
const pexelsDirPath = path.join(__dirname, '../app/api/pexels')
if (fs.existsSync(pexelsDirPath)) {
  fs.rmSync(pexelsDirPath, { recursive: true, force: true })
  console.log('✅ Supprimé: app/api/pexels/')
}

// 3. Nettoyer le cache Next.js
const nextCachePath = path.join(__dirname, '../.next')
if (fs.existsSync(nextCachePath)) {
  fs.rmSync(nextCachePath, { recursive: true, force: true })
  console.log('✅ Nettoyé: cache .next')
}

// 4. Nettoyer les modules node_modules si nécessaire
const nodeModulesPath = path.join(__dirname, '../node_modules')
if (fs.existsSync(nodeModulesPath)) {
  console.log('⚠️  node_modules détecté - vous pouvez le nettoyer avec: pnpm install --force')
}

// 5. Vérifier les variables d'environnement
const envPath = path.join(__dirname, '../.env')
const envExamplePath = path.join(__dirname, '../env.example')

if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8')
  if (envContent.includes('PEXELS')) {
    envContent = envContent.replace(/PEXELS_API_KEY=.*\n?/g, '')
    fs.writeFileSync(envPath, envContent)
    console.log('✅ Nettoyé: variables PEXELS dans .env')
  }
}

if (fs.existsSync(envExamplePath)) {
  let envExampleContent = fs.readFileSync(envExamplePath, 'utf8')
  if (envExampleContent.includes('PEXELS')) {
    envExampleContent = envExampleContent.replace(/PEXELS_API_KEY=.*\n?/g, '')
    fs.writeFileSync(envExamplePath, envExampleContent)
    console.log('✅ Nettoyé: variables PEXELS dans env.example')
  }
}

// 6. Vérifier next.config.mjs
const nextConfigPath = path.join(__dirname, '../next.config.mjs')
if (fs.existsSync(nextConfigPath)) {
  let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8')
  if (nextConfigContent.includes('pexels') || nextConfigContent.includes('Pexels')) {
    nextConfigContent = nextConfigContent.replace(/\/\/.*pexels.*\n?/gi, '')
    nextConfigContent = nextConfigContent.replace(/\/\/.*Pexels.*\n?/gi, '')
    fs.writeFileSync(nextConfigPath, nextConfigContent)
    console.log('✅ Nettoyé: références Pexels dans next.config.mjs')
  }
}

// 7. Créer un fichier de remplacement pour les images
const placeholderImages = [
  'placeholder.svg',
  'placeholder.jpg',
  'placeholder.png'
]

placeholderImages.forEach(image => {
  const imagePath = path.join(__dirname, '../public', image)
  if (!fs.existsSync(imagePath)) {
    // Créer un SVG placeholder simple
    const svgContent = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dy=".3em">Image</text>
</svg>`
    fs.writeFileSync(imagePath, svgContent)
    console.log(`✅ Créé: public/${image}`)
  }
})

// 8. Vérifier les composants pour les références Pexels
const componentsDir = path.join(__dirname, '../components')
const appDir = path.join(__dirname, '../app')

function checkDirectoryForPexels(dir) {
  if (!fs.existsSync(dir)) return
  
  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      checkDirectoryForPexels(filePath)
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.js')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8')
        if (content.includes('pexels') || content.includes('Pexels')) {
          console.log(`⚠️  Référence Pexels détectée dans: ${filePath}`)
        }
      } catch (error) {
        // Ignorer les erreurs de lecture
      }
    }
  })
}

checkDirectoryForPexels(componentsDir)
checkDirectoryForPexels(appDir)

// 9. Créer un rapport de nettoyage
const cleanupReport = {
  timestamp: new Date().toISOString(),
  actions: [
    'Suppression de l\'endpoint Pexels factice',
    'Nettoyage du cache Next.js',
    'Vérification des variables d\'environnement',
    'Création d\'images placeholder',
    'Vérification des composants'
  ],
  recommendations: [
    'Redémarrer le serveur de développement: pnpm dev',
    'Vérifier que toutes les images utilisent des chemins locaux',
    'Tester les pages pour s\'assurer qu\'il n\'y a plus d\'erreurs 404'
  ]
}

const reportPath = path.join(__dirname, 'cleanup-report.json')
fs.writeFileSync(reportPath, JSON.stringify(cleanupReport, null, 2))

console.log('\n📊 RAPPORT DE NETTOYAGE')
console.log('=' .repeat(50))
console.log('✅ Nettoyage terminé avec succès !')
console.log('📄 Rapport sauvegardé: scripts/cleanup-report.json')
console.log('\n🚀 Prochaines étapes:')
console.log('1. Redémarrer le serveur: pnpm dev')
console.log('2. Vérifier qu\'il n\'y a plus d\'erreurs 404')
console.log('3. Tester toutes les pages du site')
console.log('\n✨ Votre projet est maintenant optimisé !') 