import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import UserPreview from './UserPreview'
import fetchUserById from '../fetchUserById'
import { useSelector } from 'react-redux'

export default function ProfileFollowing() {
  const userId = useParams().id
  const loggedInUser = useSelector(state => state.loggedInUser)
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
      setUsersFollowing([...new Set(res.following)])
      setUsersTotalFollowing([...new Set(res.following)].length)
    }
    fetchUsersFollowing()
  }, [userId])
  return (
    <>
      {usersFollowing && usersFollowing.slice(!isShowingAll ? 0 : undefined, isShowingAll ? undefined : 5)
                                        .map((user, index) => <UserPreview id={user} key={index}/>)}
      {usersTotalFollowing > 5 
        ? 
          <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> 
        : 
          usersTotalFollowing === 0 && <p className='understated text--center'>{userId === loggedInUser.userId ? (<>You are not following anyone yet, <Link to="/" className='text--cta'>Discover people</Link></>) : "This user is currently not following anyone"}</p>
      }
    </>
  )
}