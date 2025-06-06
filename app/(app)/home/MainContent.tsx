import Post from '@/models/Post'

import PostComponent from '@/components/PostComponent'

const MainContent = async () => {
  const posts = await Post.find({ type: { $in: ['post', 'quote'] } })
    .populate({
      path: 'comments',
      populate: {
        path: 'comments',
      },
    })
    .sort({ createdAt: -1 })
    .populate('creator')
    .populate({
      path: 'quotePost',
      populate: ['creator', 'comments'],
    })
    .limit(10)

  return (
    <div>
      {posts.map((post) => (
        <PostComponent key={post._id} post={post} user={post.creator} />
      ))}
    </div>
  )
}

export default MainContent
