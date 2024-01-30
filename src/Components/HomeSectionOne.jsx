import React from 'react'
import { Link } from 'react-router-dom'

import profileLoadingImage from "../Images/loadingProfile.jpg"

export default function HomeSectionOne() {
  return (
    <aside id="section--one" className="section">
      <h3 className="heading">You're Following...</h3>
      <section>
        <img className="profile--img" src={profileLoadingImage} height="40" width="40"></img>
        <p className="username">@Anonymous</p>
      </section>
      <section>
        <img className="profile--img" src={profileLoadingImage} height="40" width="40"></img>
        <p className="username">@Anonymous</p>
      </section>
      <section>
        <img className="profile--img" src={profileLoadingImage} height="40" width="40"></img>
        <p className="username">@Anonymous</p>
      </section>
      <Link to="/profile">
        <button className="cta expand">See All</button> 
      </Link>
    </aside>
  )
}
