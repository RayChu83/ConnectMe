import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { auth, db, provider } from '../Firebase/firebase'

import Google from "../Images/googleLogo.png"
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default function Login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [error, setError] = useState("")
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
      .then(() => {
        console.log("logged in")
      })
      .catch(err => setError(err.message))
  }
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (userCredential) => {
        // checks for user, if not create a user document in db
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
      }
      )
      .catch(err => setError(err.message))
  }
  return (
    <section>
      <h1>Log In to an existing <br /> account.</h1>
      <p className='understated danger--text'>{error && `* ${error}`}</p>
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
