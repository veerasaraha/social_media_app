import './Rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'

const Rightbar = ({ profile }) => {
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
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City :</span>
            <span className='rightbarInfoValue'>Chennai</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From :</span>
            <span className='rightbarInfoValue'>India</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship :</span>
            <span className='rightbarInfoValue'>Single</span>
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
                src='/assets/person/2.jpeg'
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src='/assets/person/3.jpeg'
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src='/assets/person/4.jpeg'
                alt=''
              />
              <span className='rightbarFollowingName'>John carts</span>
            </div>

            <div className='rightbarFollowing'>
              <img
                className='rightbarFollowingImg'
                src='/assets/person/5.jpeg'
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
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
