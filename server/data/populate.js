'use strict';

const Promise = require('bluebird');
const User = require('mongoose').model('user');
const Projet = require('mongoose').model('project');

const populate = () => {
  console.log('Poulate database ....');
  return Promise.all([
    User.remove({}),
    Projet.remove({}),
  ]).then(() => {
    User.create({ username : 'Antoine', password: 'antoine' });
    User.create({ username : 'Johann', password: 'johann' });
    User.create({ username : 'Adrien', password: 'adrien' });
    Projet.create({ name: 'projet1' });
    Projet.create({ name: 'projet2' });
    Projet.create({ name: 'projet3' });
    Projet.create({ name: 'projet4' });
  });
};

module.exports = populate;
