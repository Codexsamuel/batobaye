# 🏪 Batobaye Market - Plateforme E-commerce Complète

Une plateforme e-commerce moderne et complète construite avec Next.js 14, TypeScript, et Tailwind CSS.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm
- Git

### Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd batobaye-1
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Configuration de l'environnement**
```bash
cp env.example .env.local
# Éditer .env.local avec vos configurations
```

4. **Vérification rapide**
```bash
pnpm quick-check
```

5. **Démarrer le serveur de développement**
```bash
pnpm dev
```

6. **Ouvrir dans le navigateur**
- Site principal : http://localhost:3000
- Interface admin : http://localhost:3000/admin

## 🔐 Accès Administrateur

**Identifiants par défaut :**
- Email : `sobam@daveandlucesolutions.com`
- Mot de passe : `@DavyFrantz2025`

## 📁 Structure du Projet

```
batobaye-1/
├── app/                    # Pages et API routes (App Router)
│   ├── admin/             # Interface d'administration
│   ├── api/               # API routes
│   ├── products/          # Pages produits
│   └── ...
├── components/            # Composants React réutilisables
│   ├── admin/            # Composants admin
│   ├── ui/               # Composants UI de base
│   └── ...
├── lib/                  # Utilitaires et configurations
├── public/               # Assets statiques
├── scripts/              # Scripts utilitaires
└── styles/               # Styles globaux
```

## 🛠️ Scripts Disponibles

```bash
# Développement
pnpm dev              # Serveur de développement
pnpm build            # Build de production
pnpm start            # Serveur de production

# Vérifications
pnpm quick-check      # Vérification rapide du projet
pnpm type-check       # Vérification TypeScript
pnpm lint             # Linting ESLint

# Maintenance
pnpm clean            # Nettoyer le cache
pnpm reset            # Reset complet du projet
```

## 🎯 Fonctionnalités Principales

### 🛍️ E-commerce
- Catalogue de produits avec filtres
- Panier d'achat
- Système de commandes
- Paiements CinetPay
- Intégration WhatsApp Business

### 👨‍💼 Administration
- Dashboard complet
- Gestion des produits
- Gestion des utilisateurs
- Analytics et rapports
- Gestion des commandes
- Interface IA intégrée

### 🔧 Technique
- Next.js 14 avec App Router
- TypeScript
- Tailwind CSS
- Base de données en mémoire
- Authentification sécurisée
- SEO optimisé

## 🌐 Déploiement

### Vercel (Recommandé)
1. Connecter votre repo GitHub à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres plateformes
Le projet est compatible avec toutes les plateformes supportant Next.js.

## 🔧 Configuration

### Variables d'environnement requises
```env
# Base de données
DATABASE_URL="postgresql://..."

# Super Admin
SUPER_ADMIN_EMAIL="admin@example.com"
SUPER_ADMIN_PASSWORD="secure-password"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Sécurité
SESSION_SECRET="your-session-secret"
JWT_SECRET="your-jwt-secret"

# CinetPay (optionnel)
CINETPAY_SITE_ID="your-site-id"
CINETPAY_API_KEY="your-api-key"
CINETPAY_SECRET_KEY="your-secret-key"
```

## 📚 Documentation

- [Guide Complet](GUIDE_COMPLET.md)
- [Guide Déploiement](GUIDE_DEPLOIEMENT.md)
- [Guide Authentification](GUIDE_AUTHENTIFICATION.md)
- [Guide CinetPay](GUIDE_CINETPAY_INTEGRATION.md)
- [Guide WhatsApp](GUIDE_WHATSAPP_BUSINESS_INTEGRATION.md)

## 🐛 Dépannage

### Problèmes courants

1. **Port 3000 occupé**
   - Le serveur utilise automatiquement le port suivant disponible
   - Vérifiez les ports avec `pnpm quick-check`

2. **Erreurs de build**
   - Nettoyez le cache : `pnpm clean`
   - Réinstallez les dépendances : `pnpm reset`

3. **Problèmes d'authentification**
   - Vérifiez les variables d'environnement
   - Utilisez les identifiants par défaut

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Email : sobam@daveandlucesolutions.com
- Téléphone : +237 672 02 77 44

---

**Développé avec ❤️ par l'équipe Batobaye**
