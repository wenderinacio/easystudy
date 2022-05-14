const UserSchema = require('../models/userSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  try {
    const newUser = new UserSchema(req.body)
    const savedUser = await newUser.save()

    res.status(200).json({
      message: 'Usuário criado!',
      savedUser
    })
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  }
}

const updateUserById = async (req, res) => {
  try {
    const findUser = await UserSchema.findById(req.params.id)

    if(findUser) {
      findUser.name = req.body.name || findUser.name
      findUser.lastName = req.body.lastName || findUser.lastName
      findUser.email = req.body.email || findUser.email
    }

    const savedUser = await findUser.save()

    res.status(200).json({
      message: 'Usuário atualizado!',
      savedUser
    })
  } catch(e) {
    res.status(400).json({
      message: e.message
    })
  }
}

const deleteUserById = async (req, res) => {
  try {
    await UserSchema.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: `Usuário ${req.params.id} deletado!`
    })
  } catch(e) {
    res.status(400).json({
      message: e.message
    })
  }
}

module.exports = {
  getAll,
  createUser,
  updateUserById,
  deleteUserById
}