# Batobaye Market - Plateforme E-commerce

Une plateforme e-commerce moderne et complète pour Batobaye Market, spécialisée dans la vente d'électroménager au Cameroun.

## 🚀 Fonctionnalités

### Frontend Public
- **Page d'accueil** avec présentation des produits vedettes
- **Catalogue de produits** avec filtres et recherche
- **Pages d'information** (À propos, Contact)
- **Interface responsive** optimisée mobile/desktop
- **SEO optimisé** avec métadonnées structurées

### Interface d'Administration
- **Tableau de bord** avec métriques en temps réel
- **Gestion des produits** (CRUD complet)
- **Gestion des commandes**
- **Analytics** et rapports de vente
- **Assistant IA** intégré pour l'aide
- **Paramètres** du site et configuration

### Technologies Utilisées
- **Next.js 14** avec App Router
- **React 18** avec TypeScript
- **Tailwind CSS** pour le styling
- **Radix UI** pour les composants
- **Framer Motion** pour les animations
- **AI SDK** pour l'assistant IA
- **Clerk** pour l'authentification

## 📋 Prérequis

- Node.js 18+ 
- pnpm (recommandé) ou npm
- Variables d'environnement configurées

## 🛠️ Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd batobaye
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configurer les variables d'environnement**
Créer un fichier `.env.local` avec les variables suivantes :

```env
# Base de données
DATABASE_URL="postgresql://your-database-url-here"

# Configuration du site
NEXT_PUBLIC_WHATSAPP_URL="https://wa.me/237672027744"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Batobaye Market"
NEXT_PUBLIC_SITE_DESCRIPTION="Votre marketplace de confiance au Cameroun"
NEXT_PUBLIC_BUSINESS_PHONE="+237 672 02 77 44"
NEXT_PUBLIC_BUSINESS_ADDRESS="Akwa, Douala, Cameroun"
NEXT_PUBLIC_BUSINESS_HOURS="Lun-Sam: 8h-20h"
NEXT_PUBLIC_BUSINESS_EMAIL="contact@batobaye.com"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key-here"
CLERK_SECRET_KEY="your-clerk-secret-key-here"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/admin/login"

# OpenAI pour l'IA
OPENAI_API_KEY="your-openai-api-key-here"
```

4. **Lancer le serveur de développement**
```bash
pnpm dev
```

5. **Ouvrir dans le navigateur**
- Site public : http://localhost:3000
- Interface admin : http://localhost:3000/admin

## 🏗️ Structure du Projet

```
batobaye/
├── app/                    # Pages Next.js (App Router)
│   ├── admin/             # Interface d'administration
│   ├── about/             # Page À propos
│   ├── contact/           # Page Contact
│   ├── products/          # Page Produits
│   └── layout.tsx         # Layout principal
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   └── admin/            # Composants spécifiques admin
├── actions/              # Actions serveur
│   └── ai.ts            # Actions IA
├── lib/                  # Utilitaires et configurations
├── public/               # Assets statiques
└── styles/               # Styles globaux
```

## 🔧 Configuration

### Base de Données
Le projet est configuré pour utiliser PostgreSQL. Configurez votre `DATABASE_URL` dans les variables d'environnement.

### APIs Externes

- **OpenAI API** : Pour l'assistant IA
- **Clerk** : Pour l'authentification

### Déploiement
Le projet est optimisé pour le déploiement sur Vercel avec toutes les variables d'environnement configurées.

## 📱 Utilisation

### Interface Publique
1. Accédez à http://localhost:3000
2. Parcourez les produits par catégorie
3. Utilisez la barre de recherche pour trouver des produits
4. Contactez via WhatsApp ou formulaire

### Interface d'Administration
1. Accédez à http://localhost:3000/admin
2. Connectez-vous avec vos identifiants Clerk
3. Gérez les produits, commandes et paramètres
4. Utilisez l'assistant IA pour l'aide

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `tailwind.config.ts` :
- `batobaye-primary`: #FF8C00 (Orange)
- `batobaye-light`: #FFA500
- `batobaye-dark`: #1F2937

### Contenu
Modifiez les textes et informations dans les composants correspondants :
- Informations de contact dans `app/layout.tsx`
- Produits dans `app/products/page.tsx`
- Paramètres dans `app/admin/settings/page.tsx`

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement dans Vercel
3. Déployez automatiquement

### Autres Plateformes
Le projet peut être déployé sur n'importe quelle plateforme supportant Next.js.

## 📊 Analytics et SEO

- **Google Analytics** configuré
- **Structured Data** pour le SEO
- **Meta tags** optimisés
- **Sitemap** automatique
- **Robots.txt** configuré

## 🤝 Support

Pour toute question ou support :
- Email : contact@batobaye.com
- WhatsApp : +237 672 02 77 44
- Adresse : Akwa, Douala, Cameroun

## 📄 Licence

© 2024 Batobaye Market. Tous droits réservés.

---

**Développé avec ❤️ pour Batobaye Market**
