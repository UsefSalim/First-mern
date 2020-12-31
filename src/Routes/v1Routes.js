const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user.controller')


/**
 * Route register user 
 */
router.post('/register', userController.register);




module.exports = router;  