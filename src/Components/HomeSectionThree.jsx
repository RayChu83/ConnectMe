import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post'

export default function HomeSectionThree() {
  const loggedInUsersPost = useSelector(state => state.loggedInUsersPost)
  return (
    <aside id="section--three" className="section">
      <section id="profile">
        <img className="profile--img" src="https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png" alt="ConnectMe Logo" width="125" height="125"></img>
        <h2>You</h2>
      </section>
      <article>
        <h3 className="heading">Your recent activity...</h3>
        {loggedInUsersPost?.length ? loggedInUsersPost.map((post, index) => <Post userInfo={post.userInfo} content={post.content} created={post.created} key={index} />) : <p className='understated text--center'>Loading...</p>}
      </article>
      <button className="cta expand">View All</button>
    </aside>
  )
}
