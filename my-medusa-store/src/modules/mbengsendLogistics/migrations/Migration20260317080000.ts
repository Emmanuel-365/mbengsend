import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260317080000 extends Migration {

  override async up(): Promise<void> {
    // Ajouter les colonnes manquantes si elles n'existent pas déjà
    this.addSql(`ALTER TABLE "parcel_request" ADD COLUMN IF NOT EXISTS "length" integer null;`);
    this.addSql(`ALTER TABLE "parcel_request" ADD COLUMN IF NOT EXISTS "width" integer null;`);
    this.addSql(`ALTER TABLE "parcel_request" ADD COLUMN IF NOT EXISTS "height" integer null;`);
    this.addSql(`ALTER TABLE "parcel_request" ADD COLUMN IF NOT EXISTS "shipping_mode" text check ("shipping_mode" in ('air_freight', 'sea_freight', 'local_delivery')) null;`);
    this.addSql(`ALTER TABLE "parcel_request" ADD COLUMN IF NOT EXISTS "estimated_price" numeric null;`);
    this.addSql(`ALTER TABLE "parcel_request" ADD COLUMN IF NOT EXISTS "raw_estimated_price" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`ALTER TABLE "parcel_request" DROP COLUMN IF EXISTS "length";`);
    this.addSql(`ALTER TABLE "parcel_request" DROP COLUMN IF EXISTS "width";`);
    this.addSql(`ALTER TABLE "parcel_request" DROP COLUMN IF EXISTS "height";`);
    this.addSql(`ALTER TABLE "parcel_request" DROP COLUMN IF EXISTS "shipping_mode";`);
    this.addSql(`ALTER TABLE "parcel_request" DROP COLUMN IF EXISTS "estimated_price";`);
    this.addSql(`ALTER TABLE "parcel_request" DROP COLUMN IF EXISTS "raw_estimated_price";`);
  }

}
