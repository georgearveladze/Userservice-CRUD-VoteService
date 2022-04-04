const { getUserByUsername } = require('../managment/user/user-managment')

const {
  getVoteByVoterAndVotedToUsername,
} = require('../managment/vote/vote-managment')

async function validateUserVote(req, res, next) {
  try {
    const { voter, votedTo, vote } = req.body
    const voterExists = await getUserByUsername(voter)

    const votedToExists = await getUserByUsername(votedTo)

    if (voterExists === null) {
      return res.status(400).send({
        message: 'voter dont exists',
      })
    }
    if (votedToExists === null) {
      return res.status(400).send({
        message: 'votedTo dont exists',
      })
    }
    if (Number(vote) !== 1 && Number(vote) !== -1) {
      return res.status(400).send({
        message: 'Vote should be 1 or -1',
      })
    }
    const voteExists = await getVoteByVoterAndVotedToUsername(voter, votedTo)
    console.log(voteExists)
    if (voteExists === null) {
      return next()
    }

    const lastVoteDate = new Date(voteExists.date)
    const nowDate = new Date()
    if (nowDate.getTime() - lastVoteDate.getTime() < 3600000) {
      return res.status(400).send({
        message: 'Should vote after one hour, since last vote date',
      })
    }

    const lastVoteType = voteExists.vote
    console.log(lastVoteType)
    if (lastVoteType === Number(vote)) {
      return res.status(400).send({
        message: 'Vote something else',
      })
    }
    next()
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    })
  }
}

module.exports = {
  validateUserVote,
}
