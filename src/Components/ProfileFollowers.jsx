import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import UserPreview from './UserPreview'

export default function ProfileFollowers() {
  const [isShowingAll, setIsShowingAll] = useState(false)
  // Ensures that even if possibly a user is following a person twice, it will not be shown
  const loggedInUsersFollowers = useSelector(state => [...new Set(isShowingAll ? state.loggedInUser.followers : state.loggedInUser.followers?.slice(0, 3))])
  const totalFollowers = useSelector(state => [...new Set(state.loggedInUser.followers)].length)

  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  return (
    <>
      {loggedInUsersFollowers &&loggedInUsersFollowers.map((user, index) => <UserPreview id={user} key={index}/>)}
      {/*  */}
      {totalFollowers > 3 ? <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> : totalFollowers === 0 && <p className='understated text--center'>You have no followers yet.</p>}
    </>
  )
}
