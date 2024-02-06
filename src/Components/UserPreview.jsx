import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import profileLoadingImage from "../Images/loadingProfile.jpg"
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import { useSelector } from 'react-redux'

export default function UserPreview(props) {
  const [userDetails, setUserDetails] = useState(null)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const follow = async () => {
    await updateDoc(doc(db, "users", loggedInUser.userId), {
      following : arrayUnion(userDetails.userId)
    })
    await updateDoc(doc(db, "users", userDetails.userId), {
      followers : arrayUnion(loggedInUser.userId)
    })
    window.location.reload()
  }
  const unfollow = async () => {
    await updateDoc(doc(db, "users", loggedInUser.userId), {
      following : arrayRemove(userDetails.userId)
    })
    await updateDoc(doc(db, "users", userDetails.userId), {
      followers : arrayRemove(loggedInUser.userId)
    })
    window.location.reload()
  }

  useEffect(() => {
    async function fetchUserDataById() {
      const userSnap = await getDoc(doc(db, "users", props.id))
      if (userSnap.exists()) {
        setUserDetails(userSnap.data())
      }else {
        setUserDetails({username : "Content Deleted"})
      }
    }
    fetchUserDataById()
    // eslint-disable-next-line
  }, [])
  return (
    userDetails && loggedInUser && 
      (
        <section id='user--preview'>
          <article>
            <Link to={`/user/${props.id}`}>
              <img className="profile--img" src={userDetails?.pfp || profileLoadingImage} height="40" width="40" alt={userDetails?.username}></img>
              <p className="username">@{userDetails?.username}</p>
            </Link>
            {/* checks for following status and also if potentially you are that user your viewing */}
            {userDetails?.followers.includes(loggedInUser?.userId) ? <button className='danger--btn' onClick={unfollow}>Unfollow</button> : userDetails?.userId !== loggedInUser?.userId && <button className='cta' onClick={follow}>YFollow</button>}
          </article>
          <small className='understated'>{userDetails?.description?.substring(0, 50) || "No description found..."}</small>
        </section>
      )
  )
}
