const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { secret } = require('../config/auth');
const { ERROR, GenericError } = require('../config/constants');

const authentication = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            const { status, message } = ERROR[2]
            throw new GenericError(status, message)
        }

        if (!await bcrypt.compare(password, user.password)) {
            const { status, message } = ERROR[2]
            throw new GenericError(status, message)
        }

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: 3600000 })

        const userUpdated = {
            name: user.name,
            email: user.email,
            password: user.password,
            phones: user.phones,
            lastLogin: new Date(),
            token
        }

        return await User.findOneAndUpdate({ _id: user._id }, { $set: userUpdated })
            .then(result => {
                return {
                    id: result._id,
                    data_criacao: result.createdAt,
                    data_atualizacao: result.updatedAt,
                    ultimo_login: new Date(),
                    token: result.token
                }
            })
    } catch (error) {
        console.error(error)
    }

}

module.exports = { authentication }