import React from 'react'
import UserPreview from './UserPreview'
import { useSelector } from 'react-redux'

export default function ProfileFollowing() {
  const loggedInUsersFollowing = useSelector(state => state.loggedInUser.following)
  console.log(loggedInUsersFollowing)
  return (
    loggedInUsersFollowing && loggedInUsersFollowing.map((user, index) => <UserPreview id={user} key={index}/>)
  )
}
