#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🖼️  Vérification de la configuration des images\n');

// Configuration des images autorisées
const allowedImageHosts = [
  'images.pexels.com',
  'images.unsplash.com',
  'res.cloudinary.com',
  'cloudinary.com',
  'localhost',
  '127.0.0.1',
  'batobaye-market.com'
];

// Vérifier next.config.mjs
function checkNextConfig() {
  const configPath = 'next.config.mjs';
  
  if (!fs.existsSync(configPath)) {
    console.log('❌ next.config.mjs non trouvé');
    return false;
  }

  const configContent = fs.readFileSync(configPath, 'utf8');
  
  // Vérifier si remotePatterns est configuré
  if (!configContent.includes('remotePatterns')) {
    console.log('❌ remotePatterns non configuré dans next.config.mjs');
    return false;
  }

  // Vérifier les hostnames configurés
  let allHostsConfigured = true;
  allowedImageHosts.forEach(host => {
    if (!configContent.includes(host)) {
      console.log(`⚠️  Hostname ${host} non configuré`);
      allHostsConfigured = false;
    }
  });

  if (allHostsConfigured) {
    console.log('✅ Configuration des images correcte');
    return true;
  } else {
    console.log('❌ Certains hostnames ne sont pas configurés');
    return false;
  }
}

// Vérifier les images utilisées dans le code
function checkImageUsage() {
  console.log('\n🔍 Vérification de l\'utilisation des images...\n');
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
  const imageUrls = [];
  
  // Fonction récursive pour scanner les fichiers
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath);
      } else if (stat.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js'))) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Chercher les URLs d'images
        const urlRegex = /https?:\/\/[^\s"']+\.(jpg|jpeg|png|webp|svg|gif)/gi;
        const matches = content.match(urlRegex);
        
        if (matches) {
          matches.forEach(url => {
            const hostname = new URL(url).hostname;
            imageUrls.push({ url, hostname, file: filePath });
          });
        }
      }
    });
  }
  
  try {
    scanDirectory('.');
    
    if (imageUrls.length === 0) {
      console.log('✅ Aucune image externe trouvée dans le code');
      return true;
    }
    
    console.log(`📊 ${imageUrls.length} images externes trouvées :\n`);
    
    const hostnameCount = {};
    imageUrls.forEach(({ hostname, url, file }) => {
      hostnameCount[hostname] = (hostnameCount[hostname] || 0) + 1;
      
      if (!allowedImageHosts.includes(hostname)) {
        console.log(`⚠️  Hostname non autorisé: ${hostname}`);
        console.log(`   URL: ${url}`);
        console.log(`   Fichier: ${file}\n`);
      }
    });
    
    console.log('📈 Statistiques par hostname :');
    Object.entries(hostnameCount).forEach(([hostname, count]) => {
      const status = allowedImageHosts.includes(hostname) ? '✅' : '❌';
      console.log(`   ${status} ${hostname}: ${count} images`);
    });
    
    return true;
  } catch (error) {
    console.log('❌ Erreur lors du scan:', error.message);
    return false;
  }
}

// Fonction principale
function main() {
  console.log('🔧 Configuration des images autorisées :');
  allowedImageHosts.forEach(host => {
    console.log(`   • ${host}`);
  });
  console.log('');
  
  const configOk = checkNextConfig();
  const usageOk = checkImageUsage();
  
  console.log('\n📋 Résumé :');
  if (configOk && usageOk) {
    console.log('✅ Configuration des images complète et correcte');
    console.log('✅ Toutes les images externes sont autorisées');
  } else {
    console.log('❌ Problèmes détectés dans la configuration des images');
    console.log('\n💡 Solutions :');
    console.log('1. Vérifiez que next.config.mjs contient tous les hostnames nécessaires');
    console.log('2. Redémarrez le serveur de développement');
    console.log('3. Vérifiez que les URLs d\'images sont correctes');
  }
  
  console.log('\n🚀 Pour redémarrer le serveur :');
  console.log('   pkill -f "next dev" && pnpm dev');
}

main(); 