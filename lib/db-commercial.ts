// Base de données commerciale complète pour Batobaye Market
// Gestion des fournisseurs, stocks, ventes, comptabilité

export interface Supplier {
  id: number
  name: string
  contact_person: string
  phone: string
  email: string
  address: string
  credit_limit: number
  current_credit: number
  payment_terms: string
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: number
  name: string
  description: string
  purchase_price: number // Coût d'achat
  selling_price: number // Prix de vente
  original_price: number // Prix barré
  stock_quantity: number
  min_stock_level: number
  category: string
  brand: string
  model: string
  supplier_id: number
  image_url: string
  images: string[]
  specifications: Record<string, any>
  status: 'active' | 'inactive' | 'out_of_stock'
  created_at: Date
  updated_at: Date
}

export interface PurchaseOrder {
  id: number
  supplier_id: number
  order_date: Date
  delivery_date?: Date
  total_amount: number
  paid_amount: number
  status: 'pending' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'partial' | 'paid'
  notes: string
  created_at: Date
  updated_at: Date
}

export interface PurchaseOrderItem {
  id: number
  purchase_order_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
}

export interface Sale {
  id: number
  customer_name: string
  customer_phone: string
  customer_email?: string
  sale_date: Date
  total_amount: number
  discount_amount: number
  tax_amount: number
  final_amount: number
  payment_method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer' | 'cinetpay'
  payment_status: 'pending' | 'paid' | 'partial'
  sale_type: 'in_store' | 'online' | 'delivery'
  notes: string
  created_at: Date
  updated_at: Date
}

export interface SaleItem {
  id: number
  sale_id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
  cost_price: number // Coût de revient
  profit: number // Marge bénéficiaire
}

export interface StockMovement {
  id: number
  product_id: number
  movement_type: 'purchase' | 'sale' | 'adjustment' | 'return'
  quantity: number
  previous_stock: number
  new_stock: number
  reference_id?: number // ID de la vente ou commande
  notes: string
  created_at: Date
}

export interface Payment {
  id: number
  reference_type: 'sale' | 'purchase' | 'supplier_credit'
  reference_id: number
  amount: number
  payment_method: 'cash' | 'card' | 'mobile_money' | 'bank_transfer' | 'cinetpay'
  payment_date: Date
  notes: string
  created_at: Date
}

export interface CashRegister {
  id: number
  opening_amount: number
  closing_amount: number
  total_sales: number
  total_payments: number
  total_refunds: number
  opening_date: Date
  closing_date?: Date
  status: 'open' | 'closed'
  notes: string
  created_at: Date
  updated_at: Date
}

// Stockage en mémoire pour le développement
let suppliers: Supplier[] = []
let products: Product[] = []
let purchaseOrders: PurchaseOrder[] = []
let purchaseOrderItems: PurchaseOrderItem[] = []
let sales: Sale[] = []
let saleItems: SaleItem[] = []
let stockMovements: StockMovement[] = []
let payments: Payment[] = []
let cashRegisters: CashRegister[] = []

let nextId = {
  suppliers: 1,
  products: 1,
  purchaseOrders: 1,
  purchaseOrderItems: 1,
  sales: 1,
  saleItems: 1,
  stockMovements: 1,
  payments: 1,
  cashRegisters: 1
}

// Données d'exemple
const sampleSuppliers: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'ElectroCam SARL',
    contact_person: 'Jean Mbarga',
    phone: '+237 672 02 77 44',
    email: 'contact@electrocam.cm',
    address: 'Douala, Akwa',
    credit_limit: 5000000,
    current_credit: 0,
    payment_terms: '30 jours'
  },
  {
    name: 'Samsung Cameroun',
    contact_person: 'Marie Nguemo',
    phone: '+237 691 23 45 67',
    email: 'marie.nguemo@samsung.cm',
    address: 'Yaoundé, Centre',
    credit_limit: 10000000,
    current_credit: 0,
    payment_terms: '45 jours'
  },
  {
    name: 'LG Distribution',
    contact_person: 'Pierre Essomba',
    phone: '+237 655 98 76 54',
    email: 'pierre.essomba@lg.cm',
    address: 'Douala, Bonanjo',
    credit_limit: 8000000,
    current_credit: 0,
    payment_terms: '30 jours'
  }
]

const sampleProducts: Omit<Product, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    name: 'Réfrigérateur Samsung 350L',
    description: 'Réfrigérateur Samsung avec technologie No Frost, capacité 350L, classe énergétique A++',
    purchase_price: 380000,
    selling_price: 450000,
    original_price: 520000,
    stock_quantity: 15,
    min_stock_level: 5,
    category: 'Réfrigérateurs',
    brand: 'Samsung',
    model: 'RT35K5530S8',
    supplier_id: 2,
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
    purchase_price: 320000,
    selling_price: 380000,
    original_price: 450000,
    stock_quantity: 8,
    min_stock_level: 3,
    category: 'Téléviseurs',
    brand: 'Samsung',
    model: 'QN55Q60TAFXZA',
    supplier_id: 2,
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
    purchase_price: 150000,
    selling_price: 180000,
    original_price: 220000,
    stock_quantity: 0,
    min_stock_level: 2,
    category: 'Cuisinières',
    brand: 'Brigo',
    model: 'CG-4F',
    supplier_id: 1,
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

// Initialisation
export function initCommercialDatabase() {
  console.log('🏪 Initialisation de la base de données commerciale...')
  
  // Ajouter les fournisseurs d'exemple
  if (suppliers.length === 0) {
    sampleSuppliers.forEach(supplierData => {
      const supplier: Supplier = {
        id: nextId.suppliers++,
        ...supplierData,
        created_at: new Date(),
        updated_at: new Date()
      }
      suppliers.push(supplier)
    })
    console.log(`✅ ${suppliers.length} fournisseurs ajoutés`)
  }
  
  // Ajouter les produits d'exemple
  if (products.length === 0) {
    sampleProducts.forEach(productData => {
      const product: Product = {
        id: nextId.products++,
        ...productData,
        created_at: new Date(),
        updated_at: new Date()
      }
      products.push(product)
    })
    console.log(`✅ ${products.length} produits ajoutés`)
  }
  
  // Créer une caisse ouverte
  if (cashRegisters.length === 0) {
    const cashRegister: CashRegister = {
      id: nextId.cashRegisters++,
      opening_amount: 100000,
      closing_amount: 0,
      total_sales: 0,
      total_payments: 0,
      total_refunds: 0,
      opening_date: new Date(),
      status: 'open',
      notes: 'Ouverture de caisse initiale',
      created_at: new Date(),
      updated_at: new Date()
    }
    cashRegisters.push(cashRegister)
    console.log('✅ Caisse ouverte')
  }
  
  return Promise.resolve()
}

// Fonctions CRUD pour les fournisseurs
export async function getAllSuppliers(): Promise<Supplier[]> {
  return suppliers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getSupplierById(id: number): Promise<Supplier | null> {
  return suppliers.find(s => s.id === id) || null
}

export async function createSupplier(data: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>): Promise<Supplier> {
  const supplier: Supplier = {
    id: nextId.suppliers++,
    ...data,
    created_at: new Date(),
    updated_at: new Date()
  }
  suppliers.push(supplier)
  return supplier
}

export async function updateSupplier(id: number, data: Partial<Supplier>): Promise<Supplier | null> {
  const index = suppliers.findIndex(s => s.id === id)
  if (index === -1) return null
  
  suppliers[index] = {
    ...suppliers[index],
    ...data,
    updated_at: new Date()
  }
  
  return suppliers[index]
}

// Fonctions CRUD pour les produits (étendues)
export async function getAllProducts(): Promise<Product[]> {
  return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function getProductById(id: number): Promise<Product | null> {
  return products.find(p => p.id === id) || null
}

export async function createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
  const product: Product = {
    id: nextId.products++,
    ...data,
    created_at: new Date(),
    updated_at: new Date()
  }
  products.push(product)
  return product
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return null
  
  products[index] = {
    ...products[index],
    ...data,
    updated_at: new Date()
  }
  
  return products[index]
}

// Fonctions pour les ventes
export async function createSale(data: Omit<Sale, 'id' | 'created_at' | 'updated_at'>): Promise<Sale> {
  const sale: Sale = {
    id: nextId.sales++,
    ...data,
    created_at: new Date(),
    updated_at: new Date()
  }
  sales.push(sale)
  return sale
}

export async function addSaleItem(data: Omit<SaleItem, 'id'>): Promise<SaleItem> {
  const saleItem: SaleItem = {
    id: nextId.saleItems++,
    ...data
  }
  saleItems.push(saleItem)
  
  // Mettre à jour le stock
  await updateStock(data.product_id, -data.quantity, 'sale', saleItem.id, 'Vente')
  
  return saleItem
}

export async function getAllSales(): Promise<Sale[]> {
  return sales.sort((a, b) => new Date(b.sale_date).getTime() - new Date(a.sale_date).getTime())
}

export async function getSaleById(id: number): Promise<Sale | null> {
  return sales.find(s => s.id === id) || null
}

export async function updateSale(id: number, data: Partial<Sale>): Promise<Sale | null> {
  const saleIndex = sales.findIndex(sale => sale.id === id)
  if (saleIndex === -1) return null
  
  sales[saleIndex] = {
    ...sales[saleIndex],
    ...data,
    updated_at: new Date()
  }
  
  return sales[saleIndex]
}

export async function getSaleItems(saleId: number): Promise<SaleItem[]> {
  return saleItems.filter(si => si.sale_id === saleId)
}

// Fonctions pour les commandes d'achat
export async function createPurchaseOrder(data: Omit<PurchaseOrder, 'id' | 'created_at' | 'updated_at'>): Promise<PurchaseOrder> {
  const purchaseOrder: PurchaseOrder = {
    id: nextId.purchaseOrders++,
    ...data,
    created_at: new Date(),
    updated_at: new Date()
  }
  purchaseOrders.push(purchaseOrder)
  return purchaseOrder
}

export async function addPurchaseOrderItem(data: Omit<PurchaseOrderItem, 'id'>): Promise<PurchaseOrderItem> {
  const purchaseOrderItem: PurchaseOrderItem = {
    id: nextId.purchaseOrderItems++,
    ...data
  }
  purchaseOrderItems.push(purchaseOrderItem)
  return purchaseOrderItem
}

export async function deliverPurchaseOrder(id: number): Promise<boolean> {
  const purchaseOrder = purchaseOrders.find(po => po.id === id)
  if (!purchaseOrder) return false
  
  purchaseOrder.status = 'delivered'
  purchaseOrder.delivery_date = new Date()
  purchaseOrder.updated_at = new Date()
  
  // Mettre à jour les stocks
  const items = purchaseOrderItems.filter(poi => poi.purchase_order_id === id)
  for (const item of items) {
    await updateStock(item.product_id, item.quantity, 'purchase', id, 'Réception commande')
  }
  
  return true
}

// Fonctions pour la gestion des stocks
export async function updateStock(
  productId: number, 
  quantity: number, 
  movementType: 'purchase' | 'sale' | 'adjustment' | 'return',
  referenceId?: number,
  notes?: string
): Promise<void> {
  const product = products.find(p => p.id === productId)
  if (!product) return
  
  const previousStock = product.stock_quantity
  const newStock = previousStock + quantity
  
  // Mettre à jour le produit
  product.stock_quantity = newStock
  product.status = newStock > 0 ? 'active' : 'out_of_stock'
  product.updated_at = new Date()
  
  // Enregistrer le mouvement de stock
  const stockMovement: StockMovement = {
    id: nextId.stockMovements++,
    product_id: productId,
    movement_type: movementType,
    quantity,
    previous_stock: previousStock,
    new_stock: newStock,
    reference_id: referenceId,
    notes: notes || `${movementType} - ${quantity} unités`,
    created_at: new Date()
  }
  stockMovements.push(stockMovement)
}

export async function getStockMovements(productId?: number): Promise<StockMovement[]> {
  let movements = stockMovements.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  if (productId) {
    movements = movements.filter(m => m.product_id === productId)
  }
  return movements
}

// Fonctions pour la comptabilité
export async function createPayment(data: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
  const payment: Payment = {
    id: nextId.payments++,
    ...data,
    created_at: new Date()
  }
  payments.push(payment)
  return payment
}

export async function getPayments(referenceType?: string, referenceId?: number): Promise<Payment[]> {
  let paymentList = payments.sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())
  if (referenceType) {
    paymentList = paymentList.filter(p => p.reference_type === referenceType)
  }
  if (referenceId) {
    paymentList = paymentList.filter(p => p.reference_id === referenceId)
  }
  return paymentList
}

// Fonctions pour la caisse
export async function getCurrentCashRegister(): Promise<CashRegister | null> {
  return cashRegisters.find(cr => cr.status === 'open') || null
}

export async function closeCashRegister(closingAmount: number, notes?: string): Promise<CashRegister | null> {
  const currentRegister = await getCurrentCashRegister()
  if (!currentRegister) return null
  
  currentRegister.closing_amount = closingAmount
  currentRegister.closing_date = new Date()
  currentRegister.status = 'closed'
  currentRegister.notes = notes || currentRegister.notes
  currentRegister.updated_at = new Date()
  
  return currentRegister
}

export async function openCashRegister(openingAmount: number): Promise<CashRegister> {
  const cashRegister: CashRegister = {
    id: nextId.cashRegisters++,
    opening_amount: openingAmount,
    closing_amount: 0,
    total_sales: 0,
    total_payments: 0,
    total_refunds: 0,
    opening_date: new Date(),
    status: 'open',
    notes: 'Ouverture de caisse',
    created_at: new Date(),
    updated_at: new Date()
  }
  cashRegisters.push(cashRegister)
  return cashRegister
}

// Fonctions de reporting
export async function getSalesReport(startDate?: Date, endDate?: Date) {
  let salesList = sales
  if (startDate && endDate) {
    salesList = sales.filter(s => 
      new Date(s.sale_date) >= startDate && new Date(s.sale_date) <= endDate
    )
  }
  
  const totalSales = salesList.length
  const totalRevenue = salesList.reduce((sum, sale) => sum + sale.final_amount, 0)
  const totalProfit = saleItems
    .filter(si => salesList.some(s => s.id === si.sale_id))
    .reduce((sum, si) => sum + si.profit, 0)
  
  return {
    totalSales,
    totalRevenue,
    totalProfit,
    averageSale: totalSales > 0 ? totalRevenue / totalSales : 0
  }
}

export async function getInventoryReport() {
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + (p.stock_quantity * p.purchase_price), 0)
  const lowStockProducts = products.filter(p => p.stock_quantity <= p.min_stock_level)
  const outOfStockProducts = products.filter(p => p.stock_quantity === 0)
  
  return {
    totalProducts,
    totalValue,
    lowStockProducts: lowStockProducts.length,
    outOfStockProducts: outOfStockProducts.length,
    lowStockList: lowStockProducts
  }
}

export async function getSupplierReport() {
  const totalSuppliers = suppliers.length
  const totalCredit = suppliers.reduce((sum, s) => sum + s.current_credit, 0)
  const suppliersWithCredit = suppliers.filter(s => s.current_credit > 0)
  
  return {
    totalSuppliers,
    totalCredit,
    suppliersWithCredit: suppliersWithCredit.length,
    suppliersWithCreditList: suppliersWithCredit
  }
}

// Fonction de réinitialisation (pour les tests)
export function resetCommercialDatabase() {
  suppliers = []
  products = []
  purchaseOrders = []
  purchaseOrderItems = []
  sales = []
  saleItems = []
  stockMovements = []
  payments = []
  cashRegisters = []
  
  nextId = {
    suppliers: 1,
    products: 1,
    purchaseOrders: 1,
    purchaseOrderItems: 1,
    sales: 1,
    saleItems: 1,
    stockMovements: 1,
    payments: 1,
    cashRegisters: 1
  }
  
  initCommercialDatabase()
} 