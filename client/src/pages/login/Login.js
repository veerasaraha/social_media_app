import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../api'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import './Login.css'

const Login = () => {
  const email = useRef()
  const password = useRef()
  const { isFetching, dispatch } = useContext(AuthContext)

  const hanldeSubmit = (event) => {
    event.preventDefault()

    login(
      { email: email.current.value, password: password.current.value },
      dispatch
    )
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social Connect</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on social-connect.
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={hanldeSubmit}>
            <input
              ref={email}
              required
              className='loginInput'
              type='email'
              placeholder='Email'
            />
            <input
              ref={password}
              required
              minLength='6'
              className='loginInput'
              type='password'
              placeholder='Password'
            />
            <button className='loginButton' disabled={isFetching}>
              {isFetching ? (
                <CircularProgress style={{ color: 'white' }} size='20px' />
              ) : (
                'Log In'
              )}
            </button>
            <span className='loginForgot'>Forgot Password?</span>

            <Link to='/register' className='loginRegisterLink'>
              <button className='loginRegisterButton'>
                Create a new account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
