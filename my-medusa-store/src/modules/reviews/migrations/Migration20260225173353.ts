import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260225173353 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "review" add column if not exists "title" text null, add column if not exists "author_name" text not null default 'Anonymous', add column if not exists "verified_purchase" boolean not null default false, add column if not exists "status" text check ("status" in ('pending', 'approved', 'rejected')) not null default 'pending';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "review" drop column if exists "title", drop column if exists "author_name", drop column if exists "verified_purchase", drop column if exists "status";`);
  }

}
