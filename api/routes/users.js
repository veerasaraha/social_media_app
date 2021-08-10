const router = require('express').Router()
const User = require('../models/User')
const { hashPassword } = require('../utils')

// Route       @ /:id
// Methdod     @ PUT
// Description @ Update user profile
// Access      @ Private Route
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await hashPassword(req.body.password)
      } catch (error) {
        return res.status(500).json(error)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })

      res.status(200).json({
        message: 'Account has been updated',
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json({
      error: 'You can update only your account',
    })
  }
})

// Route       @ /:id
// Methdod     @ DELETE
// Description @ Delete user profile
// Access      @ Private Route
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({
        message: 'Accoun has been deleted',
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json({
      error: 'You can update only your account',
    })
  }
})

// Route       @ /
// Methdod     @ GET
// Description @ Get user profile
// Access      @ Private Route
router.get('/', async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username

  try {
    const user = userId
      ? await User.findById(userId).select('-password -updatedAt')
      : await User.findOne({ username }).select('-password -updatedAt')

    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// Route       @ /friends
// Methdod     @ GET
// Description @ Get user profile
// Access      @ Private Route
router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId)
      })
    )

    let friendsList = []

    friends.map((frined) => {
      const { _id, username, profilePicture } = frined
      friendsList.push({ _id, username, profilePicture })
    })
    res.status(200).json(friendsList)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /:id/follow
// Methdod     @ PUT
// Description @ Update user profile
// Access      @ Private Route
router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: req.params.id } })

        res.status(200).json({
          message: 'User has been followed',
        })
      } else {
        return res.status(403).json({
          error: 'you already follow this user',
        })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json("You can't follow yourself")
  }
})

// Route       @ /:id/unfollow
// Methdod     @ PUT
// Description @ Update user profile
// Access      @ Private Route
router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.params.id } })

        res.status(200).json({
          message: 'User has been unfollowed',
        })
      } else {
        return res.status(403).json({
          error: 'you don`t follow this user',
        })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    return res.status(403).json("You can't follow yourself")
  }
})

module.exports = router
