const mongoose = require('mongoose')

const DBConnection = async () => {
  try {
    // const options
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log(`DB Connected Successfully...`)
  } catch (error) {
    console.error(`ERROR : ${error.message}`)
  }
}

module.exports = DBConnection
