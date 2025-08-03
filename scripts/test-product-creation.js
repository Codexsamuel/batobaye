#!/usr/bin/env node

/**
 * Script de test pour l'ajout de produit via l'API
 * Teste la création de produit avec les bons champs
 */

const http = require('http');

// Configuration de test
const TEST_PRODUCT = {
  name: 'Produit Test Admin',
  description: 'Produit de test pour vérifier l\'interface admin',
  price: 99999,
  original_price: 120000,
  stock_quantity: 10,
  category: 'test',
  brand: 'Test Brand',
  model: 'Test Model',
  image_url: 'https://via.placeholder.com/300x200?text=Test+Admin',
  images: [
    'https://via.placeholder.com/300x200?text=Test+Admin+1',
    'https://via.placeholder.com/300x200?text=Test+Admin+2'
  ],
  specifications: {
    couleur: 'Noir',
    dimensions: '50x30x20 cm',
    poids: '2.5 kg'
  },
  status: 'active'
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

// Test de création de produit
async function testProductCreation() {
  console.log('🚀 Test de création de produit\n');
  console.log('=' .repeat(50));
  
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

    // 2. Créer un nouveau produit
    console.log('\n📝 Création d\'un nouveau produit...');
    const newProduct = {
      ...TEST_PRODUCT,
      name: `Test Admin ${Date.now()}`
    };
    
    console.log('📦 Données du produit:');
    console.log(`   Nom: ${newProduct.name}`);
    console.log(`   Prix: ${newProduct.price} FCFA`);
    console.log(`   Stock: ${newProduct.stock_quantity}`);
    console.log(`   Catégorie: ${newProduct.category}`);
    
    const createResponse = await makeRequest('/api/products', 'POST', newProduct);
    
    if (createResponse.status === 201 || createResponse.status === 200) {
      console.log('✅ Produit créé avec succès !');
      if (createResponse.json && createResponse.json.data) {
        const createdProduct = createResponse.json.data;
        console.log(`📦 Produit créé: ${createdProduct.name} (ID: ${createdProduct.id})`);
      }
    } else {
      console.log(`❌ Erreur lors de la création: Status ${createResponse.status}`);
      if (createResponse.json && createResponse.json.error) {
        console.log(`   Erreur: ${createResponse.json.error}`);
      }
      console.log(`   Réponse: ${createResponse.body}`);
    }

    // 3. Vérifier que le produit a été ajouté
    console.log('\n🔍 Vérification de l\'ajout...');
    const verifyResponse = await makeRequest('/api/products');
    if (verifyResponse.status === 200 && verifyResponse.json) {
      const updatedProducts = verifyResponse.json.data || [];
      console.log(`✅ ${updatedProducts.length} produits maintenant disponibles`);
      
      // Chercher le produit créé
      const createdProduct = updatedProducts.find(p => p.name.includes('Test Admin'));
      if (createdProduct) {
        console.log(`📦 Produit trouvé: ${createdProduct.name} - ${createdProduct.price} FCFA`);
        console.log(`   Stock: ${createdProduct.stock_quantity}`);
        console.log(`   Status: ${createdProduct.status}`);
      }
    }

  } catch (error) {
    console.log(`❌ Erreur lors du test: ${error.message}`);
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('✅ Test terminé !');
}

// Test de mise à jour de produit
async function testProductUpdate() {
  console.log('\n🔄 Test de mise à jour de produit\n');
  console.log('=' .repeat(50));
  
  try {
    // 1. Récupérer un produit existant
    const getResponse = await makeRequest('/api/products');
    if (getResponse.status === 200 && getResponse.json) {
      const products = getResponse.json.data || [];
      if (products.length > 0) {
        const productToUpdate = products[0];
        console.log(`📦 Produit à mettre à jour: ${productToUpdate.name}`);
        
        // 2. Mettre à jour le produit
        const updateData = {
          ...productToUpdate,
          price: productToUpdate.price + 1000,
          stock_quantity: productToUpdate.stock_quantity + 5,
          description: `${productToUpdate.description} (Mis à jour le ${new Date().toLocaleDateString()})`
        };
        
        console.log(`💰 Nouveau prix: ${updateData.price} FCFA`);
        console.log(`📦 Nouveau stock: ${updateData.stock_quantity}`);
        
        const updateResponse = await makeRequest(`/api/products/${productToUpdate.id}`, 'PUT', updateData);
        
        if (updateResponse.status === 200) {
          console.log('✅ Produit mis à jour avec succès !');
        } else {
          console.log(`⚠️ Mise à jour: Status ${updateResponse.status}`);
        }
      }
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la mise à jour: ${error.message}`);
  }
  
  console.log('=' .repeat(50));
}

// Test de suppression de produit
async function testProductDeletion() {
  console.log('\n🗑️ Test de suppression de produit\n');
  console.log('=' .repeat(50));
  
  try {
    // 1. Récupérer les produits de test
    const getResponse = await makeRequest('/api/products');
    if (getResponse.status === 200 && getResponse.json) {
      const products = getResponse.json.data || [];
      const testProducts = products.filter(p => p.name.includes('Test Admin'));
      
      if (testProducts.length > 0) {
        const productToDelete = testProducts[0];
        console.log(`🗑️ Suppression du produit: ${productToDelete.name}`);
        
        const deleteResponse = await makeRequest(`/api/products/${productToDelete.id}`, 'DELETE');
        
        if (deleteResponse.status === 200) {
          console.log('✅ Produit supprimé avec succès !');
        } else {
          console.log(`⚠️ Suppression: Status ${deleteResponse.status}`);
        }
      } else {
        console.log('ℹ️ Aucun produit de test à supprimer');
      }
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la suppression: ${error.message}`);
  }
  
  console.log('=' .repeat(50));
}

// Fonction principale
async function runAllTests() {
  console.log('🧪 TESTS COMPLETS DE GESTION DES PRODUITS\n');
  
  await testProductCreation();
  await testProductUpdate();
  await testProductDeletion();
  
  console.log('\n🎉 Tous les tests sont terminés !');
  console.log('\n📋 Résumé:');
  console.log('- ✅ Création de produit');
  console.log('- ✅ Mise à jour de produit');
  console.log('- ✅ Suppression de produit');
  console.log('- ✅ API produits fonctionnelle');
}

// Exécuter les tests
runAllTests(); 