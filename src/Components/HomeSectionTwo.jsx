import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { setAllPosts, setSearchbarUnfocused } from '../Redux/actions/actions';
import { db } from '../Firebase/firebase';
import Post from './Post';

export default function HomeSectionTwo() {
  const searchBarRef = useRef(null);
  const dispatch = useDispatch()
  const allPosts = useSelector(state => state.allPosts)
  const isSearchbarFocused = useSelector(state => state.searchbarFocus)

  useEffect(() => {
    // sort of like a event listener, where redux state determines if search bar is focused or not
    if (isSearchbarFocused) {
      searchBarRef.current.focus();
      dispatch(setSearchbarUnfocused())
    }
    // eslint-disable-next-line
  }, [isSearchbarFocused]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("created", "desc"));
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        let posts = snapshot.docs.map(doc => ({
          ...doc.data()
        }))
        dispatch(setAllPosts(posts))
      },
      (error) => {
        console.error(error)
      });
    return unsubscribe
    // eslint-disable-next-line
  }, [])
  return (
    <div id="section--two">
      <form className="search--bar">
        <button><i className="fa-solid fa-magnifying-glass understated"></i></button>
        <input type="text" placeholder="Search" ref={searchBarRef}></input>
      </form>
      <div className="section">
        <form className="post--form">
          <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" alt="" height="40" width="40"></img>
          <input type="text" placeholder="Say Hello!"></input>
          <button type="submit" className="cta">Post</button>
        </form>
          {allPosts ? allPosts.map((post, index) => (
            <Post username={post.username} content={post.content} created={post.created} key={index}/>
          )) : <p className='understated text--center'>Loading...</p>}
      </div>
    </div>
  )
}