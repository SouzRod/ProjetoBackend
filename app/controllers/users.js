const service = require('../services/users')

const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const { authorization } = req.headers
        if (id) {
            res.send(await service.getUser(authorization, id))
        } else {
            res.send(await service.getUser(authorization))
        }
    } catch (error) {
        res.status(error.status).send(error.message)
        return false
    }
}

const saveUser = async (req, res) => {
    try {
        const user = req.body
        const result = await service.saveUser(user)
        res.send(result)
    } catch (error) {
        res.status(error.status).send(error.message)
        return false
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.body
        const { authorization } = req.headers
        const result = await service.updateUser(id, user, authorization)
        res.send(result)
    } catch (error) {
        res.status(error.status).send(error.message)
        return false
    }
}

module.exports = {
    getUser,
    saveUser,
    updateUser
}