"use client"

import { Phone, MapPin, MessageSquare, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactInfo() {
  return (
    <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader>
        <CardTitle className="text-center text-orange-800">
          🏪 Bienvenu chez Batobaye Market
        </CardTitle>
        <p className="text-center text-orange-700 font-medium">
          Votre magasin pour tout produit au prix de gros 💪
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Groupe WhatsApp */}
          <a 
            href="https://chat.whatsapp.com/GPAb1RtkW5m80yQMRho9sL?mode=ac_c" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Rejoindre notre groupe WhatsApp
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>

          {/* Catalogue WhatsApp */}
          <a 
            href="https://wa.me/c/237672027744" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Consulter notre catalogue
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        {/* Informations de localisation */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-semibold text-gray-900">Lieu :</p>
              <p className="text-gray-700">Douala - Akwa Fokou Douche en station MRS</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-semibold text-gray-900">Téléphone :</p>
              <p className="text-gray-700">+237 672 02 77 44</p>
            </div>
          </div>

          {/* GPS */}
          <a 
            href="https://maps.app.goo.gl/oLsnJSdbaprzPBDX6?g_st=ac" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              <MapPin className="w-4 h-4 mr-2" />
              GPS pour nous localiser
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>

        <div className="text-center text-orange-800 font-semibold">
          *Dites-nous comment nous pouvons vous aider ?*
        </div>
      </CardContent>
    </Card>
  )
} 