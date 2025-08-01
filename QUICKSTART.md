# 🚀 Guide de Démarrage Rapide - Batobaye Market

## Installation Express (5 minutes)

### 1. Prérequis
- Node.js 18+ installé
- pnpm installé (`npm install -g pnpm`)

### 2. Installation
```bash
# Cloner le projet
git clone <repository-url>
cd batobaye

# Installer les dépendances
pnpm install

# Copier la configuration d'exemple
cp env.example .env.local

# Vérifier la configuration
pnpm run check

# Lancer le serveur
pnpm dev
```

### 3. Accès
- **Site public** : http://localhost:3000
- **Interface admin** : http://localhost:3000/admin

## 🔧 Configuration Minimale

Pour un démarrage rapide, configurez au minimum ces variables dans `.env.local` :

```env
# Base de données (optionnel pour le développement)
DATABASE_URL="postgresql://test:test@localhost:5432/batobaye_test"

# APIs (optionnel pour le développement)

OPENAI_API_KEY="your-key"

# Configuration du site
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Batobaye Market"
NEXT_PUBLIC_BUSINESS_PHONE="+237 672 02 77 44"
NEXT_PUBLIC_BUSINESS_EMAIL="contact@batobaye.com"

# Clerk (optionnel pour le développement)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

## 🎯 Fonctionnalités Disponibles

### Sans Configuration
- ✅ Site public complet
- ✅ Interface d'administration
- ✅ Design responsive
- ✅ SEO optimisé
- ✅ Composants UI

### Avec Configuration
- 🔐 Authentification Clerk
- 🤖 Assistant IA
- 📊 Analytics
- 🗄️ Base de données


## 🐛 Dépannage

### Erreur de build
```bash
# Nettoyer le cache
rm -rf .next
pnpm run build
```

### Erreur de dépendances
```bash
# Réinstaller les dépendances
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Port déjà utilisé
```bash
# Utiliser un autre port
pnpm dev --port 3001
```

## 📱 Test Mobile

1. Lancez le serveur : `pnpm dev`
2. Ouvrez http://localhost:3000 sur votre téléphone
3. Ou utilisez les outils de développement du navigateur (F12)

## 🚀 Déploiement Rapide

### Vercel (Recommandé)
1. Connectez votre repo GitHub à Vercel
2. Ajoutez les variables d'environnement dans Vercel
3. Déployez !

### Netlify
1. Connectez votre repo GitHub à Netlify
2. Build command : `pnpm run build`
3. Publish directory : `.next`

## 📞 Support

- **Email** : contact@batobaye.com
- **WhatsApp** : +237 672 02 77 44
- **Documentation** : Voir README.md

---

**Développé avec ❤️ pour Batobaye Market** 