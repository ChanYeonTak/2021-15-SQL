const fs = require('fs-extra');
const path = require('path')
const multer = require('multer')
const moment = require('moment')
const { v4 : uuid } = require('uuid')
const { exts }  = require('../modules/util')
const allowExt = [...exts.imgExt, ...exts.docExt, ...exts.mediaExt, ...exts.zipExt ] 
const mega = 1024000

const destination = async (req, file, cb) => {
  try {
    const folder = path.join(__dirname, '../storages', moment().format('YYMMDD'))
    await fs.ensureDir(folder)
    cb(null, folder)
  }
  catch(err) {
    cb(err)
  }  
} 

const filename = (req, file, cb) => {
  try {
  const ext = path.extname(file.originalname).toLowerCase() // 확장자명을 알아서 출력
  const filename = moment().format('YYMMDD') + '_' + uuid() + ext
  cb(null, filename)
  }
  catch(err) {
    cb(err)
  }
}

const fileFilter = (req, file, cb) => {
  try{
    const ext = path.extname(file.originalname).substr(1).toLowerCase()
    if(allowExt.includes(ext)) cb(null, true)
    else cb(new Error(`허용하지 않은 형태의 첨부파일 양식입니다. - ${ext} 파일` ))
  }
  catch(err) {
    cb(err)
  }
}

const storage = multer.diskStorage({ destination, filename })
const limits = { fileSize : mega * 3 } 

module.exports = multer({ storage, limits, fileFilter })