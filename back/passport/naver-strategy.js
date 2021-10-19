const NaverStrategy = require('passport-naver').Strategy
const { createSnsUser, findUser, changeUser } = require('../models/auth')

const cb = async (accessToken, refreshToken, profile, done) => {
	try {
		let user = { userid: profile.id, accessToken }
		let userSns = {
			accessToken, 
			refreshToken, 
			provider: 'NA', 
			snsid: profile.id,
			snsName: profile._json.name || null,
			displayName: profile.displayName || null,
			profileURL: profile._json.profile_image || null,
			email: profile._json.email || null, 
		}
    //findSnsUser(user.userid)
		let { success, user: _user } = await findUser('userid', user.userid)
		const { idx, status } = _user
		if(success) {
			if(status === '0') {
				const { success } = await changeUser(
					{ status: '3' }, 
					{ idx },
					'users'
				);
				const { success: success2 } = await changeUser(
					{ status: '2' }, 
					{'fidx': idx },  
					'users_sns'
				);
				if(success && success2) user.idx = idx
				else done('Error')
			}
		}
    else {
      let { idx : id } = await createSnsUser(user, userSns)
      user.idx = id
    }
		done(null, user)
	}
	catch(err) {
		done(err)
	}
}

const naverStrategy = new NaverStrategy({
	clientID: process.env.NAVER_KEY,
	clientSecret: process.env.NAVER_SALT,
	callbackURL: '/auth/naver/cb'
}, cb)

module.exports = passport => passport.use(naverStrategy)