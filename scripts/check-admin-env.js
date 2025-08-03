#!/usr/bin/env node

/**
 * Script de vérification rapide de l'environnement admin
 * Usage: node scripts/check-admin-env.js
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Vérification de l\'environnement admin...\n')

// Vérifier les fichiers essentiels
function checkEssentialFiles() {
  console.log('📁 Vérification des fichiers essentiels...')
  
  const essentialFiles = [
    'app/admin/layout.tsx',
    'app/admin/login/page.tsx',
    'app/admin/register/page.tsx',
    'app/admin/page.tsx',
    'app/admin/products/page.tsx',
    'app/admin/orders/page.tsx',
    'app/admin/users/page.tsx',
    'app/admin/analytics/page.tsx',
    'app/admin/settings/page.tsx',
    'components/admin/Sidebar.tsx',
    'components/admin/Topbar.tsx',
    'lib/auth.ts',
    'lib/db-commercial.ts',
    'lib/security.ts',
    'middleware.ts'
  ]
  
  let missingFiles = []
  
  essentialFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      missingFiles.push(file)
    }
  })
  
  if (missingFiles.length === 0) {
    console.log('✅ Tous les fichiers essentiels présents')
    return true
  } else {
    console.log('❌ Fichiers manquants:')
    missingFiles.forEach(file => console.log(`   - ${file}`))
    return false
  }
}

// Vérifier les routes API
function checkAPIRoutes() {
  console.log('\n🌐 Vérification des routes API...')
  
  const apiRoutes = [
    'app/api/products/route.ts',
    'app/api/orders/route.ts',
    'app/api/reports/route.ts',
    'app/api/suppliers/route.ts',
    'app/api/payment/route.ts',
    'app/api/cinetpay/route.ts',
    'app/api/whatsapp/webhook/route.ts'
  ]
  
  let missingRoutes = []
  
  apiRoutes.forEach(route => {
    if (!fs.existsSync(route)) {
      missingRoutes.push(route)
    }
  })
  
  if (missingRoutes.length === 0) {
    console.log('✅ Toutes les routes API présentes')
    return true
  } else {
    console.log('❌ Routes API manquantes:')
    missingRoutes.forEach(route => console.log(`   - ${route}`))
    return false
  }
}

// Vérifier les variables d'environnement
function checkEnvironmentVariables() {
  console.log('\n🔧 Vérification des variables d\'environnement...')
  
  if (!fs.existsSync('.env.local')) {
    console.log('❌ .env.local manquant')
    return false
  }
  
  const envContent = fs.readFileSync('.env.local', 'utf8')
  const requiredVars = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
  ]
  
  let missingVars = []
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      missingVars.push(varName)
    }
  })
  
  if (missingVars.length === 0) {
    console.log('✅ Variables d\'environnement essentielles configurées')
    return true
  } else {
    console.log('⚠️  Variables manquantes:')
    missingVars.forEach(varName => console.log(`   - ${varName}`))
    return false
  }
}

// Vérifier les dépendances
function checkDependencies() {
  console.log('\n📦 Vérification des dépendances...')
  
  if (!fs.existsSync('package.json')) {
    console.log('❌ package.json manquant')
    return false
  }
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const requiredDeps = [
    'next',
    'react',
    'react-dom',
    'bcryptjs',
    'jsonwebtoken'
  ]
  
  let missingDeps = []
  
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
      missingDeps.push(dep)
    }
  })
  
  if (missingDeps.length === 0) {
    console.log('✅ Dépendances essentielles présentes')
    return true
  } else {
    console.log('⚠️  Dépendances manquantes:')
    missingDeps.forEach(dep => console.log(`   - ${dep}`))
    return false
  }
}

// Vérifier la configuration Next.js
function checkNextConfig() {
  console.log('\n⚙️  Vérification de la configuration Next.js...')
  
  if (!fs.existsSync('next.config.mjs')) {
    console.log('❌ next.config.mjs manquant')
    return false
  }
  
  const configContent = fs.readFileSync('next.config.mjs', 'utf8')
  
  const requiredConfigs = [
    'output: \'standalone\'',
    'images:',
    'remotePatterns:'
  ]
  
  let missingConfigs = []
  
  requiredConfigs.forEach(config => {
    if (!configContent.includes(config)) {
      missingConfigs.push(config)
    }
  })
  
  if (missingConfigs.length === 0) {
    console.log('✅ Configuration Next.js correcte')
    return true
  } else {
    console.log('⚠️  Configurations manquantes:')
    missingConfigs.forEach(config => console.log(`   - ${config}`))
    return false
  }
}

// Vérifier les composants DL Solutions
function checkDLSolutionsComponents() {
  console.log('\n🚀 Vérification des composants DL Solutions...')
  
  const dlComponents = [
    'components/DLSolutionsManager.tsx',
    'components/DLSolutionsBadge.tsx',
    'components/DLSolutionsLogo.tsx',
    'components/DLSolutionsSchema.tsx',
    'components/DLSolutionsSearchResult.tsx',
    'lib/dl-solutions-config.ts'
  ]
  
  let missingComponents = []
  
  dlComponents.forEach(component => {
    if (!fs.existsSync(component)) {
      missingComponents.push(component)
    }
  })
  
  if (missingComponents.length === 0) {
    console.log('✅ Tous les composants DL Solutions présents')
    return true
  } else {
    console.log('⚠️  Composants DL Solutions manquants:')
    missingComponents.forEach(component => console.log(`   - ${component}`))
    return false
  }
}

// Exécution des vérifications
const checks = [
  { name: 'Fichiers essentiels', fn: checkEssentialFiles },
  { name: 'Routes API', fn: checkAPIRoutes },
  { name: 'Variables d\'environnement', fn: checkEnvironmentVariables },
  { name: 'Dépendances', fn: checkDependencies },
  { name: 'Configuration Next.js', fn: checkNextConfig },
  { name: 'Composants DL Solutions', fn: checkDLSolutionsComponents }
]

let passedChecks = 0

checks.forEach(check => {
  if (check.fn()) {
    passedChecks++
  }
})

console.log(`\n📊 Résultats: ${passedChecks}/${checks.length} vérifications réussies`)

if (passedChecks === checks.length) {
  console.log('\n🎉 L\'environnement admin est prêt pour la production !')
  console.log('\n📋 Prochaines étapes:')
  console.log('   1. Exécuter: pnpm build')
  console.log('   2. Exécuter: pnpm start')
  console.log('   3. Tester l\'accès admin sur http://localhost:3000/admin')
  console.log('   4. Vérifier les fonctionnalités: produits, commandes, utilisateurs')
} else {
  console.log('\n⚠️  Certaines vérifications ont échoué. Corrigez les problèmes avant la production.')
  process.exit(1)
} 