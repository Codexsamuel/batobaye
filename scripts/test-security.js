#!/usr/bin/env node

const https = require('https')
const http = require('http')

const BASE_URL = 'https://www.batobaye.shop'

// Fonction pour faire une requête HTTP/HTTPS avec différents User-Agents
function makeRequest(url, userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36') {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    }

    const client = urlObj.protocol === 'https:' ? https : http
    
    const req = client.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: body.substring(0, 200) // Premiers 200 caractères
        })
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.end()
  })
}

// Tests de sécurité
const securityTests = [
  {
    name: 'Test accès direct admin',
    path: '/admin',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  },
  {
    name: 'Test accès direct admin login',
    path: '/admin/login',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  },
  {
    name: 'Test avec User-Agent court',
    path: '/admin',
    userAgent: 'Test'
  },
  {
    name: 'Test avec User-Agent bot',
    path: '/admin',
    userAgent: 'Googlebot/2.1'
  },
  {
    name: 'Test avec User-Agent curl',
    path: '/admin',
    userAgent: 'curl/7.68.0'
  },
  {
    name: 'Test accès normal',
    path: '/',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  }
]

async function testSecurity() {
  console.log('🔒 Test de sécurité du site...\n')
  
  const results = []
  
  for (const test of securityTests) {
    try {
      console.log(`Testing ${test.name}...`)
      const result = await makeRequest(`${BASE_URL}${test.path}`, test.userAgent)
      
      const status = result.status >= 200 && result.status < 300 ? '✅' : '❌'
      console.log(`${status} ${test.name}: ${result.status}`)
      
      if (result.status >= 400) {
        console.log(`   Error: ${result.data}`)
      }
      
      results.push({
        test: test.name,
        path: test.path,
        userAgent: test.userAgent,
        status: result.status,
        success: result.status >= 200 && result.status < 300
      })
      
    } catch (error) {
      console.log(`❌ ${test.name}: ERROR - ${error.message}`)
      results.push({
        test: test.name,
        path: test.path,
        userAgent: test.userAgent,
        status: 'ERROR',
        success: false,
        error: error.message
      })
    }
  }
  
  console.log('\n📊 Résumé des tests de sécurité:')
  console.log('='.repeat(50))
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(`✅ Succès: ${successful}`)
  console.log(`❌ Échecs: ${failed}`)
  
  if (failed > 0) {
    console.log('\n❌ Tests en échec:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.test}: ${r.status} ${r.error || ''}`)
    })
  }
  
  console.log('\n✅ Tests réussis:')
  results.filter(r => r.success).forEach(r => {
    console.log(`   - ${r.test}: ${r.status}`)
  })
  
  // Recommandations
  console.log('\n💡 Recommandations:')
  if (results.some(r => r.path.startsWith('/admin') && r.status === 400)) {
    console.log('   - Les pages admin sont bloquées par la sécurité')
    console.log('   - Vérifier le middleware de sécurité')
  }
  
  if (results.some(r => r.userAgent.includes('bot') && r.status === 403)) {
    console.log('   - Les bots sont correctement bloqués')
  }
  
  if (results.some(r => r.userAgent.length < 10 && r.status === 400)) {
    console.log('   - Les User-Agents courts sont bloqués')
  }
}

// Exécuter les tests
testSecurity().catch(console.error) 