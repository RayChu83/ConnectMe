import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

import Google from "../Images/googleLogo.png"
import { auth, db, provider } from '../Firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'

export default function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [error, setError] = useState("")
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
      .then(async (userCredential) => {
        const userId = userCredential.user.uid
        const email = userCredential.user.email
        await setDoc(doc(db, "users", userId), {
          username : formData.username,
          description : "",
          userId : userId,
          email : email,
          followers : [],
          following : [],
        })
      })
      .catch(err => setError(err.message))
  }
  const googleRegister = () => {
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid
        const email = userCredential.user.email
        const username = userCredential.user.displayName
        await setDoc(doc(db, "users", userId), {
          username : username.substring(0, 20),
          description : "",
          userId : userId,
          email : email,
          followers : [],
          following : [],
        })
      })
      .catch(err => setError(err.message))
  }
  return (
    <section>
      <h1>Register and Join us<br /> today.</h1>
      <p className='understated danger--text'>{error && `* ${error}`}</p>
      <form className='account--access--forms' onSubmit={handleSubmit}>
        <label htmlFor="login--username">Username:</label>
        <input name='username' onChange={updateFormData} value={formData.username} type="text" placeholder='Username (Max 20 Characters)' id='login--username' maxLength="20" minLength="3" required autoComplete='true'/>
        <label htmlFor="login--email">Email Address:</label>
        <input name='email' onChange={updateFormData} value={formData.email} type="text" placeholder='Email Address' id='login--email' required autoComplete='true'/>
        <label htmlFor="login--password">Password:</label>
        <input name='password' onChange={updateFormData} value={formData.password} type={isPasswordShown ? "text" : "password"} placeholder='Password' id='login--password' minLength="8" required autoComplete='true'/>
        <small className='understated pointer' onClick={changePasswordVisibility}>{isPasswordShown ? "Hide Password" : "Show Password"}</small>
        <button className='google--account--access' type='button' onClick={googleRegister}><img src={Google} alt="Google Logo" height="16"/>Register With Google</button>
        <button className='cta expand'>Register</button>
      </form>
      <small>Already have an existing account, <strong><Link to="/login" replace>Login</Link></strong></small>
    </section>
  )
}
