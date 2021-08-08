import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import './Post.css'
import { MoreVert } from '@material-ui/icons'

const Post = ({ post }) => {
  const { description, img, userId, likes, createdAt, comment } = post

  const [like, setLike] = useState(likes.length)
  const [user, setUser] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`users/${userId}`)
      setUser(response.data)
    }

    fetchUser()
  }, [userId])

  const { username, profilePicture } = user

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${username}`}>
              <img
                className='postProfileImg'
                src={
                  publicFolder + profilePicture ||
                  publicFolder + 'person/noAvatar.png'
                }
                alt=''
              />
            </Link>
            <span className='postUsername'>{username}</span>
            <span className='postDate'>{format(createdAt)} </span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{description && description}</span>
          <img className='postImg' src={publicFolder + img} alt='' />
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
            <span className='postLikeCounter'>{like} people liked</span>
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
