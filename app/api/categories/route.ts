import { NextRequest, NextResponse } from 'next/server'
import { getAllCategories, initDatabase } from '@/lib/db-simple'

export async function GET(request: NextRequest) {
  try {
    // Initialiser la base de données si nécessaire
    await initDatabase()
    
    const categories = await getAllCategories()
    
    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des catégories' },
      { status: 500 }
    )
  }
} 