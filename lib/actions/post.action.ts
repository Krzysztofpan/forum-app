'use server'
import { auth } from '@/auth'

import { generateRandomString } from '../utils/generateRadomString'
import cloudinary from '../cloudinary'
import { FileType, GifType } from '@/components/home/AddPostComponent'
import { UploadApiResponse } from 'cloudinary'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma'
function isFileType(obj: FileType | GifType): obj is FileType {
  return obj.type !== 'gif'
}

type MediaType = {
  width: number
  height: number
  url: string
  public_id: string
}

export const addPost = async (
  formData: FormData,
  type: string,
  media?: (FileType | GifType)[],
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
    const PromisedMedia = media.map(async (obj) => {
      if (!isFileType(obj)) return obj

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

    try {
      await prisma.post.create({
        data: {
          userId: session.user.id,
          desc: content.toString(),
          parentPostId: parentPostId ? parseInt(parentPostId) : null,
          rePostId: repostId ? parseInt(repostId) : null,
          media: {
            create: convertedMedia.map((m) => {
              const baseData = {
                url: m.url,
                width: m.width,
                height: m.height,
                userId: session.user.id,
              }

              if ('public_id' in m && m.public_id) {
                return {
                  ...baseData,
                  public_id: m.public_id,
                  type: 'media',
                }
              }

              return {
                ...baseData,
                type: 'gif',
              }
            }),
          },
        },
      })
    } catch (error) {}
  }
  /*   await connectionToDatabase()
  const mongooseSession = await mongoose.startSession()

  mongooseSession.startTransaction({
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
  }) */

  revalidatePath('/home')

  return
}

export const likePost = async (postId: number) => {
  const session = await auth()
  if (!session || !session.user) {
    return { success: false }
  }

  /* const post = await Post.findOne({ _id: postId }) */
  const userId = session.user.id
  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    })

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      })
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      })
    }
  } catch (error) {
    return { success: false }
  }

  return { success: true }
}
export const rePost = async (postId: number) => {
  const session = await auth()

  if (!session || !session.user) return
  const userId = session.user.id
  const existingRePost = await prisma.post.findFirst({
    where: {
      userId: userId,
      rePostId: postId,
    },
  })

  if (existingRePost) {
    await prisma.post.delete({
      where: { id: existingRePost.id },
    })
  } else {
    await prisma.post.create({
      data: {
        userId,
        rePostId: postId,
      },
    })
  }
}
