"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShoppingCart,
  Package,
  Truck,
  Shield,
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const contactMethods = [
  {
    icon: Phone,
    title: "Téléphone",
    value: "+237 672 02 77 44",
    description: "Appelez-nous directement",
    action: "tel:+237672027744",
  },
  {
    icon: Mail,
    title: "Email",
    value: "contact@batobaye.com",
    description: "Envoyez-nous un email",
    action: "mailto:contact@batobaye.com",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "+237 672 02 77 44",
    description: "Chattez avec nous",
    action: "https://wa.me/237672027744",
  },
]

const locations = [
  {
    city: "Douala, Cameroun",
    address: "Akwa, Douala",
    phone: "+237 672 02 77 44",
    email: "contact@batobaye.com",
    hours: "Lun-Dim: 8h-20h",
    status: "Ouvert",
  },
  {
    city: "Oyem, Gabon",
    address: "Centre-ville, Oyem",
    phone: "+241 6 58 14 39 09",
    email: "gabon@batobaye.com",
    hours: "Lun-Dim: 8h-20h",
    status: "Ouvert",
  },
]

const faqs = [
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Nous livrons dans tout le Cameroun sous 24-48h. Pour le Gabon, comptez 3-5 jours ouvrés.",
  },
  {
    question: "Proposez-vous l'installation ?",
    answer: "Oui, l'installation est incluse gratuitement pour tous nos produits électroménagers.",
  },
  {
    question: "Quelle est votre politique de garantie ?",
    answer: "Tous nos produits bénéficient d'une garantie constructeur de 2 ans minimum.",
  },
  {
    question: "Acceptez-vous les commandes par téléphone ?",
    answer: "Oui, vous pouvez commander par téléphone au +237 672 02 77 44 ou par WhatsApp.",
  },
  {
    question: "Proposez-vous le paiement en plusieurs fois ?",
    answer: "Oui, nous proposons des facilités de paiement selon vos besoins.",
  },
  {
    question: "Pouvez-vous livrer en zone rurale ?",
    answer: "Oui, nous livrons partout au Cameroun et au Gabon, y compris les zones rurales.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus("success")
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitStatus("idle")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-batobaye-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-batobaye-dark">BATOBAYE</h1>
                <p className="text-sm text-gray-600">Market</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-batobaye-primary">
                  Accueil
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-batobaye-primary">
                  Produits
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-batobaye-primary">
                  À propos
                </Link>
                <Link href="/contact" className="text-batobaye-primary font-semibold">
                  Contact
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  +237 672 02 77 44
                </Button>
                <Link href="/admin">
                  <Button className="bg-batobaye-primary hover:bg-batobaye-light">
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-batobaye-primary to-batobaye-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contactez-Nous</h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Nous sommes là pour vous aider
            </p>
            <p className="text-lg max-w-3xl mx-auto text-orange-200">
              Que vous ayez une question sur nos produits, besoin d'un devis ou souhaitez passer une commande,
              notre équipe est disponible pour vous accompagner.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment Nous Contacter</h2>
            <p className="text-lg text-gray-600">Choisissez la méthode qui vous convient le mieux</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-batobaye-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <a
                    href={method.action}
                    target={method.action.startsWith("http") ? "_blank" : "_self"}
                    rel={method.action.startsWith("http") ? "noopener noreferrer" : ""}
                  >
                    <Button className="w-full bg-batobaye-primary hover:bg-batobaye-light">
                      {method.value}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-Nous un Message</h2>
              <Card>
                <CardContent className="p-6">
                  {submitStatus === "success" ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Envoyé !</h3>
                      <p className="text-gray-600">
                        Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nom complet *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            placeholder="Votre nom complet"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+237 XXX XXX XXX"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Sujet *</Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => handleInputChange("subject", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisissez un sujet" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="devis">Demande de devis</SelectItem>
                              <SelectItem value="commande">Commande</SelectItem>
                              <SelectItem value="support">Support technique</SelectItem>
                              <SelectItem value="reclamation">Réclamation</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          required
                          placeholder="Décrivez votre demande..."
                          className="min-h-[120px]"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-batobaye-primary hover:bg-batobaye-light"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informations de Contact</h2>
              
              <div className="space-y-6">
                {locations.map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-batobaye-primary" />
                        {location.city}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-3 text-gray-500" />
                          <span className="text-gray-600">{location.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-3 text-gray-500" />
                          <a href={`tel:${location.phone}`} className="text-gray-600 hover:text-batobaye-primary">
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-3 text-gray-500" />
                          <a href={`mailto:${location.email}`} className="text-gray-600 hover:text-batobaye-primary">
                            {location.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-3 text-gray-500" />
                          <span className="text-gray-600">{location.hours}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{location.status}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/237672027744"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+237672027744">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler maintenant
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
            <p className="text-lg text-gray-600">Trouvez rapidement les réponses à vos questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-batobaye-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'Aide Immédiate ?</h2>
          <p className="text-xl mb-8 text-orange-200">
            Notre équipe est disponible 7j/7 pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+237672027744">
              <Button size="lg" className="bg-batobaye-primary hover:bg-batobaye-light">
                <Phone className="w-5 h-5 mr-2" />
                Appelez-nous
              </Button>
            </a>
            <a href="https://wa.me/237672027744" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-batobaye-dark">
                <MessageSquare className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-batobaye-primary rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BATOBAYE</span>
              </div>
              <p className="text-gray-400 mb-4">
                Votre partenaire de confiance pour tous vos besoins en électroménager au Cameroun.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Produits</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Réfrigérateurs</li>
                <li>Congélateurs</li>
                <li>Téléviseurs</li>
                <li>Chauffe-eau</li>
                <li>Cuisinières</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Livraison</li>
                <li>Installation</li>
                <li>Maintenance</li>
                <li>Garantie</li>
                <li>Support client</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +237 672 02 77 44
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  contact@batobaye.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Douala, Cameroun
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Batobaye Market. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 