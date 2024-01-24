import React from 'react'
import { Link } from 'react-router-dom'

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
        <button className='cta expand'>Register</button>
      </form>
      <small>Already have an existing account, <Link to="/login">Login</Link></small>
    </section>
  )
}
