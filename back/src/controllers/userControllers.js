const UserSchema = require('../models/userSchema')
const mongoose = require('mongoose')

const getAll = async (req, res) => {
  try {
    const users = await UserSchema.find()
    res.status(200).send(users)
  } catch(e) {
    res.status(500).send({
      'message': e
    })
  }
}

module.exports = {
  getAll
}