const mongoose = require('mongoose')

const createUserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('note', createUserSchema)