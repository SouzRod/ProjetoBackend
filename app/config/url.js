const user = require('../routes/users')
const register = require('../routes/register')
const auth = require('../routes/auth')

const addURLs = (app) => {
    app.use('/singup', register)
    app.use('/user', user)
    app.use('/singin', auth)
}

module.exports = {
    addURLs
}