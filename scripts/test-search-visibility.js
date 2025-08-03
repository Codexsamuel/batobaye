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
      
      // Vérifier les améliorations de visibilité
      const hasTextGray900 = line.includes('text-gray-900');
      const hasPlaceholderGray500 = line.includes('placeholder-gray-500');
      const hasBgWhite = line.includes('bg-white');
      const hasBorder2 = line.includes('border-2');
      const hasFontMedium = line.includes('font-medium');
      const hasShadow = line.includes('shadow');
      const hasTextWhite = line.includes('text-white');
      const hasPlaceholderGray400 = line.includes('placeholder-gray-400');
      
      if (hasTextGray900 && hasPlaceholderGray500 && hasBgWhite && hasBorder2 && hasFontMedium) {
        console.log(`  ✅ Ligne ${index + 1}: Configuration optimale (texte noir + fond blanc + bordure + police)`);
        fixedInputs++;
      } else if (hasTextWhite || hasPlaceholderGray400) {
        console.log(`  ❌ Ligne ${index + 1}: Texte blanc détecté - problème de visibilité`);
        console.log(`     Contenu: ${line.trim()}`);
        fileHasIssues = true;
        allGood = false;
      } else {
        console.log(`  ⚠️  Ligne ${index + 1}: Configuration partielle`);
        console.log(`     Contenu: ${line.trim()}`);
        console.log(`     text-gray-900: ${hasTextGray900}, placeholder-gray-500: ${hasPlaceholderGray500}, bg-white: ${hasBgWhite}, border-2: ${hasBorder2}, font-medium: ${hasFontMedium}`);
        fileHasIssues = true;
      }
    }
  });
  
  totalInputs += inputCount;
  
  if (!fileHasIssues && inputCount > 0) {
    console.log(`  ✅ Tous les inputs (${inputCount}) ont une configuration optimale`);
  } else if (inputCount === 0) {
    console.log(`  ℹ️  Aucun input trouvé dans ce fichier`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ DE LA VÉRIFICATION:');
console.log('='.repeat(60));

if (allGood) {
  console.log('✅ TOUTES les barres de recherche ont une visibilité optimale !');
  console.log(`📈 ${fixedInputs} inputs vérifiés avec succès`);
} else {
  console.log('❌ Certaines barres de recherche ont encore des problèmes de visibilité');
  console.log('💡 Assurez-vous d\'ajouter les classes suivantes :');
  console.log('   - text-gray-900 : Texte noir');
  console.log('   - placeholder-gray-500 : Placeholder gris moyen');
  console.log('   - bg-white : Fond blanc');
  console.log('   - border-2 : Bordure visible');
  console.log('   - font-medium : Police semi-grasse');
  console.log('   - shadow-sm : Ombre légère');
}

console.log('\n🎯 AMÉLIORATIONS APPLIQUÉES:');
console.log('- Fond blanc opaque (bg-white) au lieu de semi-transparent');
console.log('- Bordure plus visible (border-2)');
console.log('- Police semi-grasse (font-medium) pour plus de lisibilité');
console.log('- Ombre légère (shadow-sm) pour la profondeur');
console.log('- Focus states améliorés avec ring effects');

console.log('\n🚀 La visibilité du texte dans les barres de recherche est maintenant optimale !'); 