'use client'

import CustomInput from '@/components/CustomInput'
import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'

import { signInWithCredentials } from '@/lib/actions/auth.action'

import { useState, useTransition } from 'react'

import { toast } from 'sonner'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, startTransition] = useTransition()
  function onSubmit() {
    startTransition(async () => {
      setEmail('')
      setPassword('')
      const res = await signInWithCredentials({ email, password })
      toast(res.message, { position: 'bottom-center' })
      return
    })
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <CustomInput placeholder="Email" setValue={setEmail} value={email} />
      <CustomInput
        placeholder="Password"
        setValue={setPassword}
        value={password}
        type="password"
      />

      <Button
        className="w-full py-6 cursor-pointer "
        disabled={pending}
        type="submit"
      >
        {pending ? <Spinner /> : 'Continue'}
      </Button>
    </form>
  )
}

export default LoginForm
