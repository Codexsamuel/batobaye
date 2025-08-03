// Configuration CinetPay
export interface CinetPayConfig {
  apiKey: string
  siteId: string
  baseUrl: string
  environment: 'PROD' | 'TEST'
}

export interface CinetPayPaymentRequest {
  amount: number
  currency: 'XOF' | 'XAF' | 'CDF' | 'GNF' | 'USD' | 'EUR'
  description: string
  returnUrl: string
  cancelUrl: string
  notifyUrl: string
  transactionId: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  customerCity?: string
  customerCountry?: string
  channels?: 'ALL' | 'MOBILE_MONEY' | 'CREDIT_CARD' | 'WALLET'
}

export interface CinetPayPaymentResponse {
  code: string
  message: string
  description: string
  data: {
    payment_url: string
    payment_token: string
    transaction_id: string
  }
}

export interface CinetPayPaymentStatus {
  code: string
  message: string
  data: {
    transaction_id: string
    payment_token: string
    amount: number
    currency: string
    status: 'SUCCESSFUL' | 'PENDING' | 'FAILED' | 'CANCELLED'
    payment_date: string
    payment_method: string
    customer_name?: string
    customer_email?: string
    customer_phone?: string
  }
}

// Configuration par défaut (à remplacer par vos vraies données)
const defaultConfig: CinetPayConfig = {
  apiKey: process.env.CINETPAY_API_KEY || '105904221', // Votre API Key
  siteId: process.env.CINETPAY_SITE_ID || '1651504870688e1c2fe7ed74.18730321', // Votre Site ID
  baseUrl: 'https://api-checkout.cinetpay.com/v2',
  environment: (process.env.CINETPAY_ENVIRONMENT as 'PROD' | 'TEST') || 'PROD' // Mode PRODUCTION
}

class CinetPayService {
  private config: CinetPayConfig

  constructor(config?: Partial<CinetPayConfig>) {
    this.config = { ...defaultConfig, ...config }
  }

  /**
   * Initialiser un paiement
   */
  async initiatePayment(paymentData: CinetPayPaymentRequest): Promise<CinetPayPaymentResponse> {
    try {
      const payload = {
        apikey: this.config.apiKey,
        site_id: this.config.siteId,
        transaction_id: paymentData.transactionId,
        amount: paymentData.amount,
        currency: paymentData.currency,
        description: paymentData.description,
        return_url: paymentData.returnUrl,
        cancel_url: paymentData.cancelUrl,
        notify_url: paymentData.notifyUrl,
        customer_name: paymentData.customerName,
        customer_email: paymentData.customerEmail,
        customer_phone: paymentData.customerPhone,
        customer_address: paymentData.customerAddress,
        customer_city: paymentData.customerCity,
        customer_country: paymentData.customerCountry,
        channels: paymentData.channels || 'ALL',
        lang: 'FR'
      }

      console.log('🚀 Initialisation paiement CinetPay:', {
        site_id: this.config.siteId,
        transaction_id: paymentData.transactionId,
        amount: paymentData.amount,
        currency: paymentData.currency
      })

      const response = await fetch(`${this.config.baseUrl}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      
      console.log('📡 Réponse CinetPay:', result)
      
      if (result.code !== '201') {
        throw new Error(`Erreur CinetPay: ${result.message}`)
      }

      return result
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du paiement CinetPay:', error)
      throw error
    }
  }

  /**
   * Vérifier le statut d'un paiement
   */
  async checkPaymentStatus(transactionId: string, token: string): Promise<CinetPayPaymentStatus> {
    try {
      const payload = {
        apikey: this.config.apiKey,
        site_id: this.config.siteId,
        transaction_id: transactionId,
        token: token
      }

      const response = await fetch(`${this.config.baseUrl}/payment/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.code !== '00') {
        throw new Error(`Erreur CinetPay: ${result.message}`)
      }

      return result
    } catch (error) {
      console.error('Erreur lors de la vérification du statut CinetPay:', error)
      throw error
    }
  }

  /**
   * Générer un ID de transaction unique
   */
  generateTransactionId(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `BATOBAYE_${timestamp}_${random}`.toUpperCase()
  }

  /**
   * Formater le montant pour CinetPay (en centimes)
   */
  formatAmount(amount: number): number {
    // CinetPay attend le montant en centimes
    return Math.round(amount * 100)
  }

  /**
   * Obtenir l'URL de paiement pour redirection
   */
  getPaymentUrl(paymentToken: string): string {
    return `${this.config.baseUrl}/payment/${paymentToken}`
  }
}

// Instance par défaut
export const cinetpayService = new CinetPayService()

// Fonctions utilitaires
export const formatCinetPayAmount = (amount: number): number => {
  return cinetpayService.formatAmount(amount)
}

export const generateCinetPayTransactionId = (): string => {
  return cinetpayService.generateTransactionId()
}

export default CinetPayService 