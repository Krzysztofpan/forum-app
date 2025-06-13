import { Post as PostType } from '@prisma/client'

type UserSummary = {
  displayName: string | null
  username: string
  img: string | null
}

type Engagement = {
  _count: { likes: number; rePosts: number; comments: number }
  likes: { id: number }[]
  rePosts: { id: number }[]
  saves: { id: number }[]
}

export type PostWithDetails = PostType & {
  id: number
  user: UserSummary
  rePost?:
    | (PostType &
        Engagement & { user: UserSummary } & {
          media: {
            id: number
            userId: string
            postId: number
            url: string
            type: string | null
            width: number
            height: number
            public_id: string | null
          }[]
        })
    | null

  media: {
    id: number
    userId: string
    postId: number
    url: string
    type: string | null
    width: number
    height: number
    public_id: string | null
  }[]
  _count: { likes: number; rePosts: number; comments: number }
  likes: { id: number }[]
  rePosts: { id: number }[]
  saves: { id: number }[]
  view: number
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
    media: {
      id: number
      width: number
      height: number
      url: string
      public_id: string | null
      type: string | null
      userId: string
      postId: number
    }[]
  } | null
  media: {
    id: number
    userId: string
    postId: number
    url: string
    type: string | null
    width: number
    height: number
    public_id: string | null
  }[]
  _count: { likes: number; rePosts: number; comments: number }
  likes: { id: number }[]
  rePosts: { id: number }[]
  saves: { id: number }[]
  view: number
  comments: PostWithDetails[]
}
