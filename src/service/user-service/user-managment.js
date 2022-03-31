const User = require('../../DB/User')

async function getUserByUsername(username) {
  return User.findOne({ username: username })
}

async function getUserById(id) {
  const user = User.findOne({ id: id })
  return user
}

async function getActiveUser(trueOrFalse) {
  const user = User.find({ deleted: trueOrFalse })
  return user
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
