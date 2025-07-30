"use client"

import { motion } from "framer-motion"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-batobaye-dark via-gray-900 to-batobaye-brown">
      <div className="relative">
        {/* Main spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-batobaye-primary/20 border-t-batobaye-primary rounded-full"
        />

        {/* Inner spinner */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-2 w-12 h-12 border-4 border-batobaye-light/20 border-b-batobaye-light rounded-full"
        />

        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-6 w-4 h-4 bg-gradient-to-br from-batobaye-primary to-batobaye-light rounded-full"
        />
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute mt-24 text-center"
      >
        <h3 className="text-white text-lg font-semibold mb-2">Chargement...</h3>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
              className="w-2 h-2 bg-batobaye-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
