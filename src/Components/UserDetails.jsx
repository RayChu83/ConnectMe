import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import profileImageLoading from "../Images/loadingProfile.jpg"
import fetchUserById from '../fetchUserById'

export default function UserDetails(props) {
  const [postCreator, setPostCreator] = useState(null)
  useEffect(() => {
    async function fetchPostCreator() {
      const res = await fetchUserById(props.id)
      setPostCreator(res)
    }
    fetchPostCreator()
  }, [props.id])
  return (
    <>
      {postCreator && 
        <aside>
          <Link to={`/user/`}>
            <section id="profile">
              <img className="profile--img" src={postCreator.pfp || profileImageLoading} alt="Users Logo" width="125" height="125"></img>
              <h2>{postCreator.username || "------"}</h2>
              <small className='understated'>{postCreator.description}</small>
            </section>
          </Link>
          <article>
          </article>
          <Link to={`/user/`}>
            <button className="cta expand">View All</button>  
          </Link>
        </aside>
      }
    </>
  )
}
