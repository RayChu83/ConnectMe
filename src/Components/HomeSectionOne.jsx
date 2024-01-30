import React from 'react'
import { Link } from 'react-router-dom'

import UserPreview from './UserPreview'
import { useSelector } from 'react-redux'

export default function HomeSectionOne() {
  const following = useSelector(state => state?.loggedInUser?.following)
  return (
    <aside id="section--one" className="section">
      <h3 className="heading">You're Following...</h3>
      {following ? following.map(id => <UserPreview id={id}/>) : <p className='understated text--center'>You are not following anyone...</p>}
      <Link to="/profile">
        <button className="cta expand">See All</button> 
      </Link>
    </aside>
  )
}
