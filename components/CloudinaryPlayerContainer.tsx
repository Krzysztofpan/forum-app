'use client'
import { CldVideoPlayer } from 'next-cloudinary'
// this component is for using CldVideoPlayer because it require use client directive
const CloudinaryPlayerContainer = ({ url }: { url: string }) => {
  return <CldVideoPlayer src={url} className="aspect-square object-cover" />
}

export default CloudinaryPlayerContainer
