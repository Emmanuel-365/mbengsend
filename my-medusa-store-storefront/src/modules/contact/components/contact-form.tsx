"use client"

import { useActionState, useRef } from "react"
import { Heading, Button, Input, Text } from "@medusajs/ui"
import { submitContactForm } from "@lib/data/contact-actions"

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, action, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await submitContactForm(formData)
    if (result.success) {
      formRef.current?.reset()
    }
    return result
  }, null)

  return (
    <div className="p-8 bg-ui-bg-subtle rounded-3xl border border-ui-border-base shadow-sm">
      <Heading level="h2" className="text-2xl font-display text-brand-dark mb-8">Envoyez-nous un message</Heading>
      
      {state?.success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {state.message}
        </div>
      )}

      {state?.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {state.error}
        </div>
      )}

      <form action={action} ref={formRef} className="flex flex-col gap-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="first_name" className="text-sm font-medium text-ui-fg-base">Prénom</label>
            <Input id="first_name" name="first_name" placeholder="John" required disabled={isPending} />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="last_name" className="text-sm font-medium text-ui-fg-base">Nom</label>
            <Input id="last_name" name="last_name" placeholder="Doe" required disabled={isPending} />
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className="text-sm font-medium text-ui-fg-base">Email</label>
          <Input type="email" id="email" name="email" placeholder="john.doe@example.com" required disabled={isPending} />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-ui-fg-base">Sujet</label>
          <select 
            id="subject" 
            name="subject" 
            disabled={isPending}
            className="p-2 border border-ui-border-base rounded-md focus:ring-2 focus:ring-brand-primary/50 outline-none text-sm text-ui-fg-base bg-white disabled:opacity-50"
          >
            <option value="order">Suivi de commande</option>
            <option value="shipping">Logistique & Fret</option>
            <option value="return">Retour d'un produit</option>
            <option value="other">Autre question</option>
          </select>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="message" className="text-sm font-medium text-ui-fg-base">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            className="p-3 border border-ui-border-base rounded-md focus:ring-2 focus:ring-brand-primary/50 outline-none resize-none text-sm text-ui-fg-base disabled:opacity-50"
            placeholder="Comment pouvons-nous vous aider ?"
            required
            disabled={isPending}
          ></textarea>
        </div>

        <Button 
          type="submit" 
          size="large" 
          className="w-full mt-4 bg-brand-primary text-white hover:bg-brand-primary-hover disabled:opacity-50"
          isLoading={isPending}
        >
          {isPending ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </div>
  )
}
