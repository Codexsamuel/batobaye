# 📝 Changelog - Batobaye Market

## [1.1.0] - 2025-01-XX

### 🗑️ Supprimé
- **API Pexels** : Suppression complète de l'intégration Pexels
  - Supprimé `app/api/pexels/route.ts`
  - Retiré les configurations d'images externes (Unsplash, Pexels)
  - Nettoyé les variables d'environnement PEXELS_API_KEY
  - Mis à jour la documentation

### 🔧 Corrigé
- **Erreurs d'hydratation React** : Résolues en modifiant le style inline dans `app/layout.tsx`
- **Erreurs d'images externes** : Suppression des hostnames non configurés dans `next.config.mjs`
- **Erreurs de cache webpack** : Nettoyage du cache `.next` pour résoudre les problèmes de modules

### ✅ Amélioré
- **Configuration Next.js** : Optimisée pour éviter les erreurs d'images externes
- **Scripts de vérification** : Mis à jour pour refléter les changements
- **Documentation** : Nettoyée des références à Pexels

### 📚 Documentation
- Ajouté `TROUBLESHOOTING.md` : Guide de résolution des problèmes
- Mis à jour `README.md` : Suppression des références Pexels
- Mis à jour `QUICKSTART.md` : Configuration simplifiée
- Mis à jour `env.example` : Variables d'environnement nettoyées

## [1.0.0] - 2025-01-XX

### 🎉 Première version
- **Interface publique** : Page d'accueil, produits, à propos, contact
- **Interface d'administration** : Tableau de bord, gestion des produits, analytics
- **Assistant IA** : Intégration OpenAI pour l'aide utilisateur
- **Design responsive** : Optimisé mobile/desktop
- **SEO optimisé** : Métadonnées et sitemap
- **Authentification** : Intégration Clerk
- **Base de données** : Configuration PostgreSQL 