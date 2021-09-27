const { alert } = require('../modules/util')

const isUser = (req, res, next) => {
	if(req.session.user) next()
	else res.send(alert('로그인 후 이용 바랍니다.')) 
}

const isGuest = (req, res, next) => {
	if(req.session.user) res.send(alert('회원은 이용할 수 없습니다.'))
	else next()
}

module.exports = { isUser, isGuest }
