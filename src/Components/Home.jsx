import React from 'react'
import HomeSectionOne from './HomeSectionOne'
import HomeSectionTwo from './HomeSectionTwo'
import HomeSectionThree from './HomeSectionThree'
import "../styles/homeSections.css"

export default function Home() {
  return (
    <main id='sections--container'>
      <HomeSectionOne />
      <HomeSectionTwo />
      <HomeSectionThree />
    </main>
  )
}
