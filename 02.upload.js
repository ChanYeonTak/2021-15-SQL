const path = require('path')

const express = require('express')
const app = express()
const uploader = require('./middlewares/multer-mw')

require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)

app.use(express.json())
app.use(express.urlencoded( { extended:false } ))

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/file', uploader.single('upfile'), (req, res, next) => {
  // file을 여러개 보낼 경우, upload.single 대신 upload.array를 사용한다
  res.json({ ...req.body, ...req.file }) // req.file은 multer를 통해서만 동작한다
})