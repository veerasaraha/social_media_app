import './Post.css'
import { MoreVert } from '@material-ui/icons'
import { Users } from '../../dummyData'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Post = ({ post }) => {
  const { desc, photo, date, userId, like, comment } = post

  const [likes, setLikes] = useState(like)
  const [isLiked, setIsLiked] = useState(false)

  const likeHandler = () => {
    setLikes(isLiked ? likes - 1 : likes + 1)
    setIsLiked(!isLiked)
  }

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  const userName = Users.filter((user) => user.id === userId)[0].username

  const profilePicture = Users.filter((user) => user.id === userId)[0]
    .profilePicture

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              className='postProfileImg'
              src={publicFolder + profilePicture}
              alt=''
            />
            <span className='postUsername'>{userName}</span>
            <span className='postDate'>{date} </span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{desc && desc}</span>
          <img src={publicFolder + photo} alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={publicFolder + '/like.png'}
              alt=''
              onClick={likeHandler}
            />
            <img
              className='likeIcon'
              src={publicFolder + '/heart.png'}
              alt=''
            />
            <span className='postLikeCounter'>{likes} people liked</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
}

export default Post
