import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-none placeholder:text-muted-foreground   dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2  shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 ',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
