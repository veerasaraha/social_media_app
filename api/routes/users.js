const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { hashPassword } = require('../utils')

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
      message: 'successfully created new account',
      user,
    })
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = router
