import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import fs from "fs";
import path from "path";

export default async function updateStorefrontEnv({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Updating storefront .env.local with new publishable key...");

  const { data } = await query.graph({ 
    entity: "api_key", 
    fields: ["token"], 
    filters: { type: "publishable" } 
  });

  const publishableKey = data?.[0]?.token;

  if (!publishableKey) {
    logger.error("No publishable API key found in database.");
    return;
  }

  // Path to storefront .env.local
  // Assuming the structure is:
  // /project-root/my-medusa-store/src/scripts/update-storefront-env.ts
  // /project-root/my-medusa-store-storefront/.env.local
  const storefrontEnvPath = path.resolve(process.cwd(), "..", "my-medusa-store-storefront", ".env.local");

  if (!fs.existsSync(storefrontEnvPath)) {
    logger.error(`Storefront .env.local not found at ${storefrontEnvPath}`);
    return;
  }

  let envContent = fs.readFileSync(storefrontEnvPath, "utf8");
  
  const regex = /^NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*/m;
  const newLine = `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableKey}`;

  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, newLine);
  } else {
    envContent += `
${newLine}`;
  }

  fs.writeFileSync(storefrontEnvPath, envContent);
  logger.info(`Successfully updated .env.local with key: ${publishableKey}`);
}
