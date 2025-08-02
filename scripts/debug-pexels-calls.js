#!/usr/bin/env node

/**
 * Script de débogage pour identifier la source des appels API Pexels
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Débogage des appels API Pexels...\n')

// 1. Vérifier les fichiers JavaScript/TypeScript pour les appels fetch
const searchPatterns = [
  'fetch.*pexels',
  'api/pexels',
  'modern kitchen appliances',
  'water heater',
  'gas stove',
  'washing machine'
]

const directories = [
  'app',
  'components',
  'lib',
  'hooks'
]

function searchInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')
    
    searchPatterns.forEach(pattern => {
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes(pattern.toLowerCase())) {
          console.log(`📍 ${filePath}:${index + 1}`)
          console.log(`   ${line.trim()}`)
          console.log('')
        }
      })
    })
  } catch (error) {
    // Ignorer les erreurs de lecture
  }
}

function searchInDirectory(dir) {
  if (!fs.existsSync(dir)) return
  
  const files = fs.readdirSync(dir, { withFileTypes: true })
  
  files.forEach(file => {
    const filePath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      searchInDirectory(filePath)
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts') || file.name.endsWith('.js')) {
      searchInFile(filePath)
    }
  })
}

console.log('🔍 Recherche dans les fichiers...\n')
directories.forEach(dir => {
  searchInDirectory(dir)
})

// 2. Vérifier les fichiers de configuration
const configFiles = [
  'next.config.mjs',
  'package.json',
  'tailwind.config.ts',
  'tsconfig.json'
]

console.log('🔍 Vérification des fichiers de configuration...\n')
configFiles.forEach(configFile => {
  if (fs.existsSync(configFile)) {
    searchInFile(configFile)
  }
})

// 3. Vérifier les variables d'environnement
const envFiles = [
  '.env',
  '.env.local',
  '.env.development',
  '.env.production'
]

console.log('🔍 Vérification des variables d\'environnement...\n')
envFiles.forEach(envFile => {
  if (fs.existsSync(envFile)) {
    searchInFile(envFile)
  }
})

// 4. Créer un hook de débogage pour Next.js
const debugHook = `
// Hook de débogage pour les appels API
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
}
`

const debugPath = path.join(__dirname, '../lib/debug-hook.js')
fs.writeFileSync(debugPath, debugHook)
console.log(`✅ Hook de débogage créé: lib/debug-hook.js`)

// 5. Instructions pour le débogage
console.log('\n📋 INSTRUCTIONS DE DÉBOGAGE')
console.log('=' .repeat(50))
console.log('1. Ajoutez cette ligne dans app/layout.tsx:')
console.log('   import "@/lib/debug-hook"')
console.log('')
console.log('2. Redémarrez le serveur: pnpm dev')
console.log('')
console.log('3. Ouvrez la console du navigateur')
console.log('')
console.log('4. Naviguez sur les pages pour voir les appels')
console.log('')
console.log('5. Les appels API Pexels seront affichés avec leur stack trace')
console.log('')

// 6. Vérifier les composants qui pourraient charger des images
const imageComponents = [
  'components/admin/ImageUpload.tsx',
  'components/admin/ProductForm.tsx',
  'app/page.tsx',
  'app/products/page.tsx'
]

console.log('🔍 Vérification des composants d\'images...\n')
imageComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`📁 ${component}:`)
    searchInFile(component)
  }
})

console.log('✅ Débogage terminé !')
console.log('📄 Suivez les instructions ci-dessus pour identifier la source des appels.') 