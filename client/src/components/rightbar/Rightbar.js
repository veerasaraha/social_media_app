import './Rightbar.css'

const Rightbar = () => {
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='/assest/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className='rightbarAd' src='assest/ad.png' alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img
                className='rightbarProfileImg'
                src='/assest/person/3.jpeg'
                alt=''
              />
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>John carter</span>
          </li>

          <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img
                className='rightbarProfileImg'
                src='/assest/person/3.jpeg'
                alt=''
              />
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>John carter</span>
          </li>

          <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img
                className='rightbarProfileImg'
                src='/assest/person/3.jpeg'
                alt=''
              />
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>John carter</span>
          </li>

          <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img
                className='rightbarProfileImg'
                src='/assest/person/3.jpeg'
                alt=''
              />
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>John carter</span>
          </li>

          <li className='rightbarFriend'>
            <div className='rightbarProfileImgContainer'>
              <img
                className='rightbarProfileImg'
                src='/assest/person/3.jpeg'
                alt=''
              />
              <span className='rightbarOnline'></span>
            </div>
            <span className='rightbarUsername'>John carter</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Rightbar
