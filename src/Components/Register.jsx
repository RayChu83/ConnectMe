import React from 'react'
import { Link } from 'react-router-dom'
import Google from "../Images/googleLogo.png"

export default function Register() {
  return (
    <section>
      <h1>Register and Join us<br /> today.</h1>
      <form className='account--access--forms'>
      <label htmlFor="login--email">Username:</label>
        <input type="text" placeholder='Username' id='login--email' required/>
        <label htmlFor="login--email">Email Address:</label>
        <input type="text" placeholder='Email Address' id='login--email' required/>
        <label htmlFor="login--password">Password:</label>
        <input type="password" placeholder='Password' id='login--password' required/>
        <small className='understated'>Show Password</small>
        <button className='google--account--access' type='button'><img src={Google} alt="Google Logo" height="25"/>Register With Google</button>
        <button className='cta expand'>Register</button>
      </form>
      <small>Already have an existing account, <strong><Link to="/login" replace>Login</Link></strong></small>
    </section>
  )
}
