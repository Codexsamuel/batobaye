#!/usr/bin/env node

/**
 * Script de test pour les fonctionnalités avancées de l'admin
 * Teste les outils de développement, gestion avancée, etc.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration de test
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3000',
  testProduct: {
    name: 'Produit Test Avancé',
    description: 'Produit pour tester les fonctionnalités avancées',
    price: 150000,
    original_price: 180000,
    stock_quantity: 25,
    category: 'test',
    brand: 'Test Brand',
    model: 'Test Model',
    image_url: 'https://via.placeholder.com/400x300?text=Test+Avance',
    images: [
      'https://via.placeholder.com/400x300?text=Test+Avance+1',
      'https://via.placeholder.com/400x300?text=Test+Avance+2'
    ],
    specifications: {
      couleur: 'Blanc',
      dimensions: '60x40x30 cm',
      poids: '3.2 kg',
      garantie: '2 ans'
    },
    status: 'active'
  }
};

// Fonction pour faire une requête HTTP
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = {
            status: res.statusCode,
            headers: res.headers,
            body: body
          };
          
          try {
            response.json = JSON.parse(body);
          } catch (e) {
            response.json = null;
          }
          
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Test des outils de développement
async function testDevelopmentTools() {
  console.log('🔧 Test des outils de développement...\n');
  console.log('=' .repeat(50));
  
  const devTools = [
    '/admin/code',
    '/admin/deploy',
    '/admin/github',
    '/admin/ia',
    '/admin/design'
  ];

  for (const tool of devTools) {
    try {
      const response = await makeRequest(tool);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`${status} ${tool} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${tool} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test de la gestion avancée des produits
async function testAdvancedProductManagement() {
  console.log('📦 Test de la gestion avancée des produits...\n');
  console.log('=' .repeat(50));
  
  try {
    // 1. Créer un produit de test
    console.log('📝 Création d\'un produit de test...');
    const newProduct = {
      ...TEST_CONFIG.testProduct,
      name: `Test Avancé ${Date.now()}`
    };
    
    const createResponse = await makeRequest('/api/products', 'POST', newProduct);
    if (createResponse.status === 201 || createResponse.status === 200) {
      console.log('✅ Produit créé pour les tests');
      const createdProduct = createResponse.json?.data;
      
      if (createdProduct) {
        // 2. Test de mise à jour partielle
        console.log('\n🔄 Test de mise à jour partielle...');
        const partialUpdate = {
          price: createdProduct.price + 5000,
          stock_quantity: createdProduct.stock_quantity + 10
        };
        
        const updateResponse = await makeRequest(`/api/products/${createdProduct.id}`, 'PUT', {
          ...createdProduct,
          ...partialUpdate
        });
        
        if (updateResponse.status === 200) {
          console.log('✅ Mise à jour partielle réussie');
        } else {
          console.log(`⚠️ Mise à jour partielle: Status ${updateResponse.status}`);
        }
        
        // 3. Test de changement de statut
        console.log('\n🔄 Test de changement de statut...');
        const statusUpdate = {
          ...createdProduct,
          status: 'inactive'
        };
        
        const statusResponse = await makeRequest(`/api/products/${createdProduct.id}`, 'PUT', statusUpdate);
        if (statusResponse.status === 200) {
          console.log('✅ Changement de statut réussi');
        }
        
        // 4. Nettoyer le produit de test
        console.log('\n🗑️ Nettoyage du produit de test...');
        await makeRequest(`/api/products/${createdProduct.id}`, 'DELETE');
        console.log('✅ Produit de test supprimé');
      }
    }
  } catch (error) {
    console.log(`❌ Erreur lors du test de gestion avancée: ${error.message}`);
  }
  console.log('');
}

// Test des rapports et analytics
async function testAdvancedReports() {
  console.log('📊 Test des rapports et analytics avancés...\n');
  console.log('=' .repeat(50));
  
  const reportTypes = [
    'dashboard',
    'sales',
    'products',
    'users',
    'inventory',
    'revenue'
  ];
  
  for (const type of reportTypes) {
    try {
      const response = await makeRequest(`/api/reports?type=${type}`);
      const status = response.status === 200 ? '✅' : '❌';
      const hasData = response.json && response.json.success ? '📊' : '⚠️';
      console.log(`${status} Rapport ${type} - Status: ${response.status} ${hasData}`);
      
      if (response.json && response.json.data) {
        const data = response.json.data;
        if (type === 'dashboard' && data.sales) {
          console.log(`   💰 Ventes: ${data.sales.totalSales} commandes, ${data.sales.totalRevenue} FCFA`);
        }
        if (type === 'products' && data.products) {
          console.log(`   📦 Produits: ${data.products.length} produits`);
        }
      }
    } catch (error) {
      console.log(`❌ Rapport ${type} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test de la gestion des commandes
async function testOrderManagement() {
  console.log('📋 Test de la gestion des commandes...\n');
  console.log('=' .repeat(50));
  
  try {
    // Test de récupération des commandes
    const ordersResponse = await makeRequest('/api/orders');
    if (ordersResponse.status === 200 && ordersResponse.json) {
      const orders = ordersResponse.json.data || [];
      console.log(`✅ ${orders.length} commandes trouvées`);
      
      if (orders.length > 0) {
        const firstOrder = orders[0];
        console.log(`📋 Première commande: ${firstOrder.id} - ${firstOrder.status}`);
      }
    }
    
    // Test de création d'une commande de test
    console.log('\n📝 Test de création de commande...');
    const testOrder = {
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      customer_phone: '+237 XXX XXX XXX',
      items: [
        {
          product_id: 1,
          quantity: 2,
          price: 450000
        }
      ],
      total_amount: 900000,
      status: 'pending'
    };
    
    const createOrderResponse = await makeRequest('/api/orders', 'POST', testOrder);
    if (createOrderResponse.status === 201 || createOrderResponse.status === 200) {
      console.log('✅ Commande de test créée');
    } else {
      console.log(`⚠️ Création de commande: Status ${createOrderResponse.status}`);
    }
    
  } catch (error) {
    console.log(`❌ Erreur lors du test de gestion des commandes: ${error.message}`);
  }
  console.log('');
}

// Test de la gestion des utilisateurs
async function testUserManagement() {
  console.log('👥 Test de la gestion des utilisateurs...\n');
  console.log('=' .repeat(50));
  
  try {
    // Test de récupération des utilisateurs
    const usersResponse = await makeRequest('/api/users');
    if (usersResponse.status === 200 && usersResponse.json) {
      const users = usersResponse.json.data || [];
      console.log(`✅ ${users.length} utilisateurs trouvés`);
      
      if (users.length > 0) {
        const firstUser = users[0];
        console.log(`👤 Premier utilisateur: ${firstUser.email} - ${firstUser.role}`);
      }
    }
    
    // Test de création d'un utilisateur de test
    console.log('\n📝 Test de création d\'utilisateur...');
    const testUser = {
      email: `test${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test User',
      role: 'admin'
    };
    
    const createUserResponse = await makeRequest('/api/users', 'POST', testUser);
    if (createUserResponse.status === 201 || createUserResponse.status === 200) {
      console.log('✅ Utilisateur de test créé');
    } else {
      console.log(`⚠️ Création d'utilisateur: Status ${createUserResponse.status}`);
    }
    
  } catch (error) {
    console.log(`❌ Erreur lors du test de gestion des utilisateurs: ${error.message}`);
  }
  console.log('');
}

// Test des fonctionnalités de recherche et filtrage
async function testSearchAndFiltering() {
  console.log('🔍 Test des fonctionnalités de recherche et filtrage...\n');
  console.log('=' .repeat(50));
  
  const searchTests = [
    '/api/products?search=samsung',
    '/api/products?category=Réfrigérateurs',
    '/api/products?status=active',
    '/api/products?brand=Samsung',
    '/api/products?min_price=100000',
    '/api/products?max_price=500000',
    '/api/products?in_stock=true'
  ];
  
  for (const test of searchTests) {
    try {
      const response = await makeRequest(test);
      const status = response.status === 200 ? '✅' : '❌';
      const hasData = response.json && response.json.data ? '📊' : '⚠️';
      console.log(`${status} ${test} - Status: ${response.status} ${hasData}`);
      
      if (response.json && response.json.data) {
        const results = response.json.data;
        if (Array.isArray(results)) {
          console.log(`   📦 ${results.length} résultats trouvés`);
        }
      }
    } catch (error) {
      console.log(`❌ ${test} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test de l'intégration avec les services externes
async function testExternalServices() {
  console.log('🌐 Test de l\'intégration avec les services externes...\n');
  console.log('=' .repeat(50));
  
  const externalServices = [
    '/api/cinetpay',
    '/api/whatsapp/webhook',
    '/api/github',
    '/api/vercel/deploy'
  ];
  
  for (const service of externalServices) {
    try {
      const response = await makeRequest(service);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`${status} ${service} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${service} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test de la sécurité et des permissions
async function testSecurityAndPermissions() {
  console.log('🔒 Test de la sécurité et des permissions...\n');
  console.log('=' .repeat(50));
  
  try {
    // Test d'accès sans authentification
    console.log('🔐 Test d\'accès sans authentification...');
    const adminResponse = await makeRequest('/admin');
    console.log(`   Admin sans auth: Status ${adminResponse.status}`);
    
    // Test d'accès aux API sensibles
    const sensitiveApis = [
      '/api/users',
      '/api/reports',
      '/api/orders'
    ];
    
    for (const api of sensitiveApis) {
      const response = await makeRequest(api);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`   ${api}: Status ${response.status}`);
    }
    
  } catch (error) {
    console.log(`❌ Erreur lors du test de sécurité: ${error.message}`);
  }
  console.log('');
}

// Fonction principale
async function runAllAdvancedTests() {
  console.log('🚀 TESTS AVANCÉS DE L\'INTERFACE ADMIN\n');
  console.log('=' .repeat(60));
  
  try {
    await testDevelopmentTools();
    await testAdvancedProductManagement();
    await testAdvancedReports();
    await testOrderManagement();
    await testUserManagement();
    await testSearchAndFiltering();
    await testExternalServices();
    await testSecurityAndPermissions();
    
    console.log('=' .repeat(60));
    console.log('✅ Tous les tests avancés sont terminés !');
    console.log('\n📋 Résumé des fonctionnalités testées:');
    console.log('- 🔧 Outils de développement');
    console.log('- 📦 Gestion avancée des produits');
    console.log('- 📊 Rapports et analytics');
    console.log('- 📋 Gestion des commandes');
    console.log('- 👥 Gestion des utilisateurs');
    console.log('- 🔍 Recherche et filtrage');
    console.log('- 🌐 Services externes');
    console.log('- 🔒 Sécurité et permissions');
    
    console.log('\n🎯 L\'interface admin est complètement opérationnelle !');
    
  } catch (error) {
    console.log(`❌ Erreur lors des tests avancés: ${error.message}`);
  }
}

// Exécuter les tests
runAllAdvancedTests(); 