import axios from 'axios'
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from './context/AuthActions'

export const login = async (userCredentials, dispatch) => {
  const API_URL = process.env.REACT_APP_API_URL

  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await axios.post(
      `${API_URL}api/auth/login`,
      userCredentials
    )

    dispatch({ type: LOGIN_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error })
  }
}
