import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot, query, orderBy, addDoc, } from "firebase/firestore";

import { setAllPosts, setSearchbarUnfocused } from '../Redux/actions/actions';
import { db } from '../Firebase/firebase';
import Post from './Post';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import fetchLoggedInUsersPosts from '../fetchLoggedInUsersPosts';
import { v4 } from 'uuid';

export default function HomeSectionTwo() {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const searchBarRef = useRef(null);
  const isSearchbarFocused = useSelector(state => state.searchbarFocus)
  const [searchParams] = useSearchParams();
  const [searchbar, setSearchbar] = useState(searchParams.get("search") || "")

  const [displayedPosts, setDisplayedPosts] = useState(null)
  const [newPostContent, setNewPostContent] = useState("")
  const dispatch = useDispatch()
  const allPosts = useSelector(state => state.allPosts)

  const navigate = useNavigate()

  const handleSearchbarChange = (e) => {
    setSearchbar(e.target.value)
  }

  const handleNewPostContentChange = (e) => {
    setNewPostContent(e.target.value)
  }
  useEffect(() => {
    // sort of like a event listener, where redux state determines if search bar is focused or not
    if (isSearchbarFocused) {
      searchBarRef.current.focus();
      dispatch(setSearchbarUnfocused())
    }
    // eslint-disable-next-line
  }, [isSearchbarFocused]);

  useEffect(() => {
    // all posts changes listener
    const q = query(collection(db, "posts"), orderBy("created", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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

  useEffect(() => {
    // conditional statements that determine how the posts should be displayed, whenever new search result or when allPosts from firebase changes
    if (allPosts && searchbar) {
      setDisplayedPosts(allPosts.filter(post => post.content.includes(searchbar)))
    }else if (allPosts){
      // no search result? display all posts
      setDisplayedPosts(allPosts)
    }
    // eslint-disable-next-line
  }, [searchbar, allPosts])

  const handleNewPost = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, "posts"), {
      content : newPostContent,
      created : new Date(),
      id : v4(),
      userInfo : loggedInUser
    })
    // update sidebar containing your most recent activity when creating a new post
    fetchLoggedInUsersPosts(loggedInUser.userId, dispatch)
    setNewPostContent("")
  }
  const handleSearch = (e) => {
    // typically it should filter all posts, if user clicks on search icon, we want to set a search param called ?search and use that by default
    e.preventDefault()
    navigate({search: `?${createSearchParams({search: searchbar})}`})
  }
  return (
    <div id="section--two">
      <form className="search--bar">
        <button onClick={handleSearch}><i className="fa-solid fa-magnifying-glass understated"></i></button>
        <input type="text" placeholder="Search" ref={searchBarRef} onChange={handleSearchbarChange} value={searchbar}></input>
      </form>
      <div className="section">
        <form className="post--form" onSubmit={handleNewPost}>
          <img className="profile--img" src={loggedInUser.pfp || "https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png"} alt={loggedInUser.username}></img>
          <input type="text" placeholder="Hey 👋" value={newPostContent} onChange={handleNewPostContentChange}></input>
          <button type="submit" className="cta">Post</button>
        </form>
          {displayedPosts ? displayedPosts.map((post, index) => (
            <Post userInfo={post.userInfo} content={post.content} created={post.created} key={index}/>
          )) : <p className='understated text--center'>Loading...</p>}
      </div>
    </div>
  )
}
