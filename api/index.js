const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const multer = require('multer')
const DBConnection = require('./DB')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const path = require('path')

dotenv.config()

// DB Connection
DBConnection()

// Middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('common'))

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/')
  },
  filename: (req, file, cb) => {
    console.log(req.body)
    cb(null, req.body.name)
  },
})
const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('file uploaded successfully...')
  } catch (error) {
    console.log(error)
  }
})

// Routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)

const PORT = process.env.PORT || 5500
app.listen(PORT, () =>
  console.log(`Server listenng for request at port ${PORT}...`)
)
