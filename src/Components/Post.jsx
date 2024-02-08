import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../Firebase/firebase'

import profileImageLoading from "../Images/loadingProfile.jpg"
import { useSelector } from 'react-redux'

export default function Post(props) {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [creatorDetails, setCreatorDetails] = useState(null)
  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()}`
  }
  const like = async () => {
    await updateDoc(doc(db, "posts", props.postId), {
      likes : arrayUnion(loggedInUser.userId)
    })
  }
  const unlike = async () => {
    await updateDoc(doc(db, "posts", props.postId), {
      likes : arrayRemove(loggedInUser.userId)
    })
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
    // eslint-disable-next-line
  }, [props.creator])
  return (
    <>
      <article className="post" onDoubleClick={like}>
        <div className="post--details">
          <Link to={`/user/${props.creator}`}>
            <div className="user--details">
              <img className="profile--img" src={creatorDetails?.pfp || profileImageLoading} alt={creatorDetails?.username}></img>
              <h3>{creatorDetails?.username}</h3>
            </div>
          </Link>
          <small className="understated">
            {convertDate(props.created)}
          </small>
        </div>
        <section className="post-content">
          <small className='bottom--margin--zero'>{props.content}</small>
        </section>
          <section className="post--interactions">
            <aside>
              {props.likes?.includes(loggedInUser?.userId) 
                ? 
                  <button className='unstyled--btn pointer liked smaller--fontsize no-padding' onClick={unlike}><i className="fa-solid fa-thumbs-up liked"></i> {props.likes?.length || 0} Like{props.likes?.length !== 1 && "s"}</button> 
                : 
                  <button className='unstyled--btn pointer understated smaller--fontsize no-padding' onClick={like}><i className="fa-solid fa-thumbs-up understated"></i> {props.likes?.length || 0} Like{props.likes?.length !== 1 && "s"}</button>
              }
              <Link to={`/post/${props.postId}`}><button className='unstyled--btn pointer understated smaller--fontsize no-padding'><i className="fa-solid fa-comment understated"></i> {props.comments.length}</button></Link>
            </aside>
            <Link to={`/post/${props.postId}`}><small className='understated pointer smaller--fontsize'>See Details</small></Link>
          </section>
      </article>
    </>
  )
}
