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
      className="w-full flex flex-col items-center glass p-10 small:p-16 rounded-[2.5rem] shadow-lux-lg border-white/40"
      data-testid="register-page"
    >
      <h1 className="text-4xl small:text-5xl font-display font-bold text-brand-dark mb-4 text-center text-balance tracking-tight italic">
        Devenir Membre <span className="text-brand-dark">Mbengsend<span className="text-brand-gold">.</span></span>
      </h1>
      <p className="text-center text-base small:text-lg text-ui-fg-subtle mb-12 text-balance leading-relaxed max-w-[440px] font-sans">
        Créez votre profil de membre et profitez d&apos;une expérience de shopping privilégiée dans notre univers de luxe.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-5">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
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
        <span className="text-center text-gray-400 text-[10px] mt-10 leading-relaxed font-medium px-4 font-sans">
          En créant un compte, vous acceptez la{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-brand-gold font-bold hover:text-brand-dark transition-colors underline underline-offset-4 decoration-brand-gold/20"
          >
            Politique de Confidentialité
          </LocalizedClientLink>{" "}
          et les{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-brand-gold font-bold hover:text-brand-dark transition-colors underline underline-offset-4 decoration-brand-gold/20"
          >
            Conditions d&apos;Utilisation
          </LocalizedClientLink>{" "}
          de Mbengsend.
        </span>
        <SubmitButton className="w-full mt-10 bg-brand-dark hover:bg-brand-gold h-16 rounded-full shadow-lux-lg hover:scale-[1.05] transition-all duration-500 text-white font-sans font-bold uppercase tracking-widest text-sm border-none" data-testid="register-button">
          S&apos;inscrire
        </SubmitButton>
      </form>
      <div className="flex flex-col items-center gap-y-4 mt-12">
        <span className="text-center text-gray-400 text-sm font-sans">
          Déjà membre ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="text-brand-gold font-bold hover:text-brand-dark transition-all hover:translate-y-[-1px] active:translate-y-0"
          >
            Se connecter
          </button>
        </span>
      </div>
    </div>
  )
}

export default Register
