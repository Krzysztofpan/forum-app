'use client'

import UserProfileInput from './UserProfileInput'
import { Button } from '../ui/button'
import Image from 'next/image'
import { DialogClose, DialogContent, DialogTitle } from '../ui/dialog'
import { ArrowLeft, X } from 'lucide-react'
import { userType } from '@/models/User'
import { Dispatch, SetStateAction, useState } from 'react'

import { getCroppedImg } from '@/lib/utils/utlisFncs'
import Comp from '../comp'
import CropperImg from '../Cropper'
import { blobToDataURL } from '@/lib/blobToUrl'

import { updateUserInfo, uploadUserImage } from '@/lib/actions/user.action'
import { useRouter } from 'next/navigation'
import { useIsMobile } from '@/hooks/use-mobile'

const UserEditProfile = ({ user }: { user: Omit<userType, 'createdAt'> }) => {
  const router = useRouter()

  const [edit, setEdit] = useState<'avatar' | 'banner'>('avatar')
  const [avatar, setAvatar] = useState<{
    url: string
    type: string
    dataURL: string
    width: number
    height: number
  }>({ url: '', type: '', dataURL: '', width: 0, height: 0 })
  const [banner, setBanner] = useState<{
    url: string
    type: string
    dataURL: string
    width: number
    height: number
  }>({ url: '', type: '', dataURL: '', width: 0, height: 0 })
  const [aspect, setAspect] = useState<number>(0)
  /* const [avatar, setAvatar] = useState<{
    url: string
    type: string
    dataURL: string
  }>() */
  const isMobile = useIsMobile()
  const [isCrop, setIsCrop] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number
    height: number
    x: number
    y: number
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const [croppedBannerUrl, setCroppedBannerUrl] = useState<string | null>(
    user.banner || ''
  )
  const [croppedAvatarUrl, setCroppedAvatarUrl] = useState<string | null>(null)
  const [croppedBannerDataURL, setCroppedBannerDataURL] = useState<
    string | null
  >(null)
  const [croppedAvatarDataURL, setCroppedAvatarDataURL] = useState<
    string | null
  >(null)
  const saveCroppedImage = async (
    croppedAreaPixels: {
      height: number
      width: number
      x: number
      y: number
    },
    media: {
      url: string
      type: string
      dataURL: string
      width: number
      height: number
    },
    setCroppedImageUrl: Dispatch<SetStateAction<string | null>>,
    setCroppedImageDataURL: Dispatch<SetStateAction<string | null>>
  ) => {
    try {
      const croppedBlob = (await getCroppedImg(
        media?.url as string,
        croppedAreaPixels
      )) as Blob
      // Możesz teraz zapisać plik, np. utworzyć URL do podglądu:
      const dataURL = (await blobToDataURL(croppedBlob)) as string

      const croppedUrl = URL.createObjectURL(croppedBlob)
      setCroppedImageDataURL(dataURL)
      setCroppedImageUrl(croppedUrl)

      // Jeśli chcesz zapisać plik lokalnie:

      // Lub przesłać croppedBlob do backendu jako plik
      setIsCrop(false)
    } catch (e) {
      /*  console.error(e) */
    }
  }
  const handleCropComplete = (croppedAreaPixels: {
    width: number
    height: number
    x: number
    y: number
  }) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onSave = async (formData: FormData) => {
    if (croppedAvatarDataURL) {
      await uploadUserImage(croppedAvatarDataURL, 'avatar')
    }
    if (croppedBannerDataURL) {
      await uploadUserImage(croppedBannerDataURL, 'banner')
    }
    if (
      formData.get('name') ||
      formData.get('Bio') ||
      formData.get('Website')
    ) {
      const name = (formData.get('name') as string) || undefined
      const bio = (formData.get('Bio') as string) || undefined
      const website = (formData.get('Website') as string) || undefined
      await updateUserInfo(name, bio, website)
    }

    return router.replace(`/${user.userAt}`)
  }

  return (
    <DialogContent
      className={`${
        !isCrop
          ? 'max-w-[690px]! md:max-w-[600px]! w-full h-full p-0 m-0 '
          : `px-0 rounded-sm max-w-[600px]  md:min-w-[600px] w-[90vw] ${
              isMobile ? 'h-screen' : ''
            }`
      } rounded-none border-none md:rounded-sm    md:px-0  md:h-auto`}
    >
      <div
        className={`${
          isCrop ? 'm-4 w-[90vw]' : 'w-full'
        } max-w-[600px] mx-auto`}
      >
        {!isCrop ? (
          <form action={onSave}>
            <DialogTitle
              className="grid grid-cols-[50px_1fr] py-1 px-3
         items-center"
            >
              <DialogClose>
                <X size={20} />
              </DialogClose>
              <div className="flex justify-between items-center py-1">
                <span className="font-bold text-xl">Edit profile</span>
                <DialogClose asChild>
                  <Button className="rounded-full text-base" type="submit">
                    Save
                  </Button>
                </DialogClose>
              </div>
            </DialogTitle>
            <div className="aspect-[3/1] w-full h-auto  m-0 relative">
              {croppedBannerUrl && (
                <Image
                  src={croppedBannerUrl}
                  alt="banner"
                  className="opacity-80 px-[1px]"
                  fill
                />
              )}

              <Comp
                id="banner-upload"
                setAspect={setAspect}
                setIsCrop={setIsCrop}
                setMedia={setBanner}
                aspect={3 / 1}
                setEdit={setEdit}
                edit="banner"
                croppedImageUrl={croppedBannerUrl}
                setCroppedImageUrl={setCroppedBannerUrl}
                setCroppedImageDataURL={setCroppedBannerDataURL}
              />
            </div>
            <div>
              <div className="translate-y-[-50%] mx-4 ">
                <div className="relative w-fit border-[4px] rounded-full border-black">
                  <Image
                    src={croppedAvatarUrl || user.avatar || '/logo-sm.png'}
                    alt="avatar"
                    width={112}
                    height={112}
                    className="rounded-full  bg-background aspect-square "
                  />
                  <Comp
                    id="avatar-upload"
                    setAspect={setAspect}
                    setIsCrop={setIsCrop}
                    setMedia={setAvatar}
                    aspect={1 / 1}
                    setEdit={setEdit}
                    edit="avatar"
                  />
                </div>
              </div>
              <div className="mx-4 space-y-8 translate-y-[-15%]">
                <UserProfileInput
                  placeholder="Name"
                  defaultValue={user.username}
                />
                <UserProfileInput
                  textarea
                  placeholder="Bio"
                  defaultValue={user.bio || ''}
                />
                <UserProfileInput placeholder="Website" defaultValue="" />
              </div>
            </div>
          </form>
        ) : (
          <>
            <DialogTitle
              className="grid grid-cols-[50px_1fr] py-2 px-3
         items-center"
            >
              <ArrowLeft
                size={20}
                onClick={() =>
                  saveCroppedImage(
                    croppedAreaPixels,
                    edit === 'avatar' ? avatar : banner,
                    edit === 'avatar'
                      ? setCroppedAvatarUrl
                      : setCroppedBannerUrl,
                    edit === 'avatar'
                      ? setCroppedAvatarDataURL
                      : setCroppedBannerDataURL
                  )
                }
              />

              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">Edit media</span>
                <Button
                  className="rounded-full text-base"
                  onClick={() =>
                    saveCroppedImage(
                      croppedAreaPixels,
                      edit === 'avatar' ? avatar : banner,
                      edit === 'avatar'
                        ? setCroppedAvatarUrl
                        : setCroppedBannerUrl,
                      edit === 'avatar'
                        ? setCroppedAvatarDataURL
                        : setCroppedBannerDataURL
                    )
                  }
                >
                  Apply
                </Button>
              </div>
            </DialogTitle>
            <CropperImg
              imageSrc={edit === 'avatar' ? avatar.url : banner.url}
              onCropComplete={handleCropComplete}
              media={edit === 'avatar' ? avatar : banner}
              aspect={aspect}
            />
          </>
        )}
      </div>
    </DialogContent>
  )
}

export default UserEditProfile
