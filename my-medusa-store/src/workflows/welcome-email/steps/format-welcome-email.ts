import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CustomerDetailsOutput } from "./retrieve-customer-details"

export type FormattedEmailOutput = {
  to: string
  subject: string
  html: string
}

export const formatWelcomeEmailStep = createStep(
  "format-welcome-email",
  async (customerDetails: CustomerDetailsOutput | null, { container }) => {
    const logger = container.resolve("logger")

    // Handle null input (missing customer data)
    if (!customerDetails) {
      logger.error("[Welcome Email] Cannot format email - customer details are missing")
      return new StepResponse(null)
    }

    // Generate full HTML email
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue chez Mbengsend</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #111827; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Bienvenue chez Mbengsend !</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Bonjour ${customerDetails.customer_name},
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Bienvenue chez Mbengsend ! Nous sommes ravis de vous compter parmi nous.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Votre compte a été créé avec succès. Vous pouvez dès à présent commencer vos achats. Nous proposons une sélection rigoureuse de produits de qualité avec une livraison rapide et un service client irréprochable.
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; color: #374151;">
                Voici ce que vous pouvez faire maintenant :
              </p>
              
              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 15px;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #111827; font-weight: 600;">🛍️ Parcourir nos produits</h3>
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      Explorez notre large gamme de produits et trouvez exactement ce dont vous avez besoin.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 15px;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #111827; font-weight: 600;">📦 Suivre vos commandes</h3>
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      Restez informé en temps réel de l'état de préparation et de livraison de vos commandes.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #111827; font-weight: 600;">💬 Assistance client</h3>
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      Notre équipe de support est là pour répondre à toutes vos questions.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Merci d'avoir choisi Mbengsend. Nous avons hâte de vous servir !
              </p>
              <p style="margin: 0; font-size: 16px; color: #374151;">
                Cordialement,<br>
                <strong>L'équipe Mbengsend</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                Si vous avez des questions, n'hésitez pas à nous contacter.
              </p>
              <p style="margin: 10px 0 0; font-size: 14px; color: #6b7280;">
                © ${new Date().getFullYear()} Mbengsend. Tous droits réservés.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim()

    const formattedEmail: FormattedEmailOutput = {
      to: customerDetails.customer_email,
      subject: "Bienvenue chez Mbengsend !",
      html
    }

    logger.info(`[Welcome Email] Formatted email for customer ${customerDetails.customer_email}`)
    return new StepResponse(formattedEmail)
  }
)
