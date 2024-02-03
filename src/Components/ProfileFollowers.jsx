import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserPreview from './UserPreview'
import { useParams } from 'react-router-dom'
import fetchUserById from '../fetchUserById'

export default function ProfileFollowers() {
  const userId = useParams().id
  const [isShowingAll, setIsShowingAll] = useState(false)
  // Ensures that even if possibly a user is following a person twice, it will not be shown
  const [usersFollowers, setUsersFollowers] = useState([])
  // useSelector(state => [...new Set(isShowingAll ? state.loggedInUser.followers : state.loggedInUser.followers?.slice(0, 3))])
  const [usersTotalFollowers, setUsersTotalFollowers] = useState([])
  // useSelector(state => [...new Set(state.loggedInUser.followers)].length)

  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  useEffect(() => {
    async function fetchUsersFollowers() {
      const res = await fetchUserById(userId)
      setUsersFollowers([...new Set(isShowingAll ? res.followers : res.followers?.slice(0, 3))])
      setUsersTotalFollowers([...new Set(res.followers)].length)
    }
    fetchUsersFollowers()
  }, [userId])
  return (
    <>
      {usersFollowers && usersFollowers.map((user, index) => <UserPreview id={user} key={index}/>)}
      {usersTotalFollowers > 3 ? <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> : usersTotalFollowers === 0 && <p className='understated text--center'>You have no followers yet.</p>}
    </>
  )
}
