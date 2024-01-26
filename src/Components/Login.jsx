import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { auth, provider } from '../Firebase/firebase'

import Google from "../Images/googleLogo.png"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

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
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(res => 
        console.log("success")
      )
      .catch(err => console.error(err))
  }
  return (
    <section>
      <h1>Log In to an existing <br /> account.</h1>
      <form className='account--access--forms' onSubmit={handleSubmit}>
        <label htmlFor="login--email">Email Address:</label>
        <input name='email' onChange={updateFormData} value={formData.email} type="text" placeholder='Email Address' id='login--email' required autoComplete='true'/>
        <label htmlFor="login--password">Password:</label>
        <input name='password' onChange={updateFormData} value={formData.password} type={isPasswordShown ? "text" : "password"} placeholder='Password' id='login--password' required autoComplete='true'/>
        <small className='understated pointer' onClick={changePasswordVisibility}>{isPasswordShown ? "Hide Password" : "Show Password"}</small>
        <button className='google--account--access' type='button' onClick={googleLogin}><img src={Google} alt="Google Logo" height="16"/>Login With Google</button>
        <button className='cta expand'>Login</button>
      </form>
      <small>Don't have an account, <strong><Link to="/register" replace>Register</Link></strong></small>
    </section>
  )
}
