import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import { redirect } from 'react-router-dom'

export default function Profile() {
  function signUserOut(){
    signOut(auth)
      .catch(err => console.error(err))
  }
  return (
    <>
      <div>Profile</div>
      <button onClick={signUserOut}>Logout</button>
    </>
  )
}
