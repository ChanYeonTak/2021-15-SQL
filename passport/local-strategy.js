const LocalStrategy = require('passport-local').Strategy
const { pool } = requre('../modules/mysql-init')

// LocalStrategy의 옵션
const cb = () => { 

}

const localStrategy = new LocalStrategy({}, cb)

module.exports = (passport) => passport.use(localStrategy)
