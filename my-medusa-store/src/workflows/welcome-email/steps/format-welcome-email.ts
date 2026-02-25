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
  <title>Welcome to Mbengsend</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #111827; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Welcome to Mbengsend!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Hi ${customerDetails.customer_name},
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Welcome to Mbengsend! We're thrilled to have you join our community.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Your account has been successfully created and you're all set to start shopping. We offer a curated selection of quality products with fast shipping and excellent customer service.
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; color: #374151;">
                Here's what you can do next:
              </p>
              
              <!-- Features -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 15px;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #111827; font-weight: 600;">🛍️ Browse Our Products</h3>
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      Explore our wide range of products and find exactly what you're looking for.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px; margin-bottom: 15px;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #111827; font-weight: 600;">📦 Track Your Orders</h3>
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      Stay updated with real-time tracking information for all your orders.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                    <h3 style="margin: 0 0 10px; font-size: 18px; color: #111827; font-weight: 600;">💬 Get Support</h3>
                    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                      Our customer support team is here to help you with any questions.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Thank you for choosing Mbengsend. We look forward to serving you!
              </p>
              <p style="margin: 0; font-size: 16px; color: #374151;">
                Best regards,<br>
                <strong>The Mbengsend Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #f9fafb; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                If you have any questions, please contact our support team.
              </p>
              <p style="margin: 10px 0 0; font-size: 14px; color: #6b7280;">
                © ${new Date().getFullYear()} Mbengsend. All rights reserved.
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
      subject: "Welcome to Mbengsend!",
      html
    }

    logger.info(`[Welcome Email] Formatted email for customer ${customerDetails.customer_email}`)
    return new StepResponse(formattedEmail)
  }
)
