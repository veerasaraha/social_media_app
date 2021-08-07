import './Friend.css'
import PropTypes from 'prop-types'

const Friend = ({ user }) => {
  const { profilePicture, username } = user

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <>
      <li className='sidebarFriend'>
        <img
          src={publicFolder + profilePicture}
          alt=''
          className='sidebarFriendImage'
        />
        <span className='sidebarFriendName'>{username}</span>
      </li>
    </>
  )
}

Friend.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Friend
