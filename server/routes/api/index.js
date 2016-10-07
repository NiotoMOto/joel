const express = require('express');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const { pick } = require('../../common/services/util/object');
const { log } = require('../../services');

const loggedKeys = ['url', 'method', 'body'];

const apiRouter = new express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(methodOverride());

for (const model in mongoose.models) {
  restify.serve(apiRouter, mongoose.models[model],
    {
      prefix: '',
      totalCountHeader: true,
      onError: (err, req, res) => {
        const statusCode = req.erm.statusCode; // 400 or 404
        res.status(statusCode).json({
          message: err.message,
        });
        log.error(pick(req, ...loggedKeys), err.message, `${res.statusCode} (in ms)`);
      },
      preProcess: (req, res, next) => {
        next();
      },
      postProcess: (req, res, next) => {
        log.info(pick(req, ...loggedKeys), `${res.statusCode} (in ms)`);
        next();
      }
    }
  );
}

require('../../data/populate')();

module.exports = apiRouter;
