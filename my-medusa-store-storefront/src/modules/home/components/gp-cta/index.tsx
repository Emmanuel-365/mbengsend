import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const GpCta = () => {
  return (
    <div className="bg-brand-secondary/5 py-12">
      <div className="content-container flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-xl">
          <Heading level="h2" className="text-3xl lg:text-4xl font-display font-bold text-brand-dark leading-tight">
            Vous voyagez bientôt ? <span className="text-brand-secondary">Vendez vos kilos et financez votre billet !</span>
          </Heading>
          <Text className="mt-4 text-lg text-gray-700">
            Notre service de mise en relation (souvent appelé "GP") vous permet de transporter les colis d'autres membres de la communauté. 
            C'est simple, sécurisé par Mbengsend, et vous permet de rentabiliser votre voyage.
          </Text>
          <LocalizedClientLink href="/gp#sell" passHref>
            <Button className="mt-8 text-lg px-8 py-4 rounded-full bg-brand-secondary text-white shadow-lg hover:bg-brand-secondary/90 transform hover:-translate-y-1 transition-all duration-300">
              Proposer un voyage
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Image/Icon */}
        <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-brand-primary/10 rounded-full animate-pulse-slow"></div>
            <span className="text-8xl lg:text-9xl drop-shadow-lg">⚖️</span>
        </div>
      </div>
    </div>
  )
}

export default GpCta
