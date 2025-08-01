import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, createProduct, initDatabase } from '@/lib/db-simple'

export async function GET(request: NextRequest) {
  try {
    // Initialiser la base de données si nécessaire
    await initDatabase()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    
    let products = await getAllProducts()
    
    // Filtrer par catégorie
    if (category && category !== 'all') {
      products = products.filter(product => product.category === category)
    }
    
    // Filtrer par statut
    if (status && status !== 'all') {
      products = products.filter(product => product.status === status)
    }
    
    // Filtrer par recherche
    if (search) {
      const searchLower = search.toLowerCase()
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.model.toLowerCase().includes(searchLower)
      )
    }
    
    return NextResponse.json({
      success: true,
      data: products,
      count: products.length
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Initialiser la base de données si nécessaire
    await initDatabase()
    
    const body = await request.json()
    
    // Validation des données
    const requiredFields = ['name', 'price', 'original_price', 'stock_quantity', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
    }
    
    // Créer le produit
    const productData = {
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price),
      original_price: parseFloat(body.original_price),
      stock_quantity: parseInt(body.stock_quantity),
      category: body.category,
      brand: body.brand || '',
      model: body.model || '',
      image_url: body.image_url || '',
      images: body.images || [],
      specifications: body.specifications || {},
      status: body.status || 'active'
    }
    
    const newProduct = await createProduct(productData)
    
    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Produit créé avec succès'
    }, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du produit' },
      { status: 500 }
    )
  }
} 