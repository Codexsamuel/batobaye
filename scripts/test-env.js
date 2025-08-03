#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Test des variables d\'environnement...\n');

const requiredVars = [
  'SUPER_ADMIN_EMAIL',
  'SUPER_ADMIN_PASSWORD',
  'CINETPAY_SITE_ID',
  'CINETPAY_API_KEY',
  'CINETPAY_SECRET_KEY'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${varName.includes('PASSWORD') || varName.includes('SECRET') ? '***' : value}`);
  } else {
    console.log(`❌ ${varName}: Non définie`);
    allGood = false;
  }
});

console.log('\n📋 Variables d\'application:');
console.log(`✅ NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`✅ NEXT_PUBLIC_APP_URL: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}`);

console.log('\n📋 Variables de sécurité:');
console.log(`✅ SESSION_SECRET: ${process.env.SESSION_SECRET ? 'Définie' : 'Non définie'}`);
console.log(`✅ JWT_SECRET: ${process.env.JWT_SECRET ? 'Définie' : 'Non définie'}`);

if (allGood) {
  console.log('\n🎉 Toutes les variables d\'environnement sont configurées !');
} else {
  console.log('\n⚠️ Certaines variables d\'environnement sont manquantes.');
  console.log('Vérifiez votre fichier .env.local');
}

console.log('\n📋 Test de l\'authentification...');
const { initializeAuthSystem } = require('../lib/auth.ts');

try {
  initializeAuthSystem();
  console.log('✅ Système d\'authentification initialisé avec succès');
} catch (error) {
  console.log('❌ Erreur lors de l\'initialisation:', error.message);
} 