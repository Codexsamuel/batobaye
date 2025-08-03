#!/usr/bin/env node

const https = require('https')
const http = require('http')

const BASE_URL = 'https://www.batobaye.shop'

// Fonction pour faire une requête HTTP/HTTPS
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'User-Agent': 'Batobaye-Production-Test/1.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data))
    }

    const client = urlObj.protocol === 'https:' ? https : http
    
    const req = client.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => {
        body += chunk
      })
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body)
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonBody
          })
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: body
          })
        }
      })
    })

    req.on('error', (err) => {
      reject(err)
    })

    if (data) {
      req.write(JSON.stringify(data))
    }
    req.end()
  })
}

// Routes à tester
const routesToTest = [
  { path: '/api/reports', name: 'Reports API' },
  { path: '/api/reports?type=dashboard', name: 'Reports Dashboard API' },
  { path: '/api/products', name: 'Products API' },
  { path: '/api/products?status=active', name: 'Products Active API' },
  { path: '/api/orders', name: 'Orders API' },
  { path: '/api/sales', name: 'Sales API' },
  { path: '/api/suppliers', name: 'Suppliers API' },
  { path: '/admin', name: 'Admin Page' },
  { path: '/admin/login', name: 'Admin Login Page' },
  { path: '/', name: 'Home Page' }
]

async function testRoutes() {
  console.log('🔍 Test des routes API en production...\n')
  
  const results = []
  
  for (const route of routesToTest) {
    try {
      console.log(`Testing ${route.name}...`)
      const result = await makeRequest(`${BASE_URL}${route.path}`)
      
      const status = result.status >= 200 && result.status < 300 ? '✅' : '❌'
      console.log(`${status} ${route.name}: ${result.status} ${result.statusText || ''}`)
      
      if (result.status >= 400) {
        console.log(`   Error: ${JSON.stringify(result.data).substring(0, 100)}...`)
      }
      
      results.push({
        route: route.name,
        path: route.path,
        status: result.status,
        success: result.status >= 200 && result.status < 300
      })
      
    } catch (error) {
      console.log(`❌ ${route.name}: ERROR - ${error.message}`)
      results.push({
        route: route.name,
        path: route.path,
        status: 'ERROR',
        success: false,
        error: error.message
      })
    }
  }
  
  console.log('\n📊 Résumé des tests:')
  console.log('='.repeat(50))
  
  const successful = results.filter(r => r.success).length
  const failed = results.filter(r => !r.success).length
  
  console.log(`✅ Succès: ${successful}`)
  console.log(`❌ Échecs: ${failed}`)
  console.log(`📈 Taux de succès: ${((successful / results.length) * 100).toFixed(1)}%`)
  
  if (failed > 0) {
    console.log('\n❌ Routes en échec:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.route} (${r.path}): ${r.status} ${r.error || ''}`)
    })
  }
  
  console.log('\n✅ Routes fonctionnelles:')
  results.filter(r => r.success).forEach(r => {
    console.log(`   - ${r.route} (${r.path}): ${r.status}`)
  })
}

// Exécuter les tests
testRoutes().catch(console.error) 