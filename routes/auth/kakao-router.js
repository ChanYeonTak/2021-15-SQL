const path = require('path')
const express = require('express')
const passport = require('passport')
const router = express.Router()
const { error } = require('../../modules/util')

router.get('/', 
  passport.authenticate('kakao', { failureRedirect : '/' }), 
  (req, res, next) => {
    res.redirect('/')
})

router.get('/cb', (req, res, next) => {
})

module.exports = router