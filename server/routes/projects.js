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
  return request(
    'get',
    `/project/${id}`,
    req.body
  ).then(({ body: project }) => (
    {
      project,
      originalItem: project,
    }
  )).then((props) => {
    const query = JSON.stringify({
      project: props.project._id,
    });
    request('get',
      `/task/?query=${query}&populate=[{"path":"user"},{"path":"project"}]`,
      req.body)
    .then(({ body: tasks }) => {
      Object.assign(props, { tasks });
      res.render('Projet/ProjectEdit', { props });
    });
  });

});

module.exports = projectRouter;
