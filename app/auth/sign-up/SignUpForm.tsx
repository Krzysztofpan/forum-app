'use client'
import CustomField from '@/components/CustomField'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { signUp } from '@/lib/actions/auth.action'
import { SignUpFormSchema } from '@/types/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const SignUpForm = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      userAt: '',
      password: '',
      passwordConfirm: '',
    },
  })

  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    startTransition(async () => {
      const res = await signUp(values)
      toast(res.message, { position: 'bottom-center' })
      router.push('/auth/login')
      return
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField form={form} placeholder="Email" name="email" />
        <CustomField form={form} placeholder="Username" name="username" />
        <CustomField form={form} placeholder="userAt" name="userAt" />
        <CustomField
          form={form}
          placeholder="password"
          name="password"
          type="password"
        />
        <CustomField
          form={form}
          placeholder="Confirm password"
          name="passwordConfirm"
          type="password"
        />

        <Button
          className="w-full py-6 cursor-pointer "
          type="submit"
          disabled={pending}
        >
          {pending ? <Spinner /> : 'Continue'}
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
