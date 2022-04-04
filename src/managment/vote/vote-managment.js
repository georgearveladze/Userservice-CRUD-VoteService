const UserVotes = require('../../DB/uservotes.js')

async function getVoteByVoterAndVotedToUsername(
  voterUsername,
  votedToUsername
) {
  return UserVotes.findOne({
    voter: voterUsername,
    votedTo: votedToUsername,
  })
}
module.exports = {
  getVoteByVoterAndVotedToUsername,
}
