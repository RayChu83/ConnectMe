import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import { useSelector } from 'react-redux'

import profileImageLoading from "../Images/loadingProfile.jpg"
import "../styles/postDetailed.css"

export default function PostDetailed() {
  const postId = useParams().id
  const [post, setPost] = useState(null)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [creatorDetails, setCreatorDetails] = useState(null)
  const navigate = useNavigate()

  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()}`
  }
  const like = async () => {
    await updateDoc(doc(db, "posts", postId), {
      likes : arrayUnion(loggedInUser.userId)
    })
  }
  const unlike = async () => {
    await updateDoc(doc(db, "posts", postId), {
      likes : arrayRemove(loggedInUser.userId)
    })
  }
  const editPost = async () => {
    // additional check to make sure that the poster owns the actual post and confirms the action
    if (loggedInUser.userId === post.creator ) {
      const editedPost = window.prompt("Are you sure you would like to confirm these changes?", post.content)?.substring(0, 750)
      // make sure there actually were any changes
      if (editedPost && editedPost !== post.content) {
        await updateDoc(doc(db, "posts", postId), {
          content : editedPost
        })
      }
    }
  }
  const removePost = async () => {
    // additional check to make sure that the poster owns the actual post and confirms the action
    if (window.confirm("Are you sure you'd like to remove this post permanently?") && loggedInUser.userId === post.creator) {
      await deleteDoc(doc(db, "posts", postId));
      navigate(-1)
    }
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", postId), (doc) => {
      if (doc.exists()) {
        setPost(doc.data())
      }else {
        setPost(undefined)
      }
    })
    return unsubscribe
  }, [postId])

  useEffect(() => {
    async function fetchUserDataById() {
      const userSnap = await getDoc(doc(db, "users", post.creator))
      if (userSnap.exists()) {
        setCreatorDetails(userSnap.data())
      }else {
        setCreatorDetails({username : "Content Deleted"})
      }
    }
    if (post?.creator) {
        fetchUserDataById()
    }
    // eslint-disable-next-line
  }, [post?.creator])
  return (
    <main id='post--detail--container'>
        {post 
        ? 
          <>
            <article className="post" style={{maxHeight: "unset"}}>
              <div className="post--details" style={{flexDirection : "unset", alignItems : "center"}}>
                <Link to={`/user/${post.creator}`}>
                  <div className="user--details">
                  <img className="profile--img" src={creatorDetails?.pfp || profileImageLoading} alt={creatorDetails?.username}></img>
                  <h3>{creatorDetails?.username}</h3>
                  </div>
                </Link>
                {loggedInUser.userId === post.creator && 
                <article>
                  <button className='unstyled--btn pointer normal--fontsize' onClick={editPost}><i className="fa-solid fa-pen-to-square green--text"></i></button>
                  <button className='unstyled--btn pointer normal--fontsize' onClick={removePost}><i className="fa-solid fa-trash danger--text"></i></button>
                </article>}  
              </div>
              <small className="understated">
                {convertDate(post.created)}
              </small>
              <section className="post-content">
              <p>{post.content}</p>
              </section>
              <section className="post--interactions">
                {post.likes?.includes(loggedInUser?.userId) 
                ? 
                  <button className='unstyled--btn pointer liked normal--fontsize no-padding' onClick={unlike}><i class="fa-solid fa-thumbs-up liked"></i> {post.likes?.length || 0} Like{post.likes?.length !== 1 && "s"}</button> 
                : 
                  <button className='unstyled--btn pointer understated normal--fontsize no-padding' onClick={like}><i class="fa-solid fa-thumbs-up understated"></i> {post.likes?.length || 0} Like{post.likes?.length !== 1 && "s"}</button>
                }
              </section>
            </article>
          </> 
        : 
          post === null ? <p className='understated text--center top--padding'>Loading...</p> : <p className='understated text--center top--padding'>No post found, <Link className='text--cta'>return home</Link></p>
        }
    </main>
  )
}
