#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration Batobaye Market...\n');

// Vérifier les dépendances
console.log('📦 Vérification des dépendances...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = [
  'next',
  'react',
  'react-dom',
  '@ai-sdk/openai',
  'ai',
  'tailwindcss',
  '@radix-ui/react-dialog'
];

let depsOk = true;
requiredDeps.forEach(dep => {
  if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
    console.log(`❌ ${dep} manquant`);
    depsOk = false;
  }
});

if (depsOk) {
  console.log('✅ Toutes les dépendances principales sont installées');
}

// Vérifier les fichiers essentiels
console.log('\n📁 Vérification des fichiers essentiels...');
const essentialFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/admin/page.tsx',
  'actions/ai.ts',
  'tailwind.config.ts',
  'next.config.mjs',
  'package.json'
];

let filesOk = true;
essentialFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} manquant`);
    filesOk = false;
  }
});

// Vérifier les variables d'environnement
console.log('\n🔧 Vérification des variables d\'environnement...');
const envFile = '.env.local';
if (fs.existsSync(envFile)) {
  console.log('✅ Fichier .env.local trouvé');
  const envContent = fs.readFileSync(envFile, 'utf8');
  const requiredVars = [
    'DATABASE_URL',
  
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'OPENAI_API_KEY'
  ];
  
  let envOk = true;
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`✅ ${varName}`);
    } else {
      console.log(`⚠️  ${varName} non configuré`);
      envOk = false;
    }
  });
  
  if (!envOk) {
    console.log('\n💡 Conseil: Configurez les variables manquantes dans .env.local');
  }
} else {
  console.log('⚠️  Fichier .env.local non trouvé');
  console.log('💡 Créez un fichier .env.local avec les variables nécessaires');
}

// Vérifier le build
console.log('\n🏗️  Test du build...');
const { execSync } = require('child_process');
try {
  execSync('pnpm run build', { stdio: 'pipe' });
  console.log('✅ Build réussi');
} catch (error) {
  console.log('❌ Erreur lors du build');
  console.log('💡 Vérifiez les erreurs ci-dessus');
}

console.log('\n🎉 Vérification terminée !');
console.log('\n📋 Prochaines étapes:');
console.log('1. Configurez vos variables d\'environnement dans .env.local');
console.log('2. Lancez le serveur avec: pnpm dev');
console.log('3. Ouvrez http://localhost:3000');
console.log('4. Accédez à l\'admin via http://localhost:3000/admin'); 