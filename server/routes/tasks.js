'use strict';

const express = require('express');
const currentWeekNumber = require('current-week-number');

const request = require('../services/request');
const taskRouter = new express.Router();

taskRouter.get('/', (req, res) => {
  request(
    'get',
    '/task?populate=[{"path":"user"},{"path":"project"}]'
  ).then(({ body: tasks, headers }) => {
    const props = {
      tasks,
      totalCount: +headers['x-total-count'] || 0,
    };
    res.render('Task/TasksList', { props });
  });
});

taskRouter.get('/new', (req, res) => {
  console.log(req.query);
  if(req.query && req.query.user && req.query.week) {
    const { user, week } = req.query;
    request('get', `/user/${req.query.user}?`).then(({ body: user }) => {
      const task = { user, weeks: [week] };
      res.render('Task/TasksNew', { props: { task } });
    });
  } else {
    const props = { task: { weeks: [] } };
    res.render('Task/TasksNew', { props });
  }
});

taskRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  request('get', `/task/${id}?populate=[{"path":"user"},{"path":"project"}]`, req.body).then(({ body: task }) => (
    {
      task,
      originalItem: task,
    }
  )).then((props) => {
    Object.assign(
      props,
      {
        users: [props.task.user],
        project: [props.task.project],
        currentWeek: currentWeekNumber(Date.now()),
      });
    res.render('Task/TasksEdit', { props });
  });

});

module.exports = taskRouter;
