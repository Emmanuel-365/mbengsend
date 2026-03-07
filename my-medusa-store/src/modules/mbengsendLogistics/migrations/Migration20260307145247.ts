import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260307145247 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "parcel_request" ("id" text not null, "customer_id" text null, "sender_name" text not null, "sender_phone" text not null, "sender_address" text not null, "receiver_name" text not null, "receiver_phone" text not null, "receiver_address" text not null, "origin_city" text not null, "destination_city" text not null, "package_weight" integer null, "package_description" text not null, "status" text check ("status" in ('PENDING', 'ACCEPTED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')) not null default 'PENDING', "estimated_price" numeric null, "raw_estimated_price" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "parcel_request_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_parcel_request_deleted_at" ON "parcel_request" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "parcel_request" cascade;`);
  }

}
