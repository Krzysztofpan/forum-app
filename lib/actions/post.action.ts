'use server'
import { auth } from '@/auth'

import Post from '@/models/Post'

import { generateRandomString } from '../utils/generateRadomString'
import cloudinary from '../cloudinary'
import { FileType } from '@/components/home/AddPostComponent'
import { UploadApiResponse } from 'cloudinary'
import { revalidatePath } from 'next/cache'
import mongoose from 'mongoose'
import User from '@/models/User'

export const addPost = async (
  formData: FormData,
  type: string,
  media?: FileType[],
  parentPostId?: string,
  repostId?: string
) => {
  const session = await auth()

  if (!session?.user || !session.user.id) {
    return
  }

  const content = formData.get('content')
  let convertedMedia
  if (!content) {
    return
  }
  if (media) {
    const PromisedMedia = media.map(async (obj: FileType) => {
      if (obj.type === 'gif') return obj

      const randomStr = generateRandomString(5)

      const res = (await cloudinary.uploader
        .upload(obj.dataURL, {
          public_id: randomStr,
          folder: 'forum',
          resource_type: obj.type.includes('video') ? 'video' : 'image',
          unique_filename: true,
        })

        .catch((error) => {
          console.log(error)
        })) as UploadApiResponse
      const convertedObj = {
        width: res.width,
        height: res.height,
        url: res.secure_url,
        public_id: res.public_id,
      }

      return convertedObj
    })
    convertedMedia = await Promise.all(PromisedMedia)
  }
  const mongooseSession = await mongoose.startSession()

  mongooseSession.startTransaction({
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
  })
  try {
    console.log(repostId)

    const newPost = await (
      await Post.create(
        [
          {
            type,
            content,
            creator: session.user.id,
            media: convertedMedia || [],
            quotePost: repostId,
          },
        ],
        { session: mongooseSession }
      )
    )[0].populate('creator')
    if (type === 'comment' && parentPostId) {
      await Post.findByIdAndUpdate(
        parentPostId,
        {
          $push: { comments: newPost._id },
        },
        { session: mongooseSession }
      )
    }
    if (type === 'quote') {
      await Post.findByIdAndUpdate(
        repostId,
        { $push: { reposts: newPost._id } },
        { session: mongooseSession }
      )
    }

    if (!newPost) {
      return
    }

    await User.findByIdAndUpdate(
      newPost.creator._id,
      {
        $push: { posts: newPost._id },
      },
      { new: true, session: mongooseSession }
    )

    await mongooseSession.commitTransaction()
  } catch (error) {
    await mongooseSession.abortTransaction()
  } finally {
    await mongooseSession.endSession()
  }
  revalidatePath('/home')

  return
}

export const toggleLikePost = async (postId: string) => {
  const session = await auth()
  if (!session || !session.user) {
    return
  }

  const post = await Post.findOne({ _id: postId })
  if (!post) {
    return
  }
  const heart = post.hearts.find((heart: string) => heart == session.user.id)

  if (heart) {
    post.hearts = post.hearts.filter(
      (heart: string) => heart != session.user.id
    )

    await post.save()
    /* revalidatePath('/') */
    return
  }

  /* const objectId = new mongoose.Types.ObjectId(session.user.id) */

  post.hearts.push(session.user.id)
  await post.save()

  /* revalidatePath('/') */
  return
}
export const toggleRepostPost = async (postId: string) => {
  const session = await auth()
  if (!session || !session.user) {
    return
  }

  const post = await Post.findOne({ _id: postId })
  console.log(session.user.id, post.creator)

  if (String(session.user.id) === String(post.creator)) {
    return
  }

  if (!post) {
    return
  }
  const reposted = post.reposts.find(
    (repostId: string) => repostId == session.user.id
  )

  if (reposted) {
    post.reposts = post.reposts.filter(
      (repostId: string) => repostId != session.user.id
    )
    await User.findByIdAndUpdate(session.user.id, {
      $pull: { posts: reposted },
    })
    await post.save()
    /* revalidatePath('/') */
    return
  }

  /* const objectId = new mongoose.Types.ObjectId(session.user.id) */

  post.reposts.push(session.user.id)
  await User.findByIdAndUpdate(session.user.id, { $push: { posts: post._id } })
  await post.save()

  /* revalidatePath('/') */
  return
}
