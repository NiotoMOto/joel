'use strict';

const qs = require('querystring');
const express = require('express');
const Promise = require('bluebird');

const constants = require('../constants');
const request = require('../services/request');
const projetRouter = new express.Router();

projetRouter.get('/', (req, res) => {

  request('get', '/projet').then(({ body: projets, headers }) => {
    const props = {
      projets,
      totalCount: +headers['x-total-count'],
    };
    res.render('Projet/ProjetList', { props });
  });
});

module.exports = projetRouter;
