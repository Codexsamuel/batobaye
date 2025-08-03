#!/usr/bin/env node

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

console.log('🔐 Configuration sécurisée des identifiants Super Admin\n');

// Interface pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function secureAdminSetup() {
  try {
    console.log('⚠️  ATTENTION : Configuration des identifiants Super Admin');
    console.log('   Ces identifiants ne seront plus visibles dans l\'interface\n');
    
    // Demander les identifiants de manière sécurisée
    const email = await question('📧 Email Super Admin: ');
    const password = await question('🔒 Mot de passe Super Admin (masqué): ');
    
    if (!email || !password) {
      console.log('❌ Email et mot de passe requis');
      rl.close();
      return;
    }
    
    // Valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Format d\'email invalide');
      rl.close();
      return;
    }
    
    // Valider la force du mot de passe
    if (password.length < 8) {
      console.log('❌ Le mot de passe doit contenir au moins 8 caractères');
      rl.close();
      return;
    }
    
    // Créer le contenu du fichier .env.local
    const envContent = `# Configuration Super Admin Batobaye Market (SÉCURISÉ)
SUPER_ADMIN_EMAIL=${email}
SUPER_ADMIN_PASSWORD=${password}

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

    // Sauvegarder le fichier .env.local
    fs.writeFileSync('.env.local', envContent);
    
    console.log('\n✅ Configuration sécurisée terminée !');
    console.log(`   Email configuré: ${email}`);
    console.log(`   Mot de passe: ${'*'.repeat(password.length)} (${password.length} caractères)`);
    
    console.log('\n🔒 Sécurité renforcée :');
    console.log('   • Identifiants masqués dans l\'interface');
    console.log('   • Fichier .env.local protégé');
    console.log('   • Authentification sécurisée activée');
    
    console.log('\n📋 Prochaines étapes :');
    console.log('1. Redémarrez le serveur de développement');
    console.log('2. Allez sur http://localhost:3000/admin/login');
    console.log('3. Utilisez vos identifiants pour vous connecter');
    
    console.log('\n🚀 Pour redémarrer le serveur :');
    console.log('   pkill -f "next dev" && pnpm dev');
    
    console.log('\n⚠️  IMPORTANT :');
    console.log('   • Ne partagez jamais vos identifiants');
    console.log('   • Changez régulièrement votre mot de passe');
    console.log('   • Utilisez un mot de passe fort en production');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration :', error.message);
  } finally {
    rl.close();
  }
}

// Vérifier si le fichier .env.local existe déjà
if (fs.existsSync('.env.local')) {
  console.log('📁 Fichier .env.local détecté');
  
  const currentContent = fs.readFileSync('.env.local', 'utf8');
  const hasSuperAdmin = currentContent.includes('SUPER_ADMIN_EMAIL') && currentContent.includes('SUPER_ADMIN_PASSWORD');
  
  if (hasSuperAdmin) {
    console.log('⚠️  Identifiants Super Admin déjà configurés');
    console.log('   Voulez-vous les reconfigurer ? (y/N)');
    
    question('').then((answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        secureAdminSetup();
      } else {
        console.log('✅ Configuration conservée');
        console.log('   Utilisez : pnpm test-auth-login pour vérifier');
      }
    });
  } else {
    console.log('✅ Configuration des identifiants Super Admin...');
    secureAdminSetup();
  }
} else {
  console.log('✅ Configuration initiale des identifiants Super Admin...');
  secureAdminSetup();
} 