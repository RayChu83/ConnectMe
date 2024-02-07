import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import Post from './Post'
import profileImageLoading from "../Images/loadingProfile.jpg"
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

export default function HomeSectionThree() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const [loggedInUsersPost, setLoggedInUsersPost] = useState([])
  useEffect(() => {
    if (loggedInUser?.userId) {
      const q = query(collection(db, "posts"), orderBy("created", "desc"), where("creator", "==", loggedInUser.userId), limit(1))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let posts = snapshot.docs.map(doc => ({
          ...doc.data()
        }))
        if (!posts.length) {
          setLoggedInUsersPost(null)
        }else {
          setLoggedInUsersPost(posts)
        }
      });
    return unsubscribe
    }
  }, [loggedInUser])
  return (
    <aside id="section--three" className="section">
      <Link to={`/user/${loggedInUser?.userId}`}>
        <section id="profile">
          <img className="profile--img" src={loggedInUser?.pfp || profileImageLoading} alt="Users Logo" width="125" height="125"></img>
          <h2>{loggedInUser?.username || "-----"}</h2>
          <small className='understated'>{loggedInUser?.description}</small>
        </section>
      </Link>
      <article>
        {loggedInUsersPost?.length 
          ? 
            loggedInUsersPost.map((post, index) => <Post creator={post.creator} content={post.content} created={post.created} postId={post.id} likes={post.likes} key={index} />) 
          : 
            // default value has a empty array, if fetched and still empty, state changes to null
            loggedInUsersPost?.length === 0 ? <p className='understated text--center'>Loading..</p> : <p className='understated text--center'>Visible posts will appear here!</p>
        }
      </article>
      <Link to={`/user/${loggedInUser?.userId}`}>
        <button className="cta expand">View All</button>  
      </Link>
    </aside>
  )
}
