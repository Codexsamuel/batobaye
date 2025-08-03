# 🛒 Guide du Système de Panier et Commandes - Batobaye Market

## 📋 Vue d'ensemble

Ce guide décrit le système complet de gestion du panier et des commandes implémenté sur Batobaye Market, similaire aux plateformes Alibaba et Jumia.

## 🎯 Fonctionnalités Principales

### ✅ Système de Panier
- **Persistance locale** : Sauvegarde automatique dans localStorage
- **Gestion des quantités** : Ajout/suppression/modification des quantités
- **Validation du stock** : Vérification de la disponibilité
- **Calcul automatique** : Total et nombre d'articles en temps réel
- **Interface intuitive** : Boutons d'action clairs et visuels

### ✅ Système de Commandes
- **Historique complet** : Toutes les commandes passées
- **Statuts multiples** : En attente, confirmée, en cours, expédiée, livrée, annulée
- **Suivi détaillé** : Informations de livraison et paiement
- **Filtrage par statut** : Onglets pour organiser les commandes
- **Statistiques** : Vue d'ensemble des achats

## 🏗️ Architecture Technique

### 📁 Fichiers Principaux

```
lib/
├── cart.ts                    # Gestionnaire principal du panier et commandes
├── db-commercial.ts           # Base de données commerciale
└── cinetpay.ts               # Intégration CinetPay

app/
├── cart/
│   └── page.tsx              # Page du panier
├── orders/
│   └── page.tsx              # Page des commandes
├── checkout/
│   └── page.tsx              # Page de paiement
└── api/
    ├── cinetpay/
    │   ├── route.ts          # Initiation paiement
    │   └── notify/
    │       └── route.ts      # Webhook notifications
    └── payment/
        └── route.ts          # Traitement des commandes

components/
├── CartIcon.tsx              # Icône panier avec compteur
├── ProductActionButtons.tsx  # Boutons d'action produits
└── WhatsAppBuyModal.tsx      # Modal WhatsApp
```

## 🔧 Configuration

### Variables d'Environnement

```env
# CinetPay Configuration
CINETPAY_SITE_ID=105904221
CINETPAY_API_KEY=votre_api_key
CINETPAY_SECRET_KEY=votre_secret_key
CINETPAY_ENVIRONMENT=PROD

# URLs de Production
NEXT_PUBLIC_APP_URL=https://batobaye.shop
CINETPAY_NOTIFY_URL=https://batobaye.shop/api/cinetpay/notify
CINETPAY_RETURN_URL=https://batobaye.shop/payment/success
CINETPAY_CANCEL_URL=https://batobaye.shop/payment/cancel
```

## 🚀 Utilisation

### 1. Ajout au Panier

```typescript
import { cartManager } from '@/lib/cart'

// Ajouter un produit au panier
const result = cartManager.addToCart({
  id: 'product-123',
  name: 'Réfrigérateur Samsung',
  price: 450000,
  category: 'Électroménager',
  stock: 5
})
```

### 2. Gestion du Panier

```typescript
// Obtenir le panier actuel
const cart = cartManager.getCart()

// Modifier la quantité
cartManager.updateQuantity('product-123', 2)

// Supprimer un article
cartManager.removeFromCart('product-123')

// Vider le panier
cartManager.clearCart()
```

### 3. Création de Commande

```typescript
// Créer une nouvelle commande
const order = cartManager.createOrder(
  {
    name: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '+237672027744',
    address: '123 Rue Principale',
    city: 'Douala',
    postalCode: '00000'
  },
  'cinetpay',
  '123 Rue Principale, Douala',
  'Livraison en matinée'
)
```

## 📱 Interface Utilisateur

### Navigation Principale
- **Icône Panier** : Affiche le nombre d'articles avec badge
- **Lien "Mes commandes"** : Accès direct à l'historique
- **Compteur en temps réel** : Mise à jour automatique

### Page Panier (`/cart`)
- **Liste des articles** : Images, noms, prix, quantités
- **Contrôles de quantité** : Boutons +/- avec validation stock
- **Statuts de stock** : Indicateurs visuels (En stock, Limité, Épuisé)
- **Résumé de commande** : Sous-total, livraison, total
- **Actions** : Vider panier, continuer achats, passer commande

### Page Commandes (`/orders`)
- **Statistiques** : Total commandes, montant dépensé, en attente, livrées
- **Onglets de filtrage** : Toutes, En attente, En cours, Expédiées, Livrées, Annulées
- **Détails par commande** : Statut, articles, adresse, paiement
- **Modal de détails** : Vue complète d'une commande
- **Actions** : Voir détails, télécharger facture

## 💳 Intégration Paiement

### CinetPay
- **Initiation** : Redirection vers CinetPay
- **Webhook** : Notification automatique des paiements
- **Statuts** : Mise à jour automatique des commandes
- **Sécurité** : Validation des signatures

### Méthodes de Paiement
- **Mobile Money** : Orange Money, MTN Mobile Money
- **Cartes** : Visa, Mastercard
- **PayPal** : Paiement international
- **Espèces** : Paiement à la livraison

## 🔄 Flux de Commande

### 1. Ajout au Panier
```
Produit → Bouton "Ajouter au panier" → Validation stock → Ajout localStorage
```

### 2. Gestion du Panier
```
Page panier → Modification quantités → Validation → Mise à jour localStorage
```

### 3. Passage de Commande
```
Bouton "Passer commande" → Page checkout → Saisie informations → Validation
```

### 4. Paiement
```
Sélection méthode → Redirection CinetPay → Paiement → Webhook → Mise à jour statut
```

### 5. Suivi
```
Page commandes → Filtrage par statut → Détails commande → Suivi livraison
```

## 📊 Données Stockées

### Panier (localStorage)
```json
{
  "items": [
    {
      "id": "product-123",
      "name": "Réfrigérateur Samsung",
      "price": 450000,
      "quantity": 1,
      "category": "Électroménager",
      "stock": 5,
      "addedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 450000,
  "itemCount": 1
}
```

### Commandes (localStorage)
```json
[
  {
    "id": "CMD-1705123456789-abc123",
    "items": [...],
    "total": 450000,
    "status": "pending",
    "orderDate": "2024-01-15T10:30:00Z",
    "customerInfo": {...},
    "paymentMethod": "cinetpay",
    "paymentStatus": "pending",
    "shippingAddress": "123 Rue Principale, Douala",
    "estimatedDelivery": "2024-01-22T10:30:00Z"
  }
]
```

## 🛡️ Sécurité

### Validation des Données
- **Stock** : Vérification avant ajout au panier
- **Quantités** : Limitation selon disponibilité
- **Prix** : Calcul côté client et serveur
- **Informations client** : Validation des champs obligatoires

### Protection
- **localStorage** : Données locales uniquement
- **Webhook** : Validation des signatures CinetPay
- **HTTPS** : Chiffrement des communications
- **Validation** : Contrôles côté client et serveur

## 🔧 Maintenance

### Sauvegarde des Données
```javascript
// Export des données
const data = cartManager.exportData()

// Import des données
cartManager.importData(data)
```

### Nettoyage
```javascript
// Vider le panier
cartManager.clearCart()

// Supprimer les données localStorage
localStorage.removeItem('batobaye_cart')
localStorage.removeItem('batobaye_orders')
```

## 📈 Statistiques

### Métriques Disponibles
- **Total commandes** : Nombre de commandes passées
- **Montant total** : Somme dépensée
- **Commandes en attente** : En cours de traitement
- **Commandes livrées** : Terminées avec succès
- **Valeur moyenne** : Montant moyen par commande

### Calculs Automatiques
```typescript
const stats = cartManager.getOrderStats()
// {
//   totalOrders: 15,
//   totalSpent: 6750000,
//   pendingOrders: 3,
//   deliveredOrders: 12,
//   averageOrderValue: 450000
// }
```

## 🚨 Dépannage

### Problèmes Courants

#### Panier vide après rechargement
- **Cause** : localStorage non disponible
- **Solution** : Vérifier les permissions du navigateur

#### Quantité non mise à jour
- **Cause** : Stock insuffisant
- **Solution** : Vérifier la disponibilité du produit

#### Commande non créée
- **Cause** : Panier vide
- **Solution** : Ajouter des produits avant commande

#### Paiement échoué
- **Cause** : Erreur CinetPay
- **Solution** : Vérifier les logs et les credentials

### Logs de Debug
```javascript
// Activer les logs détaillés
console.log('Panier actuel:', cartManager.getCart())
console.log('Commandes:', cartManager.getOrders())
console.log('Statistiques:', cartManager.getOrderStats())
```

## 🔮 Évolutions Futures

### Fonctionnalités Prévues
- **Synchronisation cloud** : Sauvegarde en ligne
- **Notifications push** : Mise à jour des statuts
- **Historique détaillé** : Logs des actions
- **Export PDF** : Factures téléchargeables
- **API REST** : Intégration backend
- **Multi-devices** : Synchronisation entre appareils

### Optimisations
- **Performance** : Mise en cache des données
- **UX** : Animations et transitions
- **Accessibilité** : Support lecteurs d'écran
- **Mobile** : Interface responsive optimisée

## 📞 Support

Pour toute question ou problème :
- **Email** : support@batobaye.shop
- **WhatsApp** : +237 672 027 744
- **Documentation** : Ce guide et les commentaires dans le code

---

*Dernière mise à jour : Janvier 2024*
*Version : 1.0* 