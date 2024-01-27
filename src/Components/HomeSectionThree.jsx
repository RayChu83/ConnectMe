import React from 'react'

export default function HomeSectionThree() {
  return (
    <aside id="section--three" className="section">
      <section id="profile">
        <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" alt="ConnectMe Logo" width="125" height="125"></img>
        <h2>You</h2>
      </section>
      <article>
        <h3 className="heading">Your recent activity...</h3>
        <article className="post">
          <div className="post--details">
            <div className="user--details">
              <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" height="40" width="40"></img>
              <h3>You</h3>
            </div>
          </div>
          <section className="post-content">
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, voluptas aspernatur obcaecati porro sunt libero excepturi quibusdam fugiat amet numquam non, praesentium iste vero eveniet?</small>
          </section>
        </article>
        <article className="post">
          <div className="post--details">
            <div className="user--details">
              <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" height="40" width="40"></img>
              <h3>You</h3>
            </div>
          </div>
          <section className="post-content">
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, voluptas aspernatur obcaecati porro sunt libero excepturi quibusdam fugiat amet numquam non, praesentium iste vero eveniet?</small>
          </section>
        </article>
      </article>
      <button className="cta expand">View All</button>
    </aside>
  )
}
