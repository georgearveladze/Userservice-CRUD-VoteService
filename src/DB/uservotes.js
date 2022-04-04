const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

const VOTES = {
  UP: 1,
  DOWN: -1,
}

const votesSchema = new mongoose.Schema({
  voter: {
    type: String,
    required: true,
  },
  votedTo: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    required: true,
    enum: [VOTES.UP, VOTES.DOWN],
  },
  date: {
    type: Date,
    default: 0,
  },
})

votesSchema.plugin(mongoose_delete, { deletedAt: true })

module.exports = mongoose.model('uservotes', votesSchema)
