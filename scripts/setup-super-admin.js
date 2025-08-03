#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔐 Configuration du Super Admin Batobaye Market\n');

// Identifiants Super Admin
const SUPER_ADMIN_EMAIL = 'sobam@daveandlucesolutions.com';
const SUPER_ADMIN_PASSWORD = '@DavyFrantz2025';

// Contenu du fichier .env.local
const envContent = `# Configuration Super Admin Batobaye Market
SUPER_ADMIN_EMAIL=${SUPER_ADMIN_EMAIL}
SUPER_ADMIN_PASSWORD=${SUPER_ADMIN_PASSWORD}

# Configuration de base
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Batobaye Market
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configuration des images (optionnel)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dko5sommz
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=batobaye_uploads

# Configuration WhatsApp Business (optionnel)
WHATSAPP_BUSINESS_PHONE_NUMBER=+237612345678
WHATSAPP_BUSINESS_TOKEN=your_whatsapp_token_here

# Configuration CinetPay (optionnel)
CINETPAY_API_KEY=your_cinetpay_api_key
CINETPAY_SITE_ID=your_cinetpay_site_id
CINETPAY_ENVIRONMENT=TEST

# Configuration GitHub (optionnel)
GITHUB_TOKEN=your_github_token_here
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=batobaye-market

# Configuration Vercel (optionnel)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_PROJECT_ID=your_vercel_project_id

# Configuration Pexels (optionnel)
PEXELS_API_KEY=your_pexels_api_key_here
`;

function setupSuperAdmin() {
  const envPath = '.env.local';
  
  try {
    // Vérifier si le fichier existe déjà
    if (fs.existsSync(envPath)) {
      console.log('📁 Fichier .env.local existe déjà');
      
      // Lire le contenu actuel
      const currentContent = fs.readFileSync(envPath, 'utf8');
      
      // Vérifier si les identifiants Super Admin sont déjà configurés
      if (currentContent.includes('SUPER_ADMIN_EMAIL') && currentContent.includes('SUPER_ADMIN_PASSWORD')) {
        console.log('✅ Identifiants Super Admin déjà configurés');
        
        // Afficher les identifiants actuels
        const emailMatch = currentContent.match(/SUPER_ADMIN_EMAIL=(.+)/);
        const passwordMatch = currentContent.match(/SUPER_ADMIN_PASSWORD=(.+)/);
        
        if (emailMatch && passwordMatch) {
          console.log('\n🔑 Identifiants Super Admin actuels :');
          console.log(`   Email: ${emailMatch[1]}`);
          console.log(`   Mot de passe: ${passwordMatch[1]}`);
        }
      } else {
        // Ajouter les identifiants Super Admin
        const updatedContent = currentContent + `\n# Configuration Super Admin Batobaye Market\nSUPER_ADMIN_EMAIL=${SUPER_ADMIN_EMAIL}\nSUPER_ADMIN_PASSWORD=${SUPER_ADMIN_PASSWORD}\n`;
        fs.writeFileSync(envPath, updatedContent);
        console.log('✅ Identifiants Super Admin ajoutés au fichier existant');
      }
    } else {
      // Créer le fichier .env.local
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Fichier .env.local créé avec les identifiants Super Admin');
    }
    
    console.log('\n🔑 Identifiants Super Admin configurés :');
    console.log(`   Email: ${SUPER_ADMIN_EMAIL}`);
    console.log(`   Mot de passe: ${SUPER_ADMIN_PASSWORD}`);
    
    console.log('\n📋 Instructions :');
    console.log('1. Redémarrez le serveur de développement');
    console.log('2. Allez sur http://localhost:3000/admin/login');
    console.log('3. Utilisez les identifiants ci-dessus pour vous connecter');
    
    console.log('\n🚀 Pour redémarrer le serveur :');
    console.log('   pkill -f "next dev" && pnpm dev');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration :', error.message);
    console.log('\n💡 Solution manuelle :');
    console.log('1. Créez un fichier .env.local à la racine du projet');
    console.log('2. Ajoutez les lignes suivantes :');
    console.log(`   SUPER_ADMIN_EMAIL=${SUPER_ADMIN_EMAIL}`);
    console.log(`   SUPER_ADMIN_PASSWORD=${SUPER_ADMIN_PASSWORD}`);
    console.log('3. Redémarrez le serveur');
  }
}

// Vérifier les identifiants
console.log('🔍 Vérification des identifiants :');
console.log(`   Email: ${SUPER_ADMIN_EMAIL}`);
console.log(`   Mot de passe: ${SUPER_ADMIN_PASSWORD}`);
console.log('');

if (SUPER_ADMIN_EMAIL && SUPER_ADMIN_PASSWORD) {
  setupSuperAdmin();
} else {
  console.log('❌ Identifiants manquants');
  console.log('   Veuillez configurer SUPER_ADMIN_EMAIL et SUPER_ADMIN_PASSWORD');
} 