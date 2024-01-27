import React from 'react'

export default function HomeSectionOne() {
  return (
    <aside id="section--one" className="section">
      <h3 className="heading">You're Following...</h3>
      <section>
        <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" height="40" width="40"></img>
        <p className="username">@Anonymous</p>
      </section>
      <section>
        <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" height="40" width="40"></img>
        <p className="username">@Anonymous</p>
      </section>
      <section>
        <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" height="40" width="40"></img>
        <p className="username">@Anonymous</p>
      </section>
      <button className="cta expand">See All</button>
    </aside>
  )
}
