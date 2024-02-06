import React from 'react'
import { Link } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import Comment from './Comment'

export default function UserDetails() {
  return (
    <aside>
      <Link to={`/user/`}>
        <section id="profile">
          <img className="profile--img" src={profileImageLoading} alt="Users Logo" width="125" height="125"></img>
          <h2>------</h2>
        </section>
      </Link>
      <article>
        {/* instead of comments it will be posts below */}
        <Comment/>
      </article>
      <Link to={`/user/`}>
        <button className="cta expand">View All</button>  
      </Link>
    </aside>
  )
}
