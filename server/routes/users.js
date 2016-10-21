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
  request('get', `/user/${id}`, req.body).then(({ body: user }) => (
    {
      user,
      originalItem: user,
    }
  )).then((props) => {
    const query = JSON.stringify({
      user: props.user._id,
    });
    request('get',
      `/task/?query=${query}&populate=[{"path":"user"},{"path":"project"}]`,
      req.body)
    .then(({ body: tasks }) => {
      Object.assign(props, { tasks });
      res.render('User/UserEdit', { props });
    });
  });

});

module.exports = userRouter;
