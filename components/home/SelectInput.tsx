import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
type Props = {
  label: string
  options: number[]
}
function SelectInput({ label, options }: Props) {
  return (
    <div className="border-borderColor border-[1px] flex flex-col flex-auto  rounded group focus-within:border-blue-400 focus-within:border-2 relative">
      <label
        className="text-sm text-textColor pt-1 pb-1 px-2 group-focus-within:text-blue-400 text-foreground/50"
        htmlFor=""
      >
        {label}
      </label>
      <select
        className="bg-transparent pb-1 pl-2 border-none outline-none appearance-none cursor-pointer w-full"
        name={label}
      >
        {options.map((value, i) => (
          <option key={i} className="bg-background text-white" value={value}>
            {value}
          </option>
        ))}
      </select>
      <MdOutlineKeyboardArrowDown className="absolute right-0 top-1/2 text-3xl translate-y-[-50%] group-focus-within:text-blue-400 cursor-pointer z-[-1] text-foreground/50" />
    </div>
  )
}

export default SelectInput
