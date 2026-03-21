import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260321105750 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "travel_offer" add column if not exists "selling_price_per_kilo" integer null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "travel_offer" drop column if exists "selling_price_per_kilo";`);
  }

}
