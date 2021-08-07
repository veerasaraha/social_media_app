import './Register.css'

const Register = () => {
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
          <div className='registerBox'>
            <input
              className='registerInput'
              type='text'
              placeholder='Username'
            />
            <input className='registerInput' type='email' placeholder='Email' />
            <input
              className='registerInput'
              type='password'
              placeholder='Password'
            />
            <input
              className='registerInput'
              type='password'
              placeholder='Password Again'
            />
            <button className='registerButton'>Sign Up</button>
            <button className='registerRegisterButton'>
              Login into account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
