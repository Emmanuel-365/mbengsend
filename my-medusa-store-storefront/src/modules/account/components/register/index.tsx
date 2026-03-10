"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="w-full flex flex-col items-center bg-white p-10 small:p-16 rounded-huge shadow-lux-lg border border-gray-100/50"
      data-testid="register-page"
    >
      <h1 className="text-4xl font-display font-bold text-brand-dark mb-3 text-center text-balance tracking-tight">
        Devenir Membre <span className="text-brand-dark">Mbengsend<span className="text-brand-primary">.</span></span>
      </h1>
      <p className="text-center text-base text-ui-fg-subtle mb-10 text-balance leading-relaxed max-w-[440px]">
        Créez votre profil de membre et profitez d&apos;une expérience de shopping privilégiée dans notre univers de luxe.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Prénom"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Nom"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Téléphone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Mot de passe"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-gray-400 text-[10px] mt-10 leading-relaxed font-medium px-4">
          En créant un compte, vous acceptez la{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-brand-primary font-bold hover:text-brand-secondary transition-colors underline underline-offset-4 decoration-brand-primary/20"
          >
            Politique de Confidentialité
          </LocalizedClientLink>{" "}
          et les{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-brand-primary font-bold hover:text-brand-secondary transition-colors underline underline-offset-4 decoration-brand-primary/20"
          >
            Conditions d&apos;Utilisation
          </LocalizedClientLink>{" "}
          de Mbengsend.
        </span>
        <SubmitButton className="w-full mt-10 bg-brand-primary hover:bg-brand-secondary h-14 rounded-full shadow-lux-md hover:shadow-lux-lg transition-all text-white font-bold text-lg border-none" data-testid="register-button">
          S&apos;inscrire
        </SubmitButton>
      </form>
      <div className="flex flex-col items-center gap-y-4 mt-12">
        <span className="text-center text-gray-400 text-sm">
          Déjà membre ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-brand-primary font-bold hover:text-brand-secondary transition-all hover:translate-y-[-1px] active:translate-y-0"
          >
            Se connecter
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
