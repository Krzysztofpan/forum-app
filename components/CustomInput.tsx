import { Dispatch, SetStateAction } from 'react'
import { Input } from './ui/input'

const CustomInput = ({
  value = '',
  setValue,
  type = 'text',
  placeholder,
}: {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  type?: 'password' | 'text'
  placeholder: string
}) => {
  return (
    <div className="relative group">
      <Input
        type={type}
        className="border-[1px] border-solid border-foreground/50 text-xs group w-72 py-6"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span
        className={`absolute text-sm  top-1/2 translate-y-[-50%] text-foreground/70 left-2 group-focus-within:translate-y-[-160%] group-focus-within:text-foreground z-10  group-focus-within:text-xs group-focus-within:bg-background group-focus-within:left-3 transition-all duration-100 p-1 ${
          value
            ? 'translate-y-[-160%] text-foreground   text-xs left-3 bg-background'
            : 'bg-transparent'
        }
      `}
      >
        {placeholder}
      </span>
    </div>
  )
}

export default CustomInput
