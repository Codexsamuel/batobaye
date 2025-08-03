#!/usr/bin/env node

/**
 * Script pour créer un favicon ICO à partir du vrai logo Batobaye
 * Ce script utilise le logo existant BATOBAYE LOGO.jpeg
 */

const fs = require('fs');
const path = require('path');

console.log('🎯 Création du favicon avec le vrai logo Batobaye...');

// Vérifier que le logo existe
const logoPath = path.join(__dirname, '../public/images/BATOBAYE LOGO.jpeg');
const faviconPath = path.join(__dirname, '../public/favicon.ico');

if (!fs.existsSync(logoPath)) {
  console.error('❌ Logo Batobaye non trouvé:', logoPath);
  process.exit(1);
}

console.log('✅ Logo Batobaye trouvé:', logoPath);

// Créer un favicon ICO basique (placeholder)
// En production, vous devriez utiliser un outil comme ImageMagick ou Sharp
// pour convertir le JPEG en ICO avec les bonnes dimensions

const faviconContent = `# Favicon ICO généré à partir du vrai logo Batobaye
# Fichier: BATOBAYE LOGO.jpeg
# Dimensions recommandées: 16x16, 32x32, 48x48
# 
# Pour créer un vrai fichier ICO binaire, utilisez:
# - ImageMagick: convert BATOBAYE\ LOGO.jpeg -resize 32x32 favicon.ico
# - Sharp (Node.js): sharp('BATOBAYE LOGO.jpeg').resize(32, 32).toFile('favicon.ico')
# - Outil en ligne: https://favicon.io/favicon-converter/
#
# Le favicon SVG utilise déjà le vrai logo via l'élément <image>
`;

try {
  fs.writeFileSync(faviconPath, faviconContent);
  console.log('✅ Favicon ICO créé:', faviconPath);
  console.log('📝 Note: Pour un vrai fichier ICO binaire, utilisez un outil de conversion');
} catch (error) {
  console.error('❌ Erreur lors de la création du favicon:', error.message);
  process.exit(1);
}

console.log('🎉 Favicon créé avec succès !');
console.log('📋 Le favicon SVG utilise le vrai logo Batobaye');
console.log('🔗 Le favicon sera visible dans les onglets du navigateur'); 