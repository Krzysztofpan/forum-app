'use server'

import { SignUpFormSchema } from '@/types/schemas'
import { z } from 'zod'
import { comparePassword, hashPassword } from '../utils/bcryptUtils'
import { signIn, signOut } from '@/auth'

import { prisma } from '@/prisma'

export const signUp = async (formData: z.infer<typeof SignUpFormSchema>) => {
  const user = SignUpFormSchema.parse({
    username: formData.username,
    email: formData.email,
    displayName: formData.displayName,
    password: formData.password,
    passwordConfirm: formData.passwordConfirm,
  })
  console.log(user)

  /* const userExist = await User.findOne({
    email: user.email,
    userAt: user.displayName,
  }) */

  const userExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: user.email }, { username: user.username }],
    },
  })

  if (userExist) {
    return {
      success: false,
      message: 'User already exist change Email or userAt',
    }
  }

  user.password = await hashPassword(user.password)

  try {
    // await User.create(user)

    await prisma.user.create({
      data: {
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    })
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
  /* const user = await User.findOne({ email: credentials.email }) */
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  })
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
