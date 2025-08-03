import { NextRequest, NextResponse } from 'next/server'
import { 
  getSalesReport, 
  getInventoryReport, 
  getSupplierReport,
  getCurrentCashRegister,
  initCommercialDatabase 
} from '@/lib/db-commercial'

// Forcer la route à être dynamique
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    await initCommercialDatabase()
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    let start: Date | undefined
    let end: Date | undefined
    
    if (startDate && endDate) {
      start = new Date(startDate)
      end = new Date(endDate)
    }
    
    switch (type) {
      case 'sales':
        const salesReport = await getSalesReport(start, end)
        return NextResponse.json({
          success: true,
          data: salesReport
        })
        
      case 'inventory':
        const inventoryReport = await getInventoryReport()
        return NextResponse.json({
          success: true,
          data: inventoryReport
        })
        
      case 'suppliers':
        const supplierReport = await getSupplierReport()
        return NextResponse.json({
          success: true,
          data: supplierReport
        })
        
      case 'cash_register':
        const cashRegister = await getCurrentCashRegister()
        return NextResponse.json({
          success: true,
          data: cashRegister
        })
        
      case 'dashboard':
        // Rapport complet pour le tableau de bord
        const [salesReportData, inventoryReportData, supplierReportData, cashRegisterData] = await Promise.all([
          getSalesReport(start, end),
          getInventoryReport(),
          getSupplierReport(),
          getCurrentCashRegister()
        ])
        
        return NextResponse.json({
          success: true,
          data: {
            sales: salesReportData,
            inventory: inventoryReportData,
            suppliers: supplierReportData,
            cashRegister: cashRegisterData
          }
        })
        
      default:
        // Retourner le rapport dashboard par défaut si aucun type n'est spécifié
        const [defaultSalesReport, defaultInventoryReport, defaultSupplierReport, defaultCashRegister] = await Promise.all([
          getSalesReport(start, end),
          getInventoryReport(),
          getSupplierReport(),
          getCurrentCashRegister()
        ])
        
        return NextResponse.json({
          success: true,
          data: {
            sales: defaultSalesReport,
            inventory: defaultInventoryReport,
            suppliers: defaultSupplierReport,
            cashRegister: defaultCashRegister
          }
        })
    }
  } catch (error) {
    console.error('Erreur lors de la génération du rapport:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la génération du rapport' },
      { status: 500 }
    )
  }
} 