import { Dispatch, SetStateAction, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useAddPostContext } from '@/context/AddPostContext'

const InputChoice = ({
  inputsCount,
  setInputsCount,
  i,
}: {
  inputsCount: number
  setInputsCount: Dispatch<SetStateAction<number>>
  i: number
}) => {
  const { firstInput, secondInput, setFirstInput, setSecondInput } =
    useAddPostContext()
  const [value, setValue] = useState<string>('')
  return (
    <div className="flex items-center gap-4 w-full">
      <div
        className={`relative group h-[60px] border-[1px] border-border flex items-end  focus-within:border-blue-400 focus-within:border-2 rounded-sm ${
          inputsCount < 4 ? 'w-[88%]' : 'w-full'
        }`}
      >
        <Input
          value={i === 0 ? firstInput : i === 1 ? secondInput : value}
          onChange={(e) => {
            return i === 0
              ? setFirstInput(e.target.value)
              : i === 1
              ? setSecondInput(e.target.value)
              : setValue(e.target.value)
          }}
          className="peer placeholder:text-base h-10 border-none focus-visible:ring-0 bg-transparent! "
          name={String(i)}
          maxLength={25}
          placeholder=" "
          autoFocus={i === 0 ? true : false}
        />
        <span
          className="
        absolute left-3 text-foreground/50 
        top-1/2 translate-y-[-50%] text-base
        transition-all duration-150
        peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-base peer-placeholder-shown:text-foreground/50
        peer-focus:translate-y-[-130%] peer-focus:text-sm peer-focus:text-blue-400
        peer-not-placeholder-shown:translate-y-[-130%] peer-not-placeholder-shown:text-sm
        font-light
      "
        >
          Choice {i + 1} {i > 1 && '(optional)'}
        </span>
        <span className="hidden group-focus-within:inline absolute top-1 right-2 text-xs text-foreground/50">
          {value.length} / 25
        </span>
      </div>
      {i === inputsCount - 1 && inputsCount < 4 && (
        <Button
          variant="ghost"
          onClick={() => setInputsCount((c) => c + 1)}
          className="rounded-full cursor-pointer"
        >
          <Plus className="scale-130 text-blue-400" />
        </Button>
      )}
    </div>
  )
}

export default InputChoice
