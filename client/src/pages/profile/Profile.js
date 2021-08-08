import './Profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'

const Profile = ({ match }) => {
  const username = match.params.username

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

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
                src={publicFolder + `post/3.jpeg`}
                alt=''
              />
              <img
                className='profileUserImg'
                src={publicFolder + 'person/7.jpeg'}
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>john</h4>
              <span className='profileInfoDesc'>Hello my friends</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
