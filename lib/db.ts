import { Pool } from 'pg'

// Configuration de la base de données PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

// Types pour les produits
export interface Product {
  id: number
  name: string
  description: string
  price: number
  original_price: number
  stock_quantity: number
  category: string
  brand: string
  model: string
  image_url: string
  images: string[]
  specifications: Record<string, any>
  status: 'active' | 'inactive' | 'out_of_stock'
  created_at: Date
  updated_at: Date
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  original_price: number
  stock_quantity: number
  category: string
  brand: string
  model: string
  image_url: string
  images: string[]
  specifications: Record<string, any>
  status: 'active' | 'inactive' | 'out_of_stock'
}

// Initialisation de la base de données
export async function initDatabase() {
  try {
    const client = await pool.connect()
    
    // Créer la table products si elle n'existe pas
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2) NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        category VARCHAR(100) NOT NULL,
        brand VARCHAR(100),
        model VARCHAR(100),
        image_url TEXT,
        images TEXT[],
        specifications JSONB,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Créer la table categories si elle n'existe pas
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        icon VARCHAR(50),
        color VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insérer les catégories par défaut si elles n'existent pas
    await client.query(`
      INSERT INTO categories (name, description, icon, color) VALUES
      ('Réfrigérateurs', 'Réfrigérateurs et congélateurs', '❄️', 'bg-blue-50'),
      ('Congélateurs', 'Congélateurs et freezers', '🧊', 'bg-cyan-50'),
      ('Téléviseurs', 'Téléviseurs et écrans', '📺', 'bg-purple-50'),
      ('Chauffe-eau', 'Chauffe-eau et chaudières', '🔥', 'bg-orange-50'),
      ('Cuisinières', 'Cuisinières et fours', '🍳', 'bg-red-50'),
      ('Lave-linge', 'Machines à laver et sèche-linge', '👕', 'bg-green-50')
      ON CONFLICT (name) DO NOTHING
    `)

    client.release()
    console.log('✅ Base de données initialisée avec succès')
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error)
    throw error
  }
}

// Fonctions CRUD pour les produits
export async function getAllProducts(): Promise<Product[]> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM products ORDER BY created_at DESC')
    return result.rows
  } finally {
    client.release()
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM products WHERE id = $1', [id])
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      INSERT INTO products (
        name, description, price, original_price, stock_quantity, 
        category, brand, model, image_url, images, specifications, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      data.name, data.description, data.price, data.original_price, data.stock_quantity,
      data.category, data.brand, data.model, data.image_url, data.images, 
      JSON.stringify(data.specifications), data.status
    ])
    return result.rows[0]
  } finally {
    client.release()
  }
}

export async function updateProduct(id: number, data: Partial<CreateProductData>): Promise<Product | null> {
  const client = await pool.connect()
  try {
    const fields = Object.keys(data)
    const values = Object.values(data)
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
    
    const result = await client.query(`
      UPDATE products SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 RETURNING *
    `, [id, ...values])
    
    return result.rows[0] || null
  } finally {
    client.release()
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  const client = await pool.connect()
  try {
    const result = await client.query('DELETE FROM products WHERE id = $1', [id])
    return (result.rowCount || 0) > 0
  } finally {
    client.release()
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM products WHERE category = $1 AND status = $2 ORDER BY created_at DESC', [category, 'active'])
    return result.rows
  } finally {
    client.release()
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  const client = await pool.connect()
  try {
    const result = await client.query(`
      SELECT * FROM products 
      WHERE (name ILIKE $1 OR description ILIKE $1 OR brand ILIKE $1 OR model ILIKE $1)
      AND status = 'active'
      ORDER BY created_at DESC
    `, [`%${query}%`])
    return result.rows
  } finally {
    client.release()
  }
}

export async function getAllCategories() {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM categories ORDER BY name')
    return result.rows
  } finally {
    client.release()
  }
}

export default pool 