const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ConversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Conversation', ConversationSchema)
