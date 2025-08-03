import Link from 'next/link'
import Image from 'next/image'
import { 
  Code, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Database, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react'

export const metadata = {
  title: 'Services de Développement Web & Applications | Dave & Luce Solutions SARL',
  description: 'Développement web professionnel, applications mobiles, e-commerce, sites vitrines. Solutions sur mesure pour entreprises au Cameroun et en Afrique. Contactez-nous pour votre projet digital.',
  keywords: 'développement web, applications mobiles, e-commerce, sites vitrines, Cameroun, Afrique, Dave & Luce Solutions, programmation, digital',
  openGraph: {
    title: 'Services de Développement Web & Applications | Dave & Luce Solutions SARL',
    description: 'Développement web professionnel, applications mobiles, e-commerce, sites vitrines. Solutions sur mesure pour entreprises.',
    url: 'https://batobaye-market.com/services-developpement',
    siteName: 'Dave & Luce Solutions SARL',
    images: [
      {
        url: '/images/BATOBAYE LOGO.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dave & Luce Solutions SARL - Services de Développement',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function ServicesDeveloppementPage() {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Sites Web Professionnels",
      description: "Sites vitrines modernes et responsives pour présenter votre entreprise",
      features: ["Design personnalisé", "Responsive design", "SEO optimisé", "Performance optimale"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce & Boutiques en ligne",
      description: "Plateformes de vente en ligne complètes et sécurisées",
      features: ["Gestion des produits", "Paiements sécurisés", "Gestion des commandes", "Analytics intégrés"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Applications Mobiles",
      description: "Applications iOS et Android natives et hybrides",
      features: ["Interface intuitive", "Performance native", "Synchronisation cloud", "Notifications push"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Systèmes de Gestion",
      description: "Solutions ERP et CRM sur mesure pour votre entreprise",
      features: ["Gestion des stocks", "Suivi client", "Rapports avancés", "Intégration API"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité & Maintenance",
      description: "Protection et maintenance continue de vos applications",
      features: ["Sécurité renforcée", "Sauvegardes automatiques", "Monitoring 24/7", "Mises à jour"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Optimisation & Performance",
      description: "Amélioration des performances et de l'expérience utilisateur",
      features: ["Optimisation SEO", "Vitesse de chargement", "UX/UI design", "Tests utilisateurs"],
      color: "from-yellow-500 to-yellow-600"
    }
  ]

  const technologies = [
    "React/Next.js", "Node.js", "Python/Django", "PHP/Laravel", "Flutter", "React Native",
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "CI/CD"
  ]

  const projets = [
    {
      name: "Batobaye Market",
      description: "Plateforme e-commerce complète avec gestion des produits, panier, paiements et administration",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "API REST"],
      image: "/images/BATOBAYE LOGO.jpeg"
    },
    {
      name: "Systèmes de Gestion",
      description: "Applications de gestion d'entreprise avec interfaces modernes et fonctionnalités avancées",
      tech: ["React", "Node.js", "PostgreSQL", "JWT"],
      image: "/placeholder.jpg"
    },
    {
      name: "Applications Mobiles",
      description: "Applications mobiles natives et hybrides pour divers secteurs d'activité",
      tech: ["Flutter", "React Native", "Firebase", "APIs"],
      image: "/placeholder.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Hero */}
      <div className="bg-gradient-to-r from-batobaye-dark via-batobaye-primary to-batobaye-dark text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Code className="w-12 h-12 text-blue-400" />
              <h1 className="text-4xl md:text-6xl font-bold">Dave & Luce</h1>
              <Award className="w-12 h-12 text-yellow-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Solutions SARL - Services de Développement
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Créateurs d'expériences digitales exceptionnelles. Développement web, applications mobiles, 
              e-commerce et solutions sur mesure pour propulser votre entreprise vers le succès.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://www.daveandlucesolutions.com" 
                target="_blank"
                className="bg-white text-batobaye-dark px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Visiter notre site</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <Link 
                href="#contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-batobaye-dark transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Services de Développement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions digitales complètes pour répondre à tous vos besoins technologiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technologies & Outils
            </h2>
            <p className="text-xl text-gray-600">
              Nous utilisons les technologies les plus modernes pour créer des solutions performantes
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700 font-medium hover:border-batobaye-primary hover:text-batobaye-primary transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projets Réalisés */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projets Réalisés
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez quelques-uns de nos projets qui démontrent notre expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projets.map((projet, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={projet.image}
                    alt={projet.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{projet.name}</h3>
                  <p className="text-gray-600 mb-4">{projet.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {projet.tech.map((tech, idx) => (
                      <span key={idx} className="bg-batobaye-primary/10 text-batobaye-primary px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pourquoi nous choisir */}
      <div className="bg-gradient-to-r from-batobaye-primary to-batobaye-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi Choisir Dave & Luce Solutions ?
            </h2>
            <p className="text-xl text-gray-200">
              Notre expertise et notre engagement font la différence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Équipe Expérimentée</h3>
              <p className="text-gray-200">Plus de 5 ans d'expérience en développement web et mobile</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Qualité Premium</h3>
              <p className="text-gray-200">Code propre, maintenable et suivant les meilleures pratiques</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Sécurité Garantie</h3>
              <p className="text-gray-200">Applications sécurisées et protection des données</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-bold mb-2">Support Continu</h3>
              <p className="text-gray-200">Accompagnement et maintenance après livraison</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prêt à Démarrer Votre Projet ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-batobaye-primary" />
                <span className="text-gray-700">+237 612 345 678</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-batobaye-primary" />
                <span className="text-gray-700">contact@daveandlucesolutions.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <MapPin className="w-6 h-6 text-batobaye-primary" />
                <span className="text-gray-700">Douala, Cameroun</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://www.daveandlucesolutions.com" 
                target="_blank"
                className="bg-batobaye-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-batobaye-dark transition-colors flex items-center justify-center space-x-2"
              >
                <span>Visiter notre site</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="mailto:contact@daveandlucesolutions.com" 
                className="border-2 border-batobaye-primary text-batobaye-primary px-8 py-3 rounded-lg font-semibold hover:bg-batobaye-primary hover:text-white transition-colors"
              >
                Envoyer un email
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 