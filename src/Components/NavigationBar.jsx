import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import "../styles/nav.css"
import "../Images/ConnectMe.png"
import { setLoggedInTrue, setSearchbarFocused } from '../Redux/actions/actions'

export default function NavigationBar() {
  const dispatch = useDispatch()
  const toggleSearchbarFocus = () => {
    dispatch(setSearchbarFocused())
  }
  const login = () => {
    dispatch(setLoggedInTrue())
  }
  return (
    <nav>
      <Link to="/">
        <img src="ConnectMe.png" alt="ConnectMe Logo"></img>
      </Link>
      <i className="fa-solid fa-bars nav--bars" style={{display: "none"}}></i>
      <ul>
        <li><i className="fa-solid fa-house"></i></li>
        <li><i className="fa-solid fa-circle-info"></i></li>
        <li onClick={toggleSearchbarFocus}><i className="fa-solid fa-magnifying-glass"></i></li>
        <li onClick={login}><i className="fa-solid fa-user"></i></li>
      </ul>
    </nav>
  )
}
