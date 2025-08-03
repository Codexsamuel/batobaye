#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📱 Test de l\'intégration WhatsApp Business...\n');

// 1. Vérifier les fichiers créés
console.log('1️⃣ Vérification des fichiers créés...');
const filesToCheck = [
  'lib/whatsapp-business.ts',
  'app/api/whatsapp/webhook/route.ts',
  'app/admin/whatsapp-images/page.tsx',
  'GUIDE_WHATSAPP_BUSINESS_INTEGRATION.md'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} existe`);
  } else {
    console.log(`❌ ${file} manquant`);
  }
});

// 2. Vérifier les dossiers de stockage
console.log('\n2️⃣ Vérification des dossiers de stockage...');
const dirsToCheck = [
  'public/uploads/whatsapp',
  'public/uploads/whatsapp/documents'
];

dirsToCheck.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir} existe`);
  } else {
    console.log(`❌ ${dir} manquant`);
  }
});

// 3. Vérifier les variables d'environnement
console.log('\n3️⃣ Vérification des variables d\'environnement...');
require('dotenv').config({ path: '.env.local' });

const requiredVars = [
  'WHATSAPP_ACCESS_TOKEN',
  'WHATSAPP_PHONE_NUMBER_ID',
  'WHATSAPP_VERIFY_TOKEN',
  'WHATSAPP_WEBHOOK_URL'
];

let allVarsGood = true;
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName.includes('TOKEN') ? '***' : value}`);
  } else {
    console.log(`❌ ${varName}: Non définie`);
    allVarsGood = false;
  }
});

// 4. Vérifier la sidebar admin
console.log('\n4️⃣ Vérification de la sidebar admin...');
const sidebarPath = 'components/admin/Sidebar.tsx';
if (fs.existsSync(sidebarPath)) {
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  if (sidebarContent.includes('whatsapp-images')) {
    console.log('✅ Lien WhatsApp Images ajouté à la sidebar');
  } else {
    console.log('❌ Lien WhatsApp Images manquant dans la sidebar');
  }
  
  if (sidebarContent.includes('MessageSquare')) {
    console.log('✅ Icône MessageSquare importée');
  } else {
    console.log('❌ Icône MessageSquare manquante');
  }
} else {
  console.log('❌ Fichier Sidebar.tsx non trouvé');
}

// 5. Vérifier les patterns dans les fichiers
console.log('\n5️⃣ Vérification des patterns dans les fichiers...');

// Vérifier lib/whatsapp-business.ts
const whatsappLibPath = 'lib/whatsapp-business.ts';
if (fs.existsSync(whatsappLibPath)) {
  const content = fs.readFileSync(whatsappLibPath, 'utf8');
  
  const patterns = [
    'WhatsAppBusinessAPI',
    'downloadImage',
    'processIncomingMessages',
    'saveImageToSystem',
    'public/uploads/whatsapp'
  ];
  
  patterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.log(`✅ Pattern trouvé: ${pattern}`);
    } else {
      console.log(`❌ Pattern manquant: ${pattern}`);
    }
  });
}

// Vérifier app/api/whatsapp/webhook/route.ts
const webhookPath = 'app/api/whatsapp/webhook/route.ts';
if (fs.existsSync(webhookPath)) {
  const content = fs.readFileSync(webhookPath, 'utf8');
  
  const patterns = [
    'GET',
    'POST',
    'whatsappAPI',
    'processIncomingMessages'
  ];
  
  patterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.log(`✅ Pattern trouvé dans webhook: ${pattern}`);
    } else {
      console.log(`❌ Pattern manquant dans webhook: ${pattern}`);
    }
  });
}

// 6. Vérifier la page admin
console.log('\n6️⃣ Vérification de la page admin...');
const adminPagePath = 'app/admin/whatsapp-images/page.tsx';
if (fs.existsSync(adminPagePath)) {
  const content = fs.readFileSync(adminPagePath, 'utf8');
  
  const patterns = [
    'WhatsAppImage',
    'WhatsAppDocument',
    'fetchWhatsAppMedia',
    'handleApproveImage',
    'handleRejectImage'
  ];
  
  patterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.log(`✅ Pattern trouvé dans page admin: ${pattern}`);
    } else {
      console.log(`❌ Pattern manquant dans page admin: ${pattern}`);
    }
  });
}

// 7. Vérifier les permissions des dossiers
console.log('\n7️⃣ Vérification des permissions...');
const uploadDir = 'public/uploads/whatsapp';
if (fs.existsSync(uploadDir)) {
  try {
    // Tester l'écriture
    const testFile = path.join(uploadDir, 'test.txt');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    console.log('✅ Permissions d\'écriture OK pour uploads/whatsapp');
  } catch (error) {
    console.log('❌ Problème de permissions pour uploads/whatsapp');
  }
}

// 8. Résumé
console.log('\n📋 Résumé de l\'intégration WhatsApp Business:');

if (allVarsGood) {
  console.log('✅ Variables d\'environnement configurées');
} else {
  console.log('❌ Variables d\'environnement manquantes');
}

console.log('\n🎯 Prochaines étapes:');
console.log('1. Configurer un compte WhatsApp Business API');
console.log('2. Obtenir les tokens d\'accès');
console.log('3. Configurer le webhook dans le dashboard WhatsApp');
console.log('4. Tester l\'envoi d\'une image via WhatsApp');
console.log('5. Vérifier la réception dans /admin/whatsapp-images');

console.log('\n📚 Documentation:');
console.log('- Guide complet: GUIDE_WHATSAPP_BUSINESS_INTEGRATION.md');
console.log('- API WhatsApp: https://developers.facebook.com/docs/whatsapp');

console.log('\n🎉 Test terminé !'); 