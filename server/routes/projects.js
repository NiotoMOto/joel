'use strict';

const express = require('express');

const request = require('../services/request');
const projectRouter = new express.Router();

projectRouter.get('/', (req, res) => {
  request('get', '/project').then(({ body: projects, headers }) => {
    const props = {
      projects,
      totalCount: +headers['x-total-count'],
    };
    res.render('Projet/ProjectList', { props });
  });
});

projectRouter.get('/new', (req, res) => {
  res.render('Projet/ProjectNew');
});

projectRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  request('get', `/project/${id}`, req.body).then(({ body: project }) => {
    const props = {
      project,
      originalItem: project,
    };
    res.render('Projet/ProjectEdit', { props });
  });

});

module.exports = projectRouter;
