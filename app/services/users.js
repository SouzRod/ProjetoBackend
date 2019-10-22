const User = require('../models/user');
const { ERROR, GenericError } = require('../config/constants');

const getUser = async (bearerToken = null, id = null) => {

    const token = bearerToken.split(' ')[1]
    if (id) {
        return await User.findById(id)
            .exec()
            .then(user => {
                if (user) {
                    
                    if(user.token !== token) {
                        const { status, message } = ERROR[3]
                        throw new GenericError(status, message)
                    }
                    const dateNow = new Date()
                    const result = dateNow - user.lastLogin
                    
                    if(result > 1800000) {                        
                        const { status, message } = ERROR[4]
                        throw new GenericError(status, message)
                    }

                    user.password = undefined
                    return user
                } else {
                    const { status, message } = ERROR[5]
                    throw new GenericError(status, message)
                }
            })
            .catch(error => {
                const { status, message } = error
                throw new GenericError(status, message)
            })
    }
    return await User.find()
        .exec()
        .then(result => {
            result.password = undefined
            return result
        })
        .catch(error => {
            const { status, message } = error
            throw new GenericError(status, message)
        })
}


const saveUser = async (obj) => {

    const { email } = obj

    if (await User.findOne({ email })) {
        const { status, message } = ERROR[1]
        throw new GenericError(status, message)
    }

    const user = new User({
        ...obj
    })

    return await user.save()
        .then(result => {
            return {
                id: result._id,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                lastLogin: result.lastLogin,
                token: result.token
            }
        })
        .catch(error => {
            const { message } = error
            const { status } = ERROR[2]
            throw new GenericError(status, message)
        })
}

const updateUser = async (id, user, bearerToken) => {

    const token = bearerToken.split(' ')[1]
    const userSelected = await User.findById(id)
        .exec()
        .then(result => {
            if (result) {
                return {
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    phones: result.phones,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    lastLogin: result.lastLogin,
                    token: result.token
                }
            }
        })
    const tokenUser = userSelected.token
    if(tokenUser !== token) {
        const { status, message } = ERROR[3]
        if(result.token !== token) throw new GenericError(status, message) 
    }
    

    const userUpdated = {
        ...userSelected,
        ...user,
        updatedAt: new Date()
    }

    return await User.findByIdAndUpdate({ _id: id }, { $set: userUpdated })
        .exec()
        .then(result => {
            return {
                id: result._id,
                createdAt: result.createdAt,
                updatedAt: new Date(),
                lastLogin: result.lastLogin,
                token: result.token
            }
        })
        .catch(error => {
            const { message } = error
            const { status } = ERROR[2]
            throw new GenericError(status, message)
        })
}

module.exports = {
    getUser,
    saveUser,
    updateUser
}