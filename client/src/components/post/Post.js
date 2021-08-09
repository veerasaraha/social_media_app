import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import './Post.css'
import { MoreVert } from '@material-ui/icons'
import { AuthContext } from '../../context/AuthContext'

const Post = ({ post }) => {
  const {
    _id,
    description,
    img,
    userId: postUserId,
    likes,
    createdAt,
    comment,
  } = post
  const API_URL = process.env.REACT_APP_API_URL

  const { user: currentUser } = useContext(AuthContext)
  const [like, setLike] = useState(likes.length)
  const [user, setUser] = useState({})
  const [isLiked, setIsLiked] = useState(false)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    setIsLiked(likes.includes(currentUser._id))
  }, [currentUser._id, likes])

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `${API_URL}/api/users?userId=${postUserId}`
      )
      setUser(response.data)
    }

    fetchUser()
  }, [API_URL, postUserId])

  const { username, profilePicture } = user

  const likeHandler = async () => {
    try {
      await axios.put(`${API_URL}/api/posts/${_id}/like`, {
        userId: user._id,
      })
    } catch (error) {
      console.error(error)
    }
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
                  profilePicture
                    ? publicFolder + profilePicture
                    : publicFolder + 'person/noAvatar.png'
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
