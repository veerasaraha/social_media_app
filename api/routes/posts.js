const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')

// Route       @ /
// Methdod     @ POST
// Description @ Create new post
// Access      @ Private Route
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /:id
// Methdod     @ PUT
// Description @ Update post by ID
// Access      @ Private Route
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body })

      return res.status(200).json({
        message: 'Post has been updated',
      })
    } else {
      res.status(403).json({
        error: 'you can update only your post',
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /:id
// Methdod     @ DELETE
// Description @ Delete post by ID
// Access      @ Private Route
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId === req.body.userId) {
      await post.deleteOne()

      return res.status(200).json({
        message: 'the post has been deleted',
      })
    } else {
      res.status(403).json({
        error: 'you can delete only your post',
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /:id/like
// Methdod     @ PUT
// Description @ Like post
// Access      @ Private Route
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } })
      res.status(200).json({
        message: 'Post has been liked',
      })
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } })
      res.status(200).json({
        message: 'Post has been disliked',
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /:id
// Methdod     @ GET
// Description @ Get post by ID
// Access      @ Private Route
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /timeline
// Methdod     @ GET
// Description @ Get posts
// Access      @ Private Route
router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)

    const userPosts = await Post.find({ userId: currentUser._id })

    const friendsPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId })
      })
    )
    let postsArray = userPosts.concat(...friendsPosts)
    res.status(200).json(postsArray)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
