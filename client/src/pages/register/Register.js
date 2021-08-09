import axios from 'axios'
import { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './Register.css'

const Register = () => {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const history = useHistory()

  const submitaHandler = async (event) => {
    event.preventDefault()

    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Passwords does't match")
    } else {
      const userCredentials = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }

      try {
        const response = await axios.post('api/auth/register', userCredentials)
        console.log(response.data.isRegistered)
        if (response.data.isRegistered) {
          history.push('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='register'>
      <div className='registerWrapper'>
        <div className='registerLeft'>
          <h3 className='registerLogo'>Social Connect</h3>
          <span className='registerDesc'>
            Connect with friends and the world around you on social-connect.
          </span>
        </div>
        <div className='registerRight'>
          <form className='registerBox' onSubmit={submitaHandler}>
            <input
              className='registerInput'
              type='text'
              ref={username}
              required
              placeholder='Username'
            />
            <input
              className='registerInput'
              type='email'
              ref={email}
              required
              placeholder='Email'
            />
            <input
              className='registerInput'
              type='password'
              ref={password}
              required
              minLength='6'
              placeholder='Password'
            />
            <input
              className='registerInput'
              type='password'
              ref={confirmPassword}
              required
              placeholder='Confirm Password'
            />
            <button className='registerButton'>Sign Up</button>

            <Link to='/login' className='registerLoginLink'>
              <button className='registerLoginButton'>
                Login into account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
