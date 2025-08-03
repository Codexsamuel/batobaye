import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllSuppliers, 
  getSupplierById, 
  createSupplier, 
  updateSupplier,
  initCommercialDatabase 
} from '@/lib/db-commercial'

export async function GET(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const { searchParams } = request.nextUrl || new URL(request.url)
    const id = searchParams.get('id')
    
    if (id) {
      const supplierId = parseInt(id)
      const supplier = await getSupplierById(supplierId)
      if (!supplier) {
        return NextResponse.json(
          { success: false, error: 'Fournisseur non trouvé' },
          { status: 404 }
        )
      }
      
      return NextResponse.json({
        success: true,
        data: supplier
      })
    }
    
    const suppliers = await getAllSuppliers()
    return NextResponse.json({
      success: true,
      data: suppliers,
      count: suppliers.length
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des fournisseurs:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des fournisseurs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const body = await request.json()
    
    // Validation des données
    const requiredFields = ['name', 'contact_person', 'phone']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
    }
    
    // Créer le fournisseur
    const supplierData = {
      name: body.name,
      contact_person: body.contact_person,
      phone: body.phone,
      email: body.email || '',
      address: body.address || '',
      credit_limit: parseFloat(body.credit_limit) || 0,
      current_credit: parseFloat(body.current_credit) || 0,
      payment_terms: body.payment_terms || '30 jours'
    }
    
    const supplier = await createSupplier(supplierData)
    
    return NextResponse.json({
      success: true,
      data: supplier,
      message: 'Fournisseur créé avec succès'
    }, { status: 201 })
  } catch (error) {
    console.error('Erreur lors de la création du fournisseur:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du fournisseur' },
      { status: 500 }
    )
  }
} 