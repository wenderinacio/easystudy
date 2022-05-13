const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv-safe').config()

const db = require('./database/config')
db.connect()

app.use(cors())
app.use(express.json())

module.exports = app