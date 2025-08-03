#!/bin/bash

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
