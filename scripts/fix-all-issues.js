#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction de tous les problèmes...\n');

// 1. Vérifier les variables d'environnement
console.log('1️⃣ Vérification des variables d\'environnement...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasSuperAdmin = envContent.includes('SUPER_ADMIN_EMAIL') && envContent.includes('SUPER_ADMIN_PASSWORD');
  
  if (hasSuperAdmin) {
    console.log('✅ Variables d\'environnement Super Admin configurées');
  } else {
    console.log('❌ Variables d\'environnement Super Admin manquantes');
  }
} else {
  console.log('❌ Fichier .env.local non trouvé');
}

// 2. Supprimer toutes les références Pexels
console.log('\n2️⃣ Suppression des références Pexels...');
const directories = ['app', 'components', 'lib', 'hooks'];
let pexelsFound = false;

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = getAllFiles(dir);
    files.forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.toLowerCase().includes('pexels')) {
          console.log(`❌ Référence Pexels trouvée dans: ${file}`);
          pexelsFound = true;
        }
      }
    });
  }
});

if (!pexelsFound) {
  console.log('✅ Aucune référence Pexels trouvée');
}

// 3. Vérifier les composants UI
console.log('\n3️⃣ Vérification des composants UI...');
const uiComponents = ['button', 'badge', 'card', 'input'];
uiComponents.forEach(component => {
  const componentPath = path.join(process.cwd(), 'components', 'ui', `${component}.tsx`);
  if (fs.existsSync(componentPath)) {
    console.log(`✅ Composant ${component} existe`);
  } else {
    console.log(`❌ Composant ${component} manquant`);
  }
});

// 4. Vérifier les imports lucide-react
console.log('\n4️⃣ Vérification des imports lucide-react...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (packageJson.dependencies && packageJson.dependencies['lucide-react']) {
  console.log('✅ lucide-react installé');
} else {
  console.log('❌ lucide-react non installé');
}

// 5. Nettoyer les caches
console.log('\n5️⃣ Nettoyage des caches...');
const cacheDirs = ['.next', 'node_modules/.cache', '.pnpm-store'];
cacheDirs.forEach(cacheDir => {
  if (fs.existsSync(cacheDir)) {
    try {
      fs.rmSync(cacheDir, { recursive: true, force: true });
      console.log(`✅ Cache supprimé: ${cacheDir}`);
    } catch (error) {
      console.log(`⚠️ Erreur lors de la suppression du cache: ${cacheDir}`);
    }
  }
});

// 6. Vérifier les fichiers de configuration
console.log('\n6️⃣ Vérification des fichiers de configuration...');
const configFiles = ['next.config.mjs', 'tailwind.config.ts', 'tsconfig.json'];
configFiles.forEach(configFile => {
  if (fs.existsSync(configFile)) {
    console.log(`✅ ${configFile} existe`);
  } else {
    console.log(`❌ ${configFile} manquant`);
  }
});

// 7. Vérifier les routes API
console.log('\n7️⃣ Vérification des routes API...');
const apiDir = path.join(process.cwd(), 'app', 'api');
if (fs.existsSync(apiDir)) {
  const apiRoutes = fs.readdirSync(apiDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log('Routes API trouvées:', apiRoutes.join(', '));
  
  if (apiRoutes.includes('pexels')) {
    console.log('❌ Route API Pexels encore présente');
  } else {
    console.log('✅ Route API Pexels supprimée');
  }
}

// 8. Vérifier les composants créés
console.log('\n8️⃣ Vérification des composants créés...');
const customComponents = ['ContactInfo', 'ProductActionButtons', 'WhatsAppBuyModal'];
customComponents.forEach(component => {
  const componentPath = path.join(process.cwd(), 'components', `${component}.tsx`);
  if (fs.existsSync(componentPath)) {
    console.log(`✅ Composant ${component} existe`);
  } else {
    console.log(`❌ Composant ${component} manquant`);
  }
});

console.log('\n🎉 Vérification terminée !');
console.log('\n📋 Actions recommandées:');
console.log('1. Redémarrer le serveur de développement');
console.log('2. Vérifier que les variables d\'environnement sont chargées');
console.log('3. Tester l\'authentification Super Admin');
console.log('4. Vérifier que les composants ContactInfo s\'affichent correctement');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
} 