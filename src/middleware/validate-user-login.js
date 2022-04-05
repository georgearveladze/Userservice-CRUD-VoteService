const passwordHash = require('../service/hash-service')
const { getUserByUsername } = require('../managment/user/user-managment')

module.exports = async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.body.username)
    if (!user) return res.status(404).send('user not found')

    const { hashed } = await passwordHash(req.body.password, user.salt)
    if (!user || user.password !== hashed) {
      return res.status(401).send({ message: 'Wrong Nickname or password' })
    } else {
      req.user = user.username
      req.role = user.role
      next()
    }
  } catch (err) {
    return res.status(400).json(err)
  }
}
