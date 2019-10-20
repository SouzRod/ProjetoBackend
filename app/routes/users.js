const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')
const authMiddleware = require('../middlewares/auth')

router.get('/:id', authMiddleware, controller.getUser)
router.get('/', authMiddleware, controller.getUser)
router.put('/:id', authMiddleware, controller.updateUser)
router.post('/', controller.saveUser)

module.exports =  router