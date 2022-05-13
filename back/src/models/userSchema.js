const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  
})