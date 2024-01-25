import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from "firebase/auth";

import "../styles/nav.css"
import navLogo from "../Images/ConnectMe.png"
import { setSearchbarFocused } from '../Redux/actions/actions'
import { useDispatch } from 'react-redux'
import { auth } from '../Firebase/firebase';

export default function NavigationBar() {
  const dispatch = useDispatch()
  const toggleSearchbarFocus = () => {
    dispatch(setSearchbarFocused())
  }
  function signUserOut() {
    console.log("I was ran")
    signOut(auth).then(() => {
      console.log("success")
    }).catch((error) => {
      console.error(error)
    });
  } 
  return (
    <nav>
      <Link to="/">
        <img src={navLogo} alt="ConnectMe Logo"></img>
      </Link>
      <i className="fa-solid fa-bars nav--bars" style={{display: "none"}}></i>
      <ul>
        <li><i className="fa-solid fa-house"></i></li>
        <li><i className="fa-solid fa-circle-info"></i></li>
        <li onClick={toggleSearchbarFocus}><i className="fa-solid fa-magnifying-glass"></i></li>
        <li onClick={() => signUserOut()}><i className="fa-solid fa-user"></i></li>
      </ul>
    </nav>
  )
}
