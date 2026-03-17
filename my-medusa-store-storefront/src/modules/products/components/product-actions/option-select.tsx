import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  const translateTitle = (t: string) => {
    const titles: Record<string, string> = {
      Color: "Couleur",
      Size: "Taille",
      Material: "Matière",
      Style: "Style",
    }
    return titles[t] || t
  }

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-[10px] small:text-xs font-bold uppercase tracking-[0.2em] text-brand-dark/40 font-sans">
        {translateTitle(title)}
      </span>
      <div
        className="flex flex-wrap gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "min-w-[48px] h-12 px-4 rounded-xl border flex items-center justify-center text-xs font-bold font-sans uppercase tracking-widest transition-all duration-500",
                {
                  "border-brand-gold bg-brand-gold text-white shadow-lux-md scale-105": isSelected,
                  "border-gray-100 bg-white text-brand-dark/50 hover:border-brand-gold/30 hover:text-brand-gold": !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
