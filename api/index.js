const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
dotenv.config()
const DBConnection = require('./DB')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')

// DB Connection
DBConnection()

// Middleware
const options = {
  origin: 'http://127.0.0.1:3000',
  credentials: true,
}
app.use(cors(options))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('common'))

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

const PORT = process.env.PORT || 5500
app.listen(PORT, () =>
  console.log(`Server listenng for request at port ${PORT}...`)
)
