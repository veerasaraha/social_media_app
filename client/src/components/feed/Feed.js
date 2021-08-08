import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../post/Post'
import Share from '../share/Share'
import './Feed.css'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        'posts/timeline/610ce86b98fccb2107b86346'
      )
      setPosts(response.data)
    }
    fetchPosts()
  }, [])

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

export default Feed
