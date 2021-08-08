import PropTypes from 'prop-types'
import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'

const Rightbar = ({ userInfo }) => {
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
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

    const { city, from, relationship } = userInfo

    return (
      <>
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City :</span>
            <span className='rightbarInfoValue'>{city}</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From :</span>
            <span className='rightbarInfoValue'>{from}</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship :</span>
            <span className='rightbarInfoValue'>{relationship}</span>
          </div>

          <h4 className='rightbarTitle'>User Friends</h4>

          <div className='rightbarFollowings'>
            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src='/assets/person/1.jpeg'
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src={publicFolder + 'person/2.jpeg'}
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src={publicFolder + 'person/3.jpeg'}
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src={publicFolder + 'person/4.jpeg'}
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src={publicFolder + 'person/5.jpeg'}
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {userInfo ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

Rightbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
}

export default Rightbar
