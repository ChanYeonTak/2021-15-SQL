const fs = require('fs-extra');
const path = require('path')
const multer = require('multer')
const moment = require('moment')
const { v4 : uuid } = require('uuid')
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
  const ext = path.extname(file.originalname).toLowerCase() // 확장자명을 알아서 출력
  const filename = moment().format('YYMMDD') + '_' + uuid() + ext
  cb(null, filename)
}

const storage = multer.diskStorage({ destination, filename })
const limits = { fileSize : mega * 3 } 

module.exports = multer({ storage, limits })