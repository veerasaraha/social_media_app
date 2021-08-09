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
  const API_URL = process.env.REACT_APP_API_URL

  const sortPosts = (arr) => {
    return arr.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt))
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`${API_URL}/api/posts/profile/${username}`)
        : await axios.get(`${API_URL}/api/posts/timeline/${_id}`)
      setPosts(sortPosts(response.data))
    }
    fetchPosts()
  }, [API_URL, username, _id])

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
