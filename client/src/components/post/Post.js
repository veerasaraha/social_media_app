import './Post.css'
import { MoreVert } from '@material-ui/icons'

const Post = () => {
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              className='postProfileImg'
              src='/assest/person/1.jpeg'
              alt=''
            />
            <span className='postUsername'>laura</span>
            <span className='postDate'>5 min ago</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>Hey! it's my first post:)</span>
          <img src='/assest/post/1.jpeg' alt='' className='postImg' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img className='likeIcon' src='/assest/like.png' alt='' />
            <img className='likeIcon' src='/assest/heart.png' alt='' />
            <span className='postLikeCounter'>32 people liked</span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>9 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
