import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { signOut } from "firebase/auth";

import "../styles/nav.css"
import navLogo from "../Images/ConnectMe.png"
import { setSearchbarFocused } from '../Redux/actions/actions'
import { useDispatch } from 'react-redux'
import { auth } from '../Firebase/firebase';

export default function NavigationBar() {
  const [navDropdown, setNavDropdown] = useState(false)
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
  const toggleNavDropdown = () => {
    setNavDropdown(prevState => !prevState)
  }
  return (
    <nav>
      <Link to="/" id='nav--logo'>
        <img src={navLogo} alt="ConnectMe Logo"></img>
      </Link>
      <i className="fa-solid fa-bars nav--bars" style={{display: "none"}} onClick={toggleNavDropdown}></i>
      <ul style={navDropdown ? {display: "flex"} : null}>
        <li><NavLink to="/"><i className="fa-solid fa-house"></i></NavLink></li>
        <li><NavLink to="/about"><i className="fa-solid fa-circle-info"></i></NavLink></li>
        <li onClick={toggleSearchbarFocus}><Link to="/"><i className="fa-solid fa-magnifying-glass"></i></Link></li>
        <li onClick={() => signUserOut()}><i className="fa-solid fa-user"></i></li>
      </ul>
    </nav>
  )
}
