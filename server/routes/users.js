'use strict';

const express = require('express');

const request = require('../services/request');
const userRouter = new express.Router();

userRouter.get('/', (req, res) => {
  request('get', '/user').then(({ body: users, headers }) => {
    const props = {
      users,
      totalCount: +headers['x-total-count'],
    };
    res.render('User/UserList', { props });
  });
});

userRouter.get('/new', (req, res) => {
  res.render('User/UserNew');
});

userRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  request('get', `/user/${id}`, req.body).then(({ body: user }) => {
    const props = {
      user,
      originalItem: user,
    };
    res.render('User/UserEdit', { props });
  });

});

module.exports = userRouter;
