import React from 'react'
import { useNavigate } from 'react-router-dom'
import error from "../Images/404.png"

export default function ErrorPage() {
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  return (
    <main className='top--padding text--center'>
      <img src={error} alt="404 Icon" id='error'/>
      <p className='understated'>Error 404, Page Not Found, <span className='text--cta pointer' onClick={navigateBack}>Go back</span></p>
    </main>
  )
}
