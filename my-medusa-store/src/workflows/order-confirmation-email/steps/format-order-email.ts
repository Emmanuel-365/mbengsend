import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { OrderDetailsOutput } from "./retrieve-order-details"

export type FormattedEmailOutput = {
  to: string
  subject: string
  html: string
}

export const formatOrderEmailStep = createStep(
  "format-order-email",
  async (orderDetails: OrderDetailsOutput | null, { container }) => {
    const logger = container.resolve("logger")

    // Handle null input (missing order data)
    if (!orderDetails) {
      logger.error("[Order Confirmation] Cannot format email - order details are missing")
      return new StepResponse(null)
    }

    // Format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount / 100)
    }

    // Format date
    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(date))
    }

    // Generate items HTML
    const itemsHtml = orderDetails.items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.title}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.unit_price)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">${formatCurrency(item.unit_price * item.quantity)}</td>
      </tr>
    `).join('')

    // Generate shipping address HTML
    const addressHtml = `
      ${orderDetails.shipping_address.address_1}<br>
      ${orderDetails.shipping_address.address_2 ? orderDetails.shipping_address.address_2 + '<br>' : ''}
      ${orderDetails.shipping_address.city}, ${orderDetails.shipping_address.postal_code}<br>
      ${orderDetails.shipping_address.country_code.toUpperCase()}
    `

    // Generate full HTML email
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background-color: #111827; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Order Confirmation</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #374151;">
                Hi ${orderDetails.customer_name},
              </p>
              <p style="margin: 0 0 30px; font-size: 16px; color: #374151;">
                Thank you for your order! We've received your order and will process it shortly.
              </p>
              
              <!-- Order Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 15px; background-color: #f9fafb; border-radius: 6px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 5px 0;">
                          <strong style="color: #111827;">Order Number:</strong>
                          <span style="color: #6b7280;">#${orderDetails.order_number}</span>
                        </td>
                        <td style="padding: 5px 0; text-align: right;">
                          <strong style="color: #111827;">Order Date:</strong>
                          <span style="color: #6b7280;">${formatDate(orderDetails.order_date)}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Order Items -->
              <h2 style="margin: 0 0 20px; font-size: 20px; color: #111827; font-weight: 600;">Order Items</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #e5e7eb; border-radius: 6px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Item</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Price</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 15px; text-align: right; font-weight: 700; font-size: 18px; color: #111827;">Total:</td>
                    <td style="padding: 15px; text-align: right; font-weight: 700; font-size: 18px; color: #111827;">${formatCurrency(orderDetails.total)}</td>
                  </tr>
                </tfoot>
              </table>
              
              <!-- Shipping Address -->
              <h2 style="margin: 0 0 15px; font-size: 20px; color: #111827; font-weight: 600;">Shipping Address</h2>
              <div style="padding: 15px; background-color: #f9fafb; border-radius: 6px; color: #374151; line-height: 1.6;">
                ${addressHtml}
              </div>
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
      to: orderDetails.customer_email,
      subject: `Order Confirmation #${orderDetails.order_number}`,
      html
    }

    logger.info(`[Order Confirmation] Formatted email for order ${orderDetails.order_number}`)
    return new StepResponse(formattedEmail)
  }
)
