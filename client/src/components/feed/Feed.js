import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`posts/profile/${username}`)
        : await axios.get('posts/timeline/610ce86b98fccb2107b86346')
      setPosts(response.data)
    }
    fetchPosts()
  }, [username])

  console.log(posts)
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  )
}

Feed.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Feed
