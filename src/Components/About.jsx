import React from 'react'
import { Helmet } from 'react-helmet'

import logoSharpened from "../Images/ConnectMeSharpened.png"
import "../styles/about.css"

export default function About() {
  return (
    <>
      <Helmet >
        <title>About ConnectMe</title>
      </Helmet>
      <main id="about--container">
        <img src={logoSharpened} alt="ConnectMe Logo"></img>
        <article>
            <h1 className='overstated'>Who we are...</h1>
            <p><strong>ConnectMe</strong> is a online social network where users can create and interact with posts, adjust profiles, connect with others by following & more.</p>
            <h1>Our Benefits...</h1>
            <ul>
              <li>Connect with others from all over the globe.</li>
              <li>Allowed to access and share news, updates, and information instantly.</li>
              <li>Create connections among the variety of users around shared interests, hobbies, causes and more.</li>
            </ul>
        </article>
      </main>
    </>
  )
}