import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260225174236 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "wishlist_item" add column if not exists "variant_id" text null;`);
    this.addSql(`alter table if exists "wishlist_item" alter column "product_id" type text using ("product_id"::text);`);
    this.addSql(`alter table if exists "wishlist_item" alter column "product_id" drop not null;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_wishlist_item_variant_id" ON "wishlist_item" ("variant_id") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "IDX_wishlist_item_variant_id";`);
    this.addSql(`alter table if exists "wishlist_item" drop column if exists "variant_id";`);

    this.addSql(`alter table if exists "wishlist_item" alter column "product_id" type text using ("product_id"::text);`);
    this.addSql(`alter table if exists "wishlist_item" alter column "product_id" set not null;`);
  }

}
