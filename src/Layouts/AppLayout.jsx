import React from 'react'
import { Outlet } from 'react-router-dom'

import NavigationBar from '../Components/NavigationBar'

export default function HomeLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}
