import React from 'react'
import { Link } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"

export default function Comment() {
  return (
    <article className='comment'>
      <div className="comment--details" style={{flexDirection : "unset", alignItems : "center"}}>
        <Link to={`/user/`}>
          <div className="user--details">
            <img className="profile--img" src={profileImageLoading} alt='Profile'></img>
            <h3>Lorem Ipsum</h3>
          </div>
        </Link>
      </div>
    <small className='understated'>2 / 4 / 2024 • 16 : 26 pm</small>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quia ad fuga.</p>
    </article>
  )
}
