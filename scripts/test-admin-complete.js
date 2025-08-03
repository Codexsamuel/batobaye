#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Test complet de l\'interface d\'administration\n');

// Configuration
const baseUrl = 'http://localhost:3000';
const adminRoutes = [
  '/admin',
  '/admin/login',
  '/admin/register',
  '/admin/products',
  '/admin/products/new',
  '/admin/orders',
  '/admin/users',
  '/admin/analytics',
  '/admin/settings',
  '/admin/content',
  '/admin/media',
  '/admin/seo',
  '/admin/payments',
  '/admin/deploy',
  '/admin/code',
  '/admin/design',
  '/admin/github',
  '/admin/ia',
  '/admin/whatsapp-images'
];

// Fichiers à vérifier
const adminFiles = [
  'app/admin/layout.tsx',
  'app/admin/page.tsx',
  'app/admin/login/page.tsx',
  'app/admin/register/page.tsx',
  'app/admin/products/page.tsx',
  'app/admin/products/new/page.tsx',
  'app/admin/orders/page.tsx',
  'app/admin/users/page.tsx',
  'app/admin/analytics/page.tsx',
  'app/admin/settings/page.tsx',
  'app/admin/content/page.tsx',
  'app/admin/media/page.tsx',
  'app/admin/seo/page.tsx',
  'app/admin/payments/page.tsx',
  'app/admin/deploy/page.tsx',
  'app/admin/code/page.tsx',
  'app/admin/design/page.tsx',
  'app/admin/github/page.tsx',
  'app/admin/ia/page.tsx',
  'app/admin/whatsapp-images/page.tsx'
];

const adminComponents = [
  'components/admin/Sidebar.tsx',
  'components/admin/Topbar.tsx',
  'components/admin/ProductForm.tsx',
  'components/admin/ImageUpload.tsx',
  'components/admin/CommercialDashboard.tsx',
  'components/admin/AIAssistant.tsx',
  'components/admin/AssistantIA.tsx',
  'components/admin/CodeEditor.tsx',
  'components/admin/GitHubFileManager.tsx'
];

const apiRoutes = [
  'app/api/products/route.ts',
  'app/api/products/[id]/route.ts',
  'app/api/orders/route.ts',
  'app/api/sales/route.ts',
  'app/api/reports/route.ts',
  'app/api/suppliers/route.ts',
  'app/api/categories/route.ts',
  'app/api/payment/route.ts',
  'app/api/cinetpay/route.ts',
  'app/api/cinetpay/notify/route.ts',
  'app/api/github/route.ts',
  'app/api/vercel/deploy/route.ts',
  'app/api/whatsapp/webhook/route.ts'
];

console.log('📁 VÉRIFICATION DES FICHIERS ADMIN\n');

let allFilesExist = true;
let totalFiles = 0;
let existingFiles = 0;

// Vérifier les pages admin
console.log('🔍 Pages d\'administration:');
adminFiles.forEach(filePath => {
  totalFiles++;
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${filePath}`);
    existingFiles++;
  } else {
    console.log(`  ❌ ${filePath} - MANQUANT`);
    allFilesExist = false;
  }
});

console.log('\n🔍 Composants d\'administration:');
adminComponents.forEach(filePath => {
  totalFiles++;
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${filePath}`);
    existingFiles++;
  } else {
    console.log(`  ❌ ${filePath} - MANQUANT`);
    allFilesExist = false;
  }
});

console.log('\n🔍 Routes API:');
apiRoutes.forEach(filePath => {
  totalFiles++;
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${filePath}`);
    existingFiles++;
  } else {
    console.log(`  ❌ ${filePath} - MANQUANT`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ DES FICHIERS:');
console.log('='.repeat(60));
console.log(`📁 Total des fichiers: ${totalFiles}`);
console.log(`✅ Fichiers existants: ${existingFiles}`);
console.log(`❌ Fichiers manquants: ${totalFiles - existingFiles}`);
console.log(`📈 Taux de complétude: ${Math.round((existingFiles / totalFiles) * 100)}%`);

if (allFilesExist) {
  console.log('\n🎉 TOUS les fichiers d\'administration sont présents !');
} else {
  console.log('\n⚠️  Certains fichiers d\'administration sont manquants.');
}

console.log('\n🔧 VÉRIFICATION DES FONCTIONNALITÉS\n');

// Vérifier l'authentification
console.log('🔐 Système d\'authentification:');
const authFile = 'lib/auth.ts';
if (fs.existsSync(authFile)) {
  const authContent = fs.readFileSync(authFile, 'utf8');
  const hasSuperAdmin = authContent.includes('SUPER_ADMIN_EMAIL') && authContent.includes('SUPER_ADMIN_PASSWORD');
  const hasLoginFunction = authContent.includes('login') || authContent.includes('authenticate');
  
  console.log(`  ✅ ${authFile} - Présent`);
  console.log(`  ${hasSuperAdmin ? '✅' : '❌'} Variables Super Admin configurées`);
  console.log(`  ${hasLoginFunction ? '✅' : '❌'} Fonction d'authentification`);
} else {
  console.log(`  ❌ ${authFile} - MANQUANT`);
}

// Vérifier la base de données
console.log('\n🗄️ Base de données:');
const dbFiles = ['lib/db-simple.ts', 'lib/db-commercial.ts'];
dbFiles.forEach(dbFile => {
  if (fs.existsSync(dbFile)) {
    const dbContent = fs.readFileSync(dbFile, 'utf8');
    const hasProducts = dbContent.includes('products') || dbContent.includes('Product');
    const hasOrders = dbContent.includes('orders') || dbContent.includes('Order');
    const hasUsers = dbContent.includes('users') || dbContent.includes('User');
    
    console.log(`  ✅ ${dbFile} - Présent`);
    console.log(`    ${hasProducts ? '✅' : '❌'} Gestion des produits`);
    console.log(`    ${hasOrders ? '✅' : '❌'} Gestion des commandes`);
    console.log(`    ${hasUsers ? '✅' : '❌'} Gestion des utilisateurs`);
  } else {
    console.log(`  ❌ ${dbFile} - MANQUANT`);
  }
});

// Vérifier les composants UI
console.log('\n🎨 Composants UI:');
const uiComponents = [
  'components/ui/button.tsx',
  'components/ui/input.tsx',
  'components/ui/card.tsx',
  'components/ui/dialog.tsx',
  'components/ui/toast.tsx',
  'components/ui/toaster.tsx',
  'components/ui/table.tsx',
  'components/ui/form.tsx',
  'components/ui/select.tsx',
  'components/ui/tabs.tsx'
];

uiComponents.forEach(uiFile => {
  if (fs.existsSync(uiFile)) {
    console.log(`  ✅ ${uiFile}`);
  } else {
    console.log(`  ❌ ${uiFile} - MANQUANT`);
  }
});

// Vérifier les hooks
console.log('\n🎣 Hooks personnalisés:');
const hooks = [
  'hooks/useAuth.tsx',
  'hooks/use-toast.ts'
];

hooks.forEach(hookFile => {
  if (fs.existsSync(hookFile)) {
    console.log(`  ✅ ${hookFile}`);
  } else {
    console.log(`  ❌ ${hookFile} - MANQUANT`);
  }
});

// Vérifier les utilitaires
console.log('\n🛠️ Utilitaires:');
const utils = [
  'lib/utils.ts',
  'lib/cart.ts',
  'lib/cinetpay.ts',
  'lib/whatsapp-business.ts'
];

utils.forEach(utilFile => {
  if (fs.existsSync(utilFile)) {
    console.log(`  ✅ ${utilFile}`);
  } else {
    console.log(`  ❌ ${utilFile} - MANQUANT`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('🎯 POINTS DE VÉRIFICATION MANUELS:');
console.log('='.repeat(60));
console.log('1. 🔐 Connexion admin: http://localhost:3000/admin/login');
console.log('2. 📝 Inscription admin: http://localhost:3000/admin/register');
console.log('3. 🏠 Dashboard principal: http://localhost:3000/admin');
console.log('4. 📦 Gestion produits: http://localhost:3000/admin/products');
console.log('5. ➕ Ajout produit: http://localhost:3000/admin/products/new');
console.log('6. 📋 Gestion commandes: http://localhost:3000/admin/orders');
console.log('7. 👥 Gestion utilisateurs: http://localhost:3000/admin/users');
console.log('8. 📊 Analytics: http://localhost:3000/admin/analytics');
console.log('9. ⚙️ Paramètres: http://localhost:3000/admin/settings');
console.log('10. 🎨 Design: http://localhost:3000/admin/design');
console.log('11. 🤖 IA Assistant: http://localhost:3000/admin/ia');
console.log('12. 💻 Code Editor: http://localhost:3000/admin/code');
console.log('13. 🚀 Déploiement: http://localhost:3000/admin/deploy');
console.log('14. 📱 WhatsApp: http://localhost:3000/admin/whatsapp-images');

console.log('\n🔍 TESTS À EFFECTUER:');
console.log('- ✅ Authentification Super Admin');
console.log('- ✅ Navigation entre les sections');
console.log('- ✅ Ajout/Modification/Suppression de produits');
console.log('- ✅ Gestion des commandes');
console.log('- ✅ Gestion des utilisateurs');
console.log('- ✅ Système de toast fonctionnel');
console.log('- ✅ Upload d\'images');
console.log('- ✅ Recherche et filtres');
console.log('- ✅ Responsive design');
console.log('- ✅ Gestion des erreurs');

console.log('\n🚀 L\'interface d\'administration est prête pour les tests !'); 