import React from 'react'
import { Link } from 'react-router-dom'

import UserPreview from './UserPreview'
import { useSelector } from 'react-redux'

export default function HomeSectionOne() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const following = useSelector(state => [...new Set(state.loggedInUser?.following)])
  return (
    <aside id="section--one" className="section">
      <h3 className="heading text--center">See Your Following</h3>
      {following?.length ? following.slice(0, 3).map(id => <UserPreview id={id} key={id}/>) : <p className='understated text--center'>You are not following anyone...</p>}
      <Link to={`/user/${loggedInUser?.userId}/following`}>
        <button className="cta expand">See All</button> 
      </Link>
    </aside>
  )
}
