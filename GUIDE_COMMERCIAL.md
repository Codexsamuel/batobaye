# 🏪 Guide du Système Commercial - Batobaye Market

## 🎯 Vue d'ensemble

Le système commercial de Batobaye Market est un ERP complet qui gère :
- **Gestion des stocks** en temps réel
- **Suivi des fournisseurs** et crédits
- **Comptabilité** et caisse
- **Rapports** détaillés
- **Calcul automatique** des marges et bénéfices

## 📊 Tableau de Bord Commercial

### 🎛️ Indicateurs Principaux

#### 💰 **Chiffre d'Affaires**
- **Calcul** : Somme de toutes les ventes
- **Affichage** : Montant en FCFA avec nombre de ventes
- **Mise à jour** : En temps réel

#### 📈 **Bénéfice Net**
- **Calcul** : Chiffre d'affaires - Coûts d'achat
- **Marge** : Pourcentage de bénéfice affiché
- **Suivi** : Évolution par période

#### 📦 **Valeur du Stock**
- **Calcul** : Quantité × Prix d'achat pour chaque produit
- **Alertes** : Stock faible et ruptures
- **Optimisation** : Gestion des niveaux de stock

#### 👥 **Crédit Fournisseurs**
- **Suivi** : Montants dus par fournisseur
- **Limites** : Crédits autorisés
- **Échéances** : Conditions de paiement

### 🔍 **Onglets Détaillés**

#### 📋 **Vue d'ensemble**
- Résumé des ventes
- Alertes en temps réel
- Actions rapides

#### 📦 **Stock**
- État des stocks
- Produits en rupture
- Produits en stock faible
- Valeur totale

#### 👥 **Fournisseurs**
- Liste des fournisseurs
- Crédits en cours
- Conditions de paiement

#### 💰 **Caisse**
- État d'ouverture/fermeture
- Montants en caisse
- Mouvements de trésorerie

## 🛒 Gestion des Ventes

### ➕ **Créer une Vente**

#### 📝 **Informations Client**
- **Nom du client** : Obligatoire
- **Téléphone** : Obligatoire
- **Email** : Optionnel
- **Adresse** : Pour les livraisons

#### 🛍️ **Articles**
- **Sélection produit** : Recherche par nom/catégorie
- **Quantité** : Vérification automatique du stock
- **Prix unitaire** : Prix de vente configuré
- **Calcul automatique** : Total, remises, taxes

#### 💳 **Paiement**
- **Modes** : Espèces, Carte, Mobile Money, Virement
- **Statut** : Payé, En attente, Partiel
- **Type** : En magasin, En ligne, Livraison

### 📊 **Calculs Automatiques**

#### 💰 **Totaux**
```
Total HT = Σ(Quantité × Prix de vente)
Remise = Montant configuré
Taxes = Calcul automatique
Total TTC = Total HT - Remise + Taxes
```

#### 📈 **Bénéfices**
```
Coût de revient = Σ(Quantité × Prix d'achat)
Bénéfice brut = Total HT - Coût de revient
Marge = (Bénéfice / Total HT) × 100
```

### 📦 **Mise à Jour des Stocks**
- **Déduction automatique** lors de la vente
- **Alertes** si stock insuffisant
- **Historique** des mouvements

## 👥 Gestion des Fournisseurs

### ➕ **Ajouter un Fournisseur**

#### 📋 **Informations de Base**
- **Nom de l'entreprise** : Obligatoire
- **Contact** : Personne responsable
- **Téléphone** : Obligatoire
- **Email** : Optionnel
- **Adresse** : Complète

#### 💳 **Conditions Commerciales**
- **Limite de crédit** : Montant maximum autorisé
- **Crédit actuel** : Montant dû
- **Conditions de paiement** : Délais (ex: 30 jours)

### 📊 **Suivi des Crédits**

#### 💰 **Calculs**
```
Crédit disponible = Limite - Crédit actuel
Dette totale = Σ(Crédits de tous les fournisseurs)
```

#### ⚠️ **Alertes**
- **Dépassement** de limite de crédit
- **Échéances** de paiement
- **Fournisseurs** avec crédits élevés

## 📦 Gestion des Stocks

### 🔄 **Mouvements de Stock**

#### ➕ **Entrées**
- **Réception commande** : Ajout automatique
- **Retour client** : Remise en stock
- **Ajustement** : Correction manuelle

#### ➖ **Sorties**
- **Vente** : Déduction automatique
- **Retour fournisseur** : Déduction
- **Perte/Casse** : Ajustement

### 📊 **Niveaux de Stock**

#### ⚠️ **Stock Faible**
- **Seuil** : Configuré par produit
- **Alerte** : Notification automatique
- **Action** : Commander

#### 🚫 **Rupture**
- **Statut** : "Rupture de stock"
- **Vente** : Impossible
- **Action** : Réapprovisionnement urgent

### 💰 **Valuation**
```
Valeur stock = Σ(Quantité × Prix d'achat)
Coût moyen = Total coûts / Total quantités
```

## 💰 Gestion de la Caisse

### 🏦 **Ouverture de Caisse**
- **Montant initial** : Espèces en caisse
- **Date/heure** : Horodatage automatique
- **Responsable** : Utilisateur connecté

### 💳 **Mouvements**
- **Ventes** : Ajout automatique
- **Paiements** : Sorties enregistrées
- **Remboursements** : Déductions

### 🔒 **Fermeture de Caisse**
- **Comptage** : Montant réel en caisse
- **Écart** : Différence avec théorique
- **Rapport** : Résumé de la journée

## 📊 Rapports et Analytics

### 📈 **Rapport des Ventes**

#### 📅 **Périodes**
- **Jour** : Ventes du jour
- **Semaine** : Ventes de la semaine
- **Mois** : Ventes du mois
- **Personnalisé** : Date de début/fin

#### 📊 **Métriques**
```
Total ventes = Nombre de transactions
Chiffre d'affaires = Σ(Montants des ventes)
Bénéfice net = CA - Coûts d'achat
Panier moyen = CA / Nombre de ventes
```

### 📦 **Rapport d'Inventaire**

#### 📊 **Statistiques**
- **Total produits** : Nombre de références
- **Valeur stock** : Montant total
- **Stock faible** : Produits à commander
- **Ruptures** : Produits indisponibles

#### 📋 **Listes**
- **Produits en rupture** : Action immédiate
- **Stock faible** : Réapprovisionnement
- **Valeur par catégorie** : Répartition

### 👥 **Rapport Fournisseurs**

#### 💰 **Crédits**
- **Total dû** : Montant global
- **Par fournisseur** : Détail des dettes
- **Échéances** : Dates de paiement

#### 📊 **Analyses**
- **Fournisseurs principaux** : Volume d'achats
- **Conditions** : Comparaison des délais
- **Historique** : Évolution des relations

## 🔧 Fonctionnalités Avancées

### 🤖 **Calculs Automatiques**

#### 💰 **Prix de Vente**
```
Prix de vente = Prix d'achat + Marge
Marge = Prix d'achat × Pourcentage
```

#### 📈 **Bénéfices**
```
Bénéfice unitaire = Prix vente - Prix achat
Bénéfice total = Bénéfice unitaire × Quantité
Marge % = (Bénéfice / Prix vente) × 100
```

#### 📦 **Stocks**
```
Stock final = Stock initial + Entrées - Sorties
Valeur stock = Stock final × Prix d'achat
```

### ⚠️ **Alertes Automatiques**

#### 📦 **Stock**
- **Niveau faible** : Quantité ≤ Seuil minimum
- **Rupture** : Quantité = 0
- **Surstock** : Quantité excessive

#### 💰 **Financier**
- **Crédit fournisseur** : Dépassement de limite
- **Caisse** : Montant faible
- **Bénéfices** : Marge insuffisante

### 📊 **Export et Rapports**

#### 📄 **Formats**
- **PDF** : Rapports imprimables
- **Excel** : Données exportables
- **CSV** : Import/Export

#### 📈 **Graphiques**
- **Évolution CA** : Courbes temporelles
- **Répartition** : Camemberts par catégorie
- **Comparaisons** : Graphiques en barres

## 🚀 Bonnes Pratiques

### 📦 **Gestion des Stocks**
1. **Définir des seuils** réalistes
2. **Surveiller les alertes** quotidiennement
3. **Commander à temps** pour éviter les ruptures
4. **Vérifier les réceptions** avec soin

### 💰 **Gestion Financière**
1. **Contrôler les marges** régulièrement
2. **Suivre les crédits** fournisseurs
3. **Fermer la caisse** quotidiennement
4. **Analyser les rapports** mensuellement

### 👥 **Relations Fournisseurs**
1. **Négocier les conditions** de paiement
2. **Respecter les échéances** de paiement
3. **Maintenir des relations** de confiance
4. **Diversifier** les sources d'approvisionnement

## 🔧 Dépannage

### ❌ **Problèmes Courants**

#### 📦 **Stock Incorrect**
- **Vérifier** les mouvements de stock
- **Contrôler** les réceptions
- **Ajuster** manuellement si nécessaire

#### 💰 **Écarts de Caisse**
- **Recompter** le contenu
- **Vérifier** les transactions
- **Identifier** la source de l'écart

#### 👥 **Crédit Fournisseur**
- **Vérifier** les paiements enregistrés
- **Contrôler** les factures
- **Régulariser** les comptes

### 📞 **Support Technique**
- **Documentation** : Guides détaillés
- **Formation** : Sessions d'apprentissage
- **Assistance** : Support en ligne

---

**🎉 Votre système commercial Batobaye Market est maintenant opérationnel !**

**💡 Conseil** : Commencez par configurer vos fournisseurs et produits, puis testez une vente complète pour voir tous les calculs automatiques en action. 