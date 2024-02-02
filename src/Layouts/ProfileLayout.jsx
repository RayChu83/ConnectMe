import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link, NavLink, useParams, redirect, useNavigate } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import { db, storage } from '../Firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'

export default function ProfileLayout() {
  const userId = useParams().id
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [isProfilePopUpVisible, setIsProfilePopUpVisible] = useState(false)
  const [profilePopUpData, setProfilePopUpData] = useState({username : "", email : "", description: ""})
  const [imageUpload, setImageUpload] = useState(undefined)
  const navigate = useNavigate()

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
            getDownloadURL(userPfpReference[0]).then(async (url) => {
              await updateDoc(doc(db, "users", loggedInUser.userId), {
                ...loggedInUser, ...profilePopUpData, pfp : url
              })
            })
          }
        )
      })
    }else{
      await updateDoc(doc(db, "users", loggedInUser.userId), {
        ...loggedInUser, ...profilePopUpData
    })}
    setIsProfilePopUpVisible(false)
  }
  useEffect(() => {
    if (loggedInUser?.username || loggedInUser?.email || loggedInUser?.description) {
      setProfilePopUpData({username : loggedInUser.username, email : loggedInUser.email, description: loggedInUser.description})
    }
  }, [loggedInUser])
  useEffect(() => {
    if (userId === loggedInUser?.userId) {
      console.log("i was ran")
      navigate("/profile")
    }
  }, [userId, loggedInUser])
  return (
    loggedInUser ? 
        <>
          {!userId &&
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
          }
          <main id='user' className={isProfilePopUpVisible ? "blurred" : ""}>
            <div className="user--details">
              <Link to="">
                <article>
                  <img className="profile--img" src={loggedInUser.pfp || profileImageLoading} alt={loggedInUser.username} ></img>
                  <h1 className='overstated'>{loggedInUser.username || "Anonymous"}</h1>
                </article>
              </Link>
              {!userId && <big onClick={editProfile}><i className="fa-regular fa-pen-to-square"></i></big>}
            </div>
            <p>{loggedInUser.description || "No description found..."}</p>
            {/* Ensures that even if possibly a user is following a person twice, it will not be shown */}
            <p className='user--following--followers'><NavLink to="following" className='heading underline pointer'>{[...new Set(loggedInUser.following)].length} Following</NavLink><NavLink to="followers" className='heading underline pointer'>{[...new Set(loggedInUser.followers)].length} Followers</NavLink></p>
            <Outlet/>
          </main>
        </>  : <p className='understated text--center'>Loading...</p>
  )
}