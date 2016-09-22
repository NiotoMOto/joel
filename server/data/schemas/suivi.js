const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  path: { type: String },
  projet: { type: Schema.Types.ObjectId, ref: 'projet' },
  sousProjest: [{ type: Schema.Types.ObjectId, ref: 'sousProjet' }],
  user: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('suivi', schema);
