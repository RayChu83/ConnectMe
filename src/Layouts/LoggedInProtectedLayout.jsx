import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function ProtectedRouteLayout() {
  const isLoggedIn = useSelector(state => state.loggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    // check for if the user is loggedIn or not on all nested routes
    if (!isLoggedIn) {
      navigate("login")
    }
  }, [isLoggedIn])
  return (
    <>
      <Outlet />
    </>
  )
}
