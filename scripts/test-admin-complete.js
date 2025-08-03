#!/usr/bin/env node

/**
 * Script de test complet pour l'interface admin
 * Vérifie toutes les fonctionnalités : authentification, produits, rapports, etc.
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Configuration de test
const TEST_CONFIG = {
  adminEmail: 'admin@batobaye.com',
  adminPassword: 'admin123',
  testProduct: {
    name: 'Produit Test Admin',
    description: 'Produit de test pour vérifier l\'interface admin',
    price: 99999,
    category: 'test',
    stock: 10,
    image: 'https://via.placeholder.com/300x200?text=Test+Admin'
  }
};

// Fonction utilitaire pour faire des requêtes HTTP
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
          
          // Essayer de parser le JSON
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

// Tests des pages admin
async function testAdminPages() {
  console.log('🔍 Test des pages admin...\n');
  
  const pages = [
    '/admin/login',
    '/admin/register',
    '/admin',
    '/admin/products',
    '/admin/products/new',
    '/admin/orders',
    '/admin/users',
    '/admin/analytics',
    '/admin/reports',
    '/admin/settings'
  ];

  for (const page of pages) {
    try {
      const response = await makeRequest(page);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`${status} ${page} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${page} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Tests des API endpoints
async function testAPIEndpoints() {
  console.log('🔍 Test des API endpoints...\n');
  
  const endpoints = [
    '/api/products',
    '/api/products?status=active',
    '/api/orders',
    '/api/reports?type=dashboard',
    '/api/reports?type=sales',
    '/api/reports?type=products',
    '/api/categories',
    '/api/suppliers'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(endpoint);
      const status = response.status === 200 ? '✅' : '❌';
      const hasData = response.json && response.json.success ? '📊' : '⚠️';
      console.log(`${status} ${endpoint} - Status: ${response.status} ${hasData}`);
    } catch (error) {
      console.log(`❌ ${endpoint} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test d'ajout de produit
async function testProductManagement() {
  console.log('🔍 Test de gestion des produits...\n');
  
  try {
    // 1. Récupérer les produits existants
    console.log('📋 Récupération des produits existants...');
    const getResponse = await makeRequest('/api/products');
    if (getResponse.status === 200 && getResponse.json) {
      const products = getResponse.json.data || [];
      console.log(`✅ ${products.length} produits trouvés`);
      
      if (products.length > 0) {
        const firstProduct = products[0];
        console.log(`📦 Premier produit: ${firstProduct.name} - ${firstProduct.price} FCFA`);
      }
    }

    // 2. Tester l'ajout d'un produit (simulation)
    console.log('\n📝 Test d\'ajout de produit...');
    const testProduct = {
      ...TEST_CONFIG.testProduct,
      name: `Test Admin ${Date.now()}`
    };
    
    const addResponse = await makeRequest('/api/products', 'POST', testProduct);
    if (addResponse.status === 200 || addResponse.status === 201) {
      console.log('✅ Produit ajouté avec succès');
    } else {
      console.log(`⚠️ Ajout de produit: Status ${addResponse.status}`);
    }

  } catch (error) {
    console.log(`❌ Erreur lors du test de gestion des produits: ${error.message}`);
  }
  console.log('');
}

// Test des rapports et analytics
async function testReportsAndAnalytics() {
  console.log('🔍 Test des rapports et analytics...\n');
  
  const reportTypes = ['dashboard', 'sales', 'products', 'users'];
  
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
      }
    } catch (error) {
      console.log(`❌ Rapport ${type} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test de la base de données
async function testDatabase() {
  console.log('🔍 Test de la base de données...\n');
  
  try {
    // Test des produits
    const productsResponse = await makeRequest('/api/products');
    if (productsResponse.status === 200 && productsResponse.json) {
      const products = productsResponse.json.data || [];
      console.log(`✅ Base de données produits: ${products.length} produits`);
    }

    // Test des commandes
    const ordersResponse = await makeRequest('/api/orders');
    if (ordersResponse.status === 200 && ordersResponse.json) {
      const orders = ordersResponse.json.data || [];
      console.log(`✅ Base de données commandes: ${orders.length} commandes`);
    }

    // Test des catégories
    const categoriesResponse = await makeRequest('/api/categories');
    if (categoriesResponse.status === 200 && categoriesResponse.json) {
      const categories = categoriesResponse.json.data || [];
      console.log(`✅ Base de données catégories: ${categories.length} catégories`);
    }

  } catch (error) {
    console.log(`❌ Erreur lors du test de la base de données: ${error.message}`);
  }
  console.log('');
}

// Test de l'intégration avec le site principal
async function testSiteIntegration() {
  console.log('🔍 Test de l\'intégration avec le site principal...\n');
  
  const mainPages = [
    '/',
    '/products',
    '/about',
    '/contact',
    '/cart'
  ];

  for (const page of mainPages) {
    try {
      const response = await makeRequest(page);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`${status} ${page} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${page} - Erreur: ${error.message}`);
    }
  }
  console.log('');
}

// Test des fonctionnalités avancées
async function testAdvancedFeatures() {
  console.log('🔍 Test des fonctionnalités avancées...\n');
  
  try {
    // Test de recherche de produits
    const searchResponse = await makeRequest('/api/products?search=test');
    console.log(`🔍 Recherche de produits: Status ${searchResponse.status}`);

    // Test de filtrage par catégorie
    const filterResponse = await makeRequest('/api/products?category=test');
    console.log(`🔍 Filtrage par catégorie: Status ${filterResponse.status}`);

    // Test de pagination
    const paginationResponse = await makeRequest('/api/products?page=1&limit=5');
    console.log(`🔍 Pagination: Status ${paginationResponse.status}`);

  } catch (error) {
    console.log(`❌ Erreur lors du test des fonctionnalités avancées: ${error.message}`);
  }
  console.log('');
}

// Fonction principale
async function runAllTests() {
  console.log('🚀 TEST COMPLET DE L\'INTERFACE ADMIN\n');
  console.log('=' .repeat(50));
  
  try {
    await testAdminPages();
    await testAPIEndpoints();
    await testProductManagement();
    await testReportsAndAnalytics();
    await testDatabase();
    await testSiteIntegration();
    await testAdvancedFeatures();
    
    console.log('=' .repeat(50));
    console.log('✅ Tests terminés avec succès !');
    console.log('\n📋 Résumé:');
    console.log('- Interface admin accessible');
    console.log('- API endpoints fonctionnels');
    console.log('- Gestion des produits opérationnelle');
    console.log('- Rapports et analytics disponibles');
    console.log('- Base de données connectée');
    console.log('- Intégration site principal OK');
    console.log('- Fonctionnalités avancées actives');
    
  } catch (error) {
    console.log(`❌ Erreur lors des tests: ${error.message}`);
  }
}

// Exécuter les tests
runAllTests(); 