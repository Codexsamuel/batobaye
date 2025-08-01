import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct, initDatabase } from '@/lib/db-simple'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Initialiser la base de données si nécessaire
    await initDatabase()
    
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de produit invalide' },
        { status: 400 }
      )
    }
    
    const product = await getProductById(id)
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
    // Initialiser la base de données si nécessaire
    await initDatabase()
    
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de produit invalide' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    
    // Vérifier que le produit existe
    const existingProduct = await getProductById(id)
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      )
    }
    
    // Préparer les données de mise à jour
    const updateData: any = {}
    
    if (body.name !== undefined) updateData.name = body.name
    if (body.description !== undefined) updateData.description = body.description
    if (body.price !== undefined) updateData.price = parseFloat(body.price)
    if (body.original_price !== undefined) updateData.original_price = parseFloat(body.original_price)
    if (body.stock_quantity !== undefined) updateData.stock_quantity = parseInt(body.stock_quantity)
    if (body.category !== undefined) updateData.category = body.category
    if (body.brand !== undefined) updateData.brand = body.brand
    if (body.model !== undefined) updateData.model = body.model
    if (body.image_url !== undefined) updateData.image_url = body.image_url
    if (body.images !== undefined) updateData.images = body.images
    if (body.specifications !== undefined) updateData.specifications = body.specifications
    if (body.status !== undefined) updateData.status = body.status
    
    const updatedProduct = await updateProduct(id, updateData)
    
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la mise à jour du produit' },
        { status: 500 }
      )
    }
    
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
    // Initialiser la base de données si nécessaire
    await initDatabase()
    
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de produit invalide' },
        { status: 400 }
      )
    }
    
    // Vérifier que le produit existe
    const existingProduct = await getProductById(id)
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      )
    }
    
    const deleted = await deleteProduct(id)
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la suppression du produit' },
        { status: 500 }
      )
    }
    
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