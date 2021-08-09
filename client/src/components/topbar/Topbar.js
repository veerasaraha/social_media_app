import { useContext } from 'react'
import './Topbar.css'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Topbar = () => {
  const { user } = useContext(AuthContext)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER
  const { profilePicture, username } = user

  return (
    <div className='topbarcontainer'>
      <div className='topbarleft'>
        <Link to='/'>
          <span className='logo'>social - connect</span>
        </Link>
      </div>
      <div className='topbarcenter'>
        <div className='searchbar'>
          <Search className='searchicon' />
          <input
            type='text'
            placeholder='Search for frined, post or video'
            className='searchinput'
          />
        </div>
      </div>
      <div className='topbarright'>
        <div className='topbarlinks'>
          <span className='topbarlink'>Homepage</span>
          <span className='topbarlink'>Timeline</span>
        </div>
        <div className='topbaricons'>
          <div className='topbariconitem'>
            <Person />
            <span className='topbariconbadge'>1</span>
          </div>
          <div className='topbariconitem'>
            <Chat />
            <span className='topbariconbadge'>2</span>
          </div>
          <div className='topbariconitem'>
            <Notifications />
            <span className='topbariconbadge'>1</span>
          </div>
        </div>
        <Link to={`/profile/${username}`}>
          <img
            src={
              profilePicture
                ? publicFolder + profilePicture
                : publicFolder + 'person/noAvatar.png'
            }
            alt=''
            className='topbarImg'
          />
        </Link>
      </div>
    </div>
  )
}

export default Topbar
