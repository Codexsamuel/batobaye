"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
  MessageCircle,
  Search,
  Sparkles,
  Zap,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Globe,
  Award,
  Users,
  Package,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: 1,
    name: "Réfrigérateurs & Congélateurs",
    image: "/placeholder.svg?height=200&width=300&text=Frigos",
    productCount: 156,
    description: "Brigo, congélateurs, réfrigérateurs toutes tailles",
    gradient: "from-blue-500 to-cyan-500",
    icon: "❄️",
  },
  {
    id: 2,
    name: "TV & Électronique",
    image: "/placeholder.svg?height=200&width=300&text=TV",
    productCount: 89,
    description: "Téléviseurs, home cinéma, électronique",
    gradient: "from-purple-500 to-pink-500",
    icon: "📺",
  },
  {
    id: 3,
    name: "Cuisinières & Chauffe-eau",
    image: "/placeholder.svg?height=200&width=300&text=Cuisine",
    productCount: 234,
    description: "Cuisinières, chauffe-eau, équipements cuisine",
    gradient: "from-orange-500 to-red-500",
    icon: "🔥",
  },
  {
    id: 4,
    name: "Électroménager Divers",
    image: "/placeholder.svg?height=200&width=300&text=Electromenager",
    productCount: 67,
    description: "Tous appareils électroménagers",
    gradient: "from-green-500 to-emerald-500",
    icon: "⚡",
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Réfrigérateur Brigo 350L",
    price: 450000,
    oldPrice: 520000,
    image: "/placeholder.svg?height=300&width=300&text=Brigo",
    badge: "Promo",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    isHot: true,
    category: "Réfrigérateur",
  },
  {
    id: 2,
    name: 'TV Samsung 55" QLED',
    price: 380000,
    oldPrice: null,
    image: "/placeholder.svg?height=300&width=300&text=Samsung+TV",
    badge: "Nouveau",
    inStock: true,
    rating: 4.9,
    reviews: 89,
    isHot: false,
    category: "Télévision",
  },
  {
    id: 3,
    name: "Congélateur 200L",
    price: 320000,
    oldPrice: 380000,
    image: "/placeholder.svg?height=300&width=300&text=Congelateur",
    badge: "Promo",
    inStock: false,
    rating: 4.7,
    reviews: 156,
    isHot: true,
    category: "Congélateur",
  },
  {
    id: 4,
    name: "Chauffe-eau Électrique 100L",
    price: 85000,
    oldPrice: null,
    image: "/placeholder.svg?height=300&width=300&text=Chauffe-eau",
    badge: null,
    inStock: true,
    rating: 4.6,
    reviews: 78,
    isHot: false,
    category: "Chauffe-eau",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Mimie Nyango",
    rating: 5,
    comment: "Service excellent ! Livraison rapide et produits de qualité. Je recommande vivement Batobaye Market.",
    avatar: "/placeholder.svg?height=60&width=60&text=MN",
    date: "Il y a 2 jours",
    verified: true,
    location: "Douala",
  },
  {
    id: 2,
    name: "Jean-Paul Mbarga",
    rating: 5,
    comment: "Mon frigo Brigo fonctionne parfaitement depuis 2 ans. Très satisfait de mon achat chez Batobaye.",
    avatar: "/placeholder.svg?height=60&width=60&text=JPM",
    date: "Il y a 1 semaine",
    verified: true,
    location: "Yaoundé",
  },
  {
    id: 3,
    name: "Marie Nguema",
    rating: 4,
    comment: "Bonne expérience d'achat. Le SAV est réactif et les conseils sont pertinents. Livraison jusqu'à Oyem !",
    avatar: "/placeholder.svg?height=60&width=60&text=MN",
    date: "Il y a 2 semaines",
    verified: false,
    location: "Oyem, Gabon",
  },
]

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-batobaye-primary/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          transition={{
            duration: Math.random() * 15 + 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const menuItems = [
    {
      name: "Accueil",
      href: "/",
      icon: "🏠",
    },
    {
      name: "Produits",
      href: "/produits",
      icon: "📦",
      submenu: [
        { name: "Réfrigérateurs", href: "/produits/refrigerateurs" },
        { name: "Téléviseurs", href: "/produits/televiseurs" },
        { name: "Cuisinières", href: "/produits/cuisinieres" },
        { name: "Chauffe-eau", href: "/produits/chauffe-eau" },
      ],
    },
    {
      name: "Services",
      href: "/services",
      icon: "⚡",
      submenu: [
        { name: "Livraison", href: "/services/livraison" },
        { name: "Installation", href: "/services/installation" },
        { name: "SAV", href: "/services/sav" },
      ],
    },
    {
      name: "À Propos",
      href: "/about",
      icon: "ℹ️",
    },
    {
      name: "Contact",
      href: "/contact",
      icon: "📞",
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-batobaye-primary/3 via-transparent to-orange-500/3" />
        <FloatingParticles />
      </div>

      {/* Enhanced Header with Real Logo */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-batobaye-dark/98 backdrop-blur-xl text-white sticky top-0 z-50 border-b border-batobaye-primary/20 shadow-2xl"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section with Real Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden shadow-2xl ring-2 ring-batobaye-primary/50">
                    <Image
                      src="/images/batobaye-logo.png"
                      alt="Batobaye Market Logo"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-batobaye-primary to-orange-500 rounded-full opacity-20 blur-sm animate-pulse" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-batobaye-primary via-orange-400 to-batobaye-primary bg-clip-text text-transparent">
                    BATOBAYE
                  </h1>
                  <p className="text-xs text-orange-300 font-medium tracking-wider">MARKET</p>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    {item.submenu && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                    <div className="absolute inset-0 bg-gradient-to-r from-batobaye-primary/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden"
                      >
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.div
                            key={subItem.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              href={subItem.href}
                              className="block px-4 py-3 text-gray-700 hover:bg-batobaye-primary/10 hover:text-batobaye-primary transition-all duration-200 font-medium"
                            >
                              {subItem.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* Enhanced Search Bar */}
            <div className="hidden xl:flex items-center flex-1 max-w-lg mx-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative w-full group"
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-batobaye-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Rechercher frigo, TV, chauffe-eau..."
                  className="w-full pl-12 pr-6 py-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-batobaye-primary focus:border-transparent transition-all duration-300 focus:bg-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-batobaye-primary/10 to-orange-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </div>

            {/* Contact & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* WhatsApp Button */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl px-6"
                  onClick={() => window.open("https://wa.me/237672027744", "_blank")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-batobaye-dark/95 backdrop-blur-xl border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-batobaye-dark via-gray-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-batobaye-primary/30 to-orange-500/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white"
            >
              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center space-x-6 mb-8"
              >
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5 text-batobaye-primary" />
                  <span className="text-sm font-semibold">+1000 clients</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 text-orange-400" />
                  <span className="text-sm font-semibold">Qualité garantie</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Votre{" "}
                <span className="bg-gradient-to-r from-batobaye-primary via-orange-400 to-batobaye-primary bg-clip-text text-transparent animate-pulse">
                  Partenaire
                </span>{" "}
                Électroménager
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl mb-8 text-gray-300 leading-relaxed"
              >
                🔎 Fournisseur sûr, de qualité et à petit prix
                <br />📍 Douala, Akwa & Oyem, Gabon
                <br />⚡ Gros & détail | Qualité garantie | Prix imbattables
                <br />📦 Livraison et expédition partout
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-batobaye-primary to-orange-500 hover:from-orange-500 hover:to-batobaye-primary text-white text-lg px-8 py-4 shadow-2xl hover:shadow-batobaye-primary/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 rounded-xl"
                >
                  <Package className="w-5 h-5 mr-2" />
                  Voir nos produits
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-batobaye-dark text-lg px-8 py-4 bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 rounded-xl"
                  onClick={() => window.open("tel:+237672027744", "_blank")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  672 02 77 44
                </Button>
              </motion.div>

              {/* Location Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex items-center space-x-6 mt-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Douala, Cameroun</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm">Oyem, Gabon</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Image
                    src="/placeholder.svg?height=600&width=500&text=Batobaye+Products"
                    alt="Batobaye Market Products"
                    width={500}
                    height={600}
                    className="rounded-3xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-batobaye-primary/20 to-transparent rounded-3xl" />
                </motion.div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-batobaye-primary/20 to-orange-500/20 rounded-3xl blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-batobaye-primary/3 via-transparent to-orange-500/3" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-batobaye-primary/10 to-orange-500/10 px-6 py-3 rounded-full mb-6"
            >
              <Sparkles className="w-6 h-6 text-batobaye-primary" />
              <span className="text-batobaye-primary font-bold text-lg">Pourquoi Batobaye Market ?</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-batobaye-dark mb-6">Nos Avantages</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-batobaye-primary to-orange-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Truck,
                title: "Livraison Partout",
                desc: "Cameroun & Gabon - Expédition sécurisée",
                color: "from-blue-500 to-cyan-500",
                bgIcon: "🚚",
              },
              {
                icon: Shield,
                title: "Qualité Garantie",
                desc: "Produits certifiés - Garantie constructeur",
                color: "from-green-500 to-emerald-500",
                bgIcon: "🛡️",
              },
              {
                icon: Headphones,
                title: "Support Expert",
                desc: "Conseils personnalisés - SAV réactif",
                color: "from-purple-500 to-pink-500",
                bgIcon: "🎧",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -15, scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group relative"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-24 h-24 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}
                  >
                    <service.icon className="w-12 h-12 text-white relative z-10" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <div className="absolute -inset-2 bg-gradient-to-br from-batobaye-primary/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-batobaye-dark group-hover:text-batobaye-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-batobaye-primary/10 to-orange-500/10 px-6 py-3 rounded-full mb-6"
            >
              <Zap className="w-6 h-6 text-batobaye-primary" />
              <span className="text-batobaye-primary font-bold text-lg">Nos Spécialités</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-batobaye-dark mb-6">Gamme Complète</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre sélection d'électroménager de qualité : frigos, congélateurs, TV, chauffe-eau et plus
              encore
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -20, scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} className="relative">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          width={300}
                          height={200}
                          className="w-full h-52 object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                        />
                      </motion.div>

                      {/* Category Icon */}
                      <div className="absolute top-4 left-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                          viewport={{ once: true }}
                          className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                        >
                          <span className="text-2xl">{category.icon}</span>
                        </motion.div>
                      </div>

                      <div className="absolute top-4 right-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                          viewport={{ once: true }}
                        >
                          <Badge className="bg-white/90 text-batobaye-dark shadow-lg backdrop-blur-sm font-semibold">
                            {category.productCount}+ produits
                          </Badge>
                        </motion.div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-batobaye-dark mb-3 group-hover:text-batobaye-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-batobaye-primary/3 via-transparent to-orange-500/3" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-batobaye-primary/10 to-orange-500/10 px-6 py-3 rounded-full mb-6"
            >
              <Heart className="w-6 h-6 text-batobaye-primary" />
              <span className="text-batobaye-primary font-bold text-lg">Meilleures Ventes</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-batobaye-dark mb-6">Produits Phares</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos produits les plus populaires, choisis par plus de 1000 clients satisfaits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} className="relative">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>

                      {/* Enhanced Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.badge && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                            viewport={{ once: true }}
                          >
                            <Badge
                              className={`${
                                product.badge === "Promo"
                                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg font-bold"
                                  : "bg-gradient-to-r from-batobaye-primary to-orange-500 text-white shadow-lg font-bold"
                              }`}
                            >
                              {product.badge}
                            </Badge>
                          </motion.div>
                        )}
                        {product.isHot && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                            viewport={{ once: true }}
                          >
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg font-bold">
                              🔥 Populaire
                            </Badge>
                          </motion.div>
                        )}
                      </div>

                      <div className="absolute top-4 right-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                            className={`${
                              product.inStock
                                ? "bg-green-500/90 text-white shadow-lg backdrop-blur-sm font-semibold"
                                : "bg-gray-500/90 text-white shadow-lg backdrop-blur-sm font-semibold"
                            }`}
                          >
                            {product.inStock ? "✅ En stock" : "📋 Sur commande"}
                          </Badge>
                        </motion.div>
                      </div>

                      {/* Wishlist Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Heart className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
                      </motion.button>
                    </div>

                    <div className="p-6">
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs font-medium">
                          {product.category}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-bold text-batobaye-dark mb-3 group-hover:text-batobaye-primary transition-colors duration-300">
                        {product.name}
                      </h3>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ delay: index * 0.1 + i * 0.05 + 0.6 }}
                              viewport={{ once: true }}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2 font-medium">({product.reviews} avis)</span>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.8, type: "spring" }}
                            viewport={{ once: true }}
                            className="text-2xl font-bold bg-gradient-to-r from-batobaye-primary to-orange-500 bg-clip-text text-transparent"
                          >
                            {formatPrice(product.price)}
                          </motion.span>
                          {product.oldPrice && (
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.9 }}
                              viewport={{ once: true }}
                              className="text-sm text-gray-500 line-through ml-2"
                            >
                              {formatPrice(product.oldPrice)}
                            </motion.span>
                          )}
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-xl font-semibold"
                          onClick={() => window.open("https://wa.me/237672027744", "_blank")}
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Commander
                          <ShoppingCart className="w-5 h-5 ml-2" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-batobaye-primary/10 to-orange-500/10 px-6 py-3 rounded-full mb-6"
            >
              <Star className="w-6 h-6 text-batobaye-primary" />
              <span className="text-batobaye-primary font-bold text-lg">Témoignages</span>
            </motion.div>
            <h2 className="text-5xl font-bold text-batobaye-dark mb-6">Nos Clients Parlent</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez pourquoi plus de 1000 clients nous font confiance au Cameroun et au Gabon
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-batobaye-primary to-orange-500" />

                    <div className="flex items-center mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4 shadow-lg"
                        />
                        {testimonial.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-batobaye-dark text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500 mb-1">{testimonial.location}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{ delay: index * 0.2 + i * 0.05 + 0.5 }}
                              viewport={{ once: true }}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.7 }}
                      viewport={{ once: true }}
                      className="text-gray-700 mb-6 italic leading-relaxed text-lg"
                    >
                      "{testimonial.comment}"
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 + 0.9 }}
                      viewport={{ once: true }}
                      className="text-sm text-gray-500 font-medium"
                    >
                      {testimonial.date}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Location Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-batobaye-primary/3 via-transparent to-orange-500/3" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-batobaye-primary/10 to-orange-500/10 px-6 py-3 rounded-full mb-8"
              >
                <MapPin className="w-6 h-6 text-batobaye-primary" />
                <span className="text-batobaye-primary font-bold text-lg">Nos Magasins</span>
              </motion.div>

              <h2 className="text-5xl font-bold text-batobaye-dark mb-8">Visitez-Nous</h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Retrouvez-nous dans nos showrooms pour découvrir tous nos produits et bénéficier de nos conseils
                d'experts.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    text: "Douala, Akwa - Cameroun",
                    color: "from-red-500 to-pink-500",
                    flag: "🇨🇲",
                  },
                  {
                    icon: MapPin,
                    text: "Oyem - Gabon",
                    color: "from-green-500 to-emerald-500",
                    flag: "🇬🇦",
                  },
                  {
                    icon: Phone,
                    text: "+237 672 02 77 44",
                    color: "from-blue-500 to-cyan-500",
                    flag: "📞",
                  },
                  {
                    icon: Phone,
                    text: "+241 6 58 14 39 09",
                    color: "from-purple-500 to-pink-500",
                    flag: "📞",
                  },
                  {
                    icon: Mail,
                    text: "sergebatobaye@gmail.com",
                    color: "from-orange-500 to-red-500",
                    flag: "✉️",
                  },
                  {
                    icon: Clock,
                    text: "Toujours ouvert - Service 24/7",
                    color: "from-indigo-500 to-purple-500",
                    flag: "⏰",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="flex items-center group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mr-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                    >
                      <item.icon className="w-8 h-8 text-white relative z-10" />
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">{item.flag}</span>
                        <span className="text-lg text-gray-700 group-hover:text-batobaye-primary transition-colors duration-300 font-semibold">
                          {item.text}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl h-[500px] flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-batobaye-primary/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-center relative z-10">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }}>
                    <Globe className="w-20 h-20 text-batobaye-primary mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Présence Internationale</h3>
                  <p className="text-lg text-gray-600 mb-4">Cameroun 🇨🇲 & Gabon 🇬🇦</p>
                  <p className="text-sm text-gray-500">Cartes interactives - Bientôt disponibles</p>
                </div>
              </div>
              <div className="absolute -inset-6 bg-gradient-to-br from-batobaye-primary/20 to-orange-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-batobaye-dark via-gray-900 to-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-2xl ring-2 ring-batobaye-primary/50">
                    <Image
                      src="/images/batobaye-logo.png"
                      alt="Batobaye Market Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-batobaye-primary to-orange-500 rounded-full opacity-20 blur-sm animate-pulse" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-batobaye-primary to-orange-500 bg-clip-text text-transparent">
                    BATOBAYE
                  </h1>
                  <p className="text-sm text-orange-300 font-medium tracking-wider">MARKET</p>
                </div>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Votre partenaire de confiance pour l'électroménager de qualité au Cameroun et au Gabon. Plus de 1000
                clients satisfaits nous font confiance.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Twitter].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-batobaye-primary/20 transition-all duration-300 group"
                  >
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-batobaye-primary transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Navigation",
                links: [
                  { name: "Accueil", href: "/" },
                  { name: "Produits", href: "/produits" },
                  { name: "Services", href: "/services" },
                  { name: "Contact", href: "/contact" },
                ],
              },
              {
                title: "Nos Produits",
                links: [
                  { name: "Réfrigérateurs Brigo", href: "/produits/refrigerateurs" },
                  { name: "Téléviseurs", href: "/produits/televiseurs" },
                  { name: "Chauffe-eau", href: "/produits/chauffe-eau" },
                  { name: "Cuisinières", href: "/produits/cuisinieres" },
                ],
              },
              {
                title: "Contact",
                links: [
                  { name: "🇨🇲 Douala, Akwa", href: "#" },
                  { name: "🇬🇦 Oyem, Gabon", href: "#" },
                  { name: "📞 +237 672 02 77 44", href: "tel:+237672027744" },
                  { name: "✉️ sergebatobaye@gmail.com", href: "mailto:sergebatobaye@gmail.com" },
                ],
              },
            ].map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 + 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-8 text-white">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: sectionIndex * 0.1 + linkIndex * 0.05 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-batobaye-primary transition-colors duration-300 hover:translate-x-2 inline-block text-lg"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 mt-16 pt-10 text-center"
          >
            <p className="text-gray-400 text-lg">
              © 2024 Batobaye Market. Tous droits réservés. Fait avec ❤️ en Afrique Centrale
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Gros & détail | Qualité garantie | Prix imbattables | Livraison partout
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Enhanced Floating WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full w-20 h-20 shadow-2xl hover:shadow-green-500/25 transition-all duration-300 relative overflow-hidden group"
            onClick={() => window.open("https://wa.me/237672027744", "_blank")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="w-10 h-10 relative z-10" />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 bg-green-400 rounded-full opacity-20"
            />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
