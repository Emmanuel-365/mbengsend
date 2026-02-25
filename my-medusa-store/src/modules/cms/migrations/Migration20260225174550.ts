import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260225174550 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "page" drop constraint if exists "page_handle_unique";`);
    this.addSql(`create table if not exists "page" ("id" text not null, "title" text not null, "handle" text not null, "content" text not null, "is_published" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "page_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_page_handle_unique" ON "page" ("handle") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_page_deleted_at" ON "page" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "banner" add column if not exists "position" integer not null default 0;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "page" cascade;`);

    this.addSql(`alter table if exists "banner" drop column if exists "position";`);
  }

}
