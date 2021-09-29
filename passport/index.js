/*
1. 로그인 -> serialize : browser 의 cookie에 idx를 남김
2. 재접속 -> deserialize -> req.user
3. strategy logic 
  가. 로그인 라우터에 passport.authenticate([ 'local', 'kakao', 'naver' ]) 통과
  나. 각 strategy로 이동 
  다. local 은 done() 
  라. kakao/naver 는 passport-kakao(naver)가 done을 내장하고 있으므로, 미들웨어로만 진행
*/


const local = require('./local-strategy')
const kakao = require('./kakao-strategy')
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
  kakao(passport)
  // naver(passport)
  // facebook(passport)
}