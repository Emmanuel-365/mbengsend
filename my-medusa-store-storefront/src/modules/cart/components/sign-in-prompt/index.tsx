import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-transparent flex items-center justify-between gap-x-8">
      <div>
        <Heading level="h2" className="text-xl font-display font-bold text-brand-dark">
          Déjà un compte ?
        </Heading>
        <Text className="text-sm text-ui-fg-subtle mt-1 leading-relaxed">
          Connectez-vous pour une expérience personnalisée et un passage en caisse plus rapide.
        </Text>
      </div>
      <div className="flex-shrink-0">
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-12 px-6 rounded-full border-brand-primary/20 text-brand-primary font-bold hover:bg-brand-primary/5 transition-all" data-testid="sign-in-button">
            Se connecter
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
