const router = require('express').Router()
const User = require('../models/User')
const { hashPassword, validatePassword } = require('../utils')

// Route       @ /resgister
// Methdod     @ POST
// Description @ Create new user
// Access      @ Public Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  const newUser = new User({
    username,
    email,
    password,
  })

  // Hashing password
  newUser.password = await hashPassword(password)

  try {
    const user = await newUser.save()

    res.status(200).json({
      isRegistered: true,
      message: 'successfully created new account',
      user,
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Route       @ /login
// Methdod     @ POST
// Description @ Retrieve Existing user
// Access      @ Public Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      })
    }

    const isUserPasswordValid = await validatePassword(password, user.password)

    if (!isUserPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
      })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
