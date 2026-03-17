import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server" | undefined,
  },
  admin: {
    // En production, l'admin est servi depuis .medusa/server/public/admin/
    backendUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY, // sk_...
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET, // whsec_...
            },
          },
          {
            resolve: "@hectasquare/medusa-payment-paypal",
            id: "paypal",
            options: {
              clientId: process.env.PAYPAL_CLIENT_ID || "sb",
              clientSecret: process.env.PAYPAL_CLIENT_SECRET || "sb",
              sandbox: process.env.PAYPAL_SANDBOX ? process.env.PAYPAL_SANDBOX === "true" : true,
              authWebhookId: process.env.PAYPAL_AUTH_WEBHOOK_ID || "",
            },
          },
          {
            resolve: "./src/modules/flutterwave",
            id: "flutterwave",
            options: {
              secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
              publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY,
              webhookSecret: process.env.FLUTTERWAVE_WEBHOOK_SECRET,
            },
          },
          {
            resolve: "./src/modules/payment-cod",
            id: "cod",
            options: {},
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/notification",
      options: {
        providers: [
          {
            resolve: "./src/modules/email-notifications",
            id: "resend",
            options: {
              channels: ["email"],
              api_key: process.env.RESEND_API_KEY || "re_placeholder",
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: "@medusajs/fulfillment-manual",
            id: "manual",
          },
          {
            resolve: "./src/modules/mbengsendLogistics/providers",
            id: "mbengsend",
            options: {
              rates: {
                air_freight: { xaf: 6500, eur: 10 },
                sea_freight: { xaf: 3250, eur: 5 },
                local_delivery: { xaf: 2000, eur: 3 },
              }
            }
          },
        ],
      },
    },
    {
      resolve: "./src/modules/mbengsendLogistics",
    },
    {
      resolve: "./src/modules/reviews",
    },
    {
      resolve: "./src/modules/cms",
    },
    {
      resolve: "./src/modules/meilisearch",
    },
    {
      resolve: "./src/modules/wishlist",
    },
    {
      resolve: "@medusajs/medusa/cache-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/event-bus-redis",
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
              file_url: process.env.MINIO_PUBLIC_URL ? `${process.env.MINIO_PUBLIC_URL}/${process.env.MINIO_MEDUSA_BUCKET}` : `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_MEDUSA_BUCKET}`,
              access_key_id: process.env.MINIO_ACCESS_KEY,
              secret_access_key: process.env.MINIO_SECRET_KEY,
              region: process.env.MINIO_REGION || "us-east-1",
              bucket: process.env.MINIO_MEDUSA_BUCKET,
              endpoint: process.env.MINIO_ENDPOINT,
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    }
  ],
})
