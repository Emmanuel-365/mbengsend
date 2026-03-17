import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Foire Aux Questions | Mbengsend",
  description:
    "Vous avez des questions sur nos produits camerounais, la livraison vers l'Europe ou les paiements ? Trouvez vos réponses ici.",
}

const faqs = [
  {
    category: "Commandes & Achats",
    questions: [
      {
        q: "Comment fonctionne Mbengsend ?",
        a: "Nous sélectionnons l'excellence des produits du terroir et de l'artisanat camerounais pour les proposer au marché européen. Une fois votre commande passée, nous gérons toute la logistique depuis le Cameroun jusqu'à votre domicile en Europe.",
      },
      {
        q: "Les produits sont-ils authentiques ?",
        a: "Absolument. Nous travaillons en collaboration directe avec des producteurs et artisans locaux au Cameroun pour vous garantir des produits authentiques, éthiques et de haute qualité.",
      },
    ]
  },
  {
    category: "Paiements",
    questions: [
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Nous acceptons les cartes bancaires internationales (Visa, Mastercard via Stripe) ainsi que PayPal pour nos clients en Europe. Pour nos clients au Cameroun, les paiements par Mobile Money sont également disponibles.",
      },
    ]
  },
  {
    category: "Livraison & Logistique",
    questions: [
      {
        q: "Quels sont les délais de livraison vers l'Europe ?",
        a: "Nos délais de livraison standard vers l'Europe sont de 5 à 10 jours ouvrés par fret aérien. Pour certains articles volumineux ou commandes spéciales, nous proposons également des options de fret maritime avec des délais adaptés.",
      },
      {
        q: "Comment puis-je suivre ma commande ?",
        a: "Dès l'expédition de votre colis depuis notre plateforme logistique au Cameroun, vous recevrez un email avec un numéro de suivi. Vous pourrez suivre son trajet jusqu'à la livraison finale à votre porte en Europe.",
      },
      {
        q: "Y a-t-il des frais de douane à prévoir ?",
        a: "Dans la plupart des cas, nos prix affichés incluent déjà les frais logistiques. Pour les livraisons en Europe, nous nous efforçons de simplifier au maximum les démarches administratives pour que vous receviez votre colis sans tracas.",
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
