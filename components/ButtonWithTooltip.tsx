import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from './ui/button'
import { ReactNode } from 'react'

const ButtonWithTooltip = ({
  children,
  trigger,
}: {
  children: ReactNode
  trigger: ReactNode
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild className="cursor-pointer">
          <Button variant="ghost" className="rounded-full" asChild>
            {trigger}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ButtonWithTooltip
