#!/usr/bin/env node

const { initDatabase } = require('../lib/db')

console.log('🗄️ Initialisation de la base de données Batobaye Market...\n')

async function main() {
  try {
    await initDatabase()
    console.log('✅ Base de données initialisée avec succès !')
    console.log('\n📋 Tables créées :')
    console.log('   • products - Gestion des produits')
    console.log('   • categories - Catégories de produits')
    console.log('\n🏷️ Catégories par défaut ajoutées :')
    console.log('   • Réfrigérateurs')
    console.log('   • Congélateurs')
    console.log('   • Téléviseurs')
    console.log('   • Chauffe-eau')
    console.log('   • Cuisinières')
    console.log('   • Lave-linge')
    console.log('\n🚀 Votre base de données est prête !')
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation :', error.message)
    console.log('\n💡 Vérifiez que :')
    console.log('   1. PostgreSQL est installé et en cours d\'exécution')
    console.log('   2. La variable DATABASE_URL est configurée dans .env.local')
    console.log('   3. La base de données existe')
    process.exit(1)
  }
}

main() 