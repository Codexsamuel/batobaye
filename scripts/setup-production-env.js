#!/usr/bin/env node

/**
 * Script de configuration automatique de l'environnement de production
 * Usage: node scripts/setup-production-env.js
 */

const fs = require('fs')
const crypto = require('crypto')

console.log('🔧 Configuration de l\'environnement de production...\n')

// Générer des clés secrètes sécurisées
function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex')
}

// Créer le fichier .env.local
function createEnvLocal() {
  console.log('📝 Création du fichier .env.local...')
  
  const envContent = `# Configuration Next.js
NEXTAUTH_SECRET=${generateSecret(32)}
NEXTAUTH_URL=http://localhost:3000

# Configuration de la base de données (optionnel pour le développement)
# DATABASE_URL=postgresql://user:password@localhost:5432/batobaye

# Configuration CinetPay (optionnel)
# CINETPAY_API_KEY=your-cinetpay-api-key
# CINETPAY_SITE_ID=your-cinetpay-site-id
# CINETPAY_ENVIRONMENT=TEST

# Configuration WhatsApp Business (optionnel)
# WHATSAPP_BUSINESS_TOKEN=your-whatsapp-business-token
# WHATSAPP_BUSINESS_PHONE_NUMBER=your-whatsapp-phone-number

# Configuration GitHub (optionnel)
# GITHUB_TOKEN=your-github-token
# GITHUB_REPO=your-github-repo

# Configuration Vercel (optionnel)
# VERCEL_TOKEN=your-vercel-token
# VERCEL_PROJECT_ID=your-vercel-project-id

# Configuration Sage SAARI (optionnel)
# SAGE_API_KEY=your-sage-api-key
# SAGE_BASE_URL=https://api.sage.com

# Configuration des images
NEXT_PUBLIC_IMAGE_DOMAINS=images.pexels.com,images.unsplash.com,res.cloudinary.com

# Configuration de sécurité
JWT_SECRET=${generateSecret(32)}
BCRYPT_ROUNDS=12

# Configuration de l'application
NEXT_PUBLIC_APP_NAME=Batobaye Market
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=DL Solutions SARL
NEXT_PUBLIC_COMPANY_WEBSITE=https://www.daveandlucesolutions.com

# Configuration du mode de développement
NODE_ENV=development
`

  try {
    fs.writeFileSync('.env.local', envContent)
    console.log('✅ Fichier .env.local créé avec succès')
    return true
  } catch (error) {
    console.log('❌ Erreur lors de la création du fichier .env.local:', error.message)
    return false
  }
}

// Vérifier que les dépendances sont installées
function checkDependencies() {
  console.log('\n📦 Vérification des dépendances...')
  
  if (!fs.existsSync('package.json')) {
    console.log('❌ package.json manquant')
    return false
  }
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const requiredDeps = ['bcryptjs', 'jsonwebtoken']
  
  let missingDeps = []
  
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
      missingDeps.push(dep)
    }
  })
  
  if (missingDeps.length === 0) {
    console.log('✅ Toutes les dépendances sont installées')
    return true
  } else {
    console.log('⚠️  Dépendances manquantes:', missingDeps.join(', '))
    console.log('Exécutez: pnpm add ' + missingDeps.join(' '))
    return false
  }
}

// Vérifier la configuration Next.js
function checkNextConfig() {
  console.log('\n⚙️  Vérification de la configuration Next.js...')
  
  if (!fs.existsSync('next.config.mjs')) {
    console.log('❌ next.config.mjs manquant')
    return false
  }
  
  const configContent = fs.readFileSync('next.config.mjs', 'utf8')
  
  if (configContent.includes('output: \'standalone\'')) {
    console.log('✅ Configuration Next.js correcte pour la production')
    return true
  } else {
    console.log('⚠️  Configuration Next.js non optimisée pour la production')
    return false
  }
}

// Créer un script de démarrage de production
function createStartScript() {
  console.log('\n🚀 Création du script de démarrage de production...')
  
  const startScript = `#!/bin/bash

echo "🚀 Démarrage de Batobaye Market en mode production..."

# Vérifier que .env.local existe
if [ ! -f .env.local ]; then
    echo "❌ Fichier .env.local manquant"
    echo "Exécutez: node scripts/setup-production-env.js"
    exit 1
fi

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf .next

# Construire l'application
echo "🔨 Construction de l'application..."
pnpm build

# Démarrer le serveur de production
echo "🌐 Démarrage du serveur de production..."
pnpm start
`

  try {
    fs.writeFileSync('start-production.sh', startScript)
    fs.chmodSync('start-production.sh', '755')
    console.log('✅ Script start-production.sh créé')
    return true
  } catch (error) {
    console.log('❌ Erreur lors de la création du script:', error.message)
    return false
  }
}

// Créer un fichier de documentation pour la production
function createProductionDocs() {
  console.log('\n📚 Création de la documentation de production...')
  
  const docsContent = `# 🚀 Guide de Déploiement en Production - Batobaye Market

## Prérequis

- Node.js 18+ installé
- pnpm installé
- Variables d'environnement configurées

## Configuration

1. **Variables d'environnement**
   \`\`\`bash
   cp env.example .env.local
   # Éditez .env.local avec vos vraies valeurs
   \`\`\`

2. **Dépendances**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Configuration automatique**
   \`\`\`bash
   node scripts/setup-production-env.js
   \`\`\`

## Déploiement

### Méthode 1: Script automatique
\`\`\`bash
./start-production.sh
\`\`\`

### Méthode 2: Manuel
\`\`\`bash
# Nettoyer le cache
rm -rf .next

# Construire l'application
pnpm build

# Démarrer le serveur
pnpm start
\`\`\`

## Vérification

1. **Test de l'environnement**
   \`\`\`bash
   node scripts/check-admin-env.js
   \`\`\`

2. **Test complet**
   \`\`\`bash
   node scripts/test-production.js
   \`\`\`

## Accès

- **Application**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- **Login**: http://localhost:3000/admin/login

## Sécurité

- Changez les clés secrètes dans .env.local
- Utilisez HTTPS en production
- Configurez un firewall
- Surveillez les logs

## Support

Pour toute question, contactez DL Solutions SARL
- Email: contact@daveandlucesolutions.com
- Site: https://www.daveandlucesolutions.com
`

  try {
    fs.writeFileSync('PRODUCTION_GUIDE.md', docsContent)
    console.log('✅ Documentation PRODUCTION_GUIDE.md créée')
    return true
  } catch (error) {
    console.log('❌ Erreur lors de la création de la documentation:', error.message)
    return false
  }
}

// Exécution de la configuration
console.log('🔧 Configuration de l\'environnement de production...\n')

const steps = [
  { name: 'Variables d\'environnement', fn: createEnvLocal },
  { name: 'Dépendances', fn: checkDependencies },
  { name: 'Configuration Next.js', fn: checkNextConfig },
  { name: 'Script de démarrage', fn: createStartScript },
  { name: 'Documentation', fn: createProductionDocs }
]

let passedSteps = 0

steps.forEach(step => {
  if (step.fn()) {
    passedSteps++
  }
})

console.log(`\n📊 Résultats: ${passedSteps}/${steps.length} étapes réussies`)

if (passedSteps === steps.length) {
  console.log('\n🎉 Configuration de production terminée avec succès !')
  console.log('\n📋 Prochaines étapes:')
  console.log('   1. Éditez .env.local avec vos vraies valeurs')
  console.log('   2. Exécutez: ./start-production.sh')
  console.log('   3. Testez l\'accès admin sur http://localhost:3000/admin')
  console.log('   4. Consultez PRODUCTION_GUIDE.md pour plus d\'informations')
} else {
  console.log('\n⚠️  Certaines étapes ont échoué. Vérifiez les erreurs ci-dessus.')
  process.exit(1)
} 