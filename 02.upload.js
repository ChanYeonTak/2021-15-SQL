const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, 'storages');
    cb(null, folder)
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const filename = new Date().getTime() + ('.') + ext
    cb(null, filename)
  }
})

const limits = { fileSize : 30960 } 
const upload = multer({ storage, limits })

require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)

app.use(express.json())
app.use(express.urlencoded( { extended:false } ))

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/file', upload.single('upfile'), (req, res, next) => {
  // file을 여러개 보낼 경우, upload.single 대신 upload.array를 사용한다
  res.json({ ...req.body, ...req.file }) // req.file은 multer를 통해서만 동작한다
})