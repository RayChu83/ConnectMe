import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../Firebase/firebase'
import { useSelector } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'

export default function Profile() {
  const loggedInId = useSelector(state => state.loggedInId)
  const [loggedInUser, setLoggedInUser] = useState(null)

  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", loggedInId);
      const docSnap = await getDoc(docRef);
      setLoggedInUser(docSnap.data())
    }
    // only fetch for users information when we have the logged in users id
    loggedInId && fetchData()
  }, [loggedInId])
  return (
    <>
      {loggedInUser ? 
        <>
          <h1>Hey, {loggedInUser.username}</h1>
          <button onClick={signUserOut}>Logout</button>
        </>
       : <p className='understated text--center'>Loading...</p>}
    </>
  )
}
