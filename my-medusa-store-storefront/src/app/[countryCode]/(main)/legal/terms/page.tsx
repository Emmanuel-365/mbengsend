import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Mbengsend",
  description:
    "Consultez les conditions générales de vente et d'utilisation de la plateforme e-commerce Mbengsend pour l'Europe et le Cameroun.",
}

export default function TermsPage() {
  return (
    <div className="py-12 md:py-24 bg-white">
      <div className="content-container max-w-4xl mx-auto">
        <div className="flex flex-col gap-y-4 mb-16 border-b border-ui-border-base pb-8">
          <Heading level="h1" className="text-4xl md:text-5xl font-display font-medium text-brand-secondary tracking-tight">
            Conditions Générales de Vente (CGV)
          </Heading>
          <Text className="text-lg text-ui-fg-muted">
            Les présentes Conditions Générales définissent les règles d'utilisation de notre plateforme et encadrent vos achats sur Mbengsend, que ce soit pour une livraison en Europe ou au Cameroun.
          </Text>
          <Text className="text-sm text-ui-fg-subtle mt-4">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</Text>
        </div>

        <div className="flex flex-col gap-y-12">
          
          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">1. Objet du Service</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Mbengsend est une plateforme de commerce électronique permettant l'achat de produits physiques principalement sourcés en Europe, avec un service logistique intégré pour faciliter leur acheminement et leur livraison au Cameroun, ainsi que la gestion des livraisons classiques au sein de l'Europe.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">2. Commandes et Acceptation</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Toute commande passée sur la plateforme constitue une offre ferme d'achat des produits sélectionnés sous réserve des présentes CGV.</p>
              <p>La commande n'est définitivement confirmée et engageante pour Mbengsend qu'après :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>La validation du paiement (par carte bancaire ou Mobile Money), ou l'approbation de l'option "Paiement à la livraison" (lorsque disponible).</li>
                <li>L'envoi d'un e-mail de confirmation de commande résumant les articles, l'adresse de livraison et le coût total de la transaction.</li>
              </ul>
              <p>Nous nous réservons le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige ou pour des suspicions de fraude.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">3. Prix et Déclaration Douanière</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Les prix affichés sur le site sont indiqués en FCFA ou en Euros, selon votre choix et votre géolocalisation.</p>
              <div className="p-4 bg-brand-primary/5 border-l-4 border-brand-primary rounded-r-lg">
                <strong>Livraison au Cameroun (DDP) :</strong> Nos tarifs de livraison vers le Cameroun incluent les frais de transport <strong>ET</strong> les frais de dédouanement. Vous n'aurez aucune taxe ni frais cachés à payer au moment de la réception de votre colis.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">4. Transport et Livraison</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Mbengsend agit en tant qu'organisateur logistique (fret aérien et maritime). </p>
              <p>Les délais de livraison annoncés lors de la commande (généralement 5-10 jours en aérien et 4-6 semaines en maritime) sont des <strong>délais estimatifs</strong>. Bien que nous mettions tout en œuvre pour les respecter, des aléas (contrôles douaniers, retards compagnies aériennes/maritimes, intempéries) peuvent survenir.</p>
              <p>Il appartient au client de vérifier l'exactitude de l'adresse de livraison et le numéro de téléphone pour garantir une remise en main propre efficace.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">5. Responsabilité et Litiges</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>La responsabilité de Mbengsend ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l'utilisation du réseau Internet (rupture de service, intrusion extérieure, virus, etc.).</p>
              <p>En ce qui concerne les produits, notre responsabilité se limite à la conformité des articles expédiés selon les descriptifs du site.</p>
              <p>En cas de litige, une solution amiable sera prioritairement recherchée via notre <a href="/contact" className="text-brand-primary hover:underline">Service Client</a> avant toute action en justice.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
