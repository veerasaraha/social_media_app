const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
dotenv.config()
const DBConnection = require('./DB')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

// DB Connection
DBConnection()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('common'))

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 5500
app.listen(PORT, () =>
  console.log(`Server listenng for request at port ${PORT}...`)
)
