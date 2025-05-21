import { NextResponse } from 'next/server'

import connectionToDatabase from '@/lib/mongoose'
import User from '@/models/User'
import Post, { PostSchema } from '@/models/Post'
import mongoose from 'mongoose'
// Obsługa metody GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectionToDatabase()
    const userId = (await params).userId
    //const Post = mongoose.model('Post', PostSchema)
    const user = await User.findOne({ userAt: userId })
      .populate({
        path: 'posts',
        populate: {
          path: 'creator',
        },
      })
      .populate('followers')
      .populate('following')

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.log(error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
