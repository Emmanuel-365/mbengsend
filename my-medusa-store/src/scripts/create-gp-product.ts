import { 
  ContainerRegistrationKeys,
  Modules,
  ProductStatus
} from "@medusajs/framework/utils"
import { 
  createProductsWorkflow
} from "@medusajs/medusa/core-flows"
import { ExecArgs } from "@medusajs/framework/types"

export default async function createGpProduct({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  
  logger.info("Checking for GP Service product...")
  
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
    filters: { handle: "gp-service" }
  })
  
  if (existingProducts.length > 0) {
    logger.info("GP Service product already exists.")
    return
  }
  
  logger.info("Creating GP Service product...")
  
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel"
  })
  
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const [shippingProfile] = await fulfillmentModuleService.listShippingProfiles({
    type: "default"
  })

  const { result } = await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Service de Transport (GP)",
          handle: "gp-service",
          description: "Réservation de kilos avec un voyageur Mbengsend.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ title: "Unité", values: ["Kilo/Order"] }],
          variants: [
            {
              title: "Réservation",
              sku: "GP-RESERVE",
              options: { Unité: "Kilo/Order" },
              prices: [
                { amount: 1, currency_code: "eur" },
                { amount: 655, currency_code: "xaf" }
              ],
            }
          ],
          sales_channels: [{ id: defaultSalesChannel.id }]
        }
      ]
    }
  })
  
  logger.info(`GP Service product created: ${result[0].id}`)
}
