import { auth } from '@/auth'
import AddPostComponent from '@/components/home/AddPostComponent'
import PostView from '@/components/post/PostView'
import UserView from '@/components/user/UserView'
import { AddPostContextProvider } from '@/context/AddPostContext'
import { prisma } from '@/prisma'

import { redirect } from 'next/navigation'

import PhotoView from './PhotoView'

const PhotoPage = async ({
  params,
}: {
  params: Promise<{ userId: string; postId: string }>
}) => {
  const { userId: userIdParam, postId } = await params

  const session = await auth()

  if (!session || !session.user) return

  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: session.user.id }, select: { id: true } },
    rePosts: { where: { userId: session.user.id }, select: { id: true } },
    saves: { where: { userId: session.user.id }, select: { id: true } },
    media: {
      where: {
        type: {
          in: ['image', 'gif'],
        },
      },
    },
  }
  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      rePost: {
        include: {
          ...postIncludeQuery,
          comments: {},
        },
      },
      parentPost: {
        include: {
          ...postIncludeQuery,
          comments: {
            include: {
              ...postIncludeQuery,
            },
          },
        },
      },
      ...postIncludeQuery,
      comments: { include: { ...postIncludeQuery } },
    },
  })

  if (!post || !post.media) return redirect(`/${userIdParam}/status/${postId}`)

  return (
    <AddPostContextProvider>
      <PhotoView
        post={post}
        media={post.media}
        postMediaCount={post.media.length}
      >
        <PostView post={post} withoutMedia />
      </PhotoView>
    </AddPostContextProvider>
  )
}

export default PhotoPage
