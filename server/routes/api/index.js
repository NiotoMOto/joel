'use strict';

const express = require('express');
const qs = require('querystring');

const { request } = require('../../services');
const { pick } = require('../../common/services/util');

const apiRouter = new express.Router();

/**
 * Gestion globale des ressources
 */

apiRouter.route('/:resource')
  .get(({ params: { resource }, query }, res) => {
    request('get', `/${resource}/?${qs.stringify(query)}`)
      .then(({ body, headers }) => {
        res.send({
          [resource]: body,
          totalCount: +headers['x-total-count'],
        });
      })
      .catch(({ stack, statusCode }) => res.status(statusCode).send(stack));
  })
  .post(({ body, params: { resource } }, res) => {
    request('post', `/${resource}/`, body)
      .then(({ body }) => res.send(body))
      .catch(({ stack, statusCode }) => res.status(statusCode).send(stack));
  });

apiRouter.route('/:resource/:id')
  .get(({ params: { id, resource } }, res) => {
    request('get', `/${resource}/${id}`)
      .then(({ body }) => res.send(body))
      .catch(({ stack, statusCode }) => res.status(statusCode).send(stack));
  })
  .patch(({ body, params: { id, resource } }, res) => {
    request('patch', `/${resource}/${id}`, body)
      .then(({ body }) => res.send(body))
      .catch(({ stack, statusCode }) => res.status(statusCode).send(stack));
  })
  .delete(({ params: { id, resource } }, res) => {
    request('delete', `/${resource}/${id}`)
      .then(({ body }) => res.send(body))
      .catch(({ stack, statusCode }) => res.status(statusCode).send(stack));
  });

module.exports = apiRouter;
