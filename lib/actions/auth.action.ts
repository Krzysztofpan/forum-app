'use server'

import User from '@/models/User'
import { SignUpFormSchema } from '@/types/schemas'
import { z } from 'zod'
import { comparePassword } from '../utils/bcryptUtils'
import { signIn, signOut } from '@/auth'
import connectionToDatabase from '../mongoose'

export const signUp = async (formData: z.infer<typeof SignUpFormSchema>) => {
  await connectionToDatabase()
  const user = SignUpFormSchema.parse({
    username: formData.username,
    email: formData.email,
    userAt: formData.userAt,
    password: formData.password,
    passwordConfirm: formData.passwordConfirm,
  })
  console.log(user)

  const userExist = await User.findOne({
    email: user.email,
    userAt: user.userAt,
  })

  if (userExist) {
    return {
      success: false,
      message: 'User already exist change Email or userAt',
    }
  }

  try {
    await User.create(user)

    return { success: true, message: 'Successfully created account' }
  } catch (error) {
    console.log(error)

    return { success: false, message: 'Something went wrong' }
  }
}

export const signInWithCredentials = async (credentials: {
  email: string
  password: string
}) => {
  await connectionToDatabase()
  const user = await User.findOne({ email: credentials.email })

  if (user) {
    const isPasswordsMatches = await comparePassword(
      credentials.password,
      user.password
    )
    if (isPasswordsMatches) {
      await signIn('credentials', {
        email: user.email,
        password: credentials.password,
        redirectTo: '/home',
        callbackUrl: '/home',
      })

      return { success: true, message: 'Successfully Login' }
    }
  }

  return { success: false, message: 'Bad email or password try again!' }
}

export const logout = async () => {
  await signOut()
}
