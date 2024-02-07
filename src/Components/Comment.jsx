import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import fetchUserById from '../fetchUserById'

export default function Comment(props) {
  const [comment, setComment] = useState(null)
  const [creatorDetails, setCreatorDetails] = useState(null)

  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()} • ${dateObject.getHours()} : ${dateObject.getMinutes() < 10 ? "0" + dateObject.getMinutes() : dateObject.getMinutes()} ${dateObject.getHours() < 12 ? "am" : "pm"} `
  }

  useEffect(() => {
    async function fetchComment() {
      const docSnap = await getDoc(doc(db, "comments", props.commentId))
      if (docSnap.exists()) {
        setComment(docSnap.data())
        const res = await fetchUserById(docSnap.data().userId)
        setCreatorDetails(res)
      }else {
        setComment({})
      }
    }
    fetchComment()
  }, [props.commentId])
  return (
    <>
      {comment && creatorDetails &&
        <article className='comment'>
          <div className="comment--details" style={{flexDirection : "unset", alignItems : "center"}}>
            <Link to={`/user/${creatorDetails.userId}`}>
              <div className="user--details">
                <img className="profile--img" src={creatorDetails.pfp || profileImageLoading} alt='Profile'></img>
                <h3>{creatorDetails.username}</h3>
              </div>
            </Link>
          </div>
        <small className='understated'>{convertDate(comment.created)}</small>
        <p>{comment.content}</p>
        </article>
      }
    </>
  )
}
