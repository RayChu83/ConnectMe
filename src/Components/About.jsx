import React from 'react'

import logoSharpened from "../Images/ConnectMeSharpened.png"
import "../styles/about.css"

export default function About() {
  return (
    <main id="about--container">
      <img src={logoSharpened} alt="ConnectMe Logo"></img>
      <article>
          <h1 className='overstated'>Who we are...</h1>
          <p><strong>ConnectMe</strong> is a Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, et voluptatum at quos officiis adipisci placeat voluptatem vel doloribus consectetur maxime, architecto magni esse? Veniam!</p>
      </article>
    </main>
  )
}