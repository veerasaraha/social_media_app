import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  user: {
    _id: '610ce87298fccb2107b86348',
    profilePicture: 'person/2.jpeg',
    coverPicture: '',
    followers: [],
    following: ['610ce86b98fccb2107b86346'],
    username: 'Janell',
    email: 'jack@gmail.com',
    password: '$2a$10$lRMf2I7G/8MqcaUQu1u3X.OxNRKly8vS3wisfEf5.6/qo1anMnKhm',
    createdAt: '1628235890746',
    updatedAt: '1628432998751',
    bio: 'All is well.',
    city: 'Chennai',
    from: 'India',
    relationship: 'Single',
  },
  isFetching: false,
  error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
