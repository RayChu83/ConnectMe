import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserPreview from './UserPreview'
import fetchUserById from '../fetchUserById'

export default function ProfileFollowing() {
  const userId = useParams().id
  const [isShowingAll, setIsShowingAll] = useState(false)
  const [usersFollowing, setUsersFollowing] = useState([])
  const [usersTotalFollowing, setUsersTotalFollowing] = useState([])
  
  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  useEffect(() => {
    async function fetchUsersFollowing() {
      const res = await fetchUserById(userId)
      // Ensures that even if possibly a user is following a person twice, it will not be shown
      setUsersFollowing([...new Set(isShowingAll ? res.following : res.following?.slice(0, 3))])
      setUsersTotalFollowing([...new Set(res.following)].length)
    }
    fetchUsersFollowing()
  }, [userId])
  return (
    <>
      {usersFollowing && usersFollowing.map((user, index) => <UserPreview id={user} key={index}/>)}
      {usersTotalFollowing > 3 ? <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> : usersTotalFollowing === 0 && <p className='understated text--center'>You are not following anyone yet, <Link to="/" className='text--cta'>Discover people</Link></p>}
    </>
  )
}
