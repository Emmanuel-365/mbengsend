import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260318071835 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "travel_offer" ("id" text not null, "first_name" text not null, "last_name" text not null, "email" text not null, "phone_number" text not null, "departure_city" text not null, "destination_city" text not null, "departure_date" timestamptz not null, "airline" text null, "available_kilos" integer not null, "price_per_kilo" integer not null, "status" text check ("status" in ('pending', 'approved', 'rejected', 'completed')) not null default 'pending', "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "travel_offer_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_travel_offer_deleted_at" ON "travel_offer" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "travel_booking" ("id" text not null, "travel_offer_id" text not null, "buyer_first_name" text not null, "buyer_last_name" text not null, "buyer_email" text not null, "buyer_phone" text not null, "kilos_reserved" integer not null, "total_price" integer not null, "payment_status" text check ("payment_status" in ('pending', 'paid', 'refunded')) not null default 'pending', "status" text check ("status" in ('pending', 'package_received', 'in_transit', 'delivered')) not null default 'pending', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "travel_booking_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_travel_booking_travel_offer_id" ON "travel_booking" ("travel_offer_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_travel_booking_deleted_at" ON "travel_booking" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "travel_booking" add constraint "travel_booking_travel_offer_id_foreign" foreign key ("travel_offer_id") references "travel_offer" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "travel_booking" drop constraint if exists "travel_booking_travel_offer_id_foreign";`);

    this.addSql(`drop table if exists "travel_offer" cascade;`);

    this.addSql(`drop table if exists "travel_booking" cascade;`);
  }

}
