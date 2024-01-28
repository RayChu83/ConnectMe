import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import { useSelector } from 'react-redux'
import Post from './Post'

import "../styles/user.css"

export default function Profile() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isProfilePopUpVisible, setIsProfilePopUpVisible] = useState(false)
  const [isShowingAll, setIsShowingAll] = useState(false)
  const loggedInUsersPost = useSelector(state => (isShowingAll ? state.loggedInUsersPost : state.loggedInUsersPost?.slice(0, 2)));

  const toggleShowAllPosts = () => {
    setIsShowingAll(prevState => !prevState)
  }

  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  const editProfile = () => {
    setIsProfilePopUpVisible(prevState => !prevState)
  }

  return (
    <>
      <section id='user--edit' className={isProfilePopUpVisible && "visible"}>
        <article className='user--edit--heading'>
          <h2>Edit Profile</h2>
          <p onClick={editProfile}><i class="fa-solid fa-xmark danger--text pointer"></i></p>
        </article>
        <form id='profile--edit--form'>
          <label htmlFor="edit--username">Username:</label>
          <input type="text" id='edit--username' value={loggedInUser?.username}/>
          <label htmlFor="edit--email">Email:</label>
          <input type="text" id='edit--email' value={loggedInUser?.email} readOnly className='understated'/>
          <label htmlFor="edit--description">Description:</label>
          <input type="text" id='edit--description' value={loggedInUser?.description}/>
          <label htmlFor="edit--pfp">Profile Picture:</label>
          <input type="file" id='edit--pfp'/>
          <button className='cta'>Save Changes</button>
        </form>
      </section>
      <main id='user' className={isProfilePopUpVisible && "blurred"}>
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
            <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p>
            <button onClick={signUserOut} className='danger--btn'>Sign Out</button>
          </>
        : <p className='understated text--center'>Loading...</p>}
      </main>
    </>
  )
}
