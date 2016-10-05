const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  lastName: { type: String },
  firstName: { type: String },
  username : { type: String },
});

module.exports = mongoose.model('user', schema);
