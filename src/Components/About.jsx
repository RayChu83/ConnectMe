import React from 'react'

import logoSharpened from "../Images/ConnectMeSharpened.png"
import "../styles/about.css"

export default function About() {
  return (
    <main id="about--container">
      <img src={logoSharpened} alt="ConnectMe Logo"></img>
      <article>
          <h1 className='overstated'>Who we are...</h1>
          <p><strong>ConnectMe</strong> is a online social network where users can create and interact with posts, adjust profiles, connect with others by following & more. Our beloved developer Ray Chu took ConnectMe from a concept to completion, overseeing every aspect of its development. </p>
      </article>
    </main>
  )
}