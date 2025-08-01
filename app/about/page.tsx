"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Package,
  Truck,
  Shield,
  Star,
  Users,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const stats = [
  { number: "1000+", label: "Clients Satisfaits", icon: Users },
  { number: "500+", label: "Produits Disponibles", icon: Package },
  { number: "5", label: "Années d'Expérience", icon: Award },
  { number: "24/7", label: "Support Client", icon: Clock },
]

const values = [
  {
    icon: Shield,
    title: "Qualité Garantie",
    description: "Tous nos produits sont certifiés et bénéficient d'une garantie de 2 ans minimum.",
  },
  {
    icon: Target,
    title: "Prix Imbattables",
    description: "Nous proposons les meilleurs prix du marché grâce à nos partenariats directs.",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Livraison gratuite dans tout le Cameroun sous 24-48h avec installation incluse.",
  },
  {
    icon: Heart,
    title: "Service Client",
    description: "Une équipe dédiée pour vous accompagner avant, pendant et après l'achat.",
  },
]

const team = [
  {
    name: "Serge Batobaye",
    role: "Fondateur & CEO",
    description: "Expert en électroménager avec plus de 10 ans d'expérience dans le secteur.",
    image: "/images/l equipe batobaye.webp",
  },
]

export default function AboutPage() {
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
                <Link href="/about" className="text-batobaye-primary font-semibold">
                  À propos
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-batobaye-primary">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">À Propos de Batobaye Market</h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Votre partenaire de confiance pour l'électroménager au Cameroun
            </p>
            <p className="text-lg max-w-3xl mx-auto text-orange-200">
              Depuis 2019, nous nous engageons à fournir des produits de qualité à des prix compétitifs,
              avec un service client exceptionnel et une livraison rapide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-batobaye-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-batobaye-dark mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Batobaye Market est né en 2019 de la vision de Serge Batobaye, un entrepreneur passionné
                  par l'électroménager et déterminé à offrir aux Camerounais des produits de qualité à des
                  prix accessibles.
                </p>
                <p>
                  Commençant comme un petit magasin à Douala, nous avons rapidement gagné la confiance de
                  nos clients grâce à notre engagement envers la qualité, la transparence et le service
                  client exceptionnel.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de servir plus de 1000 clients satisfaits et d'avoir
                  étendu nos services au Gabon, continuant à grandir tout en maintenant nos valeurs
                  fondamentales.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center overflow-hidden">
              <Image 
                src="https://res.cloudinary.com/dko5sommz/image/upload/v1753802694/batobaye_entree_nrqx4k.webp" 
                alt="Entrée de Batobaye Market - Notre histoire depuis 2019" 
                width={400} 
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600">Les principes qui guident notre entreprise</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-batobaye-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-lg text-gray-600">Les experts qui font de Batobaye un succès</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-80 h-80 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6 overflow-hidden">
                  <Image 
                    src="/images/l equipe batobaye.webp" 
                    alt="L'équipe Batobaye complète" 
                    width={320} 
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">L'Équipe Batobaye</h3>
                <Badge className="mb-4 text-lg">Équipe Complète</Badge>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Notre équipe complète d'experts en électroménager avec plus de 10 ans d'expérience dans le secteur. 
                  Une équipe dédiée qui partage la vision d'excellence et l'engagement envers la satisfaction client.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-6 h-6 mr-2 text-batobaye-primary" />
                  Notre Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Fournir aux familles camerounaises et gabonaises des équipements électroménagers de
                  qualité à des prix accessibles, tout en garantissant un service client exceptionnel
                  et une expérience d'achat sans stress.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-6 h-6 mr-2 text-batobaye-primary" />
                  Notre Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le leader de l'électroménager en Afrique Centrale, reconnu pour notre
                  qualité, notre innovation et notre engagement envers la satisfaction client,
                  tout en contribuant au développement économique de la région.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Implantations</h2>
            <p className="text-lg text-gray-600">Retrouvez-nous dans nos showrooms</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-batobaye-primary" />
                  Douala, Cameroun
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-600">📍 Akwa, Douala</p>
                  <p className="text-gray-600">📞 +237 672 02 77 44</p>
                  <p className="text-gray-600">✉️ contact@batobaye.com</p>
                  <Badge className="bg-green-100 text-green-800">Ouvert 7j/7</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-batobaye-primary" />
                  Oyem, Gabon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-gray-600">📍 Centre-ville, Oyem</p>
                  <p className="text-gray-600">📞 +241 6 58 14 39 09</p>
                  <p className="text-gray-600">✉️ gabon@batobaye.com</p>
                  <Badge className="bg-green-100 text-green-800">Ouvert 7j/7</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-batobaye-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Nous Rejoindre ?</h2>
          <p className="text-xl mb-8 text-orange-200">
            Découvrez notre gamme complète d'électroménager et bénéficiez de nos services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-batobaye-primary hover:bg-batobaye-light">
                Voir nos produits
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-batobaye-dark">
                Nous contacter
              </Button>
            </Link>
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