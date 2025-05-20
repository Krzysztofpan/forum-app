import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import Post from '@/models/Post'
import connectionToDatabase from '@/lib/mongoose'

// Obsługa metody GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await connectionToDatabase()
    const postId = (await params).postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { view: 1 } },
      { new: true }
    )
      .populate('creator')
      .populate({
        path: 'comments',
        populate: [{ path: 'creator' }, { path: 'comments' }],
      })
      .populate({
        path: 'quotePost',
        populate: {
          path: 'creator',
        },
      })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
