#!/usr/bin/env node

/**
 * Test final des boutons de produits
 * Vérifie que tout fonctionne correctement
 */

console.log('🧪 Test final des boutons de produits...\n')

const fs = require('fs')
const path = require('path')

// Test 1: Vérifier que le composant existe
const productActionButtonsPath = path.join(__dirname, '../components/ProductActionButtons.tsx')
console.log('📁 Vérification du composant ProductActionButtons...')

if (fs.existsSync(productActionButtonsPath)) {
  console.log('✅ ProductActionButtons.tsx existe')
  
  const content = fs.readFileSync(productActionButtonsPath, 'utf8')
  
  // Vérifier les fonctionnalités clés
  const checks = [
    { name: 'handleAddToCart', pattern: 'handleAddToCart' },
    { name: 'handleWhatsAppClick', pattern: 'handleWhatsAppClick' },
    { name: 'localStorage', pattern: 'localStorage' },
    { name: 'WhatsApp URL', pattern: 'wa.me' },
    { name: 'Dropdown menu', pattern: 'showDropdown' },
    { name: 'Button states', pattern: 'isAddingToCart' },
    { name: 'Success feedback', pattern: 'addedToCart' }
  ]
  
  checks.forEach(check => {
    if (content.includes(check.pattern)) {
      console.log(`✅ ${check.name} - OK`)
    } else {
      console.log(`❌ ${check.name} - MANQUANT`)
    }
  })
} else {
  console.log('❌ ProductActionButtons.tsx n\'existe pas')
}

// Test 2: Vérifier l'utilisation dans la page d'accueil
const homePagePath = path.join(__dirname, '../app/page.tsx')
console.log('\n📄 Vérification de l\'utilisation dans la page d\'accueil...')

if (fs.existsSync(homePagePath)) {
  const content = fs.readFileSync(homePagePath, 'utf8')
  
  if (content.includes('ProductActionButtons')) {
    console.log('✅ ProductActionButtons est utilisé dans la page d\'accueil')
  } else {
    console.log('❌ ProductActionButtons n\'est pas utilisé dans la page d\'accueil')
  }
  
  if (content.includes('layout="dropdown"')) {
    console.log('✅ Layout dropdown est configuré')
  } else {
    console.log('❌ Layout dropdown n\'est pas configuré')
  }
} else {
  console.log('❌ app/page.tsx n\'existe pas')
}

// Test 3: Vérifier les dépendances
const packageJsonPath = path.join(__dirname, '../package.json')
console.log('\n📦 Vérification des dépendances...')

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  
  const requiredDeps = ['react', 'next']
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep} - Installé`)
    } else {
      console.log(`❌ ${dep} - Manquant`)
    }
  })
} else {
  console.log('❌ package.json n\'existe pas')
}

// Test 4: Vérifier le serveur
console.log('\n🌐 Test du serveur...')

const http = require('http')

const testServer = () => {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        if (data.includes('Acheter maintenant')) {
          console.log('✅ Serveur fonctionne et boutons présents')
        } else {
          console.log('❌ Serveur fonctionne mais boutons manquants')
        }
        resolve()
      })
    })
    
    req.on('error', () => {
      console.log('❌ Serveur non accessible')
      resolve()
    })
    
    req.on('timeout', () => {
      console.log('❌ Timeout du serveur')
      req.destroy()
      resolve()
    })
    
    req.end()
  })
}

testServer().then(() => {
  console.log('\n🎯 Instructions de test manuel:')
  console.log('1. Ouvrez http://localhost:3000 dans votre navigateur')
  console.log('2. Allez à la section "Produits Vedettes"')
  console.log('3. Cliquez sur "Acheter maintenant" sur n\'importe quel produit')
  console.log('4. Vérifiez que le dropdown s\'ouvre avec 2 options:')
  console.log('   - "Ajouter au panier"')
  console.log('   - "Acheter sur WhatsApp"')
  console.log('5. Testez les deux options')
  console.log('\n✅ Test terminé !')
}) 