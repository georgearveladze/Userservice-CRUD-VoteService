const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization
    if (bearerToken) {
      const token = bearerToken.split(' ')[1]
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

      req.user = decoded
    } else {
      res.status(401).json({ autorization: 'Denide' })
    }
    next()
  } catch (err) {
    console.log(err)
    return res.status(400).send({
      message: err.message,
    })
  }
}
