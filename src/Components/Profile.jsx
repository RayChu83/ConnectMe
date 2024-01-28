import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import { useSelector } from 'react-redux'

import "../styles/user.css"

export default function Profile() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  // const loggedInUsersPost = useSelector(state => state.loggedInUsersPost)

  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }

  return (
    <>
      {loggedInUser ? 
        <>
          <div className="user--details" title={loggedInUser.username || "Anonymous"}>
            <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" alt="" height="40" width="40"></img>
            <h1 className='overstated'>{loggedInUser.username || "Anonymous"}</h1>
          </div>
          <p className='user--following--followers'><span className='heading underline pointer'>{loggedInUser.following.length} Following</span><span className='heading underline pointer'>{loggedInUser.followers.length} Followers</span></p>
          <button onClick={signUserOut} className='danger--btn'>Logout</button>
        </>
       : <p className='understated text--center'>Loading...</p>}
    </>
  )
}
