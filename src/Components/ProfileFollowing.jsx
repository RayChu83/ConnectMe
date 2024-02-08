import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import UserPreview from './UserPreview'
import { useSelector } from 'react-redux'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/firebase'

export default function ProfileFollowing() {
  const userId = useParams().id
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isShowingAll, setIsShowingAll] = useState(false)
  const [usersFollowing, setUsersFollowing] = useState([])
  
  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
      if (doc.exists()) {
        setUsersFollowing([...new Set(doc.data().following)])
      }
    })
    return unsubscribe
  }, [userId])
  return (
    <>
      {usersFollowing && usersFollowing.slice(!isShowingAll ? 0 : undefined, isShowingAll ? undefined : 5)
                                        .map((user, index) => <UserPreview id={user} key={index}/>)}
      {usersFollowing.length > 5 
        ? 
          <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> 
        : 
          usersFollowing.length === 0 && <p className='understated text--center'>{userId === loggedInUser.userId ? (<>You are not following anyone yet, <Link to="/" className='text--cta'>Discover people!</Link></>) : "This user is currently not following anyone"}</p>
      }
    </>
  )
}