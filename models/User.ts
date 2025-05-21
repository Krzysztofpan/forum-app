import { hashPassword } from '@/lib/utils/bcryptUtils'

import mongoose from 'mongoose'
import Post from './Post'
export type userType = {
  _id: mongoose.Types.ObjectId | string
  username: string
  userAt: string
  email: string
  followers: mongoose.Types.ObjectId[] | string[]
  following: mongoose.Types.ObjectId[] | string[]
  createdAt: Date
  posts: mongoose.Types.ObjectId[] | string[]
  banner?: string
  avatar?: string
  bio?: string
  website?: string
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, 'name is required'],
  },
  userAt: {
    type: String,
    require: [true, 'userAt is required'],
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'email is required'],
  },
  password: {
    type: String,
    require: [true, 'password is required'],
  },
  avatar: {
    type: String,
  },
  banner: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  posts: {
    type: [mongoose.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  following: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await hashPassword(this.password as string)
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
