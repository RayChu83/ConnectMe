import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import "../styles/nav.css"
import navLogo from "../Images/ConnectMe.png"
import { setSearchbarFocused } from '../Redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function NavigationBar() {
  const [navDropdown, setNavDropdown] = useState(false)
  const loggedInUser = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()
  const toggleSearchbarFocus = () => {
    dispatch(setSearchbarFocused())
  }

  const toggleNavDropdown = () => {
    setNavDropdown(prevState => !prevState)
  }
  const hideDropdown = () => {
    setNavDropdown(false)
  }
  return (
    <nav>
      <section id='nav--firstrow'>
        <Link to="/" id='nav--logo'>
          <img src={navLogo} alt="ConnectMe Logo"></img>
        </Link>
        <i className="fa-solid fa-bars nav--bars" style={{display: "none"}} onClick={toggleNavDropdown}></i>
      </section>
      <ul style={navDropdown ? {display: "flex"} : null}>
        <li onClick={hideDropdown}><NavLink to="/"><i className="fa-solid fa-house understated"></i></NavLink></li>
        <li onClick={hideDropdown}><NavLink to="/about"><i className="fa-solid fa-circle-info understated"></i></NavLink></li>
        <li onClick={() => {toggleSearchbarFocus(); hideDropdown()}}><Link to="/"><i className="fa-solid fa-magnifying-glass understated"></i></Link></li>
        <li onClick={hideDropdown}><NavLink to={`/user/${loggedInUser?.userId}`}><i className="fa-solid fa-user understated"></i></NavLink></li>
      </ul>
    </nav>
  )
}
