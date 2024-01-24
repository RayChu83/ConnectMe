import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import logoSharpened from "../Images/ConnectMeSharpened.png"
import "../styles/accountAccess.css"

export default function ProtectedRouteLayout() {
  const isLoggedIn = useSelector(state => state.loggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    // check for if the user is logged out or not on all nested routes
    if (isLoggedIn) {
      navigate(-1)
    }
  }, [isLoggedIn])
  return (
    <main id='account--access--container'>
      <img src={logoSharpened}></img>
      <Outlet />
    </main>
  )
}
