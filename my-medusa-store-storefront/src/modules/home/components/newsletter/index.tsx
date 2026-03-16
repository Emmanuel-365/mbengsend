"use client"

import { Button, Heading, Input, Text as MedusaText } from "@medusajs/ui"

const Newsletter = () => {
    return (
        <div className="py-12 small:py-24 bg-brand-dark text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] small:w-[500px] h-[300px] small:h-[500px] bg-brand-primary/10 rounded-full blur-[80px] small:blur-[120px] -mr-24 small:-mr-48 -mt-24 small:-mt-48" />
            <div className="absolute bottom-0 left-0 w-[300px] small:w-[600px] h-[300px] small:h-[600px] bg-white/5 rounded-full blur-[80px] small:blur-[140px] -ml-32 small:-ml-64 -mb-32 small:-mb-64" />

            <div className="content-container relative z-10 flex flex-col items-center text-center">
                <div className="bg-brand-primary/20 p-2 rounded-full mb-4 small:mb-6">
                    <div className="bg-brand-primary p-2 small:p-3 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            small="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                        </svg>
                    </div>
                </div>

                <Heading level="h2" className="text-2xl small:text-4xl medium:text-5xl font-display font-bold mb-4 small:mb-6 tracking-tight">
                    Rejoignez le <span className="text-brand-primary">Cercle Mbengsend</span>
                </Heading>
                <MedusaText className="text-base small:text-lg text-white/70 max-w-[600px] mb-8 small:mb-12">
                    Soyez les premiers informés de nos nouveaux arrivages d'Europe, de nos promotions exclusives et de nos actualités logistiques.
                </MedusaText>

                <form className="flex flex-col small:flex-row gap-3 small:gap-4 w-full max-w-[500px]" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="email"
                        placeholder="Votre adresse email"
                        className="rounded-full bg-white/5 border-white/10 text-white h-12 small:h-14 px-4 small:px-6 focus:border-brand-primary transition-colors flex-1 text-sm small:text-base"
                    />
                    <Button className="rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white px-6 small:px-8 h-12 small:h-14 text-sm small:text-base font-semibold shadow-lux-md transition-all duration-300 whitespace-nowrap">
                        S'abonner
                    </Button>
                </form>

                <MedusaText className="mt-4 small:mt-6 text-xs small:text-sm text-white/40">
                    En vous abonnant, vous acceptez notre politique de confidentialité. Désinscription à tout moment.
                </MedusaText>
            </div>
        </div>
    )
}

export default Newsletter
