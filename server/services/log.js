'use strict';

const config = require('../../config');
const bunyan = require('bunyan');
const gelfStream = require('gelf-stream');

const logStream = config.log && config.log.output !== 'stdout' ?
  gelfStream.forBunyan(config.log.output) : process.stdout;

module.exports = bunyan.createLogger({
  name: 'backoffice',
  level: config.log ? config.log.level : 'error',
  stream: logStream,
});
