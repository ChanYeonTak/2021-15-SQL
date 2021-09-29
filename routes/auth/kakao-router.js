const path = require('path')
const passport = require('passport')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')

router.get('/', passport.authenticate('kakao'))

router.get('/cb', passport.authenticate('kakao',
   {failureRedirect: '/'}), 
   (req, res, next) => {
	res.redirect('/')
})

module.exports = router