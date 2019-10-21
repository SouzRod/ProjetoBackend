const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get('/:id', controller.getUser)
router.get('/', controller.getUser)
router.put('/:id', controller.updateUser)

module.exports =  router