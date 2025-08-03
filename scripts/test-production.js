#!/usr/bin/env node

/**
 * Script de test pour vérifier que le système admin fonctionne en production
 * Usage: node scripts/test-production.js
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🧪 Test du système admin en production...\n')

// Vérifications préliminaires
function checkPrerequisites() {
  console.log('📋 Vérification des prérequis...')
  
  // Vérifier que .env.local existe
  if (!fs.existsSync('.env.local')) {
    console.log('❌ .env.local manquant')
    return false
  }
  
  // Vérifier que les dépendances sont installées
  if (!fs.existsSync('node_modules')) {
    console.log('❌ node_modules manquant - exécutez pnpm install')
    return false
  }
  
  console.log('✅ Prérequis OK')
  return true
}

// Test de compilation
function testBuild() {
  console.log('\n🔨 Test de compilation...')
  
  try {
    execSync('pnpm build', { stdio: 'inherit' })
    console.log('✅ Compilation réussie')
    return true
  } catch (error) {
    console.log('❌ Erreur de compilation')
    return false
  }
}

// Test des routes API
function testAPIRoutes() {
  console.log('\n🌐 Test des routes API...')
  
  const routes = [
    '/api/products',
    '/api/reports?type=dashboard',
    '/api/orders',
    '/api/suppliers'
  ]
  
  let successCount = 0
  
  routes.forEach(route => {
    try {
      // Test avec curl en mode local
      const result = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${route}`, { 
        encoding: 'utf8',
        timeout: 5000
      })
      
      if (result.trim() === '200') {
        console.log(`✅ ${route} - OK`)
        successCount++
      } else {
        console.log(`⚠️  ${route} - Code ${result.trim()}`)
      }
    } catch (error) {
      console.log(`❌ ${route} - Erreur`)
    }
  })
  
  return successCount === routes.length
}

// Test des pages admin
function testAdminPages() {
  console.log('\n👨‍💼 Test des pages admin...')
  
  const pages = [
    '/admin/login',
    '/admin/register',
    '/admin',
    '/admin/products',
    '/admin/orders'
  ]
  
  let successCount = 0
  
  pages.forEach(page => {
    try {
      const result = execSync(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${page}`, { 
        encoding: 'utf8',
        timeout: 5000
      })
      
      if (result.trim() === '200') {
        console.log(`✅ ${page} - OK`)
        successCount++
      } else {
        console.log(`⚠️  ${page} - Code ${result.trim()}`)
      }
    } catch (error) {
      console.log(`❌ ${page} - Erreur`)
    }
  })
  
  return successCount === pages.length
}

// Test de sécurité
function testSecurity() {
  console.log('\n🔒 Test de sécurité...')
  
  // Vérifier que les variables d'environnement sensibles ne sont pas exposées
  const envContent = fs.readFileSync('.env.local', 'utf8')
  const sensitiveVars = ['SUPER_ADMIN_PASSWORD', 'CINETPAY_API_KEY', 'DATABASE_URL']
  
  let exposedCount = 0
  sensitiveVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`⚠️  Variable ${varName} présente dans .env.local`)
      exposedCount++
    }
  })
  
  if (exposedCount === 0) {
    console.log('✅ Variables sensibles protégées')
    return true
  } else {
    console.log(`⚠️  ${exposedCount} variables sensibles détectées`)
    return false
  }
}

// Test de performance
function testPerformance() {
  console.log('\n⚡ Test de performance...')
  
  try {
    const startTime = Date.now()
    execSync('curl -s http://localhost:3000/admin/login > /dev/null', { timeout: 10000 })
    const endTime = Date.now()
    const responseTime = endTime - startTime
    
    if (responseTime < 3000) {
      console.log(`✅ Temps de réponse: ${responseTime}ms`)
      return true
    } else {
      console.log(`⚠️  Temps de réponse lent: ${responseTime}ms`)
      return false
    }
  } catch (error) {
    console.log('❌ Erreur de test de performance')
    return false
  }
}

// Test complet
function runFullTest() {
  console.log('🚀 Démarrage du serveur de production...\n')
  
  try {
    // Démarrer le serveur en arrière-plan
    const server = execSync('pnpm start', { 
      stdio: 'pipe',
      timeout: 30000 
    })
    
    // Attendre que le serveur démarre
    setTimeout(() => {
      console.log('⏳ Attente du démarrage du serveur...')
      
      const tests = [
        { name: 'Routes API', fn: testAPIRoutes },
        { name: 'Pages Admin', fn: testAdminPages },
        { name: 'Sécurité', fn: testSecurity },
        { name: 'Performance', fn: testPerformance }
      ]
      
      let passedTests = 0
      
      tests.forEach(test => {
        if (test.fn()) {
          passedTests++
        }
      })
      
      console.log(`\n📊 Résultats: ${passedTests}/${tests.length} tests réussis`)
      
      if (passedTests === tests.length) {
        console.log('🎉 Tous les tests sont passés ! Le système admin est prêt pour la production.')
      } else {
        console.log('⚠️  Certains tests ont échoué. Vérifiez les problèmes ci-dessus.')
      }
      
      // Arrêter le serveur
      try {
        execSync('pkill -f "next start"')
      } catch (e) {
        // Ignorer les erreurs d'arrêt
      }
      
    }, 5000)
    
  } catch (error) {
    console.log('❌ Erreur lors du démarrage du serveur')
  }
}

// Exécution du test
if (checkPrerequisites() && testBuild()) {
  runFullTest()
} else {
  console.log('\n❌ Tests annulés - problèmes détectés')
  process.exit(1)
} 