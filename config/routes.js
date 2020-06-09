const express = require('express')
const router = express.Router()

const tweetsController = require('../app/controllers/tweetsController')

router.get('/user/:screen_name',tweetsController.list)

module.exports = router