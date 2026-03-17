import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Foire Aux Questions | Mbengsend",
  description:
    "Vous avez des questions sur nos services, la livraison vers le Cameroun ou les paiements ? Trouvez vos réponses ici.",
}

const faqs = [
  {
    category: "Commandes & Achats",
    questions: [
      {
        q: "Comment fonctionne Mbengsend ?",
        a: "Nous sourçons des produits de haute qualité depuis l'Europe (France, Allemagne, etc.) que vous pouvez acheter directement sur notre plateforme. Une fois la commande passée, nous gérons toute la logistique jusqu'à la livraison entre vos mains au Cameroun.",
      },
      {
        q: "Puis-je commander des produits qui ne sont pas sur le site ?",
        a: "Pour le moment, nous proposons uniquement les produits listés sur notre boutique. Cependant, notre catalogue s'enrichit régulièrement selon la demande de nos clients au Cameroun.",
      },
    ]
  },
  {
    category: "Paiements",
    questions: [
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Nous acceptons les cartes bancaires internationales (Visa, Mastercard via Stripe), PayPal, ainsi que les paiements par Mobile Money (Orange Money, MTN Mobile Money) via notre partenaire Flutterwave pour les résidents au Cameroun.",
      },
      {
        q: "Le paiement à la livraison est-il possible ?",
        a: "Oui, le Paiement à la Livraison (Cash On Delivery) est disponible pour certaines zones géographiques (notamment Yaoundé et Douala) et sous conditions. Cette option apparaîtra lors de la finalisation de votre commande si vous y êtes éligible.",
      },
    ]
  },
  {
    category: "Livraison & Logistique",
    questions: [
      {
        q: "Quels sont les délais de livraison vers le Cameroun ?",
        a: "Les délais dépendent du mode de transport choisi. Le Fret Aérien (Air Freight) prend généralement 5 à 10 jours ouvrés. Le Fret Maritime (Sea Freight), plus économique pour les articles volumineux, prend entre 4 et 6 semaines.",
      },
      {
        q: "Comment puis-je suivre ma commande ?",
        a: "Une fois votre commande expédiée de notre plateforme européenne, vous recevrez un email contenant un numéro de suivi. Vous pourrez suivre l'avancée de votre colis, de son départ d'Europe jusqu'à son arrivée au port ou à l'aéroport au Cameroun, puis lors de la distribution locale.",
      },
      {
        q: "Dois-je payer des frais de douane à la réception ?",
        a: "Non ! Chez Mbengsend, nous fonctionnons en 'DDP' (Delivery Duty Paid). Les prix affichés sur le site et les frais de livraison incluent déjà les frais de dédouanement. Vous n'aurez rien à payer en plus au Cameroun.",
      },
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="py-12 md:py-24 bg-ui-bg-subtle">
      <div className="content-container max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col gap-y-4 text-center mb-16">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Fonds Aux Questions
          </Heading>
          <Text className="text-lg text-ui-fg-muted max-w-2xl mx-auto">
            Retrouvez ici les réponses aux questions les plus fréquemment posées par notre communauté.
          </Text>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-y-16">
          {faqs.map((section, index) => (
            <div key={index} className="flex flex-col gap-y-8">
              <Heading level="h2" className="text-3xl font-display text-brand-dark border-b border-ui-border-base pb-4">
                {section.category}
              </Heading>
              
              <div className="flex flex-col gap-y-6">
                {section.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-ui-border-base">
                    <Heading level="h3" className="text-xl font-semibold text-brand-secondary mb-3">
                      {faq.q}
                    </Heading>
                    <Text className="text-base text-ui-fg-subtle leading-relaxed">
                      {faq.a}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cta */}
        <div className="mt-20 p-8 md:p-12 bg-brand-primary/10 rounded-3xl border border-brand-primary/20 text-center flex flex-col items-center">
          <Heading level="h3" className="text-2xl font-display font-bold text-brand-dark mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </Heading>
          <Text className="text-ui-fg-subtle mb-8 max-w-xl">
            Notre équipe d'assistance clientèle est à votre disposition pour vous accompagner dans votre expérience d'achat.
          </Text>
          <a href="/contact" className="px-8 py-3 bg-brand-primary text-white font-medium rounded-full hover:bg-brand-primary-hover transition-colors">
            Contactez-nous
          </a>
        </div>

      </div>
    </div>
  )
}
