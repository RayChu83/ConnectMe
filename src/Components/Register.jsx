import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import Google from "../Images/googleLogo.png"
import { auth } from '../Firebase/firebase'

export default function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const changePasswordVisibility = () => {
    setIsPasswordShown(prevState => !prevState)
  }
  const [formData, setFormData] = useState({username : "", email : "", password : ""})
  const updateFormData = (e) => {
    const {name, value} = e.target
    setFormData(prevState => ({...prevState, [name] : value}))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = formData
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => console.log("User signed up!"))
      .catch(err => console.error(err.message))
  }
  return (
    <section>
      <h1>Register and Join us<br /> today.</h1>
      <form className='account--access--forms' onSubmit={handleSubmit}>
        <label htmlFor="login--username">Username:</label>
        <input name='username' onChange={updateFormData} type="text" placeholder='Username (Max 20 Characters)' id='login--username' maxLength="20" minLength="3" required/>
        <label htmlFor="login--email">Email Address:</label>
        <input name='email' onChange={updateFormData} type="text" placeholder='Email Address' id='login--email' required/>
        <label htmlFor="login--password">Password:</label>
        <input name='password' onChange={updateFormData} type={isPasswordShown ? "text" : "password"} placeholder='Password' id='login--password' minLength="8" required/>
        <small className='understated pointer' onClick={changePasswordVisibility}>{isPasswordShown ? "Hide Password" : "Show Password"}</small>
        <button className='google--account--access' type='button'><img src={Google} alt="Google Logo" height="16"/>Register With Google</button>
        <button className='cta expand'>Register</button>
      </form>
      <small>Already have an existing account, <strong><Link to="/login" replace>Login</Link></strong></small>
    </section>
  )
}
