#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction des erreurs de linter...\n');

// Fonction pour corriger les erreurs de Button et Badge
function fixLinterErrors(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Supprimer variant et size des Button
  content = content.replace(
    /<Button\s+([^>]*?)variant="[^"]*"\s+([^>]*?)size="[^"]*"\s+([^>]*?)>/g,
    '<Button $1$2$3>'
  );
  content = content.replace(
    /<Button\s+([^>]*?)size="[^"]*"\s+([^>]*?)variant="[^"]*"\s+([^>]*?)>/g,
    '<Button $1$2$3>'
  );
  content = content.replace(
    /<Button\s+([^>]*?)variant="[^"]*"\s+([^>]*?)>/g,
    '<Button $1$2>'
  );
  content = content.replace(
    /<Button\s+([^>]*?)size="[^"]*"\s+([^>]*?)>/g,
    '<Button $1$2>'
  );
  
  // Supprimer variant des Badge
  content = content.replace(
    /<Badge\s+([^>]*?)variant="[^"]*"\s+([^>]*?)>/g,
    '<Badge $1$2>'
  );
  
  // Supprimer variant et size des autres composants
  content = content.replace(
    /<([A-Z][a-zA-Z]*)\s+([^>]*?)variant="[^"]*"\s+([^>]*?)size="[^"]*"\s+([^>]*?)>/g,
    '<$1 $2$3$4>'
  );
  content = content.replace(
    /<([A-Z][a-zA-Z]*)\s+([^>]*?)size="[^"]*"\s+([^>]*?)variant="[^"]*"\s+([^>]*?)>/g,
    '<$1 $2$3$4>'
  );
  
  if (content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Corrigé: ${filePath}`);
    modified = true;
  }
  
  return modified;
}

// Corriger les fichiers principaux
const filesToFix = [
  'app/page.tsx',
  'app/contact/page.tsx',
  'app/admin/users/page.tsx',
  'components/ContactInfo.tsx',
  'components/ProductActionButtons.tsx',
  'components/WhatsAppBuyModal.tsx'
];

let totalFixed = 0;
filesToFix.forEach(file => {
  if (fixLinterErrors(file)) {
    totalFixed++;
  }
});

// Corriger tous les fichiers dans app et components
function fixAllFiles(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      fixAllFiles(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      if (fixLinterErrors(fullPath)) {
        totalFixed++;
      }
    }
  });
}

fixAllFiles('app');
fixAllFiles('components');

console.log(`\n🎉 Correction terminée ! ${totalFixed} fichiers corrigés.`);
console.log('\n📋 Prochaines étapes:');
console.log('1. Redémarrer le serveur de développement');
console.log('2. Vérifier que les erreurs de linter ont disparu');
console.log('3. Tester le fonctionnement de l\'application'); 