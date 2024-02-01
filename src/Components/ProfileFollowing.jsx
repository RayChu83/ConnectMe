import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserPreview from './UserPreview'

export default function ProfileFollowing() {
  const [isShowingAll, setIsShowingAll] = useState(false)
  // Ensures that even if possibly a user is following a person twice, it will not be shown
  const loggedInUsersFollowing = useSelector(state => [...new Set(isShowingAll ? state.loggedInUser.following : state.loggedInUser.following?.slice(0, 3))])
  const totalFollowing = useSelector(state => [...new Set(state.loggedInUser.following)].length)

  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  return (
    <>
      {loggedInUsersFollowing && loggedInUsersFollowing.map((user, index) => <UserPreview id={user} key={index}/>)}
      {totalFollowing > 3 ? <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> : totalFollowing === 0 && <p className='understated text--center'>You are not following anyone yet, <Link to="/" className='text--cta'>Discover people</Link></p>}
    </>
  )
}
