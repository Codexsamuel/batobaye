#!/usr/bin/env node

const fs = require('fs');

console.log('🔐 Test d\'authentification Super Admin Batobaye Market\n');

// Identifiants Super Admin
const SUPER_ADMIN_EMAIL = 'sobam@daveandlucesolutions.com';
const SUPER_ADMIN_PASSWORD = '@DavyFrantz2025';

// Simuler la fonction d'authentification
function simulateAuth(email, password) {
  // Vérifier si le fichier .env.local existe
  if (!fs.existsSync('.env.local')) {
    return {
      success: false,
      error: 'Fichier .env.local non trouvé'
    };
  }

  // Lire les variables d'environnement
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  // Extraire les identifiants configurés
  const emailMatch = envContent.match(/SUPER_ADMIN_EMAIL=(.+)/);
  const passwordMatch = envContent.match(/SUPER_ADMIN_PASSWORD=(.+)/);
  
  if (!emailMatch || !passwordMatch) {
    return {
      success: false,
      error: 'Identifiants Super Admin non configurés dans .env.local'
    };
  }

  const configuredEmail = emailMatch[1].replace(/"/g, '').trim();
  const configuredPassword = passwordMatch[1].replace(/"/g, '').trim();

  // Vérifier les identifiants
  if (email === configuredEmail && password === configuredPassword) {
    return {
      success: true,
      user: {
        id: 'super-admin-1',
        name: 'Super Administrateur',
        email: configuredEmail,
        role: 'super_admin',
        createdAt: new Date(),
        lastLogin: new Date()
      },
      message: 'Authentification réussie'
    };
  } else {
    return {
      success: false,
      error: 'Email ou mot de passe incorrect',
      details: {
        providedEmail: email,
        providedPassword: password,
        configuredEmail: configuredEmail,
        configuredPassword: configuredPassword
      }
    };
  }
}

// Test d'authentification
function testAuth() {
  console.log('🔍 Test avec les identifiants fournis :');
  console.log(`   Email: ${SUPER_ADMIN_EMAIL}`);
  console.log(`   Mot de passe: ${SUPER_ADMIN_PASSWORD}`);
  console.log('');

  const result = simulateAuth(SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD);

  if (result.success) {
    console.log('✅ Authentification réussie !');
    console.log(`   Utilisateur: ${result.user.name}`);
    console.log(`   Email: ${result.user.email}`);
    console.log(`   Rôle: ${result.user.role}`);
    console.log(`   Message: ${result.message}`);
    
    console.log('\n🎯 Prochaines étapes :');
    console.log('1. Le serveur est en cours de démarrage');
    console.log('2. Allez sur http://localhost:3000/admin/login');
    console.log('3. Utilisez les identifiants ci-dessus');
    console.log('4. Vous devriez pouvoir vous connecter sans problème');
    
  } else {
    console.log('❌ Échec de l\'authentification');
    console.log(`   Erreur: ${result.error}`);
    
    if (result.details) {
      console.log('\n🔍 Détails de débogage :');
      console.log(`   Email fourni: ${result.details.providedEmail}`);
      console.log(`   Mot de passe fourni: ${result.details.providedPassword}`);
      console.log(`   Email configuré: ${result.details.configuredEmail}`);
      console.log(`   Mot de passe configuré: ${result.details.configuredPassword}`);
    }
    
    console.log('\n💡 Solutions :');
    console.log('1. Vérifiez que le fichier .env.local existe');
    console.log('2. Vérifiez que les identifiants sont correctement configurés');
    console.log('3. Redémarrez le serveur avec : pkill -f "next dev" && pnpm dev');
  }
}

// Vérifier la configuration
function checkConfig() {
  console.log('📋 Vérification de la configuration :\n');
  
  if (!fs.existsSync('.env.local')) {
    console.log('❌ Fichier .env.local non trouvé');
    console.log('   Exécutez : pnpm setup-admin');
    return false;
  }
  
  const envContent = fs.readFileSync('.env.local', 'utf8');
  
  if (!envContent.includes('SUPER_ADMIN_EMAIL') || !envContent.includes('SUPER_ADMIN_PASSWORD')) {
    console.log('❌ Identifiants Super Admin non configurés');
    console.log('   Exécutez : pnpm setup-admin');
    return false;
  }
  
  console.log('✅ Configuration correcte');
  return true;
}

// Exécuter les tests
if (checkConfig()) {
  testAuth();
} else {
  console.log('\n🚀 Pour configurer l\'authentification :');
  console.log('   pnpm setup-admin');
} 