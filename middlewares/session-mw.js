const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const { pool } = require('../modules/mysql-init')

const storeOptions = { 
  // host:process.env.DB_HOST,
  // port:process.env.DB_PORT,
  // user:process.env.DB_USER,
  // password:process.env.DB_PASS,
  // database:process.env.DB_NAME,
  expiration:86400000
}

const expressSession = session ({
  secret: process.env.COOKIE_SALT,
  resave: false,
  saveUninitialized: true,
  //  store: new MySQLStore(storeOptions),
  store: new MySQLStore(storeOptions, pool),
  // 접속 정보는 pool에서 가져오고, 그 외에 나머지 정보는 storeOptions에서..
  cookie: { 
    secure: false, 
    httpOnly : true, 
   }
})

module.exports = app => {
  app.set('trust proxy', 1)
  return expressSession
}