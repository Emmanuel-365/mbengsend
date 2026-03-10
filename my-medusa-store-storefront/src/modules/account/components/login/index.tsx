import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="w-full flex flex-col items-center bg-white p-10 small:p-16 rounded-huge shadow-lux-lg border border-gray-100/50"
      data-testid="login-page"
    >
      <h1 className="text-4xl font-display font-bold text-brand-dark mb-3 text-center tracking-tight">Bon retour</h1>
      <p className="text-center text-base text-ui-fg-subtle mb-12 max-w-[400px] leading-relaxed">
        Connectez-vous pour accéder à votre univers <span className="text-brand-dark font-bold">Mbengsend<span className="text-brand-primary">.</span></span>
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Entrez une adresse email valide."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-12 bg-brand-primary hover:bg-brand-secondary h-14 rounded-full shadow-lux-md hover:shadow-lux-lg transition-all text-white font-bold text-lg border-none">
          Se connecter
        </SubmitButton>
      </form>
      <div className="flex flex-col items-center gap-y-4 mt-12">
        <span className="text-center text-gray-400 text-sm">
          Pas encore membre ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-brand-primary font-bold hover:text-brand-secondary transition-all hover:translate-y-[-1px] active:translate-y-0"
            data-testid="register-button"
          >
            Rejoignez-nous
          </button>
        </span>
      </div>
    </div>
  )
}

export default Login
