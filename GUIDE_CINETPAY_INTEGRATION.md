# 💳 Guide - Intégration CinetPay

## 📋 Informations CinetPay

### 🔑 Identifiants de Configuration
- **API Key**: `105904221`
- **Site ID**: `1651504870688e1c2fe7ed74.18730321`
- **Lien de base API**: `https://api-checkout.cinetpay.com/v2`
- **Environnement**: TEST (à changer en PROD pour la production)

## 🎯 CinetPay - Solution de Paiement Unifiée

### ✅ Avantages de CinetPay
- **Multi-paiements** : Orange Money, MTN Mobile Money, Visa, Mastercard, PayPal
- **Sécurisé** : Chiffrement SSL et authentification forte
- **International** : Accepté dans toute l'Afrique de l'Ouest et Centrale
- **Simple** : Une seule intégration pour tous les modes de paiement
- **Fiable** : Service client 24/7

## 🔧 Architecture de l'Intégration

### 1. Module CinetPay (`lib/cinetpay.ts`)

#### Configuration
```typescript
const defaultConfig: CinetPayConfig = {
  apiKey: '105904221',
  siteId: '1651504870688e1c2fe7ed74.18730321',
  baseUrl: 'https://api-checkout.cinetpay.com/v2',
  environment: 'TEST'
}
```

#### Fonctionnalités
- **initiatePayment()** : Initialiser un paiement
- **checkPaymentStatus()** : Vérifier le statut d'un paiement
- **generateTransactionId()** : Générer un ID unique
- **formatAmount()** : Formater le montant (en centimes)

### 2. API CinetPay (`app/api/cinetpay/route.ts`)

#### Endpoints
- **POST** `/api/cinetpay` : Initialiser un paiement
- **PUT** `/api/cinetpay` : Webhook pour les notifications

#### Flux de Paiement
1. **Validation** des données client et articles
2. **Création** de la vente dans la base de données
3. **Initialisation** du paiement avec CinetPay
4. **Redirection** vers la page de paiement CinetPay
5. **Notification** via webhook du statut final

### 3. Pages de Retour
- **Succès** : `/payment/success` - Paiement réussi
- **Annulation** : `/payment/cancel` - Paiement annulé

## 🎨 Interface Utilisateur

### Page de Checkout Mise à Jour
- **Un seul bouton** : "CinetPay" au lieu de 5 options séparées
- **Description** : "Orange Money, MTN Mobile Money, Visa, Mastercard, PayPal"
- **Couleur** : Vert (`bg-green-600`) pour la confiance
- **Popularité** : Marqué comme "populaire"

### Expérience Utilisateur
1. **Sélection** : L'utilisateur clique sur "CinetPay"
2. **Redirection** : Vers la page de paiement CinetPay
3. **Choix** : L'utilisateur choisit son mode de paiement préféré
4. **Paiement** : Traitement sécurisé par CinetPay
5. **Retour** : Redirection vers succès ou annulation

## 🔒 Sécurité et Traitement

### Données Transmises
```typescript
{
  amount: 45000000, // En centimes
  currency: 'XAF',
  description: 'Commande Batobaye - 2 article(s)',
  returnUrl: 'https://batobaye.shop/payment/success',
  cancelUrl: 'https://batobaye.shop/payment/cancel',
  notifyUrl: 'https://batobaye.shop/api/cinetpay/webhook',
  transactionId: 'BATOBAYE_1703123456789_ABC123',
  customerName: 'John Doe',
  customerEmail: 'john.doe@example.com',
  customerPhone: '+237672027744',
  customerAddress: 'Douala, Akwa',
  customerCity: 'Douala',
  customerCountry: 'CM',
  channels: 'ALL'
}
```

### Statuts de Paiement
- **SUCCESSFUL** : Paiement réussi
- **PENDING** : Paiement en attente
- **FAILED** : Paiement échoué
- **CANCELLED** : Paiement annulé

## 📊 Base de Données

### Mise à Jour des Types
```typescript
// Interface Sale
payment_method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer' | 'cinetpay'

// Interface Payment
payment_method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer' | 'cinetpay'
```

### Enregistrement des Transactions
- **Table `sales`** : Vente avec méthode 'cinetpay'
- **Table `payments`** : Enregistrement du token CinetPay
- **Notes** : Transaction ID et token pour traçabilité

## 🚀 Déploiement

### Variables d'Environnement
```bash
# .env.local
NEXT_PUBLIC_APP_URL=https://batobaye.shop
CINETPAY_API_KEY=105904221
CINETPAY_SITE_ID=1651504870688e1c2fe7ed74.18730321
CINETPAY_ENVIRONMENT=PROD
```

### Configuration Production
1. **Changer l'environnement** : `TEST` → `PROD`
2. **Configurer les URLs** : URLs de production
3. **Webhook** : URL publique pour les notifications
4. **SSL** : Certificat SSL obligatoire

## 🔄 Flux Complet

### 1. Initialisation
```
Client → Checkout → API CinetPay → CinetPay → Page de Paiement
```

### 2. Paiement
```
Page de Paiement → Orange Money/MTN/Visa/Mastercard/PayPal → CinetPay
```

### 3. Notification
```
CinetPay → Webhook → Base de Données → Email de Confirmation
```

### 4. Retour
```
CinetPay → Page de Succès/Annulation → Client
```

## 📱 Modes de Paiement Supportés

### 🟠 Orange Money
- **Pays** : Cameroun, Côte d'Ivoire, Mali, Sénégal
- **Traitement** : Instantané
- **Frais** : Variables selon le pays

### 🟡 MTN Mobile Money
- **Pays** : Cameroun, Côte d'Ivoire, Ghana, Ouganda
- **Traitement** : Instantané
- **Frais** : Variables selon le pays

### 🔵 Visa
- **Couverture** : Internationale
- **Traitement** : 2-3 jours ouvrables
- **Frais** : 2.5% - 3.5%

### 🔴 Mastercard
- **Couverture** : Internationale
- **Traitement** : 2-3 jours ouvrables
- **Frais** : 2.5% - 3.5%

### 🔵 PayPal
- **Couverture** : Internationale
- **Traitement** : Instantané
- **Frais** : 3.4% + 0.30€

## 🛠️ Maintenance et Monitoring

### Logs à Surveiller
- **Initialisation** : Erreurs d'API CinetPay
- **Webhooks** : Notifications reçues
- **Statuts** : Changements de statut de paiement
- **Erreurs** : Échecs de paiement

### Métriques Importantes
- **Taux de conversion** : Paiements réussis / Tentatives
- **Temps de traitement** : Durée moyenne des paiements
- **Erreurs** : Types d'erreurs fréquentes
- **Modes préférés** : Répartition par mode de paiement

## 🔧 Dépannage

### Erreurs Courantes
1. **API Key invalide** : Vérifier la configuration
2. **Site ID incorrect** : Vérifier les identifiants
3. **URLs invalides** : Vérifier les URLs de retour
4. **Montant incorrect** : Vérifier le format (centimes)
5. **Devise non supportée** : Utiliser XAF, XOF, USD, EUR

### Tests
```bash
# Test d'initialisation
curl -X POST /api/cinetpay \
  -H "Content-Type: application/json" \
  -d '{"customer": {...}, "items": [...], "amount": 450000}'

# Test de statut
curl -X PUT /api/cinetpay \
  -H "Content-Type: application/json" \
  -d '{"transaction_id": "...", "token": "..."}'
```

## 📞 Support

### CinetPay Support
- **Email** : support@cinetpay.com
- **Téléphone** : +225 27 22 49 63 63
- **Documentation** : https://docs.cinetpay.com

### Batobaye Support
- **Téléphone** : +237 672 02 77 44
- **Email** : contact@batobaye.shop
- **WhatsApp** : +237 672 02 77 44

## 🎉 Avantages de l'Intégration

### Pour l'Utilisateur
- **Choix multiple** : Tous les modes de paiement en un clic
- **Sécurisé** : Paiement sécurisé par CinetPay
- **Rapide** : Traitement instantané pour Mobile Money
- **International** : Paiements depuis l'étranger

### Pour Batobaye
- **Simplicité** : Une seule intégration
- **Fiabilité** : Service professionnel
- **Support** : Assistance technique dédiée
- **Analytics** : Rapports détaillés des paiements

### Pour le Développement
- **Maintenance** : Un seul système à maintenir
- **Évolutivité** : Facile d'ajouter de nouveaux modes
- **Documentation** : Documentation complète
- **API** : API REST moderne et bien documentée 