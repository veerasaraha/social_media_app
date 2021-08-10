export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const FOLLOW = 'FOLLOW'
export const UNFOLLOW = 'UNFOLLOW'

export const LoginRequest = (userCredentials) => ({
  type: LOGIN_REQUEST,
})

export const LoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
})

export const LoginFail = (error) => ({
  type: LOGIN_FAIL,
  payload: error,
})

export const Follow = (userId) => ({
  type: FOLLOW,
  payload: userId,
})

export const Unfollow = (userId) => ({
  type: UNFOLLOW,
  payload: userId,
})
