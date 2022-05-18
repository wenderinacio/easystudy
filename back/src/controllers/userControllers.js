const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.header('authorization')
  const token = authHeader.split(' ')[1]

  if(!token) {
    return res.status(401).send('Erro no header da requisição.')
  }

  jwt.verify(token, SECRET, (error) => {
    if(error) {
      return res.status(401).send({
        message: 'Usuário não autorizado.'
      })
    }
  })

  try {
    const users = await UserSchema.find()
    res.status(200).send(users)
  } catch(error) {
    res.status(500).send({
      'message': error
    })
  }
}

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  try {
    const verifyEmail = await UserSchema.findOne({email: req.body.email})
    if(verifyEmail) {
      return res.status(400).send({
        message: 'Email em uso por outra conta.'
      })
    }

    const newUser = new UserSchema(req.body)
    const savedUser = await newUser.save()

    res.status(200).json({
      message: 'Usuário criado!',
      savedUser
    })
  } catch(error) {
    res.status(500).json({
      message: error.message
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
  } catch(error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const deleteUserById = async (req, res) => {
  try {
    await UserSchema.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: `Usuário ${req.params.id} deletado!`
    })
  } catch(error) {
    res.status(400).json({
      message: error.message
    })
  }
}

module.exports = {
  getAll,
  createUser,
  updateUserById,
  deleteUserById
}