import mongoose from 'mongoose'

export type PostType = {
  _id: mongoose.Types.ObjectId | string
  type: string
  content: string
  media: {
    url: string
    width: number
    height: number
    public_id: string
  }[]
  poll: []
  creator: {
    _id: string | mongoose.Types.ObjectId
    username: string
    userAt: string
    email: string
    followers: mongoose.Types.ObjectId[]
    following: mongoose.Types.ObjectId[]
    createdAt: Date
    posts: mongoose.Types.ObjectId[]
    avatar: string
    banner: string
  }
  quotePost: PostType
  comments: PostType[]
  hearts: mongoose.Types.ObjectId[]
  view: number
  reposts: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

export const PostSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'Post',
    },
    content: {
      type: String,
    },
    media: {
      type: [],
    },
    poll: {
      type: [],
    },

    creator: {
      type: mongoose.Types.ObjectId,

      require: [true, 'creator is required'],
      ref: 'User',
    },
    quotePost: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'Post',
    },
    hearts: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'User',
    },
    view: {
      type: Number,
      default: 0,
    },
    reposts: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: 'Post',
    },
  },
  { timestamps: true }
)

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

export default Post
