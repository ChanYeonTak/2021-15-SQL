module.exports = (req, res, next) => {
  res.locals.user = req.user || null
  // req.session.user -> req.user (passport가 가지고 있기 때문)
  next()
}

