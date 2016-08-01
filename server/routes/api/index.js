const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const express = require('express');
const apiRouter = new express.Router();
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
      },
      postProcess: (req, res, next) => {
        const statusCode = req.erm.statusCode; // 200 or 201
        console.info(`${req.method} ${req.path} request completed with status code ${statusCode}`);
        next();
      },
    }
  );
}

require('../../data/populate')();

module.exports = apiRouter;
