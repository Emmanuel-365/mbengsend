const c = require("ansi-colors")

const requiredEnvs = [
  {
    key: "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY",
    description:
      "Learn how to create a publishable key: https://docs.medusajs.com/v2/resources/storefront-development/publishable-api-keys",
  },
  {
    key: "NEXT_PUBLIC_STRIPE_KEY",
    description: "Your Stripe publishable key (pk_...)",
  },
  {
    key: "NEXT_PUBLIC_BASE_URL",
    description: "The base URL of your storefront (e.g., https://mbengsend.com)",
  },
  {
    key: "NEXT_PUBLIC_MEDUSA_BACKEND_URL",
    description: "The URL of your Medusa backend (e.g., https://api.mbengsend.com)",
  },
]

function checkEnvVariables() {
  const missingEnvs = requiredEnvs.filter(function (env) {
    return !process.env[env.key]
  })

  if (missingEnvs.length > 0) {
    console.error(
      c.red.bold("\n\u274C Error: Missing required environment variables\n")
    )

    missingEnvs.forEach(function (env) {
      console.error(c.yellow(`  VARIABLE MANQUANTE : ${c.bold(env.key)}`))
      if (env.description) {
        console.error(c.dim(`    ${env.description}\n`))
      }
    })

    console.error(
      c.yellow(
        "\nIMPORTANT : Si vous utilisez Coolify, vérifiez que ces variables sont bien ajoutées ET que la case 'Build Variable' est cochée.\n"
      )
    )

    if (process.env.NODE_ENV === "production") {
      console.error(c.red.bold("Production build cannot proceed without these variables."));
      process.exit(1)
    } else {
      console.warn(c.yellow("Bypassing environment variable check in development..."));
    }
  }
}

module.exports = checkEnvVariables
