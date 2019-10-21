const mongoose = require('mongoose')

const uri = "mongodb+srv://rodrigoconcrete:Rodrigo549393@cluster0-jr8yr.mongodb.net/ProjetoBackend";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error)
db.once('open', () => {
    console.log('Connected to MongoDB.')
})

module.exports = db