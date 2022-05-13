const express = require('express')
const app = express()

require('dotenv-safe').config()

const cors = require('cors')
app.use(cors())

const db = require('./database/config')
db.connect()

app.use(express.json())

const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)

module.exports = app