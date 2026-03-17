import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] w-full bg-gray-100 rounded-3xl" />
      <div className="flex flex-col gap-y-3 mt-4 px-2">
        <div className="w-3/4 h-6 bg-gray-100 rounded-lg"></div>
        <div className="w-1/2 h-4 bg-gray-50 rounded-lg"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
