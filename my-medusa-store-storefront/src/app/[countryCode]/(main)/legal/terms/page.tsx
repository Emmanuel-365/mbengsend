import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | Mbengsend",
  description: "Consultez les conditions générales de vente et d'utilisation de la plateforme e-commerce Mbengsend.",
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
            Les présentes Conditions Générales définissent les règles d'utilisation de notre plateforme et encadrent vos achats sur Mbengsend.
          </Text>
          <Text className="text-sm text-ui-fg-subtle mt-4">Dernière mise à jour : 25 mars 2026</Text>
        </div>

        <div className="flex flex-col gap-y-12">
          
          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">1. Objet</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Les présentes conditions générales de vente (CGV) définissent les droits et obligations de mbengsend.com et de ses clients concernant :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>La vente de kilos pour voyageurs pour l’envoi de colis.</li>
                <li>La vente de produits camerounais via la boutique en ligne.</li>
              </ul>
              <p>En passant commande sur le site, le client accepte expressément ces CGV.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">2. Identification du vendeur</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p><strong>MbengSend</strong><br/>
              Responsable : Armand Judicael ABOUEM ABOUEM<br/>
              Email : armandabouem@icloud.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">3. Commandes</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Les commandes s’effectuent uniquement via le site mbengsend.com.</li>
                <li>La confirmation de commande est envoyée par email.</li>
                <li>Les informations communiquées doivent être exactes et complètes.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">4. Produits et services</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Vente de kilos :</strong> poids disponible pour voyageurs, tarification au kilo, livraison selon les modalités convenues.</li>
                <li><strong>Boutique en ligne :</strong> produits alimentaires, artisanat, vêtements ou accessoires camerounais.</li>
              </ul>
              <p>Les images et descriptions des produits sont fournies à titre indicatif.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">5. Prix</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Tous les prix sont indiqués en euros (€) et incluent les taxes applicables (TVA).</li>
                <li>Les frais de livraison sont précisés avant validation de la commande.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">6. Paiement</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Paiement sécurisé via Stripe, PayPal ou autres moyens proposés.</li>
                <li>La commande est validée après confirmation du paiement.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">7. Livraison</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Les colis sont expédiés selon le type de service choisi.</li>
                <li>Les délais sont indicatifs et ne sauraient engager la responsabilité de MbengSend en cas de retard indépendant de sa volonté.</li>
                <li>Le client doit vérifier l’état du colis à la réception et signaler toute anomalie.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">8. Droit de rétractation</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Conformément à la législation, le client dispose de 14 jours à compter de la réception pour exercer son droit de rétractation sur les produits achetés, sauf pour les services d’expédition déjà réalisés.</li>
                <li>Les frais de retour sont à la charge du client sauf erreur de livraison ou produit défectueux.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">9. Garanties</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <ul className="list-disc pl-5 space-y-2">
                <li>Les produits vendus bénéficient de la garantie légale contre les vices cachés.</li>
                <li>MbengSend ne peut être tenu responsable des dommages indirects liés à l’utilisation des produits.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">10. Responsabilité</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>MbengSend ne peut être tenu responsable des retards liés aux transporteurs, douanes, ou force majeure.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">11. Propriété intellectuelle</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>Tous les contenus (images, textes, logos) sont la propriété de MbengSend et sont protégés par le droit d’auteur. Toute reproduction est interdite sans autorisation.</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading level="h2" className="text-2xl font-display text-brand-dark">12. Litiges</Heading>
            <div className="flex flex-col gap-y-4 text-ui-fg-subtle">
              <p>En cas de litige, le client est invité à contacter Armand Judicael ABOUEM via armandabouem@icloud.com.</p>
              <p>À défaut d’accord amiable, le litige sera porté devant le tribunal compétent de France, conformément à la loi française.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
