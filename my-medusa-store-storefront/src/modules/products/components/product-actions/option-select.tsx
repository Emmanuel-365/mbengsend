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
    <div className="flex flex-col gap-y-4">
      <span className="text-sm font-bold uppercase tracking-widest text-brand-dark/40 font-display">
        {translateTitle(title)}
      </span>
      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "min-w-[64px] h-12 px-4 rounded-xl border flex items-center justify-center text-sm font-bold transition-all duration-300",
                {
                  "border-brand-primary bg-brand-primary/5 text-brand-primary shadow-lux-sm": isSelected,
                  "border-brand-dark/10 bg-white text-brand-dark/60 hover:border-brand-primary/50 hover:text-brand-primary": !isSelected,
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
