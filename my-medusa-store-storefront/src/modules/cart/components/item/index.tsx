"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full border-b border-brand-dark/5 hover:bg-brand-dark/[0.01] transition-colors" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex transition-transform duration-300 hover:scale-105", {
            "w-16": type === "preview",
            "small:w-28 w-20": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-xl"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left px-4">
        <LocalizedClientLink
          href={item.product_handle === "gp-service" ? "/gp" : `/products/${item.product_handle}`}
          className="text-lg font-display font-bold text-brand-dark hover:text-brand-primary transition-colors block mb-1"
          data-testid="product-title"
        >
          {item.product_title}
        </LocalizedClientLink>
        {item.metadata?.type === "gp_reservation" ? (
          <div className="flex flex-col gap-y-1 mt-2 p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/10">
            <div className="flex items-center gap-x-2 text-xs text-brand-dark/70">
              <span className="font-bold">⚖️ {String(item.metadata.kilos_reserved)} Kg</span>
              <span className="w-1 h-1 bg-brand-dark/20 rounded-full" />
              <span>{String(item.metadata.price_per_kilo)} €/kg</span>
            </div>
            <div className="text-[10px] text-gray-500 italic">
              Voyage : {String(item.metadata.journey)}
            </div>
            <div className="text-[10px] text-gray-500 italic">
              Voyageur : {String(item.metadata.traveler_name)}
            </div>
          </div>
        ) : (
          <LineItemOptions variant={item.variant} data-testid="product-variant" className="text-ui-fg-subtle text-xs uppercase tracking-wide" />
        )}
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-4 items-center">
            {item.metadata?.type === "gp_reservation" ? (
              <div className="text-sm font-bold text-brand-dark bg-gray-50 px-3 py-1 rounded-full border border-gray-100 italic">
                Réservation GP
              </div>
            ) : (
              <div className="flex items-center border border-brand-dark/10 rounded-full px-2 bg-white shadow-sm overflow-hidden">
                <CartItemSelect
                  value={item.quantity}
                  onChange={(value) => changeQuantity(parseInt(value.target.value))}
                  className="w-16 h-10 border-none bg-transparent focus:ring-0 text-sm font-bold text-brand-dark"
                  data-testid="product-select-button"
                >
                  {Array.from(
                    {
                      length: Math.min(maxQuantity, 10),
                    },
                    (_, i) => (
                      <option value={i + 1} key={i}>
                        {i + 1}
                      </option>
                    )
                  )}
                </CartItemSelect>
              </div>
            )}
            <DeleteButton id={item.id} data-testid="product-delete-button" className="text-ui-fg-muted hover:text-red-500 transition-colors" />
            {updating && <Spinner className="animate-spin text-brand-primary" />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell p-4">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
            className="text-brand-dark/60 font-medium"
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0 p-4">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted font-medium">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
            className="text-brand-primary font-bold text-lg"
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
