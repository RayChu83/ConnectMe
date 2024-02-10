import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  return (
    <main style={{textAlign : "center"}}>
      <p className='understated'>The page you were looking for does not exist! Please try again later.</p>
      <button onClick={navigateBack} className='cta'>Go Back</button>
    </main>
  )
}
