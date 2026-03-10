"use client"

import { Badge, Heading, Input, Label, Text, clx } from "@medusajs/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e: any) {
      setErrorMessage(e.message)
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div className="w-full bg-transparent flex flex-col">
      <div className="text-sm">
        <form action={(a) => addPromotionCode(a)} className="w-full">
          <div className="flex items-center mb-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors underline underline-offset-4"
              data-testid="add-discount-button"
            >
              Ajouter un code promotionnel
            </button>
          </div>

          {isOpen && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex w-full gap-x-3">
                <Input
                  className="flex-1 h-12 rounded-xl border-brand-dark/10 focus:border-brand-primary focus:ring-brand-primary/20"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="CODE123"
                  autoFocus={true}
                  data-testid="discount-input"
                />
                <SubmitButton
                  variant="secondary"
                  className="h-12 px-6 rounded-full border-brand-primary text-brand-primary font-bold hover:bg-brand-primary/5 transition-all"
                  data-testid="discount-apply-button"
                >
                  Appliquer
                </SubmitButton>
              </div>

              <ErrorMessage
                error={errorMessage}
                data-testid="discount-error-message"
              />
            </div>
          )}
        </form>

        {promotions.length > 0 && (
          <div className="w-full flex items-center mt-6">
            <div className="flex flex-col w-full gap-y-3">
              <Text className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">
                Promotion(s) appliquée(s) :
              </Text>

              {promotions.map((promotion) => {
                return (
                  <div
                    key={promotion.id}
                    className="flex items-center justify-between w-full bg-brand-primary/5 p-3 rounded-xl border border-brand-primary/10"
                    data-testid="discount-row"
                  >
                    <div className="flex items-center gap-x-3">
                      <Badge
                        className={clx("font-bold text-xs px-2 py-1 rounded-lg", {
                          "bg-green-100 text-green-700 border-green-200": promotion.is_automatic,
                          "bg-brand-primary/10 text-brand-primary border-brand-primary/20": !promotion.is_automatic,
                        })}
                      >
                        {promotion.code}
                      </Badge>
                      <Text className="text-sm font-medium text-brand-dark">
                        (
                        {promotion.application_method?.value !== undefined &&
                          promotion.application_method.currency_code !==
                          undefined && (
                            <>
                              {promotion.application_method.type ===
                                "percentage"
                                ? `-${promotion.application_method.value}%`
                                : `-${convertToLocale({
                                  amount: +promotion.application_method.value,
                                  currency_code:
                                    promotion.application_method
                                      .currency_code,
                                })}`}
                            </>
                          )}
                        )
                      </Text>
                    </div>
                    {!promotion.is_automatic && (
                      <button
                        className="text-brand-dark/40 hover:text-red-500 transition-colors p-1"
                        onClick={() => {
                          if (!promotion.code) {
                            return
                          }

                          removePromotionCode(promotion.code)
                        }}
                        data-testid="remove-discount-button"
                      >
                        <Trash size={16} />
                        <span className="sr-only">
                          Supprimer le code
                        </span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscountCode
