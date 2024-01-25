import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import Google from "../Images/googleLogo.png"

export default function Login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const changePasswordVisibility = () => {
    setIsPasswordShown(prevState => !prevState)
  }
  const [formData, setFormData] = useState({email : "", password : ""})
  const updateFormData = (e) => {
    const {name, value} = e.target
    setFormData(prevState => ({...prevState, [name] : value}))
  }
  console.log(formData)
  return (
    <section>
      <h1>Log In to an existing <br /> account.</h1>
      <form className='account--access--forms'>
        <label htmlFor="login--email">Email Address:</label>
        <input name='email' onChange={updateFormData} type="text" placeholder='Email Address' id='login--email' required/>
        <label htmlFor="login--password">Password:</label>
        <input name='password' onChange={updateFormData} type={isPasswordShown ? "text" : "password"} placeholder='Password' id='login--password' required/>
        <small className='understated pointer' onClick={changePasswordVisibility}>{isPasswordShown ? "Hide Password" : "Show Password"}</small>
        <button className='google--account--access' type='button'><img src={Google} alt="Google Logo" height="16"/>Login With Google</button>
        <button className='cta expand'>Login</button>
      </form>
      <small>Don't have an account, <strong><Link to="/register" replace>Register</Link></strong></small>
    </section>
  )
}
