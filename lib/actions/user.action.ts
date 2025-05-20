'use server'
import { auth } from '@/auth'
import User from '@/models/User'
import mongoose from 'mongoose'
import { revalidatePath } from 'next/cache'
import { generateRandomString } from '../utils/generateRadomString'
import cloudinary from '../cloudinary'
import { UploadApiResponse } from 'cloudinary'

export const follow = async (userId: string) => {
  const session = await auth()

  if (!session || !session?.user) {
    return {
      success: false,
      message: 'User have to be authenticated to do this action.',
    }
  }

  if (userId === session.user.id) {
    return { success: false, message: `User can't follow himself` }
  }

  const mongooseSession = await mongoose.startSession()
  mongooseSession.startTransaction()
  try {
    const userToFollow = await User.findById(userId).session(mongooseSession)
    if (!userToFollow) {
      return { success: false, message: `User does't exists.` }
    }

    const loggedUser = await User.findById(session.user.id).session(
      mongooseSession
    )

    const alreadyFollowed = loggedUser.following.find(
      (id: mongoose.Types.ObjectId) => String(id) == userToFollow._id
    )

    if (alreadyFollowed) {
      return { success: false, message: 'User is already followed.' }
    }
    loggedUser.following.push(userToFollow._id)

    await loggedUser.save({ session: mongooseSession })
    userToFollow.followers.push(session.user.id)
    await userToFollow.save({ session: mongooseSession })
    revalidatePath(`/${userToFollow.username}`)
    await mongooseSession.commitTransaction()
  } catch (error) {
    console.log(error)

    await mongooseSession.abortTransaction()
    return { success: false, message: 'Something went wrong!' }
  } finally {
    await mongooseSession.endSession()
  }

  return { success: true, message: 'Successfully follow User!' }
}

export const unfollow = async (userId: string) => {
  const session = await auth()

  if (!session || !session?.user) {
    return {
      success: false,
      message: 'User have to be authenticated to do this action.',
    }
  }

  if (userId === session.user.id) {
    return { success: false, message: `User can't unfollow himself` }
  }

  const mongooseSession = await mongoose.startSession()
  mongooseSession.startTransaction()
  try {
    const userToUnfollow = await User.findById(userId).session(mongooseSession)
    if (!userToUnfollow) {
      return { success: false, message: `User does't exists.` }
    }

    const loggedUser = await User.findById(session.user.id).session(
      mongooseSession
    )

    const alreadyFollowed = loggedUser.following.find(
      (id: mongoose.Types.ObjectId) => String(id) != userToUnfollow._id
    )

    if (alreadyFollowed) {
      return { success: false, message: 'User is already unfollowed.' }
    }

    loggedUser.following = loggedUser.following.filter(
      (id: string) => String(id) !== String(userToUnfollow._id)
    )

    await loggedUser.save({ session: mongooseSession })

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id: string) => String(id) !== String(session.user.id)
    )
    await userToUnfollow.save({ session: mongooseSession })
    revalidatePath(`/${userToUnfollow.username}`)
    await mongooseSession.commitTransaction()
  } catch (error) {
    console.log(error)

    await mongooseSession.abortTransaction()
    return { success: false, message: 'Something went wrong!' }
  } finally {
    await mongooseSession.endSession()
  }

  return { success: true, message: 'Successfully unfollow User!' }
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
    await User.findByIdAndUpdate(session.user.id, { avatar: res.secure_url })
  } else {
    await User.findByIdAndUpdate(session.user.id, { banner: res.secure_url })
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
  await User.findByIdAndUpdate(session.user.id, { username, bio, website })
}
