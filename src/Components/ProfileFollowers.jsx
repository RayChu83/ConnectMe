import React, { useEffect, useState } from 'react'
import UserPreview from './UserPreview'
import { useParams, Link } from 'react-router-dom'
import fetchUserById from '../fetchUserById'
import { useSelector } from 'react-redux'

export default function ProfileFollowers() {
  const userId = useParams().id
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isShowingAll, setIsShowingAll] = useState(false)
  // Ensures that even if possibly a user is following a person twice, it will not be shown
  const [usersFollowers, setUsersFollowers] = useState([])

  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  useEffect(() => {
    async function fetchUsersFollowers() {
      const res = await fetchUserById(userId)
      setUsersFollowers([...new Set(res.followers)])
    }
    fetchUsersFollowers()
  }, [userId])
  return (
    <>
      {usersFollowers && usersFollowers.slice(!isShowingAll ? 0 : undefined, isShowingAll ? undefined : 5)
                                        .map((user, index) => <UserPreview id={user} key={index}/>)}
      {usersFollowers.length > 5 
        ? 
          <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p> 
        :
        usersFollowers.length === 0 && <p className='understated text--center'>{userId === loggedInUser.userId ? <>No followers yet? Begin by <Link to="/" className='text--cta'>Creating Posts!</Link> </> : "This user currently has no followers yet."}</p>
      }
    </>
  )
}
