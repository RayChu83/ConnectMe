import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import fetchUserById from '../fetchUserById'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../Firebase/firebase'
import Post from './Post'

export default function UserDetails(props) {
  const [postCreator, setPostCreator] = useState(null)
  const [postCreatorsRecentPost, setPostCreatorsRecentPost] = useState(null)
  useEffect(() => {
    async function fetchPostCreator() {
      const res = await fetchUserById(props.id)
      setPostCreator(res)}
    fetchPostCreator()
    const q = query(collection(db, "posts"), orderBy("created", "desc"), where("creator", "==", props.id), limit(1))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let posts = snapshot.docs.map(doc => ({
        ...doc.data()
      }))
      if (!posts.length) {
        setPostCreatorsRecentPost(null)
      }else {
        setPostCreatorsRecentPost(posts)
      }
    });
    return unsubscribe
  }, [props.id])
  console.log(postCreatorsRecentPost)
  return (
    <>
      {postCreator && postCreatorsRecentPost && 
        <aside>
          <section id="profile">
            <Link to={`/user/${postCreator.userId}`}>
              <img className="profile--img" src={postCreator.pfp || profileImageLoading} alt="Users Logo" width="125" height="125"></img>
              <h2>{postCreator.username || "------"}</h2>
            </Link>
            <small className='understated'>{postCreator.description}</small>
          </section>
          {postCreatorsRecentPost.map((post, index) => (
            <Post postId={post.id} creator={post.creator} content={post.content} created={post.created} likes={post.likes} key={index}/>
          ))}
          <Link to={`/user/${postCreator.userId}`}>
            <button className="cta expand">View All</button>  
          </Link>
        </aside>
      }
    </>
  )
}
