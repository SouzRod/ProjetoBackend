const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');
const { ERROR } = require('../config/constants');


module.exports = (req, res, next) => {

    const tokenBearer = req.headers.authorization
    if(!tokenBearer) {
        const { status, message } = ERROR[3]
        res.status(status).send(message)
        return false
    }
    const token = tokenBearer.split(' ')[1]
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            const { status } = ERROR[3]
            res.status(status).send(error.message)
            return false
        }
        req.userId = decoded.id
        return next()
    })
}