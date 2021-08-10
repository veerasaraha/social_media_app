import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './Profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'

const Profile = () => {
  const [user, setUser] = useState({})
  const USER_NAME = useParams().username
  const API_URL = process.env.REACT_APP_API_URL
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `${API_URL}/api/users?username=${USER_NAME}`
      )
      setUser(response.data)
    }
    fetchUser()
  }, [API_URL, USER_NAME])

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
                  user.coverPicture
                    ? publicFolder + user.coverPicture
                    : publicFolder + 'person/noCover.png'
                }
                alt=''
              />
              <img
                className='profileUserImg'
                src={
                  user.profilePicture
                    ? publicFolder + user.profilePicture
                    : publicFolder + 'person/noAvatar.png'
                }
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className='profileInfoDesc'>{user.bio && user.bio}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={USER_NAME} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
