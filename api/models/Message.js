const mongoose = require('mongoose')
const { Schema, model } = mongoose

const MessageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Message', MessageSchema)
