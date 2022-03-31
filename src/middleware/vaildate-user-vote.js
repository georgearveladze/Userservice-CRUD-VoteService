const {
  getUserByUsername,
} = require('../service/user-service/user-managment.js')

const {
  getVoteByVoterAndVotedToUsername,
} = require('../service/vote-service/vote-managment.js')

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
    if (voteExists === null) {
      return next()
    }
    const lastVoteType = voteExists.vote
    if (lastVoteType === Number(vote)) {
      return res.status(400).send({
        message: 'Vote something else',
      })
    }

    const lastVoteDate = new Date(voteExists.date)
    const nowDate = new Date()
    if (nowDate.getTime() - lastVoteDate.getTime() < 3600000) {
      return res.status(400).send({
        message: 'Should vote after one hour, since last vote date',
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

// async function votemodeltwo(voter, votes, votedTo) {
//   const existed = await votesSchema.findOne({ votedTo })
//   if (!existed) {
//     const newVote = new votesSchema({
//       voter,
//       votedTo,
//       votes,
//     })
//     return await newVote.updateOne()
//   }
//   return await votesSchema.updateOne(
//     { voter },
//     { votedTo, votes, date: Date.now() },
//     { upsert: true }
//   )
// }

// async function votemodelthree(votedTo) {
//   const sum = await votesSchema.find({ votedTo })
//   return sum.reduce((total, curr) => (total += +curr.votes), 0)
// }
