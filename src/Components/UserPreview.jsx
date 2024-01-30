import React, { useEffect, useState } from 'react'

import profileLoadingImage from "../Images/loadingProfile.jpg"
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'

export default function UserPreview(props) {
  const [userDetails, setUserDetails] = useState(null)
  useEffect(() => {
    async function fetchUserDataById() {
      const userSnap = await getDoc(doc(db, "users", props.id))
      if (userSnap.exists()) {
        setUserDetails(userSnap.data())
      }else {
        setUserDetails({username : "Content Deleted"})
      }
    }
    fetchUserDataById()
  }, [])
  console.log(userDetails)
  return (
    <section>
      <img className="profile--img" src={userDetails?.pfp || profileLoadingImage} height="40" width="40"></img>
      <p className="username">@{userDetails?.username}</p>
    </section>
  )
}
