// WhatsApp Business API Integration
// Documentation: https://developers.facebook.com/docs/whatsapp/cloud-api

export interface WhatsAppMessage {
  id: string
  from: string
  timestamp: string
  type: 'text' | 'image' | 'document' | 'audio' | 'video' | 'location' | 'contact' | 'sticker'
  text?: {
    body: string
  }
  image?: {
    id: string
    mime_type: string
    sha256: string
    filename?: string
  }
  document?: {
    id: string
    mime_type: string
    sha256: string
    filename: string
  }
}

export interface WhatsAppWebhookPayload {
  object: 'whatsapp_business_account'
  entry: Array<{
    id: string
    changes: Array<{
      value: {
        messaging_product: 'whatsapp'
        metadata: {
          display_phone_number: string
          phone_number_id: string
        }
        contacts?: Array<{
          profile: {
            name: string
          }
          wa_id: string
        }>
        messages?: WhatsAppMessage[]
      }
      field: 'messages'
    }>
  }>
}

export interface WhatsAppConfig {
  accessToken: string
  phoneNumberId: string
  verifyToken: string
  webhookUrl: string
}

export class WhatsAppBusinessAPI {
  private config: WhatsAppConfig
  private baseUrl = 'https://graph.facebook.com/v18.0'

  constructor(config: WhatsAppConfig) {
    this.config = config
  }

  // Vérifier la signature du webhook
  verifyWebhookSignature(signature: string, body: string): boolean {
    // Implémentation de la vérification de signature
    // https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
    return true // Placeholder - à implémenter avec crypto
  }

  // Récupérer une image depuis WhatsApp
  async downloadImage(mediaId: string): Promise<{ buffer: Buffer; mimeType: string; filename: string }> {
    try {
      // 1. Récupérer l'URL de téléchargement
      const mediaUrl = `${this.baseUrl}/${mediaId}`
      const mediaResponse = await fetch(mediaUrl, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`
        }
      })

      if (!mediaResponse.ok) {
        throw new Error(`Erreur lors de la récupération de l'image: ${mediaResponse.statusText}`)
      }

      const mediaData = await mediaResponse.json()
      
      // 2. Télécharger l'image
      const downloadResponse = await fetch(mediaData.url, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`
        }
      })

      if (!downloadResponse.ok) {
        throw new Error(`Erreur lors du téléchargement de l'image: ${downloadResponse.statusText}`)
      }

      const buffer = Buffer.from(await downloadResponse.arrayBuffer())
      
      return {
        buffer,
        mimeType: mediaData.mime_type,
        filename: mediaData.filename || `whatsapp_${mediaId}.${this.getExtensionFromMimeType(mediaData.mime_type)}`
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image WhatsApp:', error)
      throw error
    }
  }

  // Récupérer un document depuis WhatsApp
  async downloadDocument(mediaId: string): Promise<{ buffer: Buffer; mimeType: string; filename: string }> {
    try {
      // 1. Récupérer l'URL de téléchargement
      const mediaUrl = `${this.baseUrl}/${mediaId}`
      const mediaResponse = await fetch(mediaUrl, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`
        }
      })

      if (!mediaResponse.ok) {
        throw new Error(`Erreur lors de la récupération du document: ${mediaResponse.statusText}`)
      }

      const mediaData = await mediaResponse.json()
      
      // 2. Télécharger le document
      const downloadResponse = await fetch(mediaData.url, {
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`
        }
      })

      if (!downloadResponse.ok) {
        throw new Error(`Erreur lors du téléchargement du document: ${downloadResponse.statusText}`)
      }

      const buffer = Buffer.from(await downloadResponse.arrayBuffer())
      
      return {
        buffer,
        mimeType: mediaData.mime_type,
        filename: mediaData.filename || `whatsapp_${mediaId}.${this.getExtensionFromMimeType(mediaData.mime_type)}`
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du document WhatsApp:', error)
      throw error
    }
  }

  // Envoyer un message texte
  async sendTextMessage(to: string, text: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.config.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'text',
          text: {
            body: text
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi du message: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message WhatsApp:', error)
      throw error
    }
  }

  // Envoyer une image
  async sendImage(to: string, imageUrl: string, caption?: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.config.phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: to,
          type: 'image',
          image: {
            link: imageUrl,
            caption: caption
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi de l'image: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image WhatsApp:', error)
      throw error
    }
  }

  // Traiter les messages entrants
  async processIncomingMessages(payload: WhatsAppWebhookPayload): Promise<void> {
    try {
      for (const entry of payload.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages' && change.value.messages) {
            for (const message of change.value.messages) {
              await this.handleMessage(message, change.value.contacts?.[0])
            }
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du traitement des messages entrants:', error)
      throw error
    }
  }

  // Gérer un message individuel
  private async handleMessage(message: WhatsAppMessage, contact?: any): Promise<void> {
    console.log('📱 Message WhatsApp reçu:', {
      id: message.id,
      from: message.from,
      type: message.type,
      timestamp: message.timestamp
    })

    switch (message.type) {
      case 'text':
        await this.handleTextMessage(message, contact)
        break
      case 'image':
        await this.handleImageMessage(message, contact)
        break
      case 'document':
        await this.handleDocumentMessage(message, contact)
        break
      default:
        console.log(`Type de message non géré: ${message.type}`)
    }
  }

  // Gérer un message texte
  private async handleTextMessage(message: WhatsAppMessage, contact?: any): Promise<void> {
    const text = message.text?.body || ''
    console.log(`💬 Message texte de ${contact?.profile?.name || message.from}: ${text}`)

    // Logique de traitement des messages texte
    // Par exemple: commandes vocales, demandes d'information, etc.
  }

  // Gérer un message image
  private async handleImageMessage(message: WhatsAppMessage, contact?: any): Promise<void> {
    if (!message.image) return

    console.log(`🖼️ Image reçue de ${contact?.profile?.name || message.from}`)
    
    try {
      // Télécharger l'image
      const imageData = await this.downloadImage(message.image.id)
      
      // Sauvegarder l'image dans le système
      await this.saveImageToSystem(imageData, message, contact)
      
      // Répondre au client
      await this.sendTextMessage(message.from, 
        '✅ Image reçue ! Nous l\'avons ajoutée à notre catalogue. Merci !'
      )
      
    } catch (error) {
      console.error('Erreur lors du traitement de l\'image:', error)
      await this.sendTextMessage(message.from, 
        '❌ Désolé, nous n\'avons pas pu traiter votre image. Veuillez réessayer.'
      )
    }
  }

  // Gérer un message document
  private async handleDocumentMessage(message: WhatsAppMessage, contact?: any): Promise<void> {
    if (!message.document) return

    console.log(`📄 Document reçu de ${contact?.profile?.name || message.from}: ${message.document.filename}`)
    
    try {
      // Télécharger le document
      const documentData = await this.downloadDocument(message.document.id)
      
      // Sauvegarder le document dans le système
      await this.saveDocumentToSystem(documentData, message, contact)
      
      // Répondre au client
      await this.sendTextMessage(message.from, 
        '✅ Document reçu ! Nous l\'avons ajouté à notre système. Merci !'
      )
      
    } catch (error) {
      console.error('Erreur lors du traitement du document:', error)
      await this.sendTextMessage(message.from, 
        '❌ Désolé, nous n\'avons pas pu traiter votre document. Veuillez réessayer.'
      )
    }
  }

  // Sauvegarder une image dans le système
  private async saveImageToSystem(
    imageData: { buffer: Buffer; mimeType: string; filename: string },
    message: WhatsAppMessage,
    contact?: any
  ): Promise<void> {
    try {
      // Ici vous pouvez intégrer avec votre système de stockage
      // Par exemple: Cloudinary, AWS S3, ou stockage local
      
      // Exemple avec Cloudinary
      // const cloudinaryUrl = await uploadToCloudinary(imageData.buffer, imageData.filename)
      
      // Exemple avec stockage local
      const fileName = `whatsapp_${Date.now()}_${imageData.filename}`
      const filePath = `./public/uploads/whatsapp/${fileName}`
      
      // Créer le dossier s'il n'existe pas
      const fs = require('fs')
      const path = require('path')
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      
      // Sauvegarder le fichier
      fs.writeFileSync(filePath, imageData.buffer)
      
      // Enregistrer dans la base de données
      await this.saveImageRecord({
        originalName: imageData.filename,
        fileName: fileName,
        filePath: `/uploads/whatsapp/${fileName}`,
        mimeType: imageData.mimeType,
        size: imageData.buffer.length,
        source: 'whatsapp',
        senderPhone: message.from,
        senderName: contact?.profile?.name || 'Inconnu',
        receivedAt: new Date(parseInt(message.timestamp) * 1000)
      })
      
      console.log(`✅ Image sauvegardée: ${fileName}`)
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'image:', error)
      throw error
    }
  }

  // Sauvegarder un document dans le système
  private async saveDocumentToSystem(
    documentData: { buffer: Buffer; mimeType: string; filename: string },
    message: WhatsAppMessage,
    contact?: any
  ): Promise<void> {
    try {
      const fileName = `whatsapp_${Date.now()}_${documentData.filename}`
      const filePath = `./public/uploads/whatsapp/documents/${fileName}`
      
      // Créer le dossier s'il n'existe pas
      const fs = require('fs')
      const path = require('path')
      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      
      // Sauvegarder le fichier
      fs.writeFileSync(filePath, documentData.buffer)
      
      // Enregistrer dans la base de données
      await this.saveDocumentRecord({
        originalName: documentData.filename,
        fileName: fileName,
        filePath: `/uploads/whatsapp/documents/${fileName}`,
        mimeType: documentData.mimeType,
        size: documentData.buffer.length,
        source: 'whatsapp',
        senderPhone: message.from,
        senderName: contact?.profile?.name || 'Inconnu',
        receivedAt: new Date(parseInt(message.timestamp) * 1000)
      })
      
      console.log(`✅ Document sauvegardé: ${fileName}`)
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du document:', error)
      throw error
    }
  }

  // Sauvegarder un enregistrement d'image dans la base de données
  private async saveImageRecord(imageData: any): Promise<void> {
    // Intégrer avec votre base de données
    // Par exemple: Supabase, PostgreSQL, etc.
    console.log('💾 Enregistrement image en base:', imageData)
  }

  // Sauvegarder un enregistrement de document dans la base de données
  private async saveDocumentRecord(documentData: any): Promise<void> {
    // Intégrer avec votre base de données
    // Par exemple: Supabase, PostgreSQL, etc.
    console.log('💾 Enregistrement document en base:', documentData)
  }

  // Obtenir l'extension de fichier à partir du type MIME
  private getExtensionFromMimeType(mimeType: string): string {
    const extensions: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
    }
    
    return extensions[mimeType] || 'bin'
  }
}

// Instance globale de l'API WhatsApp Business
export const whatsappAPI = new WhatsAppBusinessAPI({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
  webhookUrl: process.env.WHATSAPP_WEBHOOK_URL || ''
}) 