const user = require('../routes/users')
const auth = require('../routes/auth')

const addURLs = (app) => {
    app.use('/user', user)
    app.use('/singin', auth)
}

module.exports = {
    addURLs
}