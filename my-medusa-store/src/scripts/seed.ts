import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { ApiKey } from "../../.medusa/types/query-entry-points";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => {
              return {
                currency_code: currency.currency_code,
                is_default: currency.is_default ?? false,
              };
            }
          ),
        },
      };
    });

    const stores = updateStoresStep(normalizedInput);

    return new WorkflowResponse(stores);
  }
);

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  logger.info("Checking for admin user...");
  try {
    const { data: users } = await query.graph({
      entity: "user",
      fields: ["id"],
      filters: { email: "admin@mbengsend.com" },
    });

    if (users.length === 0) {
      logger.info("Creating default admin user (admin@mbengsend.com)...");
      const { execSync } = require("child_process");
      // Use npx medusa user to handle user + auth identity creation
      execSync("npx medusa user -e admin@mbengsend.com -p Mbengsend2026!", {
        stdio: "inherit",
      });
      logger.info("Admin user created successfully.");
    } else {
      logger.info("Admin user already exists.");
    }
  } catch (error) {
    logger.warn(`Failed to check/create admin user: ${error.message}`);
  }

  const countriesEurope = ["fr", "de", "es", "it", "be", "lu", "ch"];
  const countriesCameroon = ["cm"];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        { currency_code: "xaf", is_default: false },
        { currency_code: "eur", is_default: true },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_sales_channel_id: defaultSalesChannel[0].id },
    },
  });

  logger.info("Seeding region data...");
  const existingRegions = await query.graph({ entity: "region", fields: ["id", "name"] });

  if (existingRegions.data.length === 0) {
    await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Cameroun",
            currency_code: "xaf",
            countries: countriesCameroon,
            payment_providers: ["pp_system_default"],
          },
          {
            name: "Europe",
            currency_code: "eur",
            countries: countriesEurope,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    logger.info("Finished seeding regions.");
  } else {
    logger.info("Regions already exist, skipping...");
  }

  const { data: regions } = await query.graph({ entity: "region", fields: ["id", "name"] });
  const regionCameroon = regions.find(r => r.name === "Cameroun") || regions[0];
  const regionEurope = regions.find(r => r.name === "Europe") || regions[1];

  logger.info("Seeding tax regions...");
  const existingTaxRegions = await query.graph({ entity: "tax_region", fields: ["id"] });
  if (existingTaxRegions.data.length === 0) {
    await createTaxRegionsWorkflow(container).run({
      input: [...countriesCameroon, ...countriesEurope].map((country_code) => ({
        country_code,
        provider_id: "tp_system",
      })),
    });
    logger.info("Finished seeding tax regions.");
  }

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Entrepôt Douala",
          address: { city: "Douala", country_code: "CM", address_1: "Akwa" },
        },
        {
          name: "Entrepôt Paris (Transit)",
          address: { city: "Paris", country_code: "FR", address_1: "Roissy" },
        },
      ],
    },
  });
  const stockLocationCameroon = stockLocationResult.find(l => l.name === "Entrepôt Douala") || stockLocationResult[0];
  const stockLocationEurope = stockLocationResult.find(l => l.name === "Entrepôt Paris (Transit)") || stockLocationResult[1];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: { default_location_id: stockLocationCameroon.id },
    },
  });

  await link.create([
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationCameroon.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    },
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationCameroon.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "mbengsend_mbengsend" },
    },
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationEurope.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    },
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationEurope.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "mbengsend_mbengsend" },
    }
  ]);

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } = await createShippingProfilesWorkflow(container).run({
      input: { data: [{ name: "Default Shipping Profile", type: "default" }] },
    });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSetCameroon = await fulfillmentModuleService.createFulfillmentSets({
    name: "Livraison Locale Cameroun",
    type: "shipping",
    service_zones: [
      {
        name: "Cameroun",
        geo_zones: [{ country_code: "cm", type: "country" }],
      },
    ],
  });
  const fulfillmentSetEurope = await fulfillmentModuleService.createFulfillmentSets({
    name: "Expéditions Europe & Fret",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: countriesEurope.map(c => ({ country_code: c, type: "country" })) as any,
      },
    ],
  });

  await link.create([
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationCameroon.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSetCameroon.id },
    },
    {
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationEurope.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSetEurope.id },
    }
  ]);

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Retrait Agence",
        price_type: "flat", // We can keep it flat because calculation yields 0 but flat is simpler for 0
        provider_id: "mbengsend_mbengsend",
        service_zone_id: fulfillmentSetCameroon.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Standard", description: "Retrait dans nos locaux", code: "pickup" },
        data: { id: "pickup" },
        prices: [
          { currency_code: "xaf", amount: 0 },
          { currency_code: "eur", amount: 0 },
        ],
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
      {
        name: "Livraison à Domicile (Douala/Yaoundé)",
        price_type: "flat", // simple flat rate fallback for demo
        provider_id: "mbengsend_mbengsend",
        service_zone_id: fulfillmentSetCameroon.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Standard", description: "Expédié sous 24-48h", code: "local_delivery" },
        data: { id: "local_delivery" },
        prices: [
          { currency_code: "xaf", amount: 2000 },
          { currency_code: "eur", amount: 3 },
        ],
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
      {
        name: "Fret Maritime Europe -> Cameroun (Au Kg)",
        price_type: "calculated",
        provider_id: "mbengsend_mbengsend",
        service_zone_id: fulfillmentSetEurope.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Standard", description: "Environ 3-4 semaines au Kilo", code: "sea_freight" },
        data: { id: "sea_freight" },
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
      {
        name: "Fret Aérien Express Europe -> CM (Au Kg)",
        price_type: "calculated",
        provider_id: "mbengsend_mbengsend",
        service_zone_id: fulfillmentSetEurope.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: { label: "Express", description: "Environ 3-5 jours au Kilo", code: "air_freight" },
        data: { id: "air_freight" },
        rules: [{ attribute: "enabled_in_store", value: "true", operator: "eq" }, { attribute: "is_return", value: "false", operator: "eq" }],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocationCameroon.id, add: [defaultSalesChannel[0].id] },
  });
  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocationEurope.id, add: [defaultSalesChannel[0].id] },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  let publishableApiKey: ApiKey | null = null;
  const { data } = await query.graph({ entity: "api_key", fields: ["id"], filters: { type: "publishable" } });
  publishableApiKey = data?.[0];

  if (!publishableApiKey) {
    const { result: [publishableApiKeyResult] } = await createApiKeysWorkflow(container).run({
      input: { api_keys: [{ title: "Webshop", type: "publishable", created_by: "" }] },
    });
    publishableApiKey = publishableApiKeyResult as ApiKey;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [defaultSalesChannel[0].id] },
  });

  logger.info("Seeding product data...");
  const { result: categoryResult } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: [
        { name: "Beauté & Cosmétiques", is_active: true },
        { name: "Électronique", is_active: true },
        { name: "Santé & Bien-être", is_active: true },
        { name: "Alimentation", is_active: true },
      ],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Parfum Chanel N°5 (Eau de Parfum)",
          category_ids: [categoryResult.find((cat) => cat.name === "Beauté & Cosmétiques")!.id],
          description: "Le parfum emblématique. Un bouquet floral aldéhydé intemporel. Idéal pour l'export.",
          handle: "chanel-no5",
          weight: 500, // 500g for freight
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png" }], // Placeholder
          options: [{ title: "Contenance", values: ["50ml", "100ml"] }],
          variants: [
            {
              title: "50ml",
              sku: "CHANEL-50",
              options: { Contenance: "50ml" },
              prices: [
                { amount: 100, currency_code: "eur" },
                { amount: 65000, currency_code: "xaf" },
              ],
            },
            {
              title: "100ml",
              sku: "CHANEL-100",
              options: { Contenance: "100ml" },
              prices: [
                { amount: 150, currency_code: "eur" },
                { amount: 98000, currency_code: "xaf" },
              ],
            }
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Samsung Galaxy S24 Ultra",
          category_ids: [categoryResult.find((cat) => cat.name === "Électronique")!.id],
          description: "Le dernier smartphone premium de Samsung avec IA intégrée. Version globale débloquée.",
          handle: "samsung-s24-ultra",
          weight: 700, // 700g with box
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png" }], // Placeholder
          options: [{ title: "Stockage", values: ["256GB", "512GB"] }, { title: "Couleur", values: ["Gris Titane", "Noir Titane"] }],
          variants: [
            {
              title: "256GB / Gris Titane",
              sku: "S24U-256-GRIS",
              options: { Stockage: "256GB", Couleur: "Gris Titane" },
              prices: [
                { amount: 1300, currency_code: "eur" },
                { amount: 850000, currency_code: "xaf" },
              ],
            },
            {
              title: "512GB / Noir Titane",
              sku: "S24U-512-NOIR",
              options: { Stockage: "512GB", Couleur: "Noir Titane" },
              prices: [
                { amount: 1450, currency_code: "eur" },
                { amount: 950000, currency_code: "xaf" },
              ],
            }
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Complément Alimentaire Omega-3",
          category_ids: [categoryResult.find((cat) => cat.name === "Santé & Bien-être")!.id],
          description: "Huile de poisson pure pour soutenir la santé du cœur et du cerveau. 120 gélules.",
          handle: "omega-3-supplement",
          weight: 300,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [{ url: "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png" }], // Placeholder
          options: [{ title: "Variante", values: ["Standard"] }],
          variants: [
            {
              title: "Standard",
              sku: "OMEGA-3-120",
              options: { Variante: "Standard" },
              prices: [
                { amount: 25, currency_code: "eur" },
                { amount: 16000, currency_code: "xaf" },
              ],
            },
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        }
      ],
    },
  });

  logger.info("Seeding inventory levels.");
  const { data: inventoryItems } = await query.graph({ entity: "inventory_item", fields: ["id"] });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  // Give half to Cameroon default, half to Europe
  for (let i = 0; i < inventoryItems.length; i++) {
    const isEven = i % 2 === 0;
    inventoryLevels.push({
      location_id: isEven ? stockLocationCameroon.id : stockLocationEurope.id,
      stocked_quantity: 50,
      inventory_item_id: inventoryItems[i].id,
    });
  }

  await createInventoryLevelsWorkflow(container).run({
    input: { inventory_levels: inventoryLevels },
  });

  logger.info("Finished seeding inventory levels data.");
}
