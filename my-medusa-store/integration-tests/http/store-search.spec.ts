import { medusaIntegrationTestRunner } from "@medusajs/test-utils"

jest.setTimeout(60 * 1000)

medusaIntegrationTestRunner({
  inApp: true,
  env: {},
  testSuite: ({ api }) => {
    describe("Store Search API", () => {
      describe("GET /store/search", () => {
        it("should return 400 when query parameter is missing", async () => {
          const response = await api.get("/store/search")
          
          expect(response.status).toEqual(400)
          expect(response.data.message).toContain("Search query (q) is required")
        })

        it("should return 400 when query parameter is empty", async () => {
          const response = await api.get("/store/search?q=")
          
          expect(response.status).toEqual(400)
        })

        it("should return search results with valid query", async () => {
          const response = await api.get("/store/search?q=test")
          
          expect(response.status).toEqual(200)
          expect(response.data).toHaveProperty("products")
          expect(response.data).toHaveProperty("count")
          expect(response.data).toHaveProperty("limit")
          expect(response.data).toHaveProperty("offset")
          expect(Array.isArray(response.data.products)).toBe(true)
        })

        it("should apply default pagination values", async () => {
          const response = await api.get("/store/search?q=test")
          
          expect(response.status).toEqual(200)
          expect(response.data.limit).toEqual(20)
          expect(response.data.offset).toEqual(0)
        })

        it("should respect custom limit and offset", async () => {
          const response = await api.get("/store/search?q=test&limit=10&offset=5")
          
          expect(response.status).toEqual(200)
          expect(response.data.limit).toEqual(10)
          expect(response.data.offset).toEqual(5)
        })

        it("should return products with required fields", async () => {
          const response = await api.get("/store/search?q=shirt")
          
          expect(response.status).toEqual(200)
          
          if (response.data.products.length > 0) {
            const product = response.data.products[0]
            expect(product).toHaveProperty("id")
            expect(product).toHaveProperty("title")
            expect(product).toHaveProperty("handle")
            expect(product).toHaveProperty("description")
            expect(product).toHaveProperty("thumbnail")
            expect(product).toHaveProperty("status")
          }
        })

        it("should not exceed specified limit", async () => {
          const response = await api.get("/store/search?q=test&limit=5")
          
          expect(response.status).toEqual(200)
          expect(response.data.products.length).toBeLessThanOrEqual(5)
        })
      })
    })
  },
})
