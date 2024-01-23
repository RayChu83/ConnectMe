import React from 'react'

export default function HomeSectionThree() {
  return (
    <aside id="section--three" className="section">
      <section id="profile">
        <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" alt="ConnectMe Logo" width="125" height="125"></img>
        <h2>You</h2>
      </section>
      <article>
        <h3 className="heading">Your recent activity...</h3>
        <article className="post">
          <div className="post--details">
            <div className="user--details">
              <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" height="40" width="40"></img>
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
              <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" height="40" width="40"></img>
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
