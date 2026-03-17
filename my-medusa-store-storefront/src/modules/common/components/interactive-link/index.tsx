import { ArrowUpRightMini } from "@medusajs/icons"
import { Text, clx } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={clx("flex gap-x-2 items-center group transition-all duration-500", className)}
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-inherit font-sans font-bold uppercase tracking-widest text-xs">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:translate-x-1 group-hover:-translate-y-1 ease-out duration-500 transition-transform text-brand-gold"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
