# 🔧 Guide de Configuration CinetPay - Production

## 📋 Configuration Requise

### 1. Variables d'Environnement

Ajoutez ces variables dans votre fichier `.env.local` :

```env
# 🔐 CinetPay Configuration (PRODUCTION)
CINETPAY_SITE_ID=votre_site_id_ici
CINETPAY_API_KEY=votre_api_key_ici
CINETPAY_SECRET_KEY=votre_secret_key_ici
CINETPAY_ENVIRONMENT=PROD

# 🌐 URLs de Production
NEXT_PUBLIC_APP_URL=https://batobaye.shop

# 📧 Notifications
CINETPAY_NOTIFY_URL=https://batobaye.shop/api/cinetpay/notify
CINETPAY_RETURN_URL=https://batobaye.shop/payment/success
CINETPAY_CANCEL_URL=https://batobaye.shop/payment/cancel
```

### 2. Configuration BackOffice CinetPay

Dans votre BackOffice CinetPay, configurez :

#### URLs de Notification
- **URL de notification** : `https://batobaye.shop/api/cinetpay/notify`
- **URL de retour** : `https://batobaye.shop/payment/success`
- **URL d'annulation** : `https://batobaye.shop/payment/cancel`

#### Paramètres de Sécurité
- **Mode** : Production
- **Devise** : XAF (Franc CFA)
- **Langue** : Français

## 🚀 Déploiement

### 1. Vercel (Recommandé)

```bash
# Ajouter les variables d'environnement dans Vercel
vercel env add CINETPAY_SITE_ID
vercel env add CINETPAY_API_KEY
vercel env add CINETPAY_SECRET_KEY
vercel env add CINETPAY_ENVIRONMENT
vercel env add NEXT_PUBLIC_APP_URL
```

### 2. Autres Plateformes

Assurez-vous que toutes les variables d'environnement sont configurées dans votre plateforme de déploiement.

## 🧪 Tests

### 1. Test de Paiement

1. **Allez sur** : `https://batobaye.shop/checkout`
2. **Cliquez sur** : "CinetPay"
3. **Choisissez** : Orange Money ou MTN Mobile Money
4. **Testez avec** : Un petit montant (ex: 100 FCFA)

### 2. Vérification des Notifications

1. **Vérifiez les logs** : `/api/cinetpay/notify`
2. **Dashboard admin** : `/admin/payments`
3. **Base de données** : Statut des ventes

## 📊 Monitoring

### 1. Dashboard Admin

Accédez à `/admin/payments` pour voir :
- ✅ Revenus totaux
- ✅ Paiements réussis
- ✅ Paiements en attente
- ✅ Taux de succès

### 2. Logs à Surveiller

```bash
# Logs d'initialisation
🚀 Initialisation paiement CinetPay: { site_id, transaction_id, amount, currency }

# Logs de notification
🔔 Notification CinetPay reçue: { cpm_trans_status, cpm_trans_id, cpm_amount }

# Logs de succès
✅ Paiement accepté pour transaction: BATOBAYE_1234567890_ABC123
✅ Vente mise à jour: 1
```

## 🔒 Sécurité

### 1. Vérification de Signature

Le système vérifie automatiquement les signatures CinetPay pour éviter les fraudes.

### 2. HTTPS Obligatoire

Assurez-vous que votre site utilise HTTPS en production.

### 3. Variables d'Environnement

Ne jamais exposer les clés API dans le code source.

## 📱 Notifications WhatsApp

Le système envoie automatiquement des notifications WhatsApp après un paiement réussi :

```
🎉 Paiement confirmé !

Transaction: BATOBAYE_1234567890_ABC123
Montant: 450,000 FCFA

Votre commande Batobaye a été confirmée et sera traitée dans les plus brefs délais.

Merci de votre confiance ! 🙏

Support: +237 672 02 77 44
```

## 🛠️ Dépannage

### Erreurs Courantes

1. **"API Key invalide"**
   - Vérifiez `CINETPAY_API_KEY` dans `.env.local`
   - Assurez-vous qu'elle correspond à votre BackOffice

2. **"Site ID incorrect"**
   - Vérifiez `CINETPAY_SITE_ID` dans `.env.local`
   - Copiez exactement depuis votre BackOffice

3. **"URLs invalides"**
   - Vérifiez `NEXT_PUBLIC_APP_URL`
   - Assurez-vous que les URLs sont en HTTPS

4. **"Notifications non reçues"**
   - Vérifiez `/api/cinetpay/notify`
   - Assurez-vous que l'URL est accessible publiquement

### Support

- **CinetPay** : support@cinetpay.com
- **Batobaye** : +237 672 02 77 44
- **Documentation** : https://docs.cinetpay.com

## ✅ Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] URLs configurées dans BackOffice CinetPay
- [ ] HTTPS activé
- [ ] Test de paiement effectué
- [ ] Notifications reçues
- [ ] Dashboard admin accessible
- [ ] Logs surveillés

## 🎯 Prochaines Étapes

1. **Tester avec de vrais paiements**
2. **Configurer les notifications email**
3. **Ajouter des rapports détaillés**
4. **Intégrer la livraison**
5. **Optimiser l'expérience utilisateur** 