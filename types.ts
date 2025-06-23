import { Post as PostType } from '@prisma/client'

type UserSummary = {
  displayName: string | null
  username: string
  img: string | null
}

export type MediaType = {
  id: number
  userId: string
  postId: number
  url: string
  type: string | null
  width: number
  height: number
  public_id: string | null
}

type Engagement = {
  _count: { likes: number; rePosts: number; comments: number }
  likes: { id: number }[]
  rePosts: { id: number }[]
  saves: { id: number }[]
  comments?: {
    user: UserSummary
    media: MediaType[]
    _count: { likes: number; rePosts: number; comments: number }
    likes: { id: number }[]
    rePosts: { id: number }[]
    saves: { id: number }[]
    id: number
    createdAt: Date
    updatedAt: Date
    desc: string | null
    userId: string
    view: number
    rePostId: number | null
    parentPostId: number | null
  }[]
}

export type PostWithDetails = PostType &
  Engagement & {
    id: number
    user: UserSummary
    rePost?:
      | (PostType &
          Engagement & { user: UserSummary } & {
            media: MediaType[]
          })
      | null

    parentPost?:
      | (PostType &
          Engagement & { user: UserSummary } & {
            media: MediaType[]
            parentPost?:
              | (PostType &
                  Engagement & { user: UserSummary } & {
                    media: MediaType[]
                  })
              | null
          })
      | null

    media: MediaType[]
  }

export type Post = PostType & {
  id: number
  user: UserSummary
  rePost: {
    id: number
    user: UserSummary
    _count: { likes: number; rePosts: number; comments: number }
    likes: { id: number }[]
    rePosts: { id: number }[]
    saves: { id: number }[]
    media: MediaType[]
  } | null
  parentPost: {
    id: number
    user: UserSummary
    _count: { likes: number; rePosts: number; comments: number }
    likes: { id: number }[]
    rePosts: { id: number }[]
    saves: { id: number }[]
    media: MediaType[]
    parentPostId: number
  } | null
  media: MediaType[]
  _count: { likes: number; rePosts: number; comments: number }
  likes: { id: number }[]
  rePosts: { id: number }[]
  saves: { id: number }[]
  view: number
  comments: PostWithDetails[]
  parentPostId: number
}
