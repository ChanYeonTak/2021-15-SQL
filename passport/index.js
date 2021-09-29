const local = require('./local-strategy')
const { findUser } = require('../models/auth')

const serialize = (user, done) => { 
  done(null, user.idx)
}

const deserialize = async (idx, done) => { 
  try {
    const { success, user } = await findUser('idx', idx)
   if(success) done (null, user)
   else done(null, false, '사용자 정보가 없습니다.')
  }
  catch { 
    done(err)
  }  
}

module.exports = passport => {
  passport.serializeUser(serialize) // req.user -> idx (cookie -> session)
  passport.deserializeUser(deserialize) // req.user <- DB에서 user 정보를 가져옴 (session에 DB 정보)
  local(passport) // login이 안되어있으면 로컬로 돎
  // kakao(passport)
  // naver(passport)
  // facebook(passport)
}