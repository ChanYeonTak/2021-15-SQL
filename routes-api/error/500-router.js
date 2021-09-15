module.exports = (error, req, res, next) => {
	console.error(error)
	res.status('error/error', { status: error.status, message: error.message })
}