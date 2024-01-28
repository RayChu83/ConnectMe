import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { auth, db } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom';

import { setLoggedInTrue, setLoggedInFalse, setLoggedInUser, setLoggedInUserCleared, setLoggedInUsersPosts, setLoggedInUsersPostsCleared } from '../Redux/actions/actions';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';

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
        const fetchLoggedInUsersPosts = async (userId) => {
          const allUsersPosts = []
          const docRef = collection(db, "posts");
          const q = query(docRef, where("userInfo.userId", "==", userId), orderBy("created", "desc"))
          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {
            allUsersPosts.push(doc.data())
          });
          if (allUsersPosts.length === 0) {
            dispatch(setLoggedInUsersPosts(null))
          }
          else{
            dispatch(setLoggedInUsersPosts(allUsersPosts))
          }
        }
        fetchLoggedInUser()
        fetchLoggedInUsersPosts(user.uid)
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
