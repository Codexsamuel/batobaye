// Base de données simplifiée en mémoire pour le développement
// En production, utilisez PostgreSQL avec lib/db.ts

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

// Stockage en mémoire
let products: Product[] = []
let nextId = 1

const categories = [
  { id: 1, name: 'Réfrigérateurs', description: 'Réfrigérateurs et congélateurs', icon: '❄️', color: 'bg-blue-50' },
  { id: 2, name: 'Congélateurs', description: 'Congélateurs et freezers', icon: '🧊', color: 'bg-cyan-50' },
  { id: 3, name: 'Téléviseurs', description: 'Téléviseurs et écrans', icon: '📺', color: 'bg-purple-50' },
  { id: 4, name: 'Chauffe-eau', description: 'Chauffe-eau et chaudières', icon: '🔥', color: 'bg-orange-50' },
  { id: 5, name: 'Cuisinières', description: 'Cuisinières et fours', icon: '🍳', color: 'bg-red-50' },
  { id: 6, name: 'Lave-linge', description: 'Machines à laver et sèche-linge', icon: '👕', color: 'bg-green-50' },
]

// Ajouter quelques produits d'exemple
const sampleProducts: CreateProductData[] = [
  {
    name: 'Réfrigérateur Samsung 350L',
    description: 'Réfrigérateur Samsung avec technologie No Frost, capacité 350L, classe énergétique A++',
    price: 450000,
    original_price: 520000,
    stock_quantity: 15,
    category: 'Réfrigérateurs',
    brand: 'Samsung',
    model: 'RT35K5530S8',
    image_url: '/placeholder.svg',
    images: ['/placeholder.svg'],
    specifications: {
      'Capacité': '350L',
      'Classe énergétique': 'A++',
      'Technologie': 'No Frost',
      'Couleur': 'Inox'
    },
    status: 'active'
  },
  {
    name: 'TV Samsung 55" QLED',
    description: 'Téléviseur Samsung QLED 55 pouces avec résolution 4K et Smart TV',
    price: 380000,
    original_price: 450000,
    stock_quantity: 8,
    category: 'Téléviseurs',
    brand: 'Samsung',
    model: 'QN55Q60TAFXZA',
    image_url: '/placeholder.svg',
    images: ['/placeholder.svg'],
    specifications: {
      'Taille': '55 pouces',
      'Résolution': '4K UHD',
      'Technologie': 'QLED',
      'Smart TV': 'Oui'
    },
    status: 'active'
  },
  {
    name: 'Cuisinière 4 feux + Four',
    description: 'Cuisinière à gaz 4 feux avec four intégré, idéale pour la cuisine camerounaise',
    price: 180000,
    original_price: 220000,
    stock_quantity: 0,
    category: 'Cuisinières',
    brand: 'Brigo',
    model: 'CG-4F',
    image_url: '/placeholder.svg',
    images: ['/placeholder.svg'],
    specifications: {
      'Nombre de feux': '4',
      'Type': 'Gaz',
      'Four': 'Intégré',
      'Matériau': 'Acier inoxydable'
    },
    status: 'out_of_stock'
  }
]

// Initialiser avec des données d'exemple
export function initDatabase() {
  console.log('🗄️ Initialisation de la base de données en mémoire...')
  
  // Ajouter les produits d'exemple si la base est vide
  if (products.length === 0) {
    sampleProducts.forEach(productData => {
      const product: Product = {
        id: nextId++,
        ...productData,
        created_at: new Date(),
        updated_at: new Date()
      }
      products.push(product)
    })
    console.log(`✅ ${products.length} produits d'exemple ajoutés`)
  }
  
  return Promise.resolve()
}

// Fonctions CRUD
export async function getAllProducts(): Promise<Product[]> {
  return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getProductById(id: number): Promise<Product | null> {
  return products.find(p => p.id === id) || null
}

export async function createProduct(data: CreateProductData): Promise<Product> {
  const product: Product = {
    id: nextId++,
    ...data,
    created_at: new Date(),
    updated_at: new Date()
  }
  products.push(product)
  return product
}

export async function updateProduct(id: number, data: Partial<CreateProductData>): Promise<Product | null> {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return null
  
  products[index] = {
    ...products[index],
    ...data,
    updated_at: new Date()
  }
  
  return products[index]
}

export async function deleteProduct(id: number): Promise<boolean> {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return false
  
  products.splice(index, 1)
  return true
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter(p => p.category === category && p.status === 'active')
}

export async function searchProducts(query: string): Promise<Product[]> {
  const searchLower = query.toLowerCase()
  return products.filter(p => 
    (p.name.toLowerCase().includes(searchLower) ||
     p.description.toLowerCase().includes(searchLower) ||
     p.brand.toLowerCase().includes(searchLower) ||
     p.model.toLowerCase().includes(searchLower)) &&
    p.status === 'active'
  )
}

export async function getAllCategories() {
  return categories
}

// Fonction pour réinitialiser la base de données (utile pour les tests)
export function resetDatabase() {
  products = []
  nextId = 1
  initDatabase()
} 