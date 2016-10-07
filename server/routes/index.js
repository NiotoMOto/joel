'use strict';

const express = require('express');

require('../data/');
const apiRouter = require('./api');
const mainRouter = new express.Router();
const projetsRouter = require('./projects');
const usersRouter = require('./users');
const tasksRouter = require('./tasks');

const request = require('../services/request');

mainRouter.use('/api', apiRouter);

mainRouter.use('/projects', projetsRouter);
mainRouter.use('/users', usersRouter);
mainRouter.use('/tasks', tasksRouter);

mainRouter.get('/', (req, res) => {
  request('get', '/user')
  .then(({ body: users }) => {
    const props = {
      users,
    };
    res.render('Home', { props });
  });
});

mainRouter.get('/routes/api', (req, res) => {
  res.json(apiRouter.stack);
});
mainRouter.get('/routes/main', (req, res) => {
  res.json(mainRouter.stack);
});

module.exports = mainRouter;
