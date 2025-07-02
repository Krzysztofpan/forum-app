'use server'
import { auth } from '@/auth'

import { revalidatePath } from 'next/cache'
import { generateRandomString } from '../utils/generateRadomString'
import cloudinary from '../cloudinary'
import { UploadApiResponse } from 'cloudinary'

import { prisma } from '@/prisma'

export const followUser = async (targetUserId: string, username: string) => {
  const session = await auth()

  if (!session || !session.user) return

  const userId = session.user.id

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: targetUserId,
      followingId: userId,
    },
  })

  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    })
  } else {
    await prisma.follow.create({
      data: {
        followerId: targetUserId,
        followingId: userId,
      },
    })
  }

  revalidatePath(`/${username}`)
}
export const uploadUserImage = async (
  croppedImageDataURL: string,
  imageType: 'banner' | 'avatar'
) => {
  const session = await auth()
  if (!session || !session.user) {
    return null
  }
  const randomStr = generateRandomString(5)

  const res = (await cloudinary.uploader
    .upload(croppedImageDataURL, {
      public_id: randomStr,
      folder: imageType,
      resource_type: 'image',
      unique_filename: true,
    })
    .catch((error) => {
      console.log(error)
    })) as UploadApiResponse

  if (imageType === 'avatar') {
    /* await User.findByIdAndUpdate(session.user.id, { avatar: res.secure_url }) */
    await prisma.user.update({
      where: { id: session.user.id },
      data: { img: res.secure_url },
    })
  } else {
    /*  await User.findByIdAndUpdate(session.user.id, { banner: res.secure_url }) */
    await prisma.user.update({
      where: { id: session.user.id },
      data: { cover: res.secure_url },
    })
  }
}

export const updateUserInfo = async (
  username?: string,
  bio?: string,
  website?: string
) => {
  const session = await auth()
  if (!session || !session.user) {
    return null
  }
  /* await User.findByIdAndUpdate(session.user.id, { username, bio, website }) */
  await prisma.user.update({
    where: { id: session.user.id },
    data: { username, bio, website },
  })
}

export const fetchUsersWithQuery = async (query: string) => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          displayName: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      img: true,
    },
  })

  return users
}
