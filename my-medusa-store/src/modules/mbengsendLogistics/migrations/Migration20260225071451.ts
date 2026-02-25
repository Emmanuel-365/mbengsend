import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260225071451 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "shipping_rate" drop constraint if exists "shipping_rate_key_unique";`);
    this.addSql(`create table if not exists "shipping_rate" ("id" text not null, "key" text not null, "name" text not null, "price_xaf" numeric not null default 0, "price_eur" numeric not null default 0, "raw_price_xaf" jsonb not null default '{"value":"0","precision":20}', "raw_price_eur" jsonb not null default '{"value":"0","precision":20}', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "shipping_rate_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_shipping_rate_key_unique" ON "shipping_rate" ("key") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shipping_rate_deleted_at" ON "shipping_rate" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "shipping_rate" cascade;`);
  }

}
