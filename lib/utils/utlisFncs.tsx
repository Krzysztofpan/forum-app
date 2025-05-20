import { PostType } from '@/models/Post'
import { userType } from '@/models/User'

export function serializePost(post: PostType) {
  return {
    ...post,
    _id: post._id.toString(),

    comments: post.comments.map((id) => id.toString()),
    hearts: post.hearts.map((id) => id.toString()),
    reposts: post.reposts.map((id) => id.toString()),

    view: post.view,
  }
}

export function serializeUser(user: userType) {
  return {
    _id: user._id.toString(),
    username: user.username,
    userAt: user.userAt,
    email: user.email,
    followers: user.followers.map((follower) => follower.toString()),
    following: user.following.map((follow) => follow.toString()),

    posts: user.posts.map((post) => post.toString()),
    avatar: user.avatar,
    banner: user.banner,
    bio: user.bio,
  }
}

const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // ważne przy CORS
    image.src = url
  })

// funkcja do wycięcia obrazu na podstawie współrzędnych cropa
export async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number }
) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // ustaw rozmiar canvas na rozmiar wycinka
  canvas.width = crop.width
  canvas.height = crop.height

  // rysuj wycięty fragment na canvas
  ctx!.drawImage(
    image as CanvasImageSource,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  )

  // zwróć blob obrazu (można też użyć canvas.toDataURL)
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, 'image/jpeg')
  })
}
