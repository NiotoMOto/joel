const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  type: { type: String },
  path: { type: String },
});

module.exports = mongoose.model('media', schema);
