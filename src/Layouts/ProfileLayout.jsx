import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Link, NavLink, useParams } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import { db, storage } from '../Firebase/firebase'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'

export default function ProfileLayout() {
  const userId = useParams()?.id
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [user, setUser] = useState(null)
  const [isProfilePopUpVisible, setIsProfilePopUpVisible] = useState(false)
  const [profilePopUpData, setProfilePopUpData] = useState({username : "", email : "", description: ""})
  const [imageUpload, setImageUpload] = useState(undefined)
  const [submitDisabled, setSubmitDisabled] = useState(false)

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
    setSubmitDisabled(true)
    if (imageUpload !== undefined) {
      const imageRef = ref(storage, `profilePictures/${user.userId}`)
      // check for if user has a previous profile picture, if so remove it and we set a new one with the new imageUpload
      if (user.pfp) {
        await deleteObject(imageRef)
      }
      await uploadBytes(imageRef, imageUpload).then(() => {
        listAll(ref(storage, "profilePictures"))
          .then((res) => {
            const userPfpReference = res.items.filter(reference => reference.name === user.userId)
            getDownloadURL(userPfpReference[0]).then(async (url) => {
              await updateDoc(doc(db, "users", user.userId), {
                ...user, ...profilePopUpData, pfp : url
              })
            })
          }
        )
      })
    }else{
      await updateDoc(doc(db, "users", user.userId), {
        ...user, ...profilePopUpData
    })}
    setSubmitDisabled(false)
    setIsProfilePopUpVisible(false)
  }
  const follow = async () => {
    await updateDoc(doc(db, "users", loggedInUser.userId), {
      following : arrayUnion(userId)
    })
    await updateDoc(doc(db, "users", userId), {
      followers : arrayUnion(loggedInUser.userId)
    })
  }
  const unfollow = async () => {
    await updateDoc(doc(db, "users", loggedInUser.userId), {
      following : arrayRemove(userId)
    })
    await updateDoc(doc(db, "users", userId), {
      followers : arrayRemove(loggedInUser.userId)
    })
  }
  useEffect(() => {
    if (user?.username || user?.email || user?.description) {
      setProfilePopUpData({username : user.username, email : user.email, description: user.description})
    }
  }, [user])

  useEffect(() => {
    if (userId) {
      const unsubscribe = onSnapshot(doc(db, "users", userId), (doc) => {
        if (doc.exists()) {
          setUser(doc.data())
        }
        else {
          setUser(undefined)
        }
      })
      return unsubscribe
    }
    // eslint-disable-next-line 
  }, [userId])
  return (
    user ? 
        <>
          {loggedInUser?.userId === user?.userId &&
            <section id='user--edit' className={isProfilePopUpVisible ? "visible" : ""}>
              <article className='user--edit--heading'>
                <h2>Edit Profile</h2>
                <p onClick={editProfile}><i className="fa-solid fa-xmark danger--text pointer"></i></p>
              </article>
              <form id='profile--edit--form' onSubmit={handleSubmit}>
                <label htmlFor="edit--username">Username:</label>
                <input type="text" id='edit--username' value={profilePopUpData?.username} name='username' onChange={handleChange} maxLength="20" placeholder='Username'/>
                <label htmlFor="edit--email">Email:</label>
                <input type="text" id='edit--email' value={profilePopUpData?.email} readOnly className='understated' name='email' onChange={handleChange}/>
                <label htmlFor="edit--description">Description:</label>
                <input type="text" id='edit--description' value={profilePopUpData?.description} name='description' onChange={handleChange} maxLength="250" placeholder='Description'/>
                <label htmlFor="edit--pfp">Profile Picture:</label>
                <input type="file" id='edit--pfp' className='pointer' onChange={handleProfilePictureChange}/>
                <button className='cta' disabled={submitDisabled ? true : false}>{submitDisabled ? "Saving Changes..." : "Save Changes"}</button>
              </form>
            </section>
          }
          <main id='user' className={isProfilePopUpVisible ? "blurred" : ""}>
            <div className="user--details">
              <Link to="">
                <article>
                  <img className="profile--img" src={user.pfp || profileImageLoading} alt={user.username} ></img>
                  <h1 className='overstated'>@{user.username || "Anonymous"}</h1>
                </article>
              </Link>
              {loggedInUser?.userId === user?.userId ? <big onClick={editProfile}><i className="fa-regular fa-pen-to-square"></i></big> : user?.followers.includes(loggedInUser?.userId) ? <button className='danger--btn' onClick={unfollow}><i class="fa-solid fa-user-minus"></i> Unfollow</button> : <button className='cta' onClick={follow}><i class="fa-solid fa-user-plus"></i> Follow</button>}
            </div>
            <p className={!user.description ? "understated" : null}>{user.description || "No description found..."}</p>
            {/* Ensures that even if possibly a user is following a person twice, it will not be shown */}
            <p className='user--following--followers'><NavLink to="following" className='heading pointer'>{[...new Set(user.following)].length} Following</NavLink><NavLink to="followers" className='heading pointer'>{[...new Set(user.followers)].length} Follower{[...new Set(user.followers)].length !== 1 && "s"}</NavLink></p>
            <Outlet/>
          </main>
        </>  : 
        user === undefined ? 
          <>
            <p className='understated text--center top--padding'>No user found, <Link to="/" className='text--cta'>return home</Link></p>
          </> 
        : <p className='understated text--center top--padding'>Loading...</p>
  )
}