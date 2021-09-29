const LocalStrategy = require('passport-local').Strategy
const { loginUser } = require('../models/auth')

// cb 실행 구간 -> auth/login-router
const cb = async (userid, passwd, done) => { 
  try {
    const { success, user } = await loginUser( userid, passwd )
    if (success) done(null, user)
    else done(null, false, '아이디와 패스워드를 확인하세요')
  }
  catch {
    done(err)
  }
}

// 로그인할 때 옵션들 부여하는 구간
const fields = { 
  usernameField: 'userid', 
  passwordField: 'passwd'
}

// LocalStrategy의 옵션
const localStrategy = new LocalStrategy(fields, cb)

module.exports = (passport) => passport.use(localStrategy)
