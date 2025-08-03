// Module de calculs commerciaux inspiré de SAGE SAARI
// Gestion des prix, TVA, marges, stocks, comptabilité

export interface TaxCalculation {
  amountHT: number
  amountTVA: number
  amountTTC: number
  taxRate: number
}

export interface ProfitCalculation {
  purchasePrice: number
  sellingPrice: number
  margin: number
  marginPercentage: number
  profitPerUnit: number
}

export interface StockCalculation {
  currentStock: number
  minStockLevel: number
  reorderPoint: number
  dailyConsumption: number
  reorderLeadTime: number
  safetyStock: number
}

export interface OrderCalculation {
  items: Array<{
    productId: number
    quantity: number
    unitPrice: number
    discount: number
    taxRate: number
  }>
  subtotal: number
  totalDiscount: number
  totalTax: number
  totalAmount: number
}

// 📌 1. Calcul du montant HT (Hors Taxes)
export function calculateHT(amountTTC: number, taxRate: number): number {
  return amountTTC / (1 + taxRate / 100)
}

// 📌 2. Calcul du montant TVA
export function calculateTVA(amountHT: number, taxRate: number): number {
  return amountHT * (taxRate / 100)
}

// 📌 3. Calcul du montant TTC
export function calculateTTC(amountHT: number, taxRate: number): number {
  return amountHT * (1 + taxRate / 100)
}

// 📌 4. Calcul complet des taxes (HT, TVA, TTC)
export function calculateTaxes(amount: number, taxRate: number, isHT: boolean = true): TaxCalculation {
  if (isHT) {
    const amountHT = amount
    const amountTVA = calculateTVA(amountHT, taxRate)
    const amountTTC = calculateTTC(amountHT, taxRate)
    
    return {
      amountHT,
      amountTVA,
      amountTTC,
      taxRate
    }
  } else {
    const amountTTC = amount
    const amountHT = calculateHT(amountTTC, taxRate)
    const amountTVA = calculateTVA(amountHT, taxRate)
    
    return {
      amountHT,
      amountTVA,
      amountTTC,
      taxRate
    }
  }
}

// 📌 5. Calcul de la marge bénéficiaire brute
export function calculateProfit(purchasePrice: number, sellingPrice: number): ProfitCalculation {
  const margin = sellingPrice - purchasePrice
  const marginPercentage = purchasePrice > 0 ? (margin / sellingPrice) * 100 : 0
  const profitPerUnit = margin

  return {
    purchasePrice,
    sellingPrice,
    margin,
    marginPercentage,
    profitPerUnit
  }
}

// 📌 6. Calcul des totaux de commande
export function calculateOrderTotals(items: OrderCalculation['items']): {
  subtotal: number
  totalDiscount: number
  totalTax: number
  totalAmount: number
} {
  let subtotal = 0
  let totalDiscount = 0
  let totalTax = 0

  items.forEach(item => {
    const itemSubtotal = item.quantity * item.unitPrice
    const itemDiscount = itemSubtotal * (item.discount / 100)
    const itemNetAmount = itemSubtotal - itemDiscount
    const itemTax = calculateTVA(itemNetAmount, item.taxRate)

    subtotal += itemSubtotal
    totalDiscount += itemDiscount
    totalTax += itemTax
  })

  const totalAmount = subtotal - totalDiscount + totalTax

  return {
    subtotal,
    totalDiscount,
    totalTax,
    totalAmount
  }
}

// 📌 7. Calcul du seuil de réapprovisionnement
export function calculateReorderPoint(
  dailyConsumption: number,
  leadTime: number,
  safetyStock: number = 0
): number {
  return (dailyConsumption * leadTime) + safetyStock
}

// 📌 8. Calcul du stock de sécurité
export function calculateSafetyStock(
  dailyConsumption: number,
  consumptionVariability: number, // Écart-type de la consommation
  serviceLevel: number = 1.65 // Niveau de service 95%
): number {
  return Math.ceil(dailyConsumption * consumptionVariability * serviceLevel)
}

// 📌 9. Calcul du taux de rotation des stocks
export function calculateStockTurnover(
  costOfGoodsSold: number,
  averageInventory: number
): number {
  return averageInventory > 0 ? costOfGoodsSold / averageInventory : 0
}

// 📌 10. Calcul de la valorisation des stocks (CUMP)
export function calculateCUMP(
  initialStock: number,
  initialValue: number,
  newQuantity: number,
  newValue: number
): number {
  const totalQuantity = initialStock + newQuantity
  const totalValue = initialValue + newValue
  
  return totalQuantity > 0 ? totalValue / totalQuantity : 0
}

// 📌 11. Calcul des remises
export function calculateDiscount(price: number, discountRate: number): {
  discountAmount: number
  finalPrice: number
} {
  const discountAmount = price * (discountRate / 100)
  const finalPrice = price - discountAmount

  return {
    discountAmount,
    finalPrice
  }
}

// 📌 12. Calcul des échéances de paiement
export function calculateDueDate(invoiceDate: Date, paymentTerms: number): Date {
  const dueDate = new Date(invoiceDate)
  dueDate.setDate(dueDate.getDate() + paymentTerms)
  return dueDate
}

// 📌 13. Calcul du chiffre d'affaires sur une période
export function calculateRevenue(sales: Array<{ amount: number; date: Date }>, startDate: Date, endDate: Date): number {
  return sales
    .filter(sale => sale.date >= startDate && sale.date <= endDate)
    .reduce((total, sale) => total + sale.amount, 0)
}

// 📌 14. Calcul de la rentabilité par produit
export function calculateProductProfitability(
  sales: Array<{
    productId: number
    quantity: number
    sellingPrice: number
    costPrice: number
  }>
): Record<number, {
  totalRevenue: number
  totalCost: number
  totalProfit: number
  profitMargin: number
  unitsSold: number
}> {
  const profitability: Record<number, any> = {}

  sales.forEach(sale => {
    if (!profitability[sale.productId]) {
      profitability[sale.productId] = {
        totalRevenue: 0,
        totalCost: 0,
        totalProfit: 0,
        profitMargin: 0,
        unitsSold: 0
      }
    }

    const revenue = sale.quantity * sale.sellingPrice
    const cost = sale.quantity * sale.costPrice
    const profit = revenue - cost

    profitability[sale.productId].totalRevenue += revenue
    profitability[sale.productId].totalCost += cost
    profitability[sale.productId].totalProfit += profit
    profitability[sale.productId].unitsSold += sale.quantity
  })

  // Calculer les marges
  Object.keys(profitability).forEach(productId => {
    const product = profitability[parseInt(productId)]
    product.profitMargin = product.totalRevenue > 0 
      ? (product.totalProfit / product.totalRevenue) * 100 
      : 0
  })

  return profitability
}

// 📌 15. Calcul des indicateurs de performance (KPIs)
export function calculateKPIs(sales: any[], products: any[], period: 'day' | 'week' | 'month' | 'year') {
  const now = new Date()
  let startDate: Date

  switch (period) {
    case 'day':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1)
      break
  }

  const periodSales = sales.filter(sale => new Date(sale.date) >= startDate)
  
  const totalRevenue = periodSales.reduce((sum, sale) => sum + sale.final_amount, 0)
  const totalOrders = periodSales.length
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  
  const activeProducts = products.filter(p => p.status === 'active').length
  const lowStockProducts = products.filter(p => p.stock_quantity <= p.min_stock_level).length

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    activeProducts,
    lowStockProducts,
    period
  }
}

// 📌 16. Formatage des montants en FCFA
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// 📌 17. Validation des calculs comptables
export function validateAccountingEntry(
  debits: Array<{ account: string; amount: number }>,
  credits: Array<{ account: string; amount: number }>
): { isValid: boolean; totalDebits: number; totalCredits: number; difference: number } {
  const totalDebits = debits.reduce((sum, entry) => sum + entry.amount, 0)
  const totalCredits = credits.reduce((sum, entry) => sum + entry.amount, 0)
  const difference = Math.abs(totalDebits - totalCredits)
  const isValid = difference < 0.01 // Tolérance de 1 centime

  return {
    isValid,
    totalDebits,
    totalCredits,
    difference
  }
}

// 📌 18. Calcul de la TVA par taux
export function calculateTaxByRate(items: Array<{ amount: number; taxRate: number }>): Record<number, number> {
  const taxByRate: Record<number, number> = {}

  items.forEach(item => {
    if (!taxByRate[item.taxRate]) {
      taxByRate[item.taxRate] = 0
    }
    taxByRate[item.taxRate] += calculateTVA(item.amount, item.taxRate)
  })

  return taxByRate
}

// 📌 19. Calcul de la rentabilité par catégorie
export function calculateCategoryProfitability(
  products: Array<{
    id: number
    category: string
    purchase_price: number
    selling_price: number
    stock_quantity: number
  }>
): Record<string, {
  totalValue: number
  totalCost: number
  potentialProfit: number
  profitMargin: number
  productCount: number
}> {
  const categories: Record<string, any> = {}

  products.forEach(product => {
    if (!categories[product.category]) {
      categories[product.category] = {
        totalValue: 0,
        totalCost: 0,
        potentialProfit: 0,
        profitMargin: 0,
        productCount: 0
      }
    }

    const value = product.stock_quantity * product.selling_price
    const cost = product.stock_quantity * product.purchase_price
    const profit = value - cost

    categories[product.category].totalValue += value
    categories[product.category].totalCost += cost
    categories[product.category].potentialProfit += profit
    categories[product.category].productCount += 1
  })

  // Calculer les marges
  Object.keys(categories).forEach(category => {
    const cat = categories[category]
    cat.profitMargin = cat.totalValue > 0 
      ? (cat.potentialProfit / cat.totalValue) * 100 
      : 0
  })

  return categories
}

// 📌 20. Calcul des alertes de stock
export function calculateStockAlerts(products: Array<{
  id: number
  name: string
  stock_quantity: number
  min_stock_level: number
  daily_consumption?: number
  lead_time?: number
}>): {
  outOfStock: any[]
  lowStock: any[]
  reorderAlerts: any[]
} {
  const outOfStock = products.filter(p => p.stock_quantity === 0)
  const lowStock = products.filter(p => p.stock_quantity > 0 && p.stock_quantity <= p.min_stock_level)
  
  const reorderAlerts = products.filter(p => {
    if (!p.daily_consumption || !p.lead_time) return false
    const reorderPoint = calculateReorderPoint(p.daily_consumption, p.lead_time)
    return p.stock_quantity <= reorderPoint
  })

  return {
    outOfStock,
    lowStock,
    reorderAlerts
  }
}

export default {
  calculateHT,
  calculateTVA,
  calculateTTC,
  calculateTaxes,
  calculateProfit,
  calculateOrderTotals,
  calculateReorderPoint,
  calculateSafetyStock,
  calculateStockTurnover,
  calculateCUMP,
  calculateDiscount,
  calculateDueDate,
  calculateRevenue,
  calculateProductProfitability,
  calculateKPIs,
  formatFCFA,
  validateAccountingEntry,
  calculateTaxByRate,
  calculateCategoryProfitability,
  calculateStockAlerts
} 