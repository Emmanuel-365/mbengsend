"use client"

import { convertToLocale } from "@lib/util/money"
import { clx } from "@medusajs/ui"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
  className?: string
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals, className }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  const isDark = className?.includes("text-white") || className?.includes("glass")

  return (
    <div className={className}>
      <div className={clx("flex flex-col gap-y-3 text-sm", {
        "text-white/60": isDark,
        "text-ui-fg-subtle": !isDark
      })}>
        <div className="flex items-center justify-between">
          <span>Sous-total</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0} className={clx("font-semibold", { "text-white": isDark, "text-brand-dark": !isDark })}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Livraison</span>
          <span data-testid="cart-shipping" data-value={shipping_subtotal || 0} className={clx("font-semibold", { "text-white": isDark, "text-brand-dark": !isDark })}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>Remise</span>
            <span
              className="text-red-500 font-bold"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Taxes</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0} className={clx("font-semibold", { "text-white": isDark, "text-brand-dark": !isDark })}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className={clx("h-px w-full my-6", { "bg-white/10": isDark, "bg-gray-200": !isDark })} />
      <div className={clx("flex items-center justify-between mb-2", { "text-white": isDark, "text-brand-dark": !isDark })}>
        <span className="text-lg font-bold">Total</span>
        <span
          className="text-2xl font-display font-bold text-brand-primary"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
