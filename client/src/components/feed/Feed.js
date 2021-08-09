import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'
import { AuthContext } from '../../context/AuthContext'

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)
  const { _id } = user

  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/api/posts/profile/${username}`)
        : await axios.get(`/api/posts/timeline/${_id}`)
      setPosts(response.data)
    }
    fetchPosts()
  }, [username, _id])

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
