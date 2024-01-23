import React from 'react'

import "../styles/nav.css"
import "../Images/ConnectMe.png"

export default function NavigationBar() {
  return (
    <nav>
      <img src="ConnectMe.png" alt="ConnectMe Logo"></img>
      <i class="fa-solid fa-bars nav--bars" style={{display: "none"}}></i>
      <ul>
        <li><i class="fa-solid fa-house"></i></li>
        <li><i class="fa-solid fa-circle-info"></i></li>
        <li><i class="fa-solid fa-magnifying-glass"></i></li>
        <li><i class="fa-solid fa-user"></i></li>
      </ul>
    </nav>
  )
}
