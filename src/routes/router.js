const { Router } = require('express')
const router = Router()
const updateValidation = require('../middleware/ifUnmodifiedSince')
const autValidation = require('../middleware/validate-user-auth')
const { validateUserVote } = require('../middleware/vaildate-user-vote.js')
const loginValidation = require('../middleware/validate-user-login')
const userservices = require('../service/user-service')
const {
  getUsers,
  userUpdate,
  userSingIn,
  userSignUp,
  userDelete,
} = require('../controller/user/user-controller')
const { voteAddController } = require('../controller/vote/vote-controler.js')

router.post('/signUp', userservices, userSignUp)

router.post('/signIn', loginValidation, userSingIn)

router.put('/update', autValidation, updateValidation, userUpdate)

router.delete('/delete', autValidation, userDelete)

router.get('/list', getUsers)

router.post('/vote', validateUserVote, voteAddController)

module.exports = router
