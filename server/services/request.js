/* eslint no-console: 0 */

'use strict';

const url = require('url');
const rq = require('request-promise');

const config = require('../../config');

module.exports = (method, path, data) => {
  const isSafe = ['GET', 'HEAD'].indexOf(method.toUpperCase()) >= 0;
  const service = path.match(/[a-zA-Z-]+/);

  const options = {
    uri: url.resolve(config.services[service], path),
    method: method.toUpperCase(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: !(isSafe) ? data || {} : null,
    resolveWithFullResponse: true,
    json: true, // Automatically stringifies the body to JSON
  };

  return rq(options)
    .then((res) => {
      console.log('SUCCESS', method.toUpperCase(), path, res.statusCode);
      return {
        headers: res.headers,
        body: res.body || {},
      };
    })
    .catch((res) => {
      console.error('FAILED', method.toUpperCase(), path, res.statusCode, res.error.message);
      return Promise.reject({
        statusCode: res.statusCode,
        stack: res.error,
      });
    });
};
