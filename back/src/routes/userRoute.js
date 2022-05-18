const express = require('express')
const router = express.Router()

const controller = require('../controllers/userControllers')
const authController = require('../controllers/authController')

router.get('/all', controller.getAll)
router.post('/create', controller.createUser)
router.post('/login', authController.login)
router.patch('/update/:id', controller.updateUserById)
router.delete('/delete/:id', controller.deleteUserById)

module.exports = router