'use strict';

const express = require('express');
const promise = require('bluebird');
const currentWeekNumber = require('current-week-number');
const moment = require('moment');

const request = require('../services/request');
const calendarRouter = new express.Router();

calendarRouter.get('/', (req, res) => {

  const currentWeek = currentWeekNumber(moment().toString());
  const nextWeek = currentWeekNumber(moment().add(1, 'weeks').toString());
  const previousWeek = currentWeekNumber(moment().subtract(1, 'weeks').toString());

  const takQuery = JSON.stringify({
    $or: [
      { weeks: currentWeek },
      { weeks: nextWeek },
      { weeks: previousWeek },
    ]
  });
  promise.props({
    users: request('get', '/user'),
    tasks: request('get', `/task?query=${takQuery}`),
  }).then(({ users, tasks }) => {
    const props = {
      users: users.body,
      tasks: tasks.body,
      currentWeek: currentWeekNumber(Date.now()),
      selectedWeek: currentWeekNumber(Date.now()),
    };
    res.render('Calendar/Calendar', { props });
  });
});

module.exports = calendarRouter;
