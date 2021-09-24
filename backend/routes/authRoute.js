const express = require('express')

const router = express.Router()

const { googleController } = require('../controllers/authControllers')
router.post('/google-login', googleController)
module.exports = router
