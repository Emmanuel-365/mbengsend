import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { FulfillmentDetailsOutput } from "./retrieve-fulfillment-details"

export type FormattedEmailOutput = {
  to: string
  subject: string
  html: string
}

export const formatShippingEmailStep = createStep(
  "format-shipping-email",
  async (fulfillmentDetails: FulfillmentDetailsOutput | null, { container }) => {
    const logger = container.resolve("logger")

    // Handle null input (missing fulfillment data)
    if (!fulfillmentDetails) {
      logger.error("[Shipping Notification] Cannot format email - fulfillment details are missing")
      return new StepResponse(null)
    }

    // Generate tracking section HTML (handle missing tracking gracefully)
    const trackingHtml = fulfillmentDetails.tracking_number ? `
      <div style="padding: 20px; background-color: #f0fdf4; border-radius: 6px; border: 1px solid #86efac; margin-bottom: 30px;">
        <h2 style="margin: 0 0 15px; font-size: 18px; color: #166534; font-weight: 600;">Tracking Information</h2>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 5px 0;">
              <strong style="color: #166534;">Tracking Number:</strong>
              <span style="color: #15803d; font-family: monospace; font-size: 16px;">${fulfillmentDetails.tracking_number}</span>
            </td>
          </tr>
          ${fulfillmentDetails.carrier ? `
          <tr>
            <td style="padding: 5px 0;">
              <strong style="color: #166534;">Carrier:</strong>
              <span style="color: #15803d;">${fulfillmentDetails.carrier}</span>
            </td>
          </tr>
          ` : ''}
        </table>
      </div>
    ` : `
      <div style="padding: 20px; background-color: #fef3c7; border-radius: 6px; border: 1px solid #fbbf24; margin-bottom: 30px;">
        <p style="margin: 0; color: #92400e;">
          Your order has been shipped! Tracking information will be available soon.
        </p>
      </div>
    `

    // Generate full HTML email
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Order Has Shipped</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #059669; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">📦 Your Order Has Shipped!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Hi ${fulfillmentDetails.customer_name},
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; color: #374151;">
                Great news! Your order <strong>#${fulfillmentDetails.order_number}</strong> has been shipped and is on its way to you.
              </p>
              
              ${trackingHtml}
              
              <p style="margin: 0 0 10px; font-size: 16px; color: #374151;">
                We'll notify you once your package is delivered. If you have any questions, please don't hesitate to contact us.
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
      to: fulfillmentDetails.customer_email,
      subject: `Your Order #${fulfillmentDetails.order_number} Has Shipped!`,
      html
    }

    logger.info(`[Shipping Notification] Formatted email for order ${fulfillmentDetails.order_number}`)
    return new StepResponse(formattedEmail)
  }
)
