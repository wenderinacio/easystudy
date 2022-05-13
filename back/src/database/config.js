const mongoose = require('mongoose')

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Conectado com o Banco!')
  } catch(e) {
    console.log(`Erro: ${e.message}`)
  }
}

module.exports = {
  connect
}