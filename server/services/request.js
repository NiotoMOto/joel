/* eslint no-console: 0 */

'use strict';

const url = require('url');
const rq = require('request-promise');

const { pick } = require('../common/services/util/object');
const log = require('./log');
const config = require('../../config');

const loggedKeys = ['uri', 'method', 'body'];

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

  const time = new Date();
  return rq(options)
    .then((res) => {
      const now = new Date();
      log.info(pick(options, ...loggedKeys), `${res.statusCode} (in ${now - time}ms)`);
      // console.log('SUCCESS', method.toUpperCase(), path, res.statusCode);
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
