const User = require('../../DB/User')

async function getUserByUsername(username) {
  return User.findOne({ username: username })
}

async function getUserById(id) {
  return User.findOne({ id: id })
}

async function getActiveUser(limit, skip) {
  return User.find({ isDeleted: false }).skip().limit()
}

async function saveUser(data) {
  await new User(data).save()
}

async function findUserAndUpdate(username, data) {
  const user = await User.findOneAndUpdate({ username: username }, data, {
    new: true,
  })
  user.save()
}
module.exports = {
  getUserByUsername,
  getUserById,
  getActiveUser,
  saveUser,
  findUserAndUpdate,
}
