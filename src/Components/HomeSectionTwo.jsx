import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, onSnapshot } from "firebase/firestore";

import { setSearchbarUnfocused } from '../Redux/actions/actions';
import { db } from '../Firebase/firebase';

export default function HomeSectionTwo() {
  const searchBarRef = useRef(null);
  const dispatch = useDispatch()
  const isSearchbarFocused = useSelector(state => state.searchbarFocus)

  useEffect(() => {
    // sort of like a event listener, where redux state determines if search bar is focused or not
    if (isSearchbarFocused) {
      searchBarRef.current.focus();
      dispatch(setSearchbarUnfocused())
    }
  }, [isSearchbarFocused]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"), 
      (snapshot) => {
        // create redux state which contains all docs, every onSnapshot listen update the state with dispatch
        snapshot.docs.map(doc => ({
          ...doc.data()
        }))
      },
      (error) => {
        console.error(error)
      });
    return unsubscribe
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
        <article className="post">
          <div className="post--details">
            <div className="user--details">
                <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" height="40" width="40"></img>
                <h3>Anonymous</h3>
              </div>
              <small className="understated">
                Jan 21, 2024
              </small>
            </div>
          <section className="post-content">
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, voluptas aspernatur obcaecati porro sunt libero excepturi quibusdam fugiat amet numquam non, praesentium iste vero eveniet?</small>
          </section>
        </article>
        <article className="post">
          <div className="post--details">
            <div className="user--details">
                <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" height="40" width="40"></img>
                <h3>Anonymous</h3>
              </div>
              <small className="understated">
                Jan 21, 2024
              </small>
            </div>
          <section className="post-content">
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, voluptas aspernatur obcaecati porro sunt libero excepturi quibusdam fugiat amet numquam non, praesentium iste vero eveniet?</small>
          </section>
        </article>
        <article className="post">
          <div className="post--details">
            <div className="user--details">
                <img className="profile--img" src="https://th.bing.com/th/id/R.03e726787c9f981a4954f521a80424af?rik=Ceuu5CZ8AH5Msw&riu=http%3a%2f%2fcreativeartsworkshop.org%2fwp-content%2fuploads%2f2020%2f02%2fblank-profile-picture-973460_960_720-300x300-1-300x300.png&ehk=J%2bDw294HSHRvhlyrl6fvIPVYRvi7ZoffP0BxPNVmtgw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" height="40" width="40"></img>
                <h3>Anonymous</h3>
              </div>
              <small className="understated">
                Jan 21, 2024
              </small>
            </div>
          <section className="post-content">
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, voluptas aspernatur obcaecati porro sunt libero excepturi quibusdam fugiat amet numquam non, praesentium iste vero eveniet?</small>
          </section>
        </article>
      </div>
    </div>
  )
}
