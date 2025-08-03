# 🔐 Guide d'Authentification Admin - Batobaye Market

## 🚨 Problème : "Email ou mot de passe incorrect"

### **Solution Rapide**

1. **Configurer les identifiants Super Admin :**
```bash
pnpm setup-admin
```

2. **Redémarrer le serveur :**
```bash
pkill -f "next dev" && rm -rf .next && pnpm dev
```

3. **Tester l'authentification :**
```bash
pnpm test-auth-login
```

4. **Se connecter :**
   - Allez sur : http://localhost:3000/admin/login
   - Email : `sobam@daveandlucesolutions.com`
   - Mot de passe : `@DavyFrantz2025`

## 🔑 Identifiants Super Admin

### **Identifiants par défaut :**
- **Email :** `sobam@daveandlucesolutions.com`
- **Mot de passe :** `@DavyFrantz2025`

### **Changer les identifiants :**

1. **Modifier le fichier `.env.local` :**
```bash
# Ouvrir le fichier
nano .env.local

# Modifier ces lignes
SUPER_ADMIN_EMAIL=votre-nouveau-email@example.com
SUPER_ADMIN_PASSWORD=votre-nouveau-mot-de-passe
```

2. **Redémarrer le serveur :**
```bash
pkill -f "next dev" && pnpm dev
```

## 🛠️ Scripts Utiles

### **Configuration automatique :**
```bash
# Configurer les identifiants Super Admin
pnpm setup-admin
```

### **Test d'authentification :**
```bash
# Tester la connexion
pnpm test-auth-login
```

### **Vérification complète :**
```bash
# Vérifier tout le système
pnpm test-auth
```

## 📋 Checklist de Résolution

### **Quand l'authentification échoue :**

1. ✅ **Vérifier le fichier `.env.local`**
   ```bash
   ls -la .env.local
   ```

2. ✅ **Vérifier les identifiants configurés**
   ```bash
   pnpm test-auth-login
   ```

3. ✅ **Redémarrer le serveur proprement**
   ```bash
   pkill -f "next dev" && rm -rf .next && pnpm dev
   ```

4. ✅ **Tester la connexion**
   - Aller sur http://localhost:3000/admin/login
   - Utiliser les identifiants corrects

### **Si le problème persiste :**

1. ✅ **Recréer le fichier `.env.local`**
   ```bash
   rm .env.local
   pnpm setup-admin
   ```

2. ✅ **Vérifier les permissions**
   ```bash
   chmod 600 .env.local
   ```

3. ✅ **Nettoyer le cache**
   ```bash
   rm -rf .next node_modules/.cache
   pnpm install
   ```

## 🔍 Dépannage Avancé

### **Problème : Variables d'environnement non chargées**

**Symptômes :**
- Message "Variables d'environnement Super Admin non configurées"
- Authentification échoue même avec les bons identifiants

**Solution :**
```bash
# Vérifier que le fichier existe
ls -la .env.local

# Recréer le fichier
pnpm setup-admin

# Redémarrer le serveur
pkill -f "next dev" && pnpm dev
```

### **Problème : Cache Next.js corrompu**

**Symptômes :**
- Erreurs de compilation
- Variables d'environnement non prises en compte

**Solution :**
```bash
# Nettoyer complètement
rm -rf .next
rm -rf node_modules/.cache
pnpm install
pnpm dev
```

### **Problème : Port déjà utilisé**

**Symptômes :**
- Serveur ne démarre pas
- Erreur "Port 3000 is in use"

**Solution :**
```bash
# Tuer tous les processus Next.js
pkill -f "next dev"

# Vérifier les ports utilisés
lsof -i :3000

# Redémarrer
pnpm dev
```

## 🎯 Exemples de Configuration

### **Fichier `.env.local` complet :**
```bash
# Configuration Super Admin Batobaye Market
SUPER_ADMIN_EMAIL=sobam@daveandlucesolutions.com
SUPER_ADMIN_PASSWORD=@DavyFrantz2025

# Configuration de base
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Batobaye Market
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Configuration des images
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dko5sommz
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=batobaye_uploads

# Configuration WhatsApp Business
WHATSAPP_BUSINESS_PHONE_NUMBER=+237612345678
WHATSAPP_BUSINESS_TOKEN=your_whatsapp_token_here

# Configuration CinetPay
CINETPAY_API_KEY=your_cinetpay_api_key
CINETPAY_SITE_ID=your_cinetpay_site_id
CINETPAY_ENVIRONMENT=TEST
```

## 🔒 Sécurité

### **Bonnes pratiques :**

1. ✅ **Changer les identifiants par défaut**
   - Ne jamais utiliser les identifiants par défaut en production
   - Utiliser des mots de passe forts

2. ✅ **Protéger le fichier `.env.local`**
   ```bash
   chmod 600 .env.local
   ```

3. ✅ **Ne jamais commiter `.env.local`**
   - Le fichier est déjà dans `.gitignore`
   - Vérifier qu'il n'est pas dans le repository

4. ✅ **Utiliser des variables d'environnement en production**
   - Configurer les variables sur votre plateforme de déploiement
   - Ne pas utiliser de fichiers `.env` en production

## ✅ Résumé

**Pour résoudre les problèmes d'authentification :**

1. **Configurer** : `pnpm setup-admin`
2. **Tester** : `pnpm test-auth-login`
3. **Redémarrer** : `pkill -f "next dev" && pnpm dev`
4. **Se connecter** : http://localhost:3000/admin/login

**Identifiants Super Admin :**
- Email : `sobam@daveandlucesolutions.com`
- Mot de passe : `@DavyFrantz2025`

**Le système d'authentification est maintenant opérationnel !** 🎉 