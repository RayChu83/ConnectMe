import React from 'react'
import { Helmet } from 'react-helmet'
import HomeSectionOne from './HomeSectionOne'
import HomeSectionTwo from './HomeSectionTwo'
import HomeSectionThree from './HomeSectionThree'
import "../styles/homeSections.css"

export default function Home() {
  return (
    <>
      <Helmet >
        <title>Home</title>
        <meta name="description" content="ConnectMe is a online social network."/>
      </Helmet>
      <main id='sections--container'>
        <HomeSectionOne />
        <HomeSectionTwo />
        <HomeSectionThree />
      </main>
    </>
  )
}
