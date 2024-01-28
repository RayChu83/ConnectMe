import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import { useSelector } from 'react-redux'
import Post from './Post'

import "../styles/user.css"

export default function Profile() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isShowingAll, setIsShowingAll] = useState(false)
  const loggedInUsersPost = useSelector(state => (isShowingAll ? state.loggedInUsersPost : state.loggedInUsersPost.slice(0, 2)));

  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }

  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  const editProfile = () => {
    console.log("On Clicked")
  }

  return (
    <main id='user'>
      {loggedInUser ? 
        <>
          <div className="user--details">
            <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" alt="" height="40" width="40"></img>
            <h1 className='overstated'>{loggedInUser.username || "Anonymous"}</h1>
            <big onClick={editProfile}><i className="fa-regular fa-pen-to-square"></i></big>
          </div>
          <p className='user--following--followers'><span className='heading underline pointer'>{loggedInUser.following.length} Following</span><span className='heading underline pointer'>{loggedInUser.followers.length} Followers</span></p>
          {loggedInUsersPost?.length 
          ? 
            loggedInUsersPost.map((post, index) => <Post userInfo={post.userInfo} content={post.content} created={post.created} key={index} />) 
          : 
            // default value has a empty array, if fetched and still empty, state changes to null
            loggedInUsersPost?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>No posts made...</p>
        }
          <p className='understated text--center pointer' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p>
          <button onClick={signUserOut} className='danger--btn'>Sign Out</button>
        </>
       : <p className='understated text--center'>Loading...</p>}
    </main>
  )
}
