/**
 * 1. 요청이 들어옴 
 *    1) req.cookies의 존재 여부 확인
 *      - 존재하면 -> req.cookies에서 token과 origin과 api 여부 확인
 *        (1) 일치하면 
 *        token을 발행(jwt.sign)
 *        cookie를 token을 저장 
          .next()
          (2) 일치하지 않으면
          next(createError(401, 'Authoirzation Fail'))

 *      2) 존배하면 DB에서 접근 origin과 apikey의 존재 여부 확인 jwt.veiry(token, salt): 내용 리턴
          리턴된 내용에서 전달 받은 origin과 apikey 일치 여부 확인
          (1) 일치하면
          .next()
          (2) 일치하지 않으면
          next(createError(401, 'Authoirzation Fail'))
 * 
 */

const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const { pool } = require('../modules/mysql-init')
const { findApiUser } = require('../models/auth')

const createCookie = (domain, apikey, res) => { 
  const token = jwt.sign({ domain, apikey }, process.env.JWT_SALT, { expiresIn: process.env.JWT_EXPIRES })
  res.cookie('token', token, { expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES)) })
}

const isApiUser = async (req, res, next) => {
  const errMsg = 'Authorization Fail'
  try {
    const domain = req.protocol + '://' + req.headers.host
    const apikey = req.query.apikey

    if (req.cookies.token) {
      const token = jwt.verify(req.cookies.token, process.env.JWT_SALT)
      if(domain === token.domain, apikey === token.apikey) {
        createCookie(domain, apikey, res)
        next()
      }
      else {
        next(createError(401, errMsg))
      }
    }
    else if (domain && apikey) {  
      const { success } = await findApiUser(domain, apikey)
      if (success) {
        createCookie(domain, apikey, res)
        next()
      }
      else {
        next(createError(401, errMsg))
      }
    }
    else {
      next(createError(401, errMsg))
    }
  }
  catch (err) {
    next(createError(err))
  }
}

module.exports = { isApiUser }