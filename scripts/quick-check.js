#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification rapide du projet Batobaye...\n');

// Vérifications de base
const checks = [
  {
    name: 'Fichier package.json',
    check: () => fs.existsSync('package.json'),
    message: '✅ package.json trouvé'
  },
  {
    name: 'Fichier .env.local',
    check: () => fs.existsSync('.env.local'),
    message: '✅ Configuration environnement trouvée'
  },
  {
    name: 'Dossier node_modules',
    check: () => fs.existsSync('node_modules'),
    message: '✅ Dépendances installées'
  },
  {
    name: 'Dossier .next',
    check: () => fs.existsSync('.next'),
    message: '✅ Build Next.js disponible'
  },
  {
    name: 'Fichier next.config.mjs',
    check: () => fs.existsSync('next.config.mjs'),
    message: '✅ Configuration Next.js trouvée'
  },
  {
    name: 'Dossier app',
    check: () => fs.existsSync('app'),
    message: '✅ Structure app/ trouvée'
  },
  {
    name: 'Dossier components',
    check: () => fs.existsSync('components'),
    message: '✅ Composants trouvés'
  },
  {
    name: 'Dossier lib',
    check: () => fs.existsSync('lib'),
    message: '✅ Utilitaires trouvés'
  }
];

let allPassed = true;

checks.forEach(({ name, check, message }) => {
  try {
    if (check()) {
      console.log(message);
    } else {
      console.log(`❌ ${name} manquant`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ Erreur lors de la vérification de ${name}:`, error.message);
    allPassed = false;
  }
});

// Vérification des variables d'environnement
console.log('\n📋 Vérification des variables d\'environnement...');
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const requiredVars = [
    'SUPER_ADMIN_EMAIL',
    'SUPER_ADMIN_PASSWORD',
    'NEXT_PUBLIC_APP_URL',
    'SESSION_SECRET',
    'JWT_SECRET'
  ];

  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName} configuré`);
    } else {
      console.log(`⚠️  ${varName} manquant`);
    }
  });
} catch (error) {
  console.log('❌ Impossible de lire .env.local');
}

// Vérification des ports
console.log('\n🌐 Vérification des ports...');
const net = require('net');

function checkPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    server.on('error', () => resolve(false));
  });
}

async function checkPorts() {
  const ports = [3000, 3001, 3002, 3003, 3004];
  for (const port of ports) {
    const available = await checkPort(port);
    if (available) {
      console.log(`✅ Port ${port} disponible`);
    } else {
      console.log(`⚠️  Port ${port} occupé`);
    }
  }
}

checkPorts().then(() => {
  console.log('\n🎉 Vérification terminée !');
  console.log('\n📝 Prochaines étapes :');
  console.log('1. Ouvrez http://localhost:3000 dans votre navigateur');
  console.log('2. Pour l\'admin : http://localhost:3000/admin');
  console.log('3. Identifiants par défaut : sobam@daveandlucesolutions.com / @DavyFrantz2025');
  console.log('\n🚀 Le serveur de développement devrait être en cours d\'exécution !');
}); 