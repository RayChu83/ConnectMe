import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import Post from './Post'
import profileImageLoading from "../Images/loadingProfile.jpg"

export default function HomeSectionThree() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const loggedInUsersPost = useSelector(state => state.loggedInUsersPost)?.slice(0, 2);
  return (
    <aside id="section--three" className="section">
      <section id="profile">
        <Link to="profile">
          <img className="profile--img" src={loggedInUser?.pfp || profileImageLoading} alt="ConnectMe Logo" width="125" height="125"></img>
        </Link>
        <h2>You</h2>
      </section>
      <article>
        <h3 className="heading">Your recent activity...</h3>
        {loggedInUsersPost?.length 
          ? 
            loggedInUsersPost.map((post, index) => <Post creator={post.creator} content={post.content} created={post.created} key={index} />) 
          : 
            // default value has a empty array, if fetched and still empty, state changes to null
            loggedInUsersPost?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>No posts made...</p>
        }
      </article>
      <Link to="/profile">
        <button className="cta expand">View All</button>  
      </Link>
    </aside>
  )
}
