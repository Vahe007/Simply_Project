const jwt = require('jsonwebtoken')

module.exports = function (roleName) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'User not authorized' })
      }
      const { roles: userRoles } = jwt.verify(token, process.env.TOKEN_SECRET)
      const hasRole = userRoles === roleName
      console.log('hasRole- test', hasRole)
      if (!hasRole) {
        return res.status(200).json({ message: 'User has no rights for such action' })
      }
      next()
    } catch (err) {
      console.log(err)
      return res.status(403).json({ message: 'User not authorized' })
    }
  }
}
