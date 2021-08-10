import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Rightbar.css'
import { Add, Remove } from '@material-ui/icons'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { AuthContext } from '../../context/AuthContext'
import { FOLLOW, UNFOLLOW } from '../../context/AuthActions'

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([])
  const { user: currentUser, dispatch } = useContext(AuthContext)

  const [isFollowing, setIsFollowing] = useState(
    currentUser.following.includes(user?._id)
  )
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const getFriednds = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/users/friends/${user._id}`
        )
        setFriends(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getFriednds()
  }, [API_URL, user])

  const followHandler = async () => {
    try {
      if (isFollowing) {
        await axios.put(`${API_URL}/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        })
        dispatch({ type: UNFOLLOW, payload: user._id })
      } else {
        await axios.put(`${API_URL}/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        })
        dispatch({ type: FOLLOW, payload: user._id })
      }

      setIsFollowing(!isFollowing)
    } catch (error) {
      console.log(error)
    }
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='/assets/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className='rightbarAd' src='assets/ad.png' alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={followHandler}>
            {isFollowing ? 'Unfollow' : 'Follow'}
            {isFollowing ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City :</span>
            <span className='rightbarInfoValue'>{user.city}</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From :</span>
            <span className='rightbarInfoValue'>{user.from}</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship :</span>
            <span className='rightbarInfoValue'>{user.relationship}</span>
          </div>

          <h4 className='rightbarTitle'>User Friends</h4>

          <div className='rightbarFollowings'>
            {friends.map((friend) => (
              <Link
                key={friend._id}
                to={`/profile/${friend.username}`}
                style={{ textDecoration: 'none', color: 'black' }}>
                <div className='rightbarFollowing'>
                  <img
                    className='rightbarFollowingImg'
                    src={
                      friend.profilePicture
                        ? publicFolder + friend.profilePicture
                        : publicFolder + 'person/noAvatar.png'
                    }
                    alt=''
                  />
                  <span className='rightbarFollowingName'>
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

Rightbar.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Rightbar
