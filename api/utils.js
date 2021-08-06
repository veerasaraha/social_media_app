const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
  const SALT = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, SALT)

  return hashedPassword
}

const validatePassword = async (candidatePassword, userPassword) => {
  const isValid = await bcrypt.compare(candidatePassword, userPassword)
  return isValid
}

module.exports = {
  hashPassword,
  validatePassword,
}
