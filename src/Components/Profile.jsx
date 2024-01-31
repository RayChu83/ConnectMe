import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth} from '../Firebase/firebase'
import { useSelector } from 'react-redux'

import Post from './Post'
import "../styles/user.css"

export default function Profile() {
  const [isShowingAll, setIsShowingAll] = useState(false)
  const loggedInUsersPost = useSelector(state => (isShowingAll ? state.loggedInUsersPost : state.loggedInUsersPost?.slice(0, 2)));
  
  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  return (
    <>
      {loggedInUsersPost?.length 
        ? 
          loggedInUsersPost.map((post, index) => <Post creator={post.creator} content={post.content} created={post.created} key={index} />) 
        : 
        // default value has a empty array, if fetched and still empty, state changes to null
          loggedInUsersPost?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>No posts made...</p>
      }
      {loggedInUsersPost && <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p>}
      <button onClick={signUserOut} className='danger--btn'>Sign Out</button>
    </>
  )
}