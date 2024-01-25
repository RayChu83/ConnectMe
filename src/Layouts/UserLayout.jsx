import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Outlet } from 'react-router-dom';

import { setLoggedInTrue, setLoggedInFalse } from '../Redux/actions/actions';

export default function UserLayout() {
  const dispatch = useDispatch()
  useEffect(() => {
      return onAuthStateChanged(auth, (user) => {
      if (user) {
          dispatch(setLoggedInTrue())
      } else {
          dispatch(setLoggedInFalse())
      }
      });
      // eslint-disable-next-line
  }, [])
  return (
    <Outlet/>
  )
}
