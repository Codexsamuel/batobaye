"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Globe, Smartphone, ShoppingCart, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const realisations = [
  {
    id: 1,
    name: "Batobaye Market",
    description: "Marketplace d'électroménager et d'électronique avec système de paiement intégré",
    category: "E-commerce",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "CinetPay"],
    image: "/images/BATOBAYE LOGO.jpeg",
    url: "https://batobaye.shop",
    github: null,
    status: "En ligne",
    client: "Batobaye Market",
    features: [
      "Système de panier avancé",
      "Paiement mobile money",
      "Interface admin complète",
      "SEO optimisé",
      "Responsive design"
    ],
    icon: ShoppingCart
  },
  {
    id: 2,
    name: "Kodee Platform",
    description: "Plateforme de formation en programmation avec système de certification",
    category: "EdTech",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/placeholder.svg",
    url: "https://kodee.cm",
    github: "https://github.com/dlsolutions/kodee",
    status: "En développement",
    client: "Kodee Academy",
    features: [
      "Cours interactifs",
      "Système de certification",
      "Paiement en ligne",
      "Dashboard étudiant",
      "API REST complète"
    ],
    icon: Building2
  },
  {
    id: 3,
    name: "AfriDrop",
    description: "Application de livraison rapide dans les grandes villes africaines",
    category: "Logistics",
    technologies: ["React Native", "Firebase", "Google Maps API", "Twilio"],
    image: "/placeholder.svg",
    url: "https://afridrop.app",
    github: null,
    status: "En ligne",
    client: "AfriDrop SARL",
    features: [
      "Géolocalisation temps réel",
      "Paiement mobile",
      "Suivi de livraison",
      "Interface chauffeur",
      "Notifications push"
    ],
    icon: Smartphone
  }
]

const categories = [
  { name: "Tous", value: "all", count: realisations.length },
  { name: "E-commerce", value: "E-commerce", count: realisations.filter(r => r.category === "E-commerce").length },
  { name: "EdTech", value: "EdTech", count: realisations.filter(r => r.category === "EdTech").length },
  { name: "Logistics", value: "Logistics", count: realisations.filter(r => r.category === "Logistics").length }
]

export default function RealisationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredRealisations = selectedCategory === "all" 
    ? realisations 
    : realisations.filter(r => r.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DL Solutions Sarl</h1>
                <p className="text-sm text-gray-600">Portfolio de réalisations</p>
              </div>
            </div>
            <Link href="/">
              <Button className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                ← Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Réalisations
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Découvrez nos projets qui transforment les entreprises africaines. 
            Chaque réalisation témoigne de notre expertise en développement web et mobile.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
                             <Button
                 key={category.value}
                 className={selectedCategory === category.value ? "bg-white text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
                 onClick={() => setSelectedCategory(category.value)}
               >
                {category.name}
                <Badge className="ml-2 bg-blue-200 text-blue-800">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRealisations.map((project) => (
              <Card key={project.id} className="hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-100 text-green-800">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <project.icon className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors">
                        {project.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500 mb-2">
                        Client: {project.client}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies :</h4>
                    <div className="flex flex-wrap gap-2">
                                             {project.technologies.map((tech, index) => (
                         <Badge key={index} className="bg-gray-100 text-gray-800 text-xs">
                           {tech}
                         </Badge>
                       ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Fonctionnalités :</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                                             {project.url && (
                         <Link href={project.url} target="_blank">
                           <Button className="text-sm px-3 py-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                             <Globe className="w-4 h-4 mr-1" />
                             Voir le site
                           </Button>
                         </Link>
                       )}
                       {project.github && (
                         <Link href={project.github} target="_blank">
                           <Button className="text-sm px-3 py-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                             <Github className="w-4 h-4 mr-1" />
                             Code
                           </Button>
                         </Link>
                       )}
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {project.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Votre projet sera notre prochaine réalisation
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            Transformez votre vision en réalité avec DL Solutions. 
            Notre équipe d'experts est prête à créer votre projet sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://www.daveandlucesolutions.com/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Démarrer votre projet
              </Button>
            </Link>
                         <Link href="https://www.daveandlucesolutions.com">
               <Button className="px-8 py-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                 En savoir plus
               </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 