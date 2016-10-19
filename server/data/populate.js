'use strict';

const Promise = require('bluebird');
const User = require('mongoose').model('user');
const Projet = require('mongoose').model('project');
const Task = require('mongoose').model('task');
const log = require('../services/log');

const populate = () => {
  log.info('Poulate database ....');
  return Promise.all([
    User.remove({}),
    Projet.remove({}),
    Task.remove({}),
  ]).then(() => (
    Promise.all([
      Projet.create({ name: 'projet1' }),
      User.create({ username : 'Antoine', password: 'antoine', firstName: 'Antoine', lastName: 'Guillemoto' }),
      Projet.create({ name: 'projet2' }),
      User.create({ username : 'Johann', password: 'johann', firstName: 'Johann', lastName: 'Begain' }),
      Projet.create({ name: 'projet3' }),
      Projet.create({ name: 'projet4' }),
      User.create({ username : 'Adrien', password: 'adrien', Adrien: 'Antoine', lastName: 'Parochia' }),
    ])
  )).then(([project, user, project2, user2, ...rest]) => {
    Task.create({ project, user, name: 'Tâche 1', progress: 0 });
    Task.create({ project, user: user2, name: 'Tâche 2', progress: 100 });
    Task.create({ project: project2, user, name: 'Tâche 3', progress: 50 });
    Task.create({ project: project2, user, name: 'Tâche 4', progress: 27 });
    Task.create({ project: project2, user: user2, name: 'Tâche 5', progress: 75 });
  }).catch((err) => {
    log.err(err);
  });
};

module.exports = populate;
