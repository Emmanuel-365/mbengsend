import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-center text-center max-w-2xl mx-auto" data-testid="empty-cart-message">
      <div className="w-24 h-24 bg-brand-primary/5 rounded-full flex items-center justify-center mb-8 border border-brand-primary/10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-primary">
          <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <Heading
        level="h1"
        className="text-4xl small:text-6xl font-display font-bold text-brand-dark tracking-tight"
      >
        Votre <span className="text-brand-primary">panier</span> est vide
      </Heading>
      <Text className="text-lg text-ui-fg-subtle mt-6 mb-10 max-w-lg leading-relaxed">
        Il semblerait que vous n&apos;ayez pas encore ajouté d&apos;articles. Découvrez nos collections exclusives et trouvez votre bonheur.
      </Text>
      <div className="flex justify-center">
        <InteractiveLink href="/store" className="text-lg font-bold text-brand-primary hover:text-brand-secondary transition-colors underline-offset-8">
          Explorer les produits
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
