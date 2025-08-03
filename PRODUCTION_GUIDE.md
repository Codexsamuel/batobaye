# 🚀 Guide de Déploiement en Production - Batobaye Market

## Prérequis

- Node.js 18+ installé
- pnpm installé
- Variables d'environnement configurées

## Configuration

1. **Variables d'environnement**
   ```bash
   cp env.example .env.local
   # Éditez .env.local avec vos vraies valeurs
   ```

2. **Dépendances**
   ```bash
   pnpm install
   ```

3. **Configuration automatique**
   ```bash
   node scripts/setup-production-env.js
   ```

## Déploiement

### Méthode 1: Script automatique
```bash
./start-production.sh
```

### Méthode 2: Manuel
```bash
# Nettoyer le cache
rm -rf .next

# Construire l'application
pnpm build

# Démarrer le serveur
pnpm start
```

## Vérification

1. **Test de l'environnement**
   ```bash
   node scripts/check-admin-env.js
   ```

2. **Test complet**
   ```bash
   node scripts/test-production.js
   ```

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
