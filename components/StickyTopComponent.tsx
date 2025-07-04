import { ReactNode } from 'react'

const StickyTopComponent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={`py-2 sticky top-0 bg-background/70 backdrop-blur-lg z-50 right-0  ${className}`}
    >
      <div className="">{children}</div>
    </div>
  )
}

export default StickyTopComponent
