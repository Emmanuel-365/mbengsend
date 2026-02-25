import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { FormattedEmailOutput } from "./format-order-email"

export const sendEmailStep = createStep(
  "send-email",
  async (emailData: FormattedEmailOutput | null, { container }) => {
    const logger = container.resolve("logger")

    // Handle null input (missing email data)
    if (!emailData) {
      logger.error("[Email] Cannot send email - email data is missing")
      return new StepResponse({ success: false })
    }

    try {
      const notificationModule = container.resolve(Modules.NOTIFICATION)

      // Send email via notification service
      await notificationModule.createNotifications({
        to: emailData.to,
        channel: "email",
        template: emailData.subject,
        data: {
          html: emailData.html
        }
      })

      logger.info(`[Email] Successfully sent email to ${emailData.to}`)
      return new StepResponse({ success: true })
    } catch (error) {
      logger.error(`[Email] Failed to send email to ${emailData?.to}: ${error}`)
      // Don't throw - complete workflow gracefully
      return new StepResponse({ success: false })
    }
  }
)
