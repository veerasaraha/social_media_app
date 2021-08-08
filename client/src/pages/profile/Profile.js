import { useEffect, useState } from 'react'
import axios from 'axios'
import './Profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'

const Profile = ({ match }) => {
  const [user, setUser] = useState({})

  const USER_NAME = match.params.username

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users?username=${USER_NAME}`)
      setUser(response.data)
    }
    fetchUser()
  }, [USER_NAME])

  const { username, bio, profilePicture, coverPicture } = user

  return (
    <div>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={
                  coverPicture
                    ? publicFolder + coverPicture
                    : publicFolder + 'person/noCover.png'
                }
                alt=''
              />
              <img
                className='profileUserImg'
                src={
                  profilePicture
                    ? publicFolder + profilePicture
                    : publicFolder + 'person/noAvatar.png'
                }
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{username}</h4>
              <span className='profileInfoDesc'>{bio && bio}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar userInfo={user} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
