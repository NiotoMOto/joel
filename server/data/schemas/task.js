const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'project' },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  progress: { type: Number, default:0 },
  timePass: { type: Number, default:0 },
});

module.exports = mongoose.model('task', schema);
