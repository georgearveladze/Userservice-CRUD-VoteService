const UserVote = require('../../DB/uservotes')

const voteAddController = async (req, res) => {
  try {
    const { voter, votedTo, vote } = req.body
    const newVote = {
      voter: voter,
      votedTo: votedTo,
      vote: vote,
      date: new Date(),
    }
    const addedVote = new UserVote(newVote)
    await addedVote.save()
    return res.status(200).send({
      message: 'Vote added!',
    })
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    })
  }
}

const voteSum = async (req, res) => {
  try {
    const { votedTo } = req.body.votedTo
    const vote = await UserVote.find({ votedTo })
    return vote.reduce((total, curr) => (total += +curr.votes), 0)
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
}

module.exports = { voteAddController, voteSum }
