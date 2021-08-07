import './Online.css'
import PropTypes from 'prop-types'

const Online = ({ user }) => {
  const { profilePicture, username } = user
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <>
      <li className='rightbarFriend'>
        <div className='rightbarProfileImgContainer'>
          <img
            className='rightbarProfileImg'
            src={publicFolder + profilePicture}
            alt=''
          />
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
