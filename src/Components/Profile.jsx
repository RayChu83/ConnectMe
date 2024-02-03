import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth} from '../Firebase/firebase'
import { useSelector } from 'react-redux'

import Post from './Post'
import "../styles/user.css"
import { useParams } from 'react-router-dom'
import fetchPostsById from './../fetchPostsById';

export default function Profile() {
  const userId = useParams().id
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isShowingAll, setIsShowingAll] = useState(false)
  const [usersPosts, setUsersPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  
  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }
  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  useEffect(() => {
    async function fetchPosts() {
      const allPosts = await fetchPostsById(userId)
      setAllPosts(allPosts?.length)
      setUsersPosts(allPosts)
    }
    fetchPosts()
    // eslint-disable-next-line 
  }, [userId])
  return (
    <>
      {usersPosts?.length 
        ? 
          usersPosts
            .slice(!isShowingAll ? 0: undefined, isShowingAll ? undefined : 2)
            .map((post, index) => <Post creator={post.creator} content={post.content} created={post.created} key={index} />) 
        : 
        // default value has a empty array, if fetched and still empty, state changes to null
          usersPosts?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>No posts made...</p>
      }
      {allPosts > 3 && <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p>}
      {loggedInUser.userId === userId && <button onClick={signUserOut} className='danger--btn'>Sign Out</button>}
    </>
  )
}