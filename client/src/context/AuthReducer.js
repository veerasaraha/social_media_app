import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FOLLOW,
  UNFOLLOW,
} from './AuthActions'

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
    case FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, payload],
        },
      }
    case UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter((f) => f !== payload),
        },
      }
    default:
      return state
  }
}

export default AuthReducer
