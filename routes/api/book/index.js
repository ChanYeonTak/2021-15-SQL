const path = require('path')
const express = require('express')
const router = express.Router()
const { pool } = require('../../../modules/mysql-init')
const fileRouter = require('./file-router')

router.use('/file', fileRouter)

module.exports = router