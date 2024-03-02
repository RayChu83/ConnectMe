import React from 'react'
import profileImageLoading from "../Images/loadingProfile.jpg"

export default function PostsSkeleton() {
  return (
    <>
      <article className="post">
        <div className="post--details">
            <div className="user--details">
              <img className="profile--img" src={profileImageLoading} alt="Posts Loading Skeleton"></img>
              <h3>{"-".repeat(Math.ceil(Math.random() * 15))}</h3>
            </div>
          <small className="understated">
            --------------
          </small>
        </div>
        <section className="post-content">
          <small className='bottom--margin--zero pointer text--wrapped'>{"-".repeat(Math.ceil(Math.random() * 50))}</small>
        </section>
        <section className="post--interactions">
        <aside>
            <button className='unstyled--btn pointer understated smaller--fontsize no-padding'><i className="fa-solid fa-thumbs-up understated"></i> --</button> 
            <button className='unstyled--btn pointer understated smaller--fontsize no-padding'><i className="fa-solid fa-comment understated"></i> --</button>
        </aside>
        <small className='understated pointer smaller--fontsize'>See Details</small>
        </section>
      </article>
    </>
  )
}
