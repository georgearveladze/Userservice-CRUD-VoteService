const jwt = require('jsonwebtoken')
const { getActiveUser } = require('../../managment/user/user-managment')
const { saveUser } = require('../../managment/user/user-managment')
const { findUserAndUpdate } = require('../../managment/user/user-managment')

const hash = require('../../service/hash-service')

const userDelete = async (req, res) => {
  try {
    await getActiveUser(false)
    return res.status(200).json({
      message: 'User is deleted',
    })
  } catch (err) {
    return res.status(400).render('error', { error: err })
  }
}

const userSingIn = async (req, res) => {
  try {
    const payload = {
      user: req.user,
      role: req.role,
    }
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '24h',
    })
    res.status(200).json({
      accessToken,
    })
  } catch (err) {
    console.log(err)
    return res.status(401).json('unauthorized')
  }
}

const userSignUp = async (req, res) => {
  try {
    const { hashed: password, salt } = await hash(req.body.password)
    const userObj = { ...req.body, salt, password }
    console.log(userObj)
    await saveUser(userObj)
    res.send({ message: `${req.body.username} Registered successfully` })
    console.log(req.body)
  } catch (error) {
    return res.send(error)
  }
}

const userUpdate = async (req, res) => {
  try {
    if (req.body.password) {
      const { hashed: password, salt } = await hash(req.body.password)

      const data = { ...req.body, password, salt }

      await findUserAndUpdate(req.body.username, data)
      return res.status(200).send({
        message: 'User is Updated!',
      })
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.skip)
    const limit = parseInt(req.query.limit)
    const skipIndex = (page - 1) * limit
    const list = await getActiveUser(+limit, skipIndex)
    return res.status(200).json({
      message: "User's list",
      data: list,
    })
  } catch (e) {
    console.log(e)
    return res.status(400).send({ message: 'Error Occured' })
  }
}

module.exports = { getUsers, userUpdate, userSingIn, userSignUp, userDelete }
