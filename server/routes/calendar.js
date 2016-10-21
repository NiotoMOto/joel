'use strict';

const express = require('express');
const promise = require('bluebird');
const currentWeekNumber = require('current-week-number');

const request = require('../services/request');
const calendarRouter = new express.Router();

calendarRouter.get('/', (req, res) => {
  promise.props({
    users: request('get', '/user'),
    tasks: request('get', '/task'),
  }).then(({ users, tasks }) => {
    const props = {
      users: users.body,
      tasks: tasks.body,
      currentWeek: currentWeekNumber(Date.now()),
    };
    res.render('Calendar/Calendar', { props });
  });
});

module.exports = calendarRouter;
