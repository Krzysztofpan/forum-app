import { Input } from './ui/input'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'

const CustomField = ({
  placeholder,
  form,
  name,
  type = 'text',
}: {
  form: UseFormReturn<{
    email: string
    username: string
    displayName: string
    password: string
    passwordConfirm: string
  }>
  placeholder: string
  name: 'email' | 'username' | 'password' | 'passwordConfirm' | 'displayName'
  type?: 'text' | 'password'
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative group">
              <Input
                type={type}
                className="border-[1px] border-solid border-foreground/50 text-xs group w-72 py-6"
                {...field}
              />
              <span
                className={`absolute text-sm  top-1/2 translate-y-[-50%] text-foreground/70 left-2 group-focus-within:translate-y-[-160%] group-focus-within:text-foreground z-10  group-focus-within:bg-background group-focus-within:text-xs group-focus-within:left-3 transition-all duration-100 p-1 ${
                  field.value
                    ? 'translate-y-[-160%] text-foreground text-xs left-3 bg-background'
                    : 'bg-transparent'
                }
      `}
              >
                {placeholder}
              </span>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomField
