#!/usr/bin/env node

const fs = require('fs');

console.log('🛍️ Ajout d\'un produit de démonstration\n');

// Produit de démonstration
const demoProduct = {
  name: "Réfrigérateur Samsung 400L No Frost",
  description: "Réfrigérateur Samsung moderne avec technologie No Frost, grande capacité de 400L, classe énergétique A+++, idéal pour les grandes familles.",
  price: 520000,
  original_price: 580000,
  stock_quantity: 12,
  category: "Réfrigérateurs",
  brand: "Samsung",
  model: "RT40K5530S8",
  image_url: "https://images.unsplash.com/photo-1571172964276-91faaa704e1f?w=800&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1571172964276-91faaa704e1f?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop"
  ],
  specifications: {
    "Capacité": "400L",
    "Classe énergétique": "A+++",
    "Technologie": "No Frost",
    "Couleur": "Inox",
    "Nombre de portes": "2",
    "Garantie": "2 ans"
  },
  status: "active"
};

// Simuler l'ajout via l'API
async function addDemoProduct() {
  try {
    console.log('📦 Ajout du produit de démonstration...');
    
    // Simuler l'appel API
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(demoProduct),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Produit ajouté avec succès !');
      console.log(`   ID: ${data.data.id}`);
      console.log(`   Nom: ${data.data.name}`);
      console.log(`   Prix: ${data.data.price} FCFA`);
      console.log(`   Catégorie: ${data.data.category}`);
      console.log(`   Images: ${data.data.images.length} uploadées`);
      
      console.log('\n🎯 Le produit apparaîtra automatiquement dans :');
      console.log('   • Page d\'accueil (produits vedettes)');
      console.log('   • Page produits (/products)');
      console.log('   • Catégorie "Réfrigérateurs"');
      console.log('   • Résultats de recherche');
      
    } else {
      console.log('❌ Erreur lors de l\'ajout du produit');
    }
  } catch (error) {
    console.log('⚠️  Serveur non démarré ou erreur de connexion');
    console.log('   Démarrez le serveur avec : pnpm dev');
    console.log('   Puis relancez ce script');
  }
}

// Instructions
console.log('📋 Instructions :');
console.log('1. Assurez-vous que le serveur est démarré (pnpm dev)');
console.log('2. Ce script ajoutera un produit de démonstration');
console.log('3. Le produit apparaîtra automatiquement sur le site\n');

// Vérifier si le serveur est démarré
const { exec } = require('child_process');
exec('curl -s http://localhost:3000/api/products > /dev/null', (error) => {
  if (error) {
    console.log('⚠️  Serveur non accessible sur http://localhost:3000');
    console.log('   Démarrez le serveur avec : pnpm dev');
    console.log('   Puis relancez ce script : node scripts/demo-product.js');
  } else {
    addDemoProduct();
  }
}); 