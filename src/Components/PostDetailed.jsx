import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import { useSelector } from 'react-redux'

import profileImageLoading from "../Images/loadingProfile.jpg"
import "../styles/postDetailed.css"
import Comment from './Comment'
import UserDetails from './UserDetails'
import { v4 } from 'uuid'

export default function PostDetailed() {
  const postId = useParams().id
  const [post, setPost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState([])
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [creatorDetails, setCreatorDetails] = useState(null)
  const navigate = useNavigate()

  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()} • ${dateObject.getHours()} : ${dateObject.getMinutes() < 10 ? "0" + dateObject.getMinutes() : dateObject.getMinutes()} ${dateObject.getHours() < 12 ? "am" : "pm"} `
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
      // remove all the comments made inside the doc
      comments.forEach(async (comment) => await deleteDoc(doc(db, "comments", comment)))
      await deleteDoc(doc(db, "posts", postId));
      navigate(-1)
    }
  }
  const handleNewComment = async (e) => {
    e.preventDefault()
    const newCommentId = v4()
    // create new comment and link the comment with the post
    await setDoc(doc(db, "comments", newCommentId), {
      created : new Date(),
      content : newComment,
      id : newCommentId,
      linkedPost : postId,
      userId : loggedInUser.userId,
      likes : [],
    })
    await updateDoc(doc(db, "posts", postId), {
      comments : arrayUnion(newCommentId)
    })
    setNewComment("")
  }
  const navigateBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "posts", postId), (doc) => {
      if (doc.exists()) {
        setPost(doc.data())
        // set the posts comments with the array of ids pointing to the comments collection
        setComments(doc.data().comments || [])
      }else {
        setPost(undefined)
        setComments([])
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
        post ? 
          <main id='post--detail--container'>
            <section>
              <section id="post--comments">
                <form className="post--comments--form" onSubmit={handleNewComment}>
                  <Link to={`/user/${loggedInUser?.userId}`}><img className="profile--img" src={loggedInUser?.pfp || profileImageLoading} alt={loggedInUser?.username}></img></Link>
                  <input type="text" placeholder="Reply To Post" maxLength="250" value={newComment} onChange={(e) => {setNewComment(e.target.value)}}></input>
                  <button type="submit" className="cta" disabled={!newComment && true}>Reply</button>
                </form>
                <div className='comments--container'></div>
              </section>
              <hr />
              <small className='understated'>{newComment.length}/250</small>
              <article className="post" style={{maxHeight: "unset"}} onDoubleClick={like}>
                <div className="post--details" style={{flexDirection : "unset", alignItems : "center"}}>
                  <Link to={`/user/${post.creator}`}>
                    <div className="user--details">
                    <img className="profile--img" src={creatorDetails?.pfp || profileImageLoading} alt={creatorDetails?.username}></img>
                    <h3>{creatorDetails?.username}</h3>
                    </div>
                  </Link>
                  {loggedInUser.userId === post.creator && 
                  <article>
                    <button className='unstyled--btn pointer smaller--fontsize' onClick={editPost}><i className="fa-solid fa-pen-to-square understated"></i></button>
                    <button className='unstyled--btn pointer smaller--fontsize' onClick={removePost}><i className="fa-solid fa-trash understated"></i></button>
                  </article>}  
                </div>
                <small className="understated">
                  {convertDate(post.created)}
                </small>
                <section className="post-content">
                  <p className='bottom--margin--zero pointer text--wrapped'>{post.content}</p>
                </section>
                <section className="post--interactions">
                  {post.likes?.includes(loggedInUser?.userId) 
                  ? 
                  <button className='unstyled--btn pointer liked smaller--fontsize no-padding' onClick={unlike}><i className="fa-solid fa-thumbs-up liked"></i> {post.likes?.length || 0} Like{post.likes?.length !== 1 && "s"}</button> 
                  : 
                  <button className='unstyled--btn pointer understated smaller--fontsize no-padding' onClick={like}><i className="fa-solid fa-thumbs-up understated"></i> {post.likes?.length || 0} Like{post.likes?.length !== 1 && "s"}</button>
                }
                </section>
              </article>
              <h3>Comments ({comments?.length}):</h3>
              <section id="comments--container">
                {/* reversing the order since we push new comments so the most recent is the last item in the array */}
                {[...comments].reverse().map((comment) => <Comment key={comment} commentId={comment}/>)}
              
              {comments?.length === 0 && <p className='text--center understated'>Visible comments will appear here</p>}
              </section>
            </section> 
            <UserDetails id={post.creator}/>
          </main>
        : 
          post === null ? <p className='understated text--center top--padding'>Loading...</p> : <p className='understated text--center top--padding'>Post does not exist, <span onClick={navigateBack} className='text--cta pointer'>go back</span></p>
  )
}
