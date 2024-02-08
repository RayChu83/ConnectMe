import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import { arrayRemove, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import fetchUserById from '../fetchUserById'
import { useSelector } from 'react-redux'

export default function Comment(props) {
  const [comment, setComment] = useState(null)
  const [creatorDetails, setCreatorDetails] = useState(null)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()} • ${dateObject.getHours()} : ${dateObject.getMinutes() < 10 ? "0" + dateObject.getMinutes() : dateObject.getMinutes()} ${dateObject.getHours() < 12 ? "am" : "pm"} `
  }
  const editComment = async () => {
    // additional check to make sure that the poster owns the actual post and confirms the action
    if (loggedInUser.userId === comment.userId ) {
      const editedComment = window.prompt("Are you sure you would like to confirm these changes?", comment.content)?.substring(0, 250)
      // make sure there actually were any changes
      if (editedComment && editedComment !== comment.content) {
        await updateDoc(doc(db, "comments", comment.id), {
          content : editedComment
        })
      }
    }
  }
  const removeComment = async () => {
    if (window.confirm("Are you sure you'd like to remove this comment permanently?") && loggedInUser.userId === comment.userId ) {
      await updateDoc(doc(db, "posts", comment.linkedPost), {
        comments : arrayRemove(comment.id)
      })
      await deleteDoc(doc(db, "comments", comment.id))
    }
  }

  useEffect(() => {
      const unsubscribe = onSnapshot(doc(db, "comments", props.commentId), (doc) => {
      if (doc.exists()) {
        setComment(doc.data())
        async function fetchUserData() {
          const res = await fetchUserById(doc.data().userId)
          setCreatorDetails(res)
        }
        fetchUserData()
      }else {
        setComment({})
      }
    })
    return unsubscribe
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
            {loggedInUser.userId === comment.userId && 
            <article>
              <button className='unstyled--btn pointer smaller--fontsize' onClick={editComment}><i className="fa-solid fa-pen-to-square green--text"></i></button>
              <button className='unstyled--btn pointer smaller--fontsize' onClick={removeComment}><i className="fa-solid fa-trash danger--text"></i></button>
            </article>
            }
          </div>
        <small className='understated'>{convertDate(comment.created)}</small>
        <p>{comment.content}</p>
        </article>
      }
    </>
  )
}
