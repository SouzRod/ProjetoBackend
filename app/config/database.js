const mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_CONECTION}/ProjetoBackend`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error)
db.once('open', () => {
    console.log('Connected to MongoDB.')
})

module.exports = db