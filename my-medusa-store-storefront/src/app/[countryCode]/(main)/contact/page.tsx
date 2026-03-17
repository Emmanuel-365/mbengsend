import { Metadata } from "next"
import { Heading, Text, Button, Input } from "@medusajs/ui"
import { Envelope, Phone, MapPin } from "@medusajs/icons"

export const metadata: Metadata = {
  title: "Contactez-nous | Mbengsend",
  description:
    "Avez-vous une question sur un produit ou votre livraison ? L'équipe Mbengsend est là pour vous aider.",
}

export default function ContactPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="content-container">
        
        {/* Header */}
        <div className="flex flex-col gap-y-4 text-center max-w-2xl mx-auto mb-16">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Contactez-nous
          </Heading>
          <Text className="text-lg text-ui-fg-muted">
            Notre équipe est disponible pour répondre à toutes vos interrogations concernant nos produits, nos services logistiques et vos commandes.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Informations de Contact */}
          <div className="flex flex-col gap-y-12">
            <div>
              <Heading level="h2" className="text-2xl font-display text-brand-dark mb-6">Nos Coordonnées</Heading>
              
              <div className="flex flex-col gap-y-8">
                <div className="flex items-start gap-x-4">
                  <div className="p-3 bg-ui-bg-subtle rounded-full text-brand-primary">
                    <Phone />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span className="font-semibold text-ui-fg-base">Téléphone (Assistance)</span>
                    <a href="tel:+237600000000" className="text-ui-fg-subtle hover:text-brand-primary transition-colors">
                      +237 600 000 000
                    </a>
                    <span className="text-xs text-ui-fg-muted mt-1">Lundi - Vendredi, 9h - 18h (WAT)</span>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <div className="p-3 bg-ui-bg-subtle rounded-full text-brand-primary">
                    <Envelope />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span className="font-semibold text-ui-fg-base">Email</span>
                    <a href="mailto:support@mbengsend.com" className="text-ui-fg-subtle hover:text-brand-primary transition-colors">
                      support@mbengsend.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-x-4">
                  <div className="p-3 bg-ui-bg-subtle rounded-full text-brand-primary">
                    <MapPin />
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span className="font-semibold text-ui-fg-base">Plateforme Logistique Europe</span>
                    <address className="not-italic text-ui-fg-subtle">
                      Rue de l'Expédition, 75000 Paris, France
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Note sur les retours */}
            <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
              <Heading level="h3" className="text-lg font-semibold text-brand-primary mb-2">
                À propos des retours
              </Heading>
              <Text className="text-sm text-ui-fg-subtle">
                Pour les demandes de retour depuis le Cameroun vers l'Europe, veuillez d'abord nous contacter via ce formulaire pour initier le processus logistique, ou consultez notre page Retours.
              </Text>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className="p-8 bg-ui-bg-subtle rounded-3xl border border-ui-border-base shadow-sm">
            <Heading level="h2" className="text-2xl font-display text-brand-dark mb-8">Envoyez-nous un message</Heading>
            <form className="flex flex-col gap-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="first_name" className="text-sm font-medium text-ui-fg-base">Prénom</label>
                  <Input id="first_name" name="first_name" placeholder="John" required />
                </div>
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="last_name" className="text-sm font-medium text-ui-fg-base">Nom</label>
                  <Input id="last_name" name="last_name" placeholder="Doe" required />
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="text-sm font-medium text-ui-fg-base">Email</label>
                <Input type="email" id="email" name="email" placeholder="john.doe@example.com" required />
              </div>

              <div className="flex flex-col gap-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-ui-fg-base">Sujet</label>
                <select id="subject" name="subject" className="p-2 border border-ui-border-base rounded-md focus:ring-2 focus:ring-brand-primary/50 outline-none text-sm text-ui-fg-base bg-white">
                  <option value="order">Suivi de commande</option>
                  <option value="shipping">Logistique & Fret</option>
                  <option value="return">Retour d'un produit</option>
                  <option value="other">Autre question</option>
                </select>
              </div>

              <div className="flex flex-col gap-y-2">
                <label htmlFor="message" className="text-sm font-medium text-ui-fg-base">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="p-3 border border-ui-border-base rounded-md focus:ring-2 focus:ring-brand-primary/50 outline-none resize-none text-sm text-ui-fg-base"
                  placeholder="Comment pouvons-nous vous aider ?"
                  required
                ></textarea>
              </div>

              <Button type="button" size="large" className="w-full mt-4 bg-brand-primary text-white hover:bg-brand-primary-hover">
                Envoyer le message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
