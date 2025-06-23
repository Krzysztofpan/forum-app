'use server'
import { auth } from '@/auth'

import { generateRandomString } from '../utils/generateRadomString'
import cloudinary from '../cloudinary'
import { FileType, GifType } from '@/components/home/AddPostComponent'
import { UploadApiResponse } from 'cloudinary'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/prisma'
import { PostWithDetails } from '@/types'
function isFileType(obj: FileType | GifType): obj is FileType {
  return obj.type !== 'gif'
}

export const addPost = async (
  formData: FormData,
  type: string,
  media?: (FileType | GifType)[],
  parentPostId?: string | number,
  repostId?: string
): Promise<{ success: boolean; message: string }> => {
  const session = await auth()

  if (!session?.user || !session.user.id) {
    return {
      success: false,
      message: 'user has to be authenticated to do this action',
    }
  }

  const content = formData.get('content')
  let convertedMedia
  if (!content) {
    return {
      success: false,
      message: 'post must have content',
    }
  }
  console.log(content)

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
        type: res.resource_type,
      }

      return convertedObj
    })
    convertedMedia = await Promise.all(PromisedMedia)

    try {
      const newPost = await prisma.post.create({
        data: {
          userId: session.user.id,
          desc: content.toString(),
          parentPostId: parentPostId ? Number(parentPostId) : null,
          rePostId: repostId ? Number(repostId) : null,
          media: {
            create: convertedMedia.map((m) => {
              const baseData = {
                url: m.url,
                width: m.width,
                height: m.height,
                type: m.type,
                userId: session.user.id,
              }

              if ('public_id' in m && m.public_id) {
                return {
                  ...baseData,
                  public_id: m.public_id,
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
      const hashtags = newPost.desc
        ?.split(' ')
        .filter((text) => text.includes('#'))

      if (hashtags) {
        hashtags.forEach(async (hashtag) => {
          const hashtagExists = await prisma.hashtag.findFirst({
            where: { name: hashtag },
          })
          if (!hashtagExists) {
            const newHashtag = await prisma.hashtag.create({
              data: {
                name: hashtag,
              },
            })
            await prisma.postHashtag.create({
              data: { postId: newPost.id, tagId: newHashtag.id },
            })
          } else {
            await prisma.postHashtag.create({
              data: { postId: newPost.id, tagId: hashtagExists.id },
            })
          }
        })
      }
      revalidatePath('/home')
      return {
        success: true,
        message: `you are successfully added ${
          type === 'comment' ? 'comment' : type === 'post' ? 'post' : 'rePost'
        }`,
      }
    } catch (error) {
      console.log(error)

      return {
        success: false,
        message: 'Something went wrong!',
      }
    }
  }

  return {
    success: false,
    message: 'Something went wrong!',
  }
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

export async function getParentPosts(
  post: PostWithDetails,
  userId: string
): Promise<Omit<PostWithDetails, 'comments'>[]> {
  const parentPosts: Omit<PostWithDetails, 'comments'>[] = []
  let currentParent = post.parentPost
  while (currentParent) {
    // Tworzymy kopię bez parentPost, by nie zagnieżdżać
    const { parentPost, ...flatParent } = currentParent
    parentPosts.unshift(flatParent as Omit<PostWithDetails, 'comments'>)
    if (!currentParent.parentPostId) break
    currentParent = await prisma.post.findUnique({
      where: { id: currentParent.parentPostId },
      include: {
        user: { select: { displayName: true, username: true, img: true } },
        _count: { select: { likes: true, rePosts: true, comments: true } },
        likes: { where: { userId: userId }, select: { id: true } },
        rePosts: { where: { userId: userId }, select: { id: true } },
        saves: { where: { userId: userId }, select: { id: true } },
        media: {
          select: {
            id: true,
            width: true,
            height: true,
            url: true,
            public_id: true,
            type: true,
            userId: true,
            postId: true,
          },
        },

        parentPost: {
          include: {
            user: { select: { displayName: true, username: true, img: true } },
            _count: { select: { likes: true, rePosts: true, comments: true } },
            likes: { where: { userId: userId }, select: { id: true } },
            rePosts: { where: { userId: userId }, select: { id: true } },
            saves: { where: { userId: userId }, select: { id: true } },
            media: {
              select: {
                id: true,
                width: true,
                height: true,
                url: true,
                public_id: true,
                type: true,
                userId: true,
                postId: true,
              },
            },
          },
        }, // pobierz referencję do kolejnego parentPost
      }, // jak wcześniej
    })
  }

  return parentPosts
}

export async function getRootPostWithDistance(
  post: PostWithDetails,
  userId: string
): Promise<{ post: PostWithDetails | null; distance: number }> {
  let currentPost = post
  let distance = 0

  while (currentPost.parentPostId) {
    const parent = await prisma.post.findUnique({
      where: { id: currentPost.parentPostId },
      include: {
        user: { select: { displayName: true, username: true, img: true } },
        _count: { select: { likes: true, rePosts: true, comments: true } },
        likes: { where: { userId: userId }, select: { id: true } },
        rePosts: { where: { userId: userId }, select: { id: true } },
        saves: { where: { userId: userId }, select: { id: true } },
        media: {
          select: {
            id: true,
            width: true,
            height: true,
            url: true,
            public_id: true,
            type: true,
            userId: true,
            postId: true,
          },
        },
        parentPost: false,
      },
    })
    if (!parent) break
    currentPost = parent as PostWithDetails
    distance += 1
  }

  return { post: currentPost, distance }
}
