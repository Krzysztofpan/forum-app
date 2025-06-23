'use client'

import React from 'react'
import PostComponent from '../PostComponent'
import { Post, PostWithDetails } from '@/types'

interface PostScrollWrapperProps {
  comments: PostWithDetails[] // rodzice (drzewo komentarzy)
}

const PostScrollWrapper: React.FC<PostScrollWrapperProps> = ({ comments }) => {
  return (
    <div id="post-scroll-wrapper" className="max-w-[600px] w-full">
      {comments.map((post) => (
        <PostComponent key={post.id} post={post} withChildren withParent />
      ))}
    </div>
  )
}

export default PostScrollWrapper
