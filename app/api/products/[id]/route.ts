import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct, initDatabase } from '@/lib/db-simple'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase()
    
    const product = await getProductById(parseInt(params.id))
    
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération du produit' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase()
    
    const body = await request.json()
    const productId = parseInt(params.id)
    
    // Vérifier que le produit existe
    const existingProduct = await getProductById(productId)
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      )
    }
    
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
    
    // Préparer les données de mise à jour
    const updateData = {
      id: productId,
      name: body.name,
      description: body.description || existingProduct.description,
      price: parseFloat(body.price),
      original_price: parseFloat(body.original_price),
      stock_quantity: parseInt(body.stock_quantity),
      category: body.category,
      brand: body.brand || existingProduct.brand,
      model: body.model || existingProduct.model,
      image_url: body.image_url || existingProduct.image_url,
      images: body.images || existingProduct.images,
      specifications: body.specifications || existingProduct.specifications,
      status: body.status || existingProduct.status,
      updated_at: new Date().toISOString()
    }
    
    const updatedProduct = await updateProduct(productId, updateData)
    
    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Produit mis à jour avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await initDatabase()
    
    const productId = parseInt(params.id)
    
    // Vérifier que le produit existe
    const existingProduct = await getProductById(productId)
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      )
    }
    
    // Supprimer le produit
    await deleteProduct(productId)
    
    return NextResponse.json({
      success: true,
      message: 'Produit supprimé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    )
  }
} 