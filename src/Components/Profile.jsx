import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import { useSelector } from 'react-redux'
import Post from './Post'

import "../styles/user.css"
import { auth, db, storage } from '../Firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'

export default function Profile() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isProfilePopUpVisible, setIsProfilePopUpVisible] = useState(false)
  const [profilePopUpData, setProfilePopUpData] = useState({username : "", email : "", description: ""})
  const [imageUpload, setImageUpload] = useState(undefined)
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
  function handleChange(e) {
    const {name, value} = e.target
    setProfilePopUpData(prevState => ({...prevState, [name] : value}))
  }
  function handleProfilePictureChange(e) {
    setImageUpload(e.target.files[0])
  }
  async function handleSubmit(e) {
    e.preventDefault()
    if (imageUpload !== undefined) {
      const imageRef = ref(storage, `profilePictures/${loggedInUser.userId}`)
      // check for if user has a previous profile picture, if so remove it and we set a new one with the new imageUpload
      if (loggedInUser.pfp) {
        await deleteObject(imageRef)
      }
      await uploadBytes(imageRef, imageUpload).then(() => {
        listAll(ref(storage, "profilePictures"))
          .then((res) => {
            const userPfpReference = res.items.filter(reference => reference.name === loggedInUser.userId)
            console.log(userPfpReference)
            getDownloadURL(userPfpReference[0]).then(url => {
              updateDoc(doc(db, "users", loggedInUser.userId), {
                ...loggedInUser, ...profilePopUpData, pfp : url
              }).then(() => {window.location.reload()})
            })
          }
        )
      })
    }else{
      await updateDoc(doc(db, "users", loggedInUser.userId), {
        ...loggedInUser, ...profilePopUpData
      }).then(() => {window.location.reload()})
    }
  }
  useEffect(() => {
    if (loggedInUser?.username || loggedInUser?.email || loggedInUser?.description) {
      setProfilePopUpData({username : loggedInUser.username, email : loggedInUser.email, description: loggedInUser.description})
    }
  }, [loggedInUser])
  return (
    <>
      {loggedInUser ? 
      <>
      <section id='user--edit' className={isProfilePopUpVisible ? "visible" : ""}>
        <article className='user--edit--heading'>
          <h2>Edit Profile</h2>
          <p onClick={editProfile}><i className="fa-solid fa-xmark danger--text pointer"></i></p>
        </article>
        <form id='profile--edit--form' onSubmit={handleSubmit}>
          <label htmlFor="edit--username">Username:</label>
          <input type="text" id='edit--username' value={profilePopUpData?.username} name='username' onChange={handleChange} maxLength="20"/>
          <label htmlFor="edit--email">Email:</label>
          <input type="text" id='edit--email' value={profilePopUpData?.email} readOnly className='understated' name='email' onChange={handleChange}/>
          <label htmlFor="edit--description">Description:</label>
          <input type="text" id='edit--description' value={profilePopUpData?.description} name='description' onChange={handleChange} maxLength="250"/>
          <label htmlFor="edit--pfp">Profile Picture:</label>
          <input type="file" id='edit--pfp' className='pointer' onChange={handleProfilePictureChange}/>
          <button className='cta'>Save Changes</button>
        </form>
      </section>
      <main id='user' className={isProfilePopUpVisible ? "blurred" : ""}>
        <div className="user--details">
          <img className="profile--img" src={loggedInUser.pfp || "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} alt={loggedInUser.username} ></img>
          <h1 className='overstated'>{loggedInUser.username || "Anonymous"}</h1>
          <big onClick={editProfile}><i className="fa-regular fa-pen-to-square"></i></big>
        </div>
        <p>{loggedInUser.description || "No description found..."}</p>
        <p className='user--following--followers'><span className='heading underline pointer'>{loggedInUser.following.length} Following</span><span className='heading underline pointer'>{loggedInUser.followers.length} Followers</span></p>
        {loggedInUsersPost?.length 
          ? 
          loggedInUsersPost.map((post, index) => <Post userInfo={post.userInfo} content={post.content} created={post.created} key={index} />) 
          : 
          // default value has a empty array, if fetched and still empty, state changes to null
          loggedInUsersPost?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>No posts made...</p>
        }
        {loggedInUsersPost && <p className='understated pointer limit--posts' onClick={toggleShowAllPosts}>{isShowingAll ? "Show Less" : "Show All"}</p>}
        <button onClick={signUserOut} className='danger--btn'>Sign Out</button>
      </main>
      </>  : <p className='understated text--center'>Loading...</p>
    }</>
  )
}
