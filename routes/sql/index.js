const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util-module')
const { pool } = require('../../modules/mysql-module')

router.get('/list', async (req, res, next) => {
	let sql = 'SELECT * FROM books'
	let r = await pool.execute(sql)
	res.status(200).json(r)
})

router.get('/create', async (req, res, next) => {
	let title = '모든 경계에는 꽃이 핀다'
	let writer = '함민복'
	let content = '말랑말랑한 힘'
	//let sql = `INSERT INTO books SET title='${title}', writer='${writer}', content='${content}'`
	let sql = 'INSERT INTO books SET title=?, writer=?, content=?'
	let values = [title, writer, content]
  let r = await pool.execute(sql, values)
	res.status(200).json(r)
})

module.exports = router