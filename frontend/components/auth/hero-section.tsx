"use client"

import { motion } from "framer-motion"
import { Droplets } from "lucide-react"
import { WaterBackground } from "./water-background"

export function HeroSection() {
  return (
    <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 min-h-screen overflow-hidden">
      <WaterBackground />
      
      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight">WaterAudit</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Welcome to WaterAudit
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-white/90 mb-10 leading-relaxed text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Smart water management and auditing made simple
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {["Real-time Monitoring", "Smart Analytics", "Easy Reporting"].map(
            (feature, i) => (
              <motion.div
                key={feature}
                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              >
                {feature}
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
