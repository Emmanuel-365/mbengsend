import { sdk } from "@lib/config"

async function run() {
  const handles = ["beauté-&-cosmétiques", encodeURIComponent("beauté-&-cosmétiques")];

  for (const h of handles) {
    try {
      const res = await sdk.client.fetch(`/store/product-categories`, {
        query: { handle: h }
      });
      console.log(`Handle ${h}: Found ${(res as any).product_categories.length}`);
    } catch (err) {
      console.error(`Handle ${h}: ERROR`, err);
    }
  }
}

run();
