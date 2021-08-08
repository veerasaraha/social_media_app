import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from './AuthActions'

const AuthReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN_REQUEST:
      return {
        user: null,
        isFetching: true,
        error: false,
      }
    case LOGIN_SUCCESS:
      return {
        user: payload,
        isFetching: false,
        error: false,
      }
    case LOGIN_FAIL:
      return {
        user: null,
        isFetching: false,
        error: payload,
      }
    default:
      return state
  }
}

export default AuthReducer
