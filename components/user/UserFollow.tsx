'use client'

import { followUser } from '@/lib/actions/user.action'
import { Button } from '../ui/button'
import { useState } from 'react'

const UserFollow = ({
  isFollowed,
  userId,
  username,
}: {
  isFollowed: boolean
  userId: string
  username: string
}) => {
  const [isFollowedState, setIsFollowedState] = useState(isFollowed)

  const [unfollowTransitionButton, setUnfollowTransitionButton] =
    useState(false)

  const handleFollow = async () => {
    setIsFollowedState((prev) => !prev)
    await followUser(userId, username)
  }

  return (
    <>
      {isFollowedState ? (
        <Button
          variant="outline"
          className=" rounded-full hover:cursor-pointer w-24  hover:text-red-700 hover:font-bold hover:bg-red-300/10! hover:border-red-700!"
          onMouseEnter={() => setUnfollowTransitionButton(true)}
          onMouseOut={() => setUnfollowTransitionButton(false)}
          onClick={handleFollow}
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
