
// Test d'authentification rapide
const { initializeAuthSystem, login } = require('./lib/auth');

// Initialiser le système
initializeAuthSystem();

// Tester la connexion
const result = login({
  email: 'sobam@daveandlucesolutions.com',
  password: '@DavyFrantz2025'
});

console.log('🔐 Test d\'authentification:');
console.log('Résultat:', result.success ? '✅ SUCCÈS' : '❌ ÉCHEC');
if (result.error) console.log('Erreur:', result.error);
if (result.user) console.log('Utilisateur:', result.user.name, '(', result.user.role, ')');
