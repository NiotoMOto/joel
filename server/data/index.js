const requireDir = require('require-dir');
const mongoose = require('mongoose');
const config = require('../../config/');

mongoose.connect(config.mongoUrl);
module.exports = requireDir('./schemas');
