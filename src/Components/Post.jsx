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
        <img className="profile--img" src={props.userInfo.pfp || "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} height="40" width="40"></img>
        <h3>{props.userInfo.username}</h3>
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
