import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase/firebase'

import Google from "../Images/googleLogo.png"
import { signInWithEmailAndPassword } from 'firebase/auth'

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
  const handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = formData
    signInWithEmailAndPassword(auth, email, password)
      .then(() => console.log("User Logged in!"))
      .catch(err => console.error(err.message))
  }
  return (
    <section>
      <h1>Log In to an existing <br /> account.</h1>
      <form className='account--access--forms' onSubmit={handleSubmit}>
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
