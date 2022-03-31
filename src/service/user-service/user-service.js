const { check } = require('express-validator')
const User = require('../../src/DB/User')

module.exports = [
  check('firstname', 'firstname at least should be 3 charecter')
    .isLength({
      min: 3,
    })
    .notEmpty()
    .isAlpha(),
  check('lastname', 'lastname at least should be 3 charecter')
    .isLength({
      min: 3,
    })
    .notEmpty()
    .isAlpha(),
  check('username', 'Please provide username')
    .notEmpty()
    .isLength({
      min: 3,
    })
    .custom((username) => {
      return User.findOne({ username: username }).then((user) => {
        if (user) {
          return Promise.reject('username is already taken')
        }
      })
    }),
  check('password', 'Password at least should be 6 charecter').isLength({
    min: 6,
  }),
]
