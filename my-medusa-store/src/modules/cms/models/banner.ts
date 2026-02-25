import { model } from "@medusajs/framework/utils"

export const Banner = model.define("banner", {
    id: model.id().primaryKey(),
    title: model.text(),
    image_url: model.text(),
    link: model.text().nullable(),
    is_active: model.boolean().default(true),
    position: model.number().default(0),
})

export const Page = model.define("page", {
    id: model.id().primaryKey(),
    title: model.text(),
    handle: model.text().unique(),
    content: model.text(),
    is_published: model.boolean().default(false),
})
