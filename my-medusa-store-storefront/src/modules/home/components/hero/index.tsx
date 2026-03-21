"use client"

import { Button, Heading, Text } from "@medusajs/ui"
import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Plane } from "lucide-react"

const Hero = () => {
  return (
    <div className="relative min-h-[70vh] small:min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#FDFDFD]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[300px] small:w-[500px] h-[300px] small:h-[500px] bg-brand-primary/5 rounded-full blur-[80px] small:blur-[120px] -mr-24 small:-mr-48 -mt-24 small:-mt-48" />
      <div className="absolute bottom-0 left-0 w-[300px] small:w-[600px] h-[300px] small:h-[600px] bg-brand-secondary/5 rounded-full blur-[80px] small:blur-[140px] -ml-32 small:-ml-64 -mb-32 small:-mb-64" />

      {/* Content Container */}
      <div className="content-container relative z-10 grid grid-cols-1 small:grid-cols-2 gap-6 small:gap-12 items-center py-12 small:py-0">

        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 small:gap-8"
        >
          <div className="flex flex-col gap-3 small:gap-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-brand-gold font-display font-semibold tracking-[0.2em] uppercase text-xs small:text-sm"
            >
              Luxe & Logistique Sans Frontières
            </motion.span>
            <Heading
              level="h1"
              className="text-4xl small:text-6xl medium:text-8xl font-display font-bold text-brand-dark leading-[1] tracking-tight"
            >
              Le Cameroun <br />
              <span className="text-brand-gold">au cœur de l'Europe.</span>
            </Heading>
            <Text className="text-base small:text-xl text-ui-fg-subtle max-w-[540px] leading-relaxed font-sans">
              Découvrez l'excellence des produits camerounais livrés partout en Europe. Mbengsend connecte le savoir-faire local aux marchés internationaux avec élégance.
            </Text>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-4 small:gap-6"
          >
            <LocalizedClientLink href="/store">
              <Button size="large" className="rounded-full bg-brand-dark hover:bg-brand-gold text-white px-8 small:px-10 h-14 small:h-16 text-sm small:text-base transition-all duration-500 shadow-lux-lg hover:scale-[1.05] active:scale-[0.95] border-none font-sans font-bold uppercase tracking-widest">
                Découvrir la Boutique
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/about">
              <Button variant="secondary" size="large" className="rounded-full border-brand-gold/30 text-brand-gold px-8 small:px-10 h-14 small:h-16 text-sm small:text-base hover:bg-brand-gold/5 transition-all duration-500 font-sans font-bold uppercase tracking-widest">
                Notre Histoire
              </Button>
            </LocalizedClientLink>
          </motion.div>

          {/* Trust stats or features */}
          <div className="grid grid-cols-3 gap-8 small:gap-12 mt-6 small:mt-10 pt-8 small:pt-12 border-t border-brand-gold/10">
            <div>
              <Text className="font-display font-bold text-2xl small:text-3xl text-brand-dark italic">100%</Text>
              <Text className="text-[10px] small:text-xs text-ui-fg-muted uppercase tracking-[0.2em] font-sans font-medium mt-1">Sécurisé</Text>
            </div>
            <div>
              <Text className="font-display font-bold text-2xl small:text-3xl text-brand-dark italic">Cameroun</Text>
              <Text className="text-[10px] small:text-xs text-ui-fg-muted uppercase tracking-[0.2em] font-sans font-medium mt-1">Savoir-faire</Text>
            </div>
            <div>
              <Text className="font-display font-bold text-2xl small:text-3xl text-brand-gold italic">Europe</Text>
              <Text className="text-[10px] small:text-xs text-ui-fg-muted uppercase tracking-[0.2em] font-sans font-medium mt-1">Destination</Text>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative aspect-square flex items-center justify-center hidden small:flex"
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
