import { Disclosure } from "@headlessui/react"
import { Badge, Button, clx } from "@medusajs/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div className="text-sm" data-testid={dataTestid}>
      <div className="flex items-center justify-between py-8 group transition-all">
        <div className="flex flex-col gap-y-1.5">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">{label}</span>
          <div className="flex items-center gap-x-4">
            {typeof currentInfo === "string" ? (
              <span className="text-base font-semibold text-brand-dark tracking-tight" data-testid="current-info">{currentInfo}</span>
            ) : (
              <div className="text-base font-semibold text-brand-dark tracking-tight">{currentInfo}</div>
            )}
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            className="h-10 px-6 rounded-full border-gray-200 text-brand-dark font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-xs"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "Annuler" : "Modifier"}
          </Button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-all duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[100px] opacity-100 mb-6": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="bg-green-50 border border-green-100 text-green-700 px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-x-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            {label} mis à jour avec succès
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-all duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[100px] opacity-100 mb-6": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="bg-red-50 border border-red-100 text-red-700 px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-x-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {errorMessage}
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-all duration-500 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 mb-8 animate-in slide-in-from-top-4 duration-500">
            <div>{children}</div>
            <div className="flex items-center justify-end mt-10">
              <Button
                isLoading={pending}
                className="w-full small:max-w-[240px] h-14 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold transition-all shadow-lux-md hover:shadow-lux-lg border-none text-sm"
                type="submit"
                data-testid="save-button"
              >
                Enregistrer les modifications
              </Button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {!state && <div className="border-t border-gray-100" />}
    </div>
  )
}

export default AccountInfo
