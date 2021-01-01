const express = require('express');
const { route } = require('../app');
const passport = require('passport');
const router = express.Router()
const userController = require('../Controllers/user.controller')
// route register new user 
router.post('/register', userController.register);
//route login user
router.post('/auth', userController.login);
// route Dash 
router.get('/dashboard',passport.authenticate('jwt',{session:false}),(req, res, next)=>{
  return res.send({message: "hello dashboard"})
})



module.exports = router;