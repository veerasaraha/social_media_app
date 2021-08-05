const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const app = express()
dotenv.config()
const DBConnection = require('./DB')

// DB Connection
DBConnection()

app.listen(8800, () => console.log(`Server running...`))
