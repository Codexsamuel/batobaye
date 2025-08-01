# 🔧 Guide de Résolution des Problèmes - Batobaye Market

## Erreurs Courantes et Solutions

### 🚨 Erreur d'Hydratation React

**Symptôme :**
```
Error: Text content does not match server-rendered HTML.
```

**Solution :**
1. Nettoyez le cache Next.js :
   ```bash
   rm -rf .next
   pnpm run build
   pnpm dev
   ```

2. Utilisez le composant `ClientOnly` pour les éléments dynamiques :
   ```tsx
   import ClientOnly from '@/components/ClientOnly'
   
   <ClientOnly>
     <DynamicComponent />
   </ClientOnly>
   ```



### 🚨 Erreur de Build

**Symptôme :**
```
Error: Cannot find module './53.js'
```

**Solution :**
1. Nettoyez complètement le projet :
   ```bash
   rm -rf .next node_modules pnpm-lock.yaml
   pnpm install
   pnpm run build
   ```

### 🚨 Port Déjà Utilisé

**Symptôme :**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution :**
1. Trouvez et arrêtez le processus :
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```
2. Ou utilisez un autre port :
   ```bash
   pnpm dev --port 3001
   ```

### 🚨 Erreur de Variables d'Environnement

**Symptôme :**
```
ReferenceError: process is not defined
```

**Solution :**
1. Vérifiez votre fichier `.env.local` :
   ```bash
   cp env.example .env.local
   # Éditez .env.local avec vos vraies valeurs
   ```

2. Redémarrez le serveur après modification :
   ```bash
   pnpm dev
   ```

## 🔍 Diagnostic

### Vérification Complète
```bash
# Vérification de la configuration
pnpm run check

# Vérification de santé de l'application
pnpm run health

# Test du build
pnpm run build
```

### Logs de Développement
```bash
# Mode verbose
pnpm dev --verbose

# Logs détaillés
DEBUG=* pnpm dev
```

## 🛠️ Outils de Débogage

### Scripts Utiles
```bash
# Nettoyer le cache
pnpm run clean

# Vérifier les types TypeScript
pnpm run type-check

# Linter le code
pnpm run lint
```

### Ajoutez ces scripts au package.json :
```json
{
  "scripts": {
    "clean": "rm -rf .next",
    "type-check": "tsc --noEmit",
    "reset": "rm -rf .next node_modules pnpm-lock.yaml && pnpm install"
  }
}
```

## 📱 Problèmes Spécifiques

### Problèmes Mobile
1. **Responsive Design** : Testez avec les outils de développement
2. **Touch Events** : Vérifiez les interactions tactiles
3. **Performance** : Utilisez Lighthouse pour les audits

### Problèmes SEO
1. **Meta Tags** : Vérifiez dans `app/layout.tsx`
2. **Structured Data** : Validez avec Google Rich Results Test
3. **Sitemap** : Vérifiez `/sitemap.xml`

### Problèmes de Performance
1. **Images** : Optimisez avec Next.js Image
2. **Bundle Size** : Analysez avec `@next/bundle-analyzer`
3. **Caching** : Configurez les headers de cache

## 🚀 Déploiement

### Erreurs Vercel
1. **Build Fail** : Vérifiez les variables d'environnement
2. **Runtime Error** : Consultez les logs Vercel
3. **404 Errors** : Vérifiez les redirections

### Erreurs Netlify
1. **Build Command** : Utilisez `pnpm run build`
2. **Publish Directory** : Utilisez `.next`
3. **Functions** : Vérifiez les API routes

## 📞 Support

### Informations Utiles
- **Version Node.js** : `node --version`
- **Version pnpm** : `pnpm --version`
- **Version Next.js** : Voir `package.json`

### Logs Importants
```bash
# Logs du serveur
pnpm dev 2>&1 | tee server.log

# Logs de build
pnpm run build 2>&1 | tee build.log
```

### Contact
- **Email** : contact@batobaye.com
- **WhatsApp** : +237 672 02 77 44
- **Documentation** : Voir README.md

---

**💡 Conseil :** Toujours commencer par `pnpm run health` pour diagnostiquer rapidement les problèmes ! 