import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

export type CustomerDetailsOutput = {
  customer_email: string
  customer_name: string
  created_at: Date
}

export const retrieveCustomerDetailsStep = createStep(
  "retrieve-customer-details",
  async (input: { customer_id: string }, { container }) => {
    const logger = container.resolve("logger")
    const customerModule = container.resolve(Modules.CUSTOMER)

    try {
      // Retrieve customer details
      const customer = await customerModule.retrieveCustomer(input.customer_id)

      // Handle missing customer email
      if (!customer.email) {
        logger.error(`[Welcome Email] Customer ${input.customer_id} has no email`)
        return new StepResponse(null)
      }

      // Extract customer details
      const customerDetails: CustomerDetailsOutput = {
        customer_email: customer.email,
        customer_name: `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer',
        created_at: new Date(customer.created_at || new Date())
      }

      logger.info(`[Welcome Email] Retrieved details for customer ${customer.email}`)
      return new StepResponse(customerDetails)
    } catch (error) {
      logger.error(`[Welcome Email] Failed to retrieve customer ${input.customer_id}: ${error}`)
      return new StepResponse(null)
    }
  }
)
