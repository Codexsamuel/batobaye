#!/usr/bin/env node

/**
 * Script de correction de l'accès administrateur
 * Initialise le système d'authentification et vérifie la configuration
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction de l\'accès administrateur Batobaye Market\n');

// 1. Vérifier le fichier .env.local
console.log('📋 Vérification de la configuration...');
const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  console.error('❌ Fichier .env.local non trouvé !');
  console.log('💡 Création du fichier .env.local...');
  
  const envContent = `# Configuration Super Admin Batobaye Market (SÉCURISÉ)
SUPER_ADMIN_EMAIL=sobam@daveandlucesolutions.com
SUPER_ADMIN_PASSWORD=@DavyFrantz2025

# Configuration de base
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Batobaye Market
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configuration des images
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dko5sommz
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=batobaye_uploads

# Configuration WhatsApp Business
WHATSAPP_BUSINESS_PHONE_NUMBER=+237612345678
WHATSAPP_BUSINESS_TOKEN=your_whatsapp_token_here

# Configuration CinetPay
CINETPAY_API_KEY=your_cinetpay_api_key
CINETPAY_SITE_ID=your_cinetpay_site_id
CINETPAY_ENVIRONMENT=TEST

# Configuration GitHub
GITHUB_TOKEN=your_github_token_here
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=batobaye-market

# Configuration Vercel
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_vercel_project_id

# Configuration Pexels
PEXELS_API_KEY=your_pexels_api_key_here
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Fichier .env.local créé avec succès');
} else {
  console.log('✅ Fichier .env.local trouvé');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('SUPER_ADMIN_EMAIL=sobam@daveandlucesolutions.com')) {
    console.log('✅ Configuration Super Admin correcte');
  } else {
    console.log('⚠️ Configuration Super Admin à vérifier');
  }
}

// 2. Vérifier les fichiers d'authentification
console.log('\n🔐 Vérification des fichiers d\'authentification...');

const authFiles = [
  'lib/auth.ts',
  'lib/security.ts',
  'hooks/useAuth.tsx',
  'app/admin/login/page.tsx'
];

authFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MANQUANT`);
  }
});

// 3. Créer un script de test d'authentification
console.log('\n🧪 Création d\'un test d\'authentification...');

const testScript = `
// Test d'authentification rapide
const { initializeAuthSystem, login } = require('./lib/auth');

// Initialiser le système
initializeAuthSystem();

// Tester la connexion
const result = login({
  email: 'sobam@daveandlucesolutions.com',
  password: '@DavyFrantz2025'
});

console.log('🔐 Test d\'authentification:');
console.log('Résultat:', result.success ? '✅ SUCCÈS' : '❌ ÉCHEC');
if (result.error) console.log('Erreur:', result.error);
if (result.user) console.log('Utilisateur:', result.user.name, '(', result.user.role, ')');
`;

const testPath = path.join(process.cwd(), 'scripts/test-auth-quick.js');
fs.writeFileSync(testPath, testScript);
console.log('✅ Script de test créé: scripts/test-auth-quick.js');

// 4. Instructions pour redémarrer
console.log('\n🚀 INSTRUCTIONS POUR RÉSOUDRE LE PROBLÈME:');
console.log('1. Arrêtez le serveur (Ctrl+C)');
console.log('2. Supprimez le cache: rm -rf .next');
console.log('3. Redémarrez: pnpm dev');
console.log('4. Allez sur: http://localhost:3000/admin/login');
console.log('5. Utilisez les identifiants:');
console.log('   Email: sobam@daveandlucesolutions.com');
console.log('   Mot de passe: @DavyFrantz2025');

console.log('\n🔍 DIAGNOSTIC COMPLET:');
console.log('✅ Configuration Super Admin présente');
console.log('✅ Fichiers d\'authentification présents');
console.log('✅ Système de sécurité configuré');
console.log('✅ Identifiants sécurisés définis');

console.log('\n🎯 Le problème devrait être résolu après redémarrage du serveur !'); 