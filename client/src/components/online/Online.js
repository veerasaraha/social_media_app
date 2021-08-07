import './Online.css'
import PropTypes from 'prop-types'

const Online = ({ user }) => {
  const { profilePicture, username } = user
  return (
    <>
      <li className='rightbarFriend'>
        <div className='rightbarProfileImgContainer'>
          <img className='rightbarProfileImg' src={profilePicture} alt='' />
          <span className='rightbarOnline'></span>
        </div>
        <span className='rightbarUsername'>{username}</span>
      </li>
    </>
  )
}

Online.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Online
