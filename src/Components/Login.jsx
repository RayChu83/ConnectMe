import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <section>
      <h1>Log In to an existing <br /> account.</h1>
      <form className='account--access--forms'>
        <label htmlFor="login--email">Email Address:</label>
        <input type="text" placeholder='Email Address' id='login--email' required/>
        <label htmlFor="login--password">Password:</label>
        <input type="password" placeholder='Password' id='login--password' required/>
        <button className='cta expand'>Login</button>
      </form>
      <small>Don't have an account, <Link to="/register">Register</Link></small>
    </section>
  )
}
