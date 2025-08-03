# 📱 Guide d'Intégration WhatsApp Business - Importation d'Images

## 🎯 Vue d'ensemble

Ce guide explique comment configurer l'intégration WhatsApp Business pour permettre aux clients d'envoyer des images de produits directement via WhatsApp, et comment ces images sont automatiquement importées dans votre site Batobaye Market.

## 🔧 Configuration WhatsApp Business API

### 1. Créer un compte WhatsApp Business API

1. **Aller sur** : https://developers.facebook.com/
2. **Créer une application** : Nouvelle application → Business
3. **Ajouter WhatsApp** : Produits → WhatsApp → Commencer
4. **Configurer le numéro de téléphone** : Ajouter votre numéro +237 672 02 77 44

### 2. Variables d'Environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# 🔐 WhatsApp Business API Configuration
WHATSAPP_ACCESS_TOKEN=votre_access_token_ici
WHATSAPP_PHONE_NUMBER_ID=votre_phone_number_id_ici
WHATSAPP_VERIFY_TOKEN=votre_verify_token_ici
WHATSAPP_WEBHOOK_URL=https://batobaye.shop/api/whatsapp/webhook
```

### 3. Configuration du Webhook

Dans votre dashboard WhatsApp Business :

1. **Aller dans** : Configuration → Webhooks
2. **URL du webhook** : `https://batobaye.shop/api/whatsapp/webhook`
3. **Token de vérification** : Utilisez la même valeur que `WHATSAPP_VERIFY_TOKEN`
4. **Champs à abonner** : `messages`, `message_deliveries`

## 📁 Structure des Fichiers Créés

### 1. `lib/whatsapp-business.ts`
- **Fonction** : Classe principale pour l'API WhatsApp Business
- **Fonctionnalités** :
  - Téléchargement d'images et documents
  - Envoi de messages automatiques
  - Traitement des webhooks
  - Sauvegarde des fichiers

### 2. `app/api/whatsapp/webhook/route.ts`
- **Fonction** : Endpoint webhook pour recevoir les messages
- **Méthodes** :
  - `GET` : Vérification du webhook
  - `POST` : Réception des messages

### 3. `app/admin/whatsapp-images/page.tsx`
- **Fonction** : Interface d'administration pour gérer les images
- **Fonctionnalités** :
  - Visualisation des images reçues
  - Approuver/rejeter les images
  - Recherche et filtrage
  - Statistiques

## 🔄 Flux de Fonctionnement

### 1. Réception d'une Image
```
Client WhatsApp → WhatsApp Business API → Webhook → Votre Serveur
```

### 2. Traitement Automatique
1. **Réception** : Le webhook reçoit la notification
2. **Téléchargement** : L'image est téléchargée depuis WhatsApp
3. **Sauvegarde** : L'image est sauvegardée localement
4. **Base de données** : Un enregistrement est créé
5. **Réponse** : Un message de confirmation est envoyé au client

### 3. Gestion Administrative
1. **Notification** : L'admin reçoit une notification
2. **Révision** : L'admin peut voir l'image dans `/admin/whatsapp-images`
3. **Approbation** : L'admin peut approuver ou rejeter l'image
4. **Intégration** : Les images approuvées peuvent être utilisées pour les produits

## 📱 Utilisation par les Clients

### Message Automatique de Confirmation
Quand un client envoie une image, il reçoit automatiquement :

```
✅ Image reçue ! Nous l'avons ajoutée à notre catalogue. Merci !
```

### Instructions pour les Clients
Vous pouvez envoyer ce message à vos clients :

```
📸 Pour ajouter des images de produits à notre catalogue :

1. Prenez une photo claire du produit
2. Envoyez-la directement sur ce numéro WhatsApp
3. Nous l'ajouterons automatiquement à notre catalogue
4. Vous recevrez une confirmation

🖼️ Conseils pour de belles photos :
• Bonne luminosité
• Arrière-plan neutre
• Produit bien centré
• Plusieurs angles si possible

Merci de votre collaboration ! 🙏
```

## 🛠️ Fonctionnalités Avancées

### 1. Gestion des Documents
Le système supporte aussi :
- **PDF** : Catalogues, fiches techniques
- **Documents Word/Excel** : Listes de prix, spécifications
- **Images** : Photos de produits, logos

### 2. Sécurité
- **Vérification de signature** : Protection contre les faux webhooks
- **Validation des types** : Seuls les fichiers autorisés sont traités
- **Limitation de taille** : Protection contre les fichiers trop volumineux

### 3. Organisation des Fichiers
```
public/uploads/whatsapp/
├── whatsapp_1703123456789_produit1.jpg
├── whatsapp_1703123456790_refrigerateur.jpg
└── documents/
    └── whatsapp_1703123456789_catalogue.pdf
```

## 📊 Dashboard d'Administration

### Accès
- **URL** : `/admin/whatsapp-images`
- **Accès** : Super Admin seulement

### Fonctionnalités
1. **Vue d'ensemble** : Statistiques des images reçues
2. **Galerie** : Visualisation en grille des images
3. **Actions** : Approuver, rejeter, supprimer
4. **Recherche** : Par nom, téléphone, fichier
5. **Filtres** : Par statut (en attente, approuvé, rejeté)

### Workflow Recommandé
1. **Réception** : Vérifier les nouvelles images
2. **Révision** : Évaluer la qualité et la pertinence
3. **Approbation** : Approuver les images de qualité
4. **Intégration** : Utiliser dans les produits du site

## 🔧 Configuration de Production

### 1. Vercel
```bash
# Ajouter les variables d'environnement
vercel env add WHATSAPP_ACCESS_TOKEN
vercel env add WHATSAPP_PHONE_NUMBER_ID
vercel env add WHATSAPP_VERIFY_TOKEN
vercel env add WHATSAPP_WEBHOOK_URL
```

### 2. Autres Plateformes
Assurez-vous que toutes les variables d'environnement sont configurées dans votre plateforme de déploiement.

### 3. HTTPS Obligatoire
WhatsApp Business API nécessite HTTPS en production.

## 🧪 Tests

### 1. Test du Webhook
```bash
# Vérifier que le webhook répond
curl -X GET "https://batobaye.shop/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=votre_token&hub.challenge=test"
```

### 2. Test d'Envoi d'Image
1. **Envoyer une image** via WhatsApp Business
2. **Vérifier les logs** : `/api/whatsapp/webhook`
3. **Vérifier le dashboard** : `/admin/whatsapp-images`
4. **Vérifier le stockage** : `public/uploads/whatsapp/`

### 3. Test de Réponse Automatique
Vérifiez que le client reçoit bien le message de confirmation.

## 🚨 Dépannage

### Problèmes Courants

1. **"Webhook non vérifié"**
   - Vérifiez `WHATSAPP_VERIFY_TOKEN`
   - Assurez-vous que l'URL est accessible

2. **"Images non reçues"**
   - Vérifiez `WHATSAPP_ACCESS_TOKEN`
   - Vérifiez les permissions de l'application

3. **"Erreur de sauvegarde"**
   - Vérifiez les permissions du dossier `public/uploads/`
   - Vérifiez l'espace disque disponible

4. **"Messages non envoyés"**
   - Vérifiez `WHATSAPP_PHONE_NUMBER_ID`
   - Vérifiez que le numéro est approuvé

### Logs à Surveiller
```bash
# Logs d'initialisation
🔐 Vérification webhook WhatsApp: { mode, token, challenge }

# Logs de réception
📱 Webhook WhatsApp reçu: { payload }

# Logs de traitement
🖼️ Image reçue de Jean Dupont
✅ Image sauvegardée: whatsapp_1703123456789_produit1.jpg
💾 Enregistrement image en base: { imageData }
```

## 📈 Métriques et Analytics

### Données à Suivre
- **Images reçues** : Nombre total d'images
- **Taux d'approbation** : Images approuvées vs rejetées
- **Temps de traitement** : Délai entre réception et approbation
- **Qualité** : Taille moyenne, formats utilisés

### Intégration avec Analytics
Possibilité d'étendre pour :
- **Google Analytics** : Suivi des événements
- **CRM** : Association avec les clients
- **Rapports** : Statistiques détaillées

## 🎯 Prochaines Étapes

### Améliorations Possibles
1. **IA de reconnaissance** : Détection automatique du type de produit
2. **Optimisation automatique** : Redimensionnement et compression
3. **Intégration produit** : Association directe avec les produits existants
4. **Notifications push** : Alertes en temps réel pour les admins
5. **API publique** : Permettre aux clients de voir leurs images

### Intégration avec le Catalogue
1. **Sélection automatique** : Proposer les images pour les produits
2. **Galerie client** : Permettre aux clients de voir leurs contributions
3. **Crédits** : Système de reconnaissance des contributeurs

## ✅ Checklist de Déploiement

- [ ] Compte WhatsApp Business API créé
- [ ] Variables d'environnement configurées
- [ ] Webhook configuré et vérifié
- [ ] Dossier `public/uploads/whatsapp/` créé
- [ ] Permissions de fichiers configurées
- [ ] Test d'envoi d'image effectué
- [ ] Dashboard admin accessible
- [ ] Messages automatiques fonctionnels
- [ ] Logs surveillés
- [ ] Documentation équipe créée

## 🎉 Conclusion

L'intégration WhatsApp Business transforme votre site en une plateforme collaborative où les clients peuvent directement contribuer au catalogue de produits. Cette approche :

- **Simplifie** la collecte d'images
- **Améliore** l'engagement client
- **Automatise** le processus d'importation
- **Facilite** la gestion du contenu

### Support
- **WhatsApp Business** : https://developers.facebook.com/docs/whatsapp
- **Batobaye Market** : +237 672 02 77 44
- **Documentation** : Ce guide et les commentaires dans le code 