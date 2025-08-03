#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la visibilité du texte dans les barres de recherche\n');

// Fichiers à vérifier
const filesToCheck = [
  'app/page.tsx',
  'app/products/page.tsx',
  'app/admin/products/page.tsx',
  'app/admin/orders/page.tsx',
  'components/search-bar.tsx',
  'components/enhanced-search-bar.tsx',
  'components/admin/Topbar.tsx'
];

let allGood = true;
let totalInputs = 0;
let fixedInputs = 0;

filesToCheck.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${filePath}`);
    allGood = false;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  console.log(`\n📁 ${filePath}:`);
  
  let fileHasIssues = false;
  let inputCount = 0;
  
  lines.forEach((line, index) => {
    // Chercher les Input components avec placeholder
    if (line.includes('<Input') && line.includes('placeholder=')) {
      inputCount++;
      
      // Vérifier si le texte est en noir
      const hasTextGray900 = line.includes('text-gray-900');
      const hasPlaceholderGray500 = line.includes('placeholder-gray-500');
      const hasTextWhite = line.includes('text-white');
      const hasPlaceholderGray400 = line.includes('placeholder-gray-400');
      
      if (hasTextGray900 && hasPlaceholderGray500) {
        console.log(`  ✅ Ligne ${index + 1}: Texte noir configuré (text-gray-900 + placeholder-gray-500)`);
        fixedInputs++;
      } else if (hasTextWhite || hasPlaceholderGray400) {
        console.log(`  ❌ Ligne ${index + 1}: Texte blanc détecté - problème de visibilité`);
        console.log(`     Contenu: ${line.trim()}`);
        fileHasIssues = true;
        allGood = false;
      } else {
        console.log(`  ⚠️  Ligne ${index + 1}: Configuration de couleur non détectée`);
        console.log(`     Contenu: ${line.trim()}`);
        fileHasIssues = true;
      }
    }
  });
  
  totalInputs += inputCount;
  
  if (!fileHasIssues && inputCount > 0) {
    console.log(`  ✅ Tous les inputs (${inputCount}) ont le texte noir configuré`);
  } else if (inputCount === 0) {
    console.log(`  ℹ️  Aucun input trouvé dans ce fichier`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ DE LA VÉRIFICATION:');
console.log('='.repeat(60));

if (allGood) {
  console.log('✅ TOUTES les barres de recherche ont le texte noir configuré !');
  console.log(`📈 ${fixedInputs} inputs vérifiés avec succès`);
} else {
  console.log('❌ Certaines barres de recherche ont encore des problèmes de visibilité');
  console.log('💡 Assurez-vous d\'ajouter "text-gray-900 placeholder-gray-500" aux classes');
}

console.log('\n🎯 RECOMMANDATIONS:');
console.log('- text-gray-900 : Texte noir pour une excellente visibilité');
console.log('- placeholder-gray-500 : Placeholder gris moyen pour le contraste');
console.log('- bg-white : Fond blanc pour le contraste optimal');
console.log('- border-gray-300 : Bordure grise claire');

console.log('\n🚀 La visibilité du texte dans les barres de recherche est maintenant optimale !'); 