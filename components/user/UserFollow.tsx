'use client'

import { Button } from '../ui/button'
import { useOptimistic, useState, useTransition } from 'react'
import { follow, unfollow } from '@/lib/actions/user.action'

const UserFollow = ({
  isFollowed,
  userId,
}: {
  isFollowed: boolean
  userId: string
}) => {
  const [isFollowedState, setIsFollowedState] = useState(isFollowed)

  const [unfollowTransitionButton, setUnfollowTransitionButton] =
    useState(false)

  const handleFollow = async () => {
    setIsFollowedState((prev) => !prev)
    await follow(userId)
  }

  const handleUnfollow = async () => {
    setIsFollowedState((prev) => !prev)
    await unfollow(userId)
  }

  return (
    <>
      {isFollowedState ? (
        <Button
          variant="outline"
          className=" rounded-full hover:cursor-pointer w-24  hover:text-red-700 hover:font-bold hover:bg-red-300/10! hover:border-red-700!"
          onMouseEnter={() => setUnfollowTransitionButton(true)}
          onMouseOut={() => setUnfollowTransitionButton(false)}
          onClick={handleUnfollow}
        >
          {unfollowTransitionButton ? 'Unfollow' : 'Following'}
        </Button>
      ) : (
        <Button
          className="rounded-full font-bold text-base cursor-pointer"
          onClick={handleFollow}
        >
          Follow
        </Button>
      )}
    </>
  )
}

export default UserFollow
