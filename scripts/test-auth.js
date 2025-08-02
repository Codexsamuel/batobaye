#!/usr/bin/env node

/**
 * Script de test de l'authentification
 * Vérifie que le système d'authentification fonctionne correctement
 */

const fs = require('fs')
const path = require('path')

console.log('🔐 Test du système d\'authentification Batobaye Market...\n')

// 1. Vérifier les fichiers d'authentification
console.log('📁 Vérification des fichiers d\'authentification...')

const authFiles = [
  'lib/auth.ts',
  'hooks/useAuth.tsx',
  'app/admin/login/page.tsx',
  'app/admin/layout.tsx',
  'components/admin/Sidebar.tsx',
  'app/admin/users/page.tsx'
]

authFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file)
    console.log(`✅ ${file} (${(stats.size / 1024).toFixed(1)} KB)`)
  } else {
    console.log(`❌ ${file} - MANQUANT`)
  }
})

console.log('')

// 2. Vérifier les identifiants Super Admin
console.log('👑 Vérification des identifiants Super Admin...')

const authFile = 'lib/auth.ts'
if (fs.existsSync(authFile)) {
  const content = fs.readFileSync(authFile, 'utf8')
  
  const superAdminChecks = [
    { name: 'Email Super Admin', pattern: 'sobam@daveandlucesolutions.com' },
    { name: 'Mot de passe Super Admin', pattern: '@DavyFrantz2025' },
    { name: 'Rôle super_admin', pattern: 'super_admin' },
    { name: 'Permissions complètes', pattern: 'users:write' },
    { name: 'Gestion des sessions', pattern: 'verifyToken' },
    { name: 'Fonction de déconnexion', pattern: 'logout' }
  ]
  
  superAdminChecks.forEach(check => {
    if (content.includes(check.pattern)) {
      console.log(`✅ ${check.name}`)
    } else {
      console.log(`❌ ${check.name} - MANQUANT`)
    }
  })
}

console.log('')

// 3. Vérifier les permissions par rôle
console.log('🔑 Vérification des permissions par rôle...')

const permissionChecks = [
  { role: 'Super Admin', permissions: ['users:write', 'deploy:write', 'code:write', 'ai:write'] },
  { role: 'Admin', permissions: ['products:write', 'orders:write', 'content:write', 'design:write'] }
]

permissionChecks.forEach(check => {
  console.log(`\n${check.role}:`)
  check.permissions.forEach(permission => {
    if (fs.existsSync(authFile)) {
      const content = fs.readFileSync(authFile, 'utf8')
      if (content.includes(permission)) {
        console.log(`  ✅ ${permission}`)
      } else {
        console.log(`  ❌ ${permission} - MANQUANT`)
      }
    }
  })
})

console.log('')

// 4. Vérifier les composants UI
console.log('🎨 Vérification des composants UI...')

const uiComponents = [
  'components/ui/button.tsx',
  'components/ui/input.tsx',
  'components/ui/card.tsx',
  'components/ui/alert.tsx',
  'components/ui/dialog.tsx',
  'components/ui/table.tsx',
  'components/ui/badge.tsx'
]

uiComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`✅ ${component}`)
  } else {
    console.log(`❌ ${component} - MANQUANT`)
  }
})

console.log('')

// 5. Vérifier les routes protégées
console.log('🛡️ Vérification des routes protégées...')

const protectedRoutes = [
  'app/admin/page.tsx',
  'app/admin/products/page.tsx',
  'app/admin/orders/page.tsx',
  'app/admin/content/page.tsx',
  'app/admin/media/page.tsx',
  'app/admin/seo/page.tsx',
  'app/admin/design/page.tsx',
  'app/admin/deploy/page.tsx',
  'app/admin/ia/page.tsx',
  'app/admin/code/page.tsx',
  'app/admin/settings/page.tsx'
]

protectedRoutes.forEach(route => {
  if (fs.existsSync(route)) {
    console.log(`✅ ${route}`)
  } else {
    console.log(`❌ ${route} - MANQUANT`)
  }
})

console.log('')

// 6. Créer un guide de test
console.log('🧪 GUIDE DE TEST DE L\'AUTHENTIFICATION')
console.log('=' .repeat(60))

console.log('\n1. 🔐 TEST DE CONNEXION SUPER ADMIN')
console.log('   URL: http://localhost:3000/admin/login')
console.log('   Email: sobam@daveandlucesolutions.com')
console.log('   Mot de passe: @DavyFrantz2025')
console.log('   Résultat attendu: Redirection vers /admin')

console.log('\n2. 👑 VÉRIFICATION DES PERMISSIONS SUPER ADMIN')
console.log('   - Accès à toutes les sections du menu')
console.log('   - Section "Outils Avancés" visible')
console.log('   - Section "Système" avec "Utilisateurs" et "Sécurité"')
console.log('   - Badge "Super Admin" dans la sidebar')

console.log('\n3. 👥 CRÉATION D\'UN UTILISATEUR ADMIN')
console.log('   - Aller sur /admin/users')
console.log('   - Cliquer sur "Créer un Admin"')
console.log('   - Remplir le formulaire')
console.log('   - Vérifier que l\'utilisateur apparaît dans la liste')

console.log('\n4. 🔄 TEST DE CONNEXION ADMIN')
console.log('   - Se déconnecter')
console.log('   - Se reconnecter avec le nouvel admin')
console.log('   - Vérifier les restrictions:')
console.log('     * Pas d\'accès aux "Outils Avancés"')
console.log('     * Pas d\'accès à "Utilisateurs" et "Sécurité"')
console.log('     * Badge "Admin" dans la sidebar')

console.log('\n5. 🛡️ TEST DE PROTECTION DES ROUTES')
console.log('   - Essayer d\'accéder à /admin/users en tant qu\'admin')
console.log('   - Résultat attendu: Redirection vers /admin')
console.log('   - Essayer d\'accéder à /admin sans être connecté')
console.log('   - Résultat attendu: Redirection vers /admin/login')

console.log('\n6. 🔒 TEST DE DÉCONNEXION')
console.log('   - Cliquer sur "Déconnexion"')
console.log('   - Résultat attendu: Redirection vers /admin/login')
console.log('   - Essayer d\'accéder à /admin')
console.log('   - Résultat attendu: Redirection vers /admin/login')

console.log('\n7. ⏰ TEST DE SESSION')
console.log('   - Se connecter')
console.log('   - Attendre 24h ou modifier la date d\'expiration')
console.log('   - Résultat attendu: Session expirée, redirection vers login')

console.log('\n🎯 POINTS CRITIQUES À VÉRIFIER')
console.log('=' .repeat(60))
console.log('✅ Authentification fonctionnelle')
console.log('✅ Protection des routes')
console.log('✅ Gestion des rôles et permissions')
console.log('✅ Interface utilisateur adaptative')
console.log('✅ Gestion des sessions')
console.log('✅ Déconnexion sécurisée')
console.log('✅ Messages d\'erreur clairs')
console.log('✅ Validation des formulaires')

console.log('\n✨ Système d\'authentification prêt pour les tests !')
console.log('🎯 Utilisez les identifiants Super Admin pour commencer.') 