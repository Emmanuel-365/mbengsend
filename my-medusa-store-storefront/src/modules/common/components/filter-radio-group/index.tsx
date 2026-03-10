import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Text className="text-xs font-bold uppercase tracking-widest text-brand-dark/40">{title}</Text>
      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i) => (
          <div
            key={i.value}
            className={clx("flex gap-x-3 items-center group py-1", {
              "text-brand-primary": i.value === value,
              "text-brand-dark/60": i.value !== value,
            })}
          >
            <div className={clx("w-2 h-2 rounded-full transition-all duration-300", {
              "bg-brand-primary scale-100": i.value === value,
              "bg-brand-dark/10 scale-0 group-hover:scale-100": i.value !== value,
            })} />
            <RadioGroup.Item
              checked={i.value === value}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "text-sm font-medium hover:cursor-pointer transition-colors duration-200",
                {
                  "font-bold text-brand-dark": i.value === value,
                  "hover:text-brand-primary": i.value !== value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
