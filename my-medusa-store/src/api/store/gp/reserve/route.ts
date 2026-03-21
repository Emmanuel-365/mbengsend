import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { TRAVEL_MODULE } from "../../../../modules/travel"
import TravelModuleService from "../../../../modules/travel/service"
import { addToCartWorkflow } from "@medusajs/medusa/core-flows"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { travel_offer_id, kilos, cart_id } = req.body as any
  
  if (!travel_offer_id || !kilos || !cart_id) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  const travelModuleService: TravelModuleService = req.scope.resolve(TRAVEL_MODULE)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  
  // 1. Get Travel Offer
  const offer = await travelModuleService.retrieveTravelOffer(travel_offer_id)
  
  if (!offer || offer.status !== "approved") {
    return res.status(404).json({ message: "Travel offer not found or not approved" })
  }

  const sellingPrice = offer.selling_price_per_kilo || offer.price_per_kilo
  const totalPrice = kilos * sellingPrice

  // 2. Get GP Service Variant
  const { data: products } = await query.graph({
    entity: "product",
    fields: ["variants.id"],
    filters: { handle: "gp-service" }
  })

  if (!products.length || !products[0].variants.length) {
    return res.status(500).json({ message: "GP Service product or variant not found" })
  }

  const variantId = products[0].variants[0].id

  // 3. Add to Cart
  const { result } = await addToCartWorkflow(req.scope).run({
    input: {
      items: [
        {
          variant_id: variantId,
          quantity: 1,
          unit_price: totalPrice,
          metadata: {
            travel_offer_id,
            kilos_reserved: kilos,
            price_per_kilo: sellingPrice,
            traveler_name: `${offer.first_name} ${offer.last_name}`,
            journey: `${offer.departure_city} → ${offer.destination_city}`,
            type: "gp_reservation"
          }
        }
      ],
      cart_id
    }
  })

  res.status(200).json({ cart: result })
}
