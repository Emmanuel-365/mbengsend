import { Text, clx } from "@medusajs/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
    React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
    React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  children,
  className,
  headingSize,
  complete,
  active,
  triggerable,
  description,
  required,
  tooltip,
  forceMountContent,
  customTrigger,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "border-brand-dark/5 group border-t last:mb-0 last:border-b",
        "py-4",
        className
      )}
    >
      <AccordionPrimitive.Header className="px-1">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Text className="text-brand-dark font-display font-bold text-lg tracking-tight group-hover:text-brand-primary transition-colors">{title}</Text>
            </div>
            <AccordionPrimitive.Trigger className="focus:outline-none">
              <MorphingTrigger />
            </AccordionPrimitive.Trigger>
          </div>
          {subtitle && (
            <Text as="span" className="mt-2 text-brand-dark/60 text-sm">
              {subtitle}
            </Text>
          )}
        </div>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        className={clx(
          "overflow-hidden transition-all duration-300 radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open px-1"
        )}
      >
        <div className="py-4">
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="bg-brand-dark/5 hover:bg-brand-primary/10 rounded-full group relative p-2 transition-colors duration-300">
      <div className="h-4 w-4 relative">
        <span className="bg-brand-dark group-hover:bg-brand-primary absolute inset-y-0 left-[45%] w-[2px] transition-all duration-500 group-radix-state-open:rotate-90" />
        <span className="bg-brand-dark group-hover:bg-brand-primary absolute inset-x-0 top-[45%] h-[2px] transition-all duration-500 group-radix-state-open:rotate-90 group-radix-state-open:opacity-0" />
      </div>
    </div>
  )
}

export default Accordion
