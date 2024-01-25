import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Google from "../Images/googleLogo.png"

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
  console.log(formData)
  return (
    <section>
      <h1>Register and Join us<br /> today.</h1>
      <form className='account--access--forms'>
        <label htmlFor="login--username">Username:</label>
        <input name='username' onChange={updateFormData} type="text" placeholder='Username' id='login--username' required/>
        <label htmlFor="login--email">Email Address:</label>
        <input name='email' onChange={updateFormData} type="text" placeholder='Email Address' id='login--email' required/>
        <label htmlFor="login--password">Password:</label>
        <input name='password' onChange={updateFormData} type={isPasswordShown ? "text" : "password"} placeholder='Password' id='login--password' required/>
        <small className='understated pointer' onClick={changePasswordVisibility}>{isPasswordShown ? "Hide Password" : "Show Password"}</small>
        <button className='google--account--access' type='button'><img src={Google} alt="Google Logo" height="25"/>Register With Google</button>
        <button className='cta expand'>Register</button>
      </form>
      <small>Already have an existing account, <strong><Link to="/login" replace>Login</Link></strong></small>
    </section>
  )
}
