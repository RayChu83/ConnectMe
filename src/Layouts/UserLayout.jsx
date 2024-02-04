import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { auth, db } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom';

import { setLoggedInTrue, setLoggedInFalse, setLoggedInUser, setLoggedInUserCleared, setLoggedInUsersPostsCleared } from '../Redux/actions/actions';
import { doc, getDoc} from 'firebase/firestore';

export default function UserLayout() {
  const dispatch = useDispatch()
  useEffect(() => {
      return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLoggedInTrue())
        async function fetchLoggedInUser() {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          dispatch(setLoggedInUser(docSnap.data()))
        }
        fetchLoggedInUser()
      } else {
        dispatch(setLoggedInFalse())
        dispatch(setLoggedInUserCleared())
        dispatch(setLoggedInUsersPostsCleared())
      }
      });
      // eslint-disable-next-line
  }, [])
  return (
    <Outlet/>
  )
}