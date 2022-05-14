const express = require('express')
const router = express.Router()

const controller = require('../controllers/userControllers')

router.get('/all', controller.getAll)
router.post('/create', controller.createUser)
router.patch('/update/:id', controller.updateUserById)
router.delete('/delete/:id', controller.deleteUserById)

module.exports = router