import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Retours & Remboursements | Mbengsend",
  description:
    "Découvrez notre politique de retour pour les envois internationaux et comment procéder à un remboursement ou un échange.",
}

export default function ReturnsPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="content-container max-w-4xl mx-auto">
        <div className="flex flex-col gap-y-4 mb-16">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Politique de Retours et Remboursements
          </Heading>
          <Text className="text-lg text-ui-fg-muted">
            Chez Mbengsend, votre satisfaction est primordiale. En raison de la nature internationale de nos envois (Europe vers Cameroun), notre politique de retour est encadrée pour limiter les abus tout en vous protégeant efficacement.
          </Text>
        </div>

        <div className="flex flex-col gap-y-12">
          {/* Section 1 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary font-bold text-sm">
                1
              </span>
              <Heading level="h2" className="text-2xl font-display text-brand-dark">Droits de Rétractation (Europe)</Heading>
            </div>
            <div className="pl-12 flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Conformément à la législation européenne, les clients résidant en Europe (qui se font livrer en Europe) disposent d'un délai de <strong>14 jours</strong> pour retourner un produit sans justification.</p>
              <p>Pour être éligible, l'article doit être exactement dans le même état que celui dans lequel vous l'avez reçu : non ouvert, non porté avec ses étiquettes d'origine.</p>
              <p>Les frais de retour vers notre entrepôt européen sont <strong>à la charge du client</strong> dans ce cas de figure.</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary font-bold text-sm">
                2
              </span>
              <Heading level="h2" className="text-2xl font-display text-brand-dark">Retours au Cameroun</Heading>
            </div>
            <div className="pl-12 flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>En raison des coûts logistiques importants d'un retour intercontinental, les retours depuis le Cameroun s'appliquent uniquement en cas de <strong>produit défectueux ou non conforme à la commande</strong>.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Le signalement doit être fait dans les <strong>48 heures</strong> suivant la réception du colis.</li>
                <li>Contactez notre service client via la page <a href="/contact" className="text-brand-primary hover:underline">Contact</a> avec photos à l'appui.</li>
                <li>Si le défaut est avéré, Mbengsend organisera la récupération du produit localement et vous remboursera intégralement.</li>
              </ul>
              <div className="p-4 mt-2 bg-yellow-50 text-yellow-800 border left-4 border-yellow-200 rounded-lg text-sm">
                <strong>Attention exceptions :</strong> Pour des raisons d'hygiène et de sécurité, les produits de beauté, soins, cosmétiques ou sous-vêtements ouverts ne sont ni repris ni échangés.
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary font-bold text-sm">
                3
              </span>
              <Heading level="h2" className="text-2xl font-display text-brand-dark">Procédure de Remboursement</Heading>
            </div>
            <div className="pl-12 flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Une fois que nous aurons reçu et inspecté l'article retourné, nous vous enverrons un e-mail pour confirmer l'approbation de votre remboursement.</p>
              <p>Le remboursement sera effectué via le mode de paiement initial (Stripe, Paypal) ou par Mobile Money si le paiement original a été fait localement, dans un délai de <strong>7 à 14 jours ouvrables</strong>.</p>
              <p>Nous pouvons également vous proposer, au choix, un avoir (bon d'achat) utilisable immédiatement sur notre boutique.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
