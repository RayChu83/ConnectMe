import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import profileLoadingImage from "../Images/loadingProfile.jpg"
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
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
  }
  const unfollow = async () => {
    await updateDoc(doc(db, "users", loggedInUser.userId), {
      following : arrayRemove(userDetails.userId)
    })
    await updateDoc(doc(db, "users", userDetails.userId), {
      followers : arrayRemove(loggedInUser.userId)
    })
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "users", props.id), (doc) => {
      if (doc.exists()) {
        setUserDetails(doc.data())
      }else {
        setUserDetails({username : "Content Deleted"})
      }
    })
    return unsubscribe
    // eslint-disable-next-line
  }, [props.id])
  return (
    userDetails && loggedInUser && 
      (
        <section id='user--preview'>
          <article>
            <Link to={`/user/${props.id}`}>
              <img className="profile--img" src={userDetails?.pfp || profileLoadingImage} height="40" width="40" alt={userDetails?.username}></img>
              <h3 className="username">{userDetails?.username}</h3>
            </Link>
            {/* checks for following status and also if potentially you are that user your viewing */}
            {userDetails?.followers.includes(loggedInUser?.userId) ? <button className='danger--btn' onClick={unfollow}>Unfollow</button> : userDetails?.userId !== loggedInUser?.userId && <button className='cta' onClick={follow}>Follow</button>}
          </article>
          <small className='understated'>{userDetails?.description?.substring(0, 50) || "No description found"}{userDetails?.description.length > 50 && "..."}</small>
        </section>
      )
  )
}
