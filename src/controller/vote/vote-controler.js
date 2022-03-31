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
module.exports = {
  voteAddController,
}
