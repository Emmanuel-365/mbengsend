import { initialize } from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils"

async function testPayment() {
  const { app } = await initialize() // wait, Medusa v2 doesn't use initialize like this anymore
}
testPayment()
