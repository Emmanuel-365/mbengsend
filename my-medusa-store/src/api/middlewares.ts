import { defineMiddlewares } from "@medusajs/framework/http"
import { MedusaRequest, MedusaResponse, MedusaNextFunction } from "@medusajs/framework/http"
import { authenticate } from "@medusajs/medusa"

export default defineMiddlewares({
    routes: [
        {
            matcher: "/admin/shipping-rates*",
            middlewares: [
                (req: MedusaRequest, res: MedusaResponse, next: MedusaNextFunction) => {
                    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*")
                    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-medusa-access-token")
                    res.setHeader("Access-Control-Allow-Credentials", "true")

                    if (req.method === "OPTIONS") {
                        return res.status(200).end()
                    }
                    next()
                },
            ],
        },
        {
            matcher: "/store/wishlist*",
            middlewares: [
                authenticate("customer", ["session", "bearer"]),
            ],
        },
        {
            method: "POST",
            matcher: "/store/reviews",
            middlewares: [
                authenticate("customer", ["session", "bearer"]),
            ],
        }
    ],
})
