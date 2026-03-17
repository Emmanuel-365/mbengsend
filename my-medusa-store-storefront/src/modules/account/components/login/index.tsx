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
      className="w-full flex flex-col items-center glass p-10 small:p-16 rounded-[2.5rem] shadow-lux-lg border-white/40"
      data-testid="login-page"
    >
      <h1 className="text-4xl small:text-5xl font-display font-bold text-brand-dark mb-4 text-center tracking-tight italic">Bon retour</h1>
      <p className="text-center text-base small:text-lg text-ui-fg-subtle mb-12 max-w-[400px] leading-relaxed font-sans">
        Connectez-vous pour accéder à votre univers <span className="text-brand-dark font-bold">Mbengsend<span className="text-brand-gold">.</span></span>
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-6">
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
        <SubmitButton data-testid="sign-in-button" className="w-full mt-12 bg-brand-dark hover:bg-brand-gold h-16 rounded-full shadow-lux-lg hover:scale-[1.05] transition-all duration-500 text-white font-sans font-bold uppercase tracking-widest text-sm border-none">
          Se connecter
        </SubmitButton>
      </form>
      <div className="flex flex-col items-center gap-y-4 mt-12">
        <span className="text-center text-gray-400 text-sm font-sans">
          Pas encore membre ?{" "}
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
            className="text-brand-gold font-bold hover:text-brand-dark transition-all hover:translate-y-[-1px] active:translate-y-0"
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
