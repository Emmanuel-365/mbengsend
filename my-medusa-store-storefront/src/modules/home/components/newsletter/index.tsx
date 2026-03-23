"use client"

import { Button, Heading, Input, Text as MedusaText } from "@medusajs/ui"

const Newsletter = () => {
    return (
        <div className="py-12 small:py-24 bg-brand-dark text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] small:w-[500px] h-[300px] small:h-[500px] bg-brand-primary/10 rounded-full blur-[80px] small:blur-[120px] -mr-24 small:-mr-48 -mt-24 small:-mt-48" />
            <div className="absolute bottom-0 left-0 w-[300px] small:w-[600px] h-[300px] small:h-[600px] bg-white/5 rounded-full blur-[80px] small:blur-[140px] -ml-32 small:-ml-64 -mb-32 small:-mb-64" />

            <div className="content-container relative z-10 flex flex-col items-center text-center py-12 small:py-20">
                <div className="bg-brand-gold/10 p-3 rounded-3xl mb-8 small:mb-10 backdrop-blur-md border border-white/10">
                    <div className="bg-brand-gold p-4 small:p-5 rounded-2xl shadow-lux-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-brand-dark"
                        >
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                        </svg>
                    </div>
                </div>

                <Heading level="h2" className="text-4xl small:text-6xl medium:text-7xl font-display font-bold mb-6 small:mb-8 tracking-tight text-white">
                    Rejoignez le <span className="text-brand-gold italic underline decoration-white/20 underline-offset-8">Cercle Mbengsend</span>
                </Heading>
                <MedusaText className="text-lg small:text-xl text-white/60 max-w-2xl mb-12 small:mb-16 font-sans leading-relaxed">
                    Soyez les premiers informés de nos nouveaux arrivages du terroir, de nos promotions exclusives et de nos actualités logistiques vers l'Europe.
                </MedusaText>

                <form className="flex flex-col small:flex-row gap-4 small:gap-0 w-full max-w-2xl bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] small:rounded-full border border-white/10 shadow-2xl" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        type="email"
                        placeholder="Votre adresse email"
                        className="rounded-full bg-transparent border-none text-white h-14 small:h-16 px-8 focus:ring-0 transition-all flex-1 text-base placeholder:text-white/30"
                    />
                    <Button className="rounded-full bg-brand-gold hover:bg-white text-brand-dark px-10 h-14 small:h-16 text-sm small:text-base font-bold uppercase tracking-widest transition-all duration-500 shadow-lux-md hover:scale-[1.05] active:scale-[0.95]">
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
