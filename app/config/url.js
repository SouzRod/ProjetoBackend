const user = require('../routes/users')
const register = require('../routes/register')
const auth = require('../routes/auth')

const addURLs = (app) => {
    app.use('/signup', register)
    app.use('/user', user)
    app.use('/signin', auth)
}

module.exports = {
    addURLs
}