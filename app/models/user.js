const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { secret } = require('../config/auth');

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, require: true, select: false },
    phones: [{
        number: { type: String },
        ddd: { type: String }
    }],
    token: { type: String, require: true },
    lastLogin: { type: Date, default:  new Date() },
    updatedAt: { type: Date, default:  new Date() },
    createdAt: { type: Date, default:  new Date() }
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    this.token = jwt.sign({ id: this._id }, secret, { expiresIn: 3600000 })
    next()
})

module.exports = mongoose.model('User', userSchema);