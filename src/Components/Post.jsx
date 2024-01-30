import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Firebase/firebase'

import profileImageLoading from "../Images/loadingProfile.jpg"

export default function Post(props) {
  const [creatorDetails, setCreatorDetails] = useState(null)
  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()}`
  }
  useEffect(() => {
    async function fetchUserDataById() {
      const userSnap = await getDoc(doc(db, "users", props.creator))
      if (userSnap.exists()) {
        setCreatorDetails(userSnap.data())
      }else {
        setCreatorDetails({username : "Content Deleted"})
      }
    }
    fetchUserDataById()
  }, [])
  return (
    <article className="post">
      <div className="post--details">
        <Link to={`/profile/${props.creator}`}>
          <div className="user--details">
            <img className="profile--img" src={creatorDetails?.pfp || profileImageLoading} height="40" width="40"></img>
            <h3>{creatorDetails?.username}</h3>
          </div>
        </Link>
        <small className="understated">
          {convertDate(props.created)}
        </small>
      </div>
      <section className="post-content">
      <small>{props.content}</small>
      </section>
    </article>
  )
}
