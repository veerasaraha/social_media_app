const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 4,
      max: 20,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      defa: false,
    },
    bio: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 30,
    },
    from: {
      type: String,
      max: 30,
    },
    relationship: {
      type: String,
      enum: ['Single', 'In a relationship', 'Married'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('User', UserSchema)
