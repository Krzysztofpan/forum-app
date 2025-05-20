'use client'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const UserProfileInput = ({
  defaultValue,
  placeholder,
  textarea = false,
}: {
  defaultValue: string
  placeholder: string
  textarea?: boolean
}) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <div
      className={`relative group ${
        textarea ? 'h-[100px]' : 'h-[60px]'
      }  border-[1px] border-border flex items-end  focus-within:border-blue-400 focus-within:border-2 rounded-sm `}
    >
      {!textarea ? (
        <Input
          name={placeholder}
          className="peer placeholder:text-base h-10 border-none focus-visible:ring-0 bg-transparent! "
          placeholder=" "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <Textarea
          name={placeholder}
          className="peer placeholder:text-base  border-none focus-visible:ring-0 bg-transparent! no-resize h-20"
          placeholder=" "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <span
        className={`
            
         absolute left-3 text-foreground/50 
        top-1/2  text-base
        transition-all duration-150
         peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/50
         peer-focus:text-sm peer-focus:text-blue-400
         peer-not-placeholder-shown:text-sm text-wrap break-words 
        font-light   ${
          !textarea
            ? 'translate-y-[-50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:translate-y-[-130%] peer-not-placeholder-shown:translate-y-[-130%]'
            : 'translate-y-[-110%] peer-placeholder-shown:translate-y-[-110%] peer-focus:translate-y-[-205%] peer-not-placeholder-shown:translate-y-[-205%]'
        }  
            `}
      >
        {placeholder}
      </span>
      <span className="absolute hidden group-focus-within:inline top-2 right-2 text-xs text-foreground/50">
        {value.length} / 30
      </span>
    </div>
  )
}

export default UserProfileInput
