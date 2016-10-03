'use strict';

const express = require('express');

require('../data/');
const apiRouter = require('./api');
const mainRouter = new express.Router();
const projetsRouter = require('./projects');

const request = require('../services/request');

mainRouter.use('/api', apiRouter);

mainRouter.use('/projects', projetsRouter);

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
