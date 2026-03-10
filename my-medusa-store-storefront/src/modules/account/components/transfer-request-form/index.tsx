"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Text, Heading, Input, Button, IconButton, Toaster } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="grid sm:grid-cols-2 items-start gap-x-12 gap-y-8 w-full">
        <div className="flex flex-col gap-y-2">
          <Heading level="h3" className="text-xl font-display font-bold text-brand-dark tracking-tight">
            Transfert de commande
          </Heading>
          <Text className="text-base text-ui-fg-subtle leading-relaxed">
            Vous ne trouvez pas une commande passée ?
            <br /> Rattachez-la simplement à votre compte Mbengsend.
          </Text>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 w-full"
        >
          <div className="flex flex-col small:flex-row gap-4 w-full">
            <Input
              className="w-full h-12 bg-gray-50 border-gray-200 text-brand-dark placeholder:text-gray-400 rounded-xl focus:border-brand-primary"
              name="order_id"
              placeholder="Numéro de commande (ex: order_01...)"
            />
            <SubmitButton
              className="h-12 px-8 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold transition-all shadow-lux-sm hover:shadow-lux-md whitespace-nowrap border-none text-sm"
            >
              Demander le transfert
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="text-sm font-bold text-red-500 text-right pr-4">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex justify-between p-6 bg-white border border-gray-100 shadow-lux-md rounded-2xl w-full self-stretch items-center animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex gap-x-4 items-center">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
              <CheckCircleMiniSolid className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex flex-col gap-y-1">
              <Text className="text-base font-bold text-brand-dark">
                Demande de transfert envoyée pour la commande {state.order?.id}
              </Text>
              <Text className="text-sm text-ui-fg-subtle">
                Un e-mail de confirmation a été envoyé à {state.order?.email}
              </Text>
            </div>
          </div>
          <IconButton
            variant="transparent"
            className="h-10 w-10 hover:bg-gray-50 transition-colors rounded-full text-gray-400 hover:text-brand-dark"
            onClick={() => setShowSuccess(false)}
          >
            <XCircleSolid className="w-5 h-5" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
