import './Friend.css'
import PropTypes from 'prop-types'

const Friend = ({ user }) => {
  const { profilePicture, username } = user
  return (
    <>
      <li className='sidebarFriend'>
        <img src={profilePicture} alt='' className='sidebarFriendImage' />
        <span className='sidebarFriendName'>{username}</span>
      </li>
    </>
  )
}

Friend.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Friend
