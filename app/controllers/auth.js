const service = require('../services/auth')

const authentication = async (req, res) => {
    const { email, password } = req.body

    try {
        const result = await service.authentication(email, password)
        res.send(result)
        return true
    } catch (error) {
        res.status(error.status).send(error.message)
        return false
    }
}

module.exports = { authentication }