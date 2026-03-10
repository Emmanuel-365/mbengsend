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
      className={clx("flex gap-x-2 items-center group transition-all duration-300", className)}
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="text-inherit font-semibold">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ease-in-out duration-300 transition-transform"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
