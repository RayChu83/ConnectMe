import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db} from '../Firebase/firebase'
import { useSelector } from 'react-redux'

import Post from './Post'
import "../styles/user.css"
import { Link, useParams } from 'react-router-dom'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'

export default function Profile() {
  const userId = useParams()?.id
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isShowingAll, setIsShowingAll] = useState(false)
  const [usersPosts, setUsersPosts] = useState([])
  
  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  useEffect(() => {
    if (userId) {
      const q = query(collection(db, "posts"), orderBy("created", "desc"), where("creator", "==", userId))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let posts = snapshot.docs.map(doc => ({
          ...doc.data()
        }))
        if (posts.length === 0) {
          setUsersPosts(null)
        }else {
          setUsersPosts(posts)
        }
      },
      (error) => {
        console.error(error)
      });
    return unsubscribe
    }
    // eslint-disable-next-line 
  }, [userId])
  return (
    <>
      {usersPosts?.length 
        ? 
          usersPosts
            .slice(!isShowingAll ? 0: undefined, isShowingAll ? undefined : 2)
            .map((post, index) => <Post creator={post.creator} content={post.content} created={post.created} postId={post.id} likes={post.likes} comments={post.comments} key={index} />) 
        : 
        // default value has a empty array, if fetched and still empty, state changes to null
          usersPosts?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>{loggedInUser?.userId === userId ? <>No posts made,<Link to="/" className='text--cta'> Create posts here</Link></> : "No posts made..."}</p>
      }
      {usersPosts?.length > 3 && <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p>}
      {loggedInUser?.userId === userId && <button onClick={signUserOut} className='danger--btn'>Sign Out</button>}
    </>
  )
}