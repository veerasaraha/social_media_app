import { useContext } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './pages/home/Home'
import Messenger from './pages/messenger/Messenger'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          {user ? <Home /> : <Redirect to='/register' />}
        </Route>
        <Route path='/login' exact>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/register' exact>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>

        <Route path='/messenger' exact>
          {!user ? <Redirect to='/' /> : <Messenger />}
        </Route>
        <Route path='/profile/:username' exact component={Profile} />
      </Switch>
    </Router>
  )
}

export default App
