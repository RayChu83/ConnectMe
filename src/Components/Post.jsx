import React from 'react'

export default function Post(props) {
  const convertDate = (timestamp) => {
    let dateObject = timestamp.toDate()
    return `${dateObject.getMonth() + 1} / ${dateObject.getDate()} / ${dateObject.getFullYear()}`
  }
  return (
    <article className="post">
      <div className="post--details">
      <div className="user--details">
        <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" height="40" width="40"></img>
        <h3>@{props.username}</h3>
        </div>
          <small className="understated">
            {convertDate(props.created)}
          </small>
        </div>
      <section className="post-content">
      <small>{props.content}</small>
      </section>
    </article>
  )
}
