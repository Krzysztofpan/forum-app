import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const SelectTime = ({ label, values }: { label: string; values: number[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Select
      defaultValue={label === 'Days' ? '1' : '0'}
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      name={label}
    >
      <SelectTrigger
        className={`m-2  h-auto! bg-transparent! w-auto group focus-within:border-blue-400  focus-visible:border-blue-400 focus:border-2 ${
          isOpen ? 'border-blue-400 border-2' : ''
        }`}
      >
        <div className="text-left space-y-1 p-0 m-0">
          <p
            className={`w-full text-sm text-foreground/40 group-focus-within:text-blue-400 
         ${isOpen ? 'text-blue-400!' : ''}`}
          >
            {label}
          </p>
          <SelectValue />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {values.map((_, i) => (
            <SelectItem value={String(i)} key={i}>
              {String(i)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectTime
