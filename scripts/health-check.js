#!/usr/bin/env node

const http = require('http');

console.log('🏥 Vérification de santé de Batobaye Market...\n');

const baseUrl = 'http://localhost:3000';
const endpoints = [
  { path: '/', name: 'Page d\'accueil' },
  { path: '/admin', name: 'Interface d\'administration' },
  { path: '/products', name: 'Page produits' },
  { path: '/about', name: 'Page À propos' },
  { path: '/contact', name: 'Page Contact' },
];

function checkEndpoint(path, name) {
  return new Promise((resolve) => {
    const url = `${baseUrl}${path}`;
    
    http.get(url, (res) => {
      const status = res.statusCode;
      const isSuccess = status >= 200 && status < 400;
      
      console.log(`${isSuccess ? '✅' : '❌'} ${name}: ${status}`);
      resolve({ name, status, isSuccess });
    }).on('error', (err) => {
      console.log(`❌ ${name}: Erreur de connexion`);
      resolve({ name, status: 0, isSuccess: false });
    });
  });
}

async function runHealthCheck() {
  console.log('🔍 Vérification des endpoints...\n');
  
  const results = await Promise.all(
    endpoints.map(endpoint => checkEndpoint(endpoint.path, endpoint.name))
  );
  
  const successCount = results.filter(r => r.isSuccess).length;
  const totalCount = results.length;
  
  console.log(`\n📊 Résultats: ${successCount}/${totalCount} endpoints fonctionnels`);
  
  if (successCount === totalCount) {
    console.log('🎉 Tous les endpoints fonctionnent correctement !');
    console.log('\n🌐 Votre application est prête :');
    console.log('   • Site public : http://localhost:3000');
    console.log('   • Interface admin : http://localhost:3000/admin');
  } else {
    console.log('⚠️  Certains endpoints ont des problèmes');
    console.log('\n🔧 Vérifiez que le serveur est démarré avec : pnpm dev');
  }
}

// Vérifier si le serveur est démarré
http.get(baseUrl, (res) => {
  if (res.statusCode === 200) {
    runHealthCheck();
  } else {
    console.log('❌ Serveur non accessible');
    console.log('💡 Démarrez le serveur avec : pnpm dev');
  }
}).on('error', () => {
  console.log('❌ Serveur non démarré');
  console.log('💡 Démarrez le serveur avec : pnpm dev');
}); 