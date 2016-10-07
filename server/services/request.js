/* eslint no-console: 0 */

'use strict';

const rq = require('request-promise');

const config = require('../../config');


module.exports = (method, path, data) => {
  const apiUrl = config.apiUrl;
  const options = {
    uri: `${apiUrl}${path}`,
    method: method.toUpperCase(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
    resolveWithFullResponse: true,
    json: true, // Automatically stringifies the body to JSON
  };

  return rq(options)
    .then((res) => (
      {
        headers: res.headers,
        body: res.body || {},
      }
    ))
    .catch((res) => {
      console.error('FAILED', method.toUpperCase(), path, res.statusCode, res.error.message);
      return Promise.reject({
        statusCode: res.statusCode,
        stack: res.error,
      });
    });
};
