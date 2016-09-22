'use strict';

const Promise = require('bluebird');
const User = require('mongoose').model('user');
const Media = require('mongoose').model('media');

const populate = () => {
  console.log('Poulate database ....');
  return Promise.all([
    User.remove({}),
    Media.remove({}),
  ]).then(() => {
    User.create({ username : 'Antoine', password: 'antoine' });
    User.create({ username : 'Johann', password: 'johann' });
    User.create({ username : 'Adrien', password: 'adrien' });
  });
};

module.exports = populate;
