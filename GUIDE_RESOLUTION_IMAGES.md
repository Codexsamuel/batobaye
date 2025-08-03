# 🖼️ Guide de Résolution des Problèmes d'Images - Batobaye Market

## 🚨 Erreur Courante : "hostname not configured"

### **Problème**
```
Error: Invalid src prop (https://res.cloudinary.com/...) on `next/image`, 
hostname "res.cloudinary.com" is not configured under images in your `next.config.js`
```

### **Solution**

#### **1. Vérifier la Configuration**
```bash
# Lancer le script de vérification
pnpm fix-images
```

#### **2. Ajouter le Hostname Manquant**
Dans `next.config.mjs`, ajouter le hostname dans `remotePatterns` :

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com', // Ajouter ici
      port: '',
      pathname: '/**',
    },
    // ... autres hostnames
  ],
},
```

#### **3. Redémarrer le Serveur**
```bash
# Arrêter le serveur
pkill -f "next dev"

# Nettoyer le cache
rm -rf .next

# Redémarrer
pnpm dev
```

## 🔧 Hostnames Configurés

### **Actuellement Autorisés :**
- ✅ `images.pexels.com` - Images Pexels
- ✅ `images.unsplash.com` - Images Unsplash
- ✅ `res.cloudinary.com` - Images Cloudinary
- ✅ `cloudinary.com` - Images Cloudinary (alternatif)
- ✅ `localhost` - Images locales (développement)
- ✅ `127.0.0.1` - Images locales (développement)
- ✅ `batobaye-market.com` - Images du site

### **Ajouter un Nouveau Hostname :**

1. **Modifier `next.config.mjs` :**
```javascript
{
  protocol: 'https',
  hostname: 'votre-domaine.com',
  port: '',
  pathname: '/**',
},
```

2. **Mettre à jour le script de vérification :**
```javascript
// Dans scripts/fix-image-config.js
const allowedImageHosts = [
  // ... hostnames existants
  'votre-domaine.com' // Ajouter ici
];
```

## 🛠️ Scripts Utiles

### **Vérification Complète :**
```bash
pnpm fix-images
```

### **Redémarrage Propre :**
```bash
pkill -f "next dev" && rm -rf .next && pnpm dev
```

### **Test du Système :**
```bash
pnpm test-product-system
```

## 📋 Checklist de Résolution

### **Quand une erreur d'image apparaît :**

1. ✅ **Identifier le hostname** dans l'erreur
2. ✅ **Vérifier la configuration** avec `pnpm fix-images`
3. ✅ **Ajouter le hostname** dans `next.config.mjs`
4. ✅ **Redémarrer le serveur** proprement
5. ✅ **Tester l'image** dans le navigateur

### **Pour les Images Cloudinary :**

1. ✅ **Vérifier l'URL** : `https://res.cloudinary.com/...`
2. ✅ **Configurer le hostname** : `res.cloudinary.com`
3. ✅ **Utiliser le composant Next.js** : `<Image src="..." />`
4. ✅ **Ajouter les dimensions** : `width` et `height`

## 🎯 Exemples de Configuration

### **Image Cloudinary :**
```jsx
import Image from 'next/image'

<Image
  src="https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp"
  alt="Entrée Batobaye"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### **Image Locale :**
```jsx
<Image
  src="/images/BATOBAYE LOGO.jpeg"
  alt="Logo Batobaye"
  width={200}
  height={200}
/>
```

## 🔍 Dépannage Avancé

### **Problème : Images qui ne se chargent pas**
```bash
# Vérifier la configuration
pnpm fix-images

# Vérifier les logs du serveur
# Chercher les erreurs 404 ou 403
```

### **Problème : Images floues ou mal dimensionnées**
```jsx
// Utiliser des dimensions appropriées
<Image
  src="..."
  width={800}  // Largeur réelle de l'image
  height={600} // Hauteur réelle de l'image
  quality={85} // Qualité optimale
/>
```

### **Problème : Performance des images**
```jsx
// Optimiser le chargement
<Image
  src="..."
  width={800}
  height={600}
  priority={true} // Pour les images importantes
  placeholder="blur" // Pour les images locales
/>
```

## ✅ Résumé

**Pour résoudre les erreurs d'images :**

1. **Identifier** le hostname dans l'erreur
2. **Ajouter** le hostname dans `next.config.mjs`
3. **Redémarrer** le serveur proprement
4. **Tester** avec `pnpm fix-images`

**Configuration actuelle :**
- ✅ Tous les hostnames courants sont configurés
- ✅ Script de vérification automatique disponible
- ✅ Redémarrage propre automatisé

**Le système est maintenant prêt pour gérer toutes les images !** 🎉 