import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260317070009 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "shipping_rate" drop constraint if exists "shipping_rate_key_unique";`);
    this.addSql(`create table if not exists "parcel_request" ("id" text not null, "customer_id" text null, "sender_name" text not null, "sender_phone" text not null, "sender_address" text not null, "receiver_name" text not null, "receiver_phone" text not null, "receiver_address" text not null, "origin_city" text not null, "destination_city" text not null, "package_weight" integer null, "length" integer null, "width" integer null, "height" integer null, "shipping_mode" text check ("shipping_mode" in ('air_freight', 'sea_freight', 'local_delivery')) null, "package_description" text not null, "status" text check ("status" in ('PENDING', 'ACCEPTED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')) not null default 'PENDING', "estimated_price" numeric null, "raw_estimated_price" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "parcel_request_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_parcel_request_deleted_at" ON "parcel_request" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "shipping_rate" ("id" text not null, "key" text not null, "name" text not null, "price_xaf" numeric not null default 0, "price_eur" numeric not null default 0, "raw_price_xaf" jsonb not null default '{"value":"0","precision":20}', "raw_price_eur" jsonb not null default '{"value":"0","precision":20}', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "shipping_rate_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_shipping_rate_key_unique" ON "shipping_rate" ("key") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shipping_rate_deleted_at" ON "shipping_rate" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "parcel_request" cascade;`);

    this.addSql(`drop table if exists "shipping_rate" cascade;`);
  }

}
