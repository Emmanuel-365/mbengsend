"use server"

import { revalidatePath } from "next/cache"

type ContactFormData = {
  first_name: string
  last_name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(formData: FormData) {
  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  if (!first_name || !last_name || !email || !message) {
    return {
      success: false,
      error: "Veuillez remplir tous les champs obligatoires.",
    }
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_EMAIL_RECIPIENT = process.env.CONTACT_EMAIL_RECIPIENT || "support@mbengsend.com"
  
  // En phase de test, si pas de clé API, on simule l'envoi
  if (!RESEND_API_KEY || RESEND_API_KEY === "re_placeholder") {
    console.log("SIMULATION: Email de contact reçu:", { first_name, last_name, email, subject, message })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      success: true,
      message: "Merci ! Votre message a été envoyé avec succès (Mode Simulation).",
    }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Mbengsend Contact <contact@mbengsend.com>`, // À remplacer par une adresse vérifiée en production
        to: CONTACT_EMAIL_RECIPIENT,
        subject: `Nouveau message de contact : ${subject}`,
        html: `
          <h1>Nouveau message de contact</h1>
          <p><strong>De:</strong> ${first_name} ${last_name} (&lt;${email}&gt;)</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error("Resend API Error:", errorData)
      return {
        success: false,
        error: "Une erreur est survenue lors de l'envoi de l'email via Resend.",
      }
    }

    revalidatePath("/contact")
    return {
      success: true,
      message: "Merci ! Votre message a été envoyé avec succès.",
    }
  } catch (err) {
    console.error("Contact Form Error:", err)
    return {
      success: false,
      error: "Une erreur de connexion est survenue. Veuillez réessayer plus tard.",
    }
  }
}
