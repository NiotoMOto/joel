const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  nom: { type: String },
  prenom: { type: String },
  username : { type: String },
});

module.exports = mongoose.model('user', schema);
