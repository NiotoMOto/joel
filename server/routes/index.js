'use strict';

const express = require('express');

const apiRouter = require('./api');

const mainRouter = new express.Router();

mainRouter.use('/api', apiRouter);

mainRouter.get('/', (req, res) => {
  res.render('Home');
});

module.exports = mainRouter;
