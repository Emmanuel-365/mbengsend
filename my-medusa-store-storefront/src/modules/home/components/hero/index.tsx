"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#FDFDFD]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[140px] -ml-64 -mb-64" />

      {/* Content Container */}
      <div className="content-container relative z-10 grid grid-cols-1 small:grid-cols-2 gap-12 items-center">

        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-brand-primary font-display font-semibold tracking-wider uppercase text-sm"
            >
              Luxe & Logistique Sans Frontières
            </motion.span>
            <Heading
              level="h1"
              className="text-5xl small:text-7xl font-display font-bold text-brand-dark leading-[1.1] tracking-tight"
            >
              L'Europe à portée <br />
              <span className="text-brand-primary">de votre main.</span>
            </Heading>
            <Text className="text-lg text-ui-fg-subtle max-w-[480px] leading-relaxed">
              Faites vos achats en Europe et faites-vous livrer au Cameroun en toute sérénité. Mbengsend redéfinit le shopping transcontinental avec élégance.
            </Text>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <LocalizedClientLink href="/store">
              <Button size="large" className="rounded-full bg-brand-dark hover:bg-brand-secondary text-white px-8 h-14 text-base transition-all duration-300 shadow-lux-md hover:scale-105 active:scale-95">
                Découvrir la Boutique
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/about">
              <Button variant="secondary" size="large" className="rounded-full border-brand-primary/20 text-brand-primary px-8 h-14 text-base hover:bg-brand-primary/5 transition-all duration-300">
                En savoir plus
              </Button>
            </LocalizedClientLink>
          </motion.div>

          {/* Trust stats or features */}
          <div className="grid grid-cols-3 gap-8 mt-4 pt-8 border-t border-grey-10">
            <div>
              <Text className="font-display font-bold text-xl text-brand-dark">100%</Text>
              <Text className="text-xs text-ui-fg-muted uppercase tracking-widest">Sécurisé</Text>
            </div>
            <div>
              <Text className="font-display font-bold text-xl text-brand-dark">Cameroun</Text>
              <Text className="text-xs text-ui-fg-muted uppercase tracking-widest">Brest & Douala</Text>
            </div>
            <div>
              <Text className="font-display font-bold text-xl text-brand-dark">2026</Text>
              <Text className="text-xs text-ui-fg-muted uppercase tracking-widest">Next Gen</Text>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Decorative Circles */}
          <div className="absolute inset-0 border-[1px] border-brand-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-10 border-[1px] border-brand-secondary/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

          {/* Glassmorphic "Shipping" Island */}
          <div className="relative w-4/5 h-4/5 rounded-[40px] glass overflow-hidden translate-y-4 shadow-2xl flex items-center justify-center p-8">
            <div className="relative w-full h-full">
              <Image
                src="/logo.png"
                alt="Mbengsend Hub"
                fill
                className="object-contain p-12 drop-shadow-[0_20px_50px_rgba(0,102,204,0.3)]"
              />
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-0 glass px-6 py-4 rounded-2xl shadow-lux-lg flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white">
              ✈️
            </div>
            <div>
              <Text className="font-bold text-sm text-brand-dark">Liaison Quotidienne</Text>
              <Text className="text-[10px] text-ui-fg-muted">Europe ⟷ Cameroun</Text>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default Hero
