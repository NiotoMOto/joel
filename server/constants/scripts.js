'use strict';

const { pick } = require('../common/services/util/object');

const defaultScripts = ['jquery', 'bootstrap'];

exports.jquery = {
  src: '/vendors/jquery/dist/jquery.min.js',
};

exports.bootstrap = {
  src: '/vendors/bootstrap/dist/js/bootstrap.min.js',
};

exports.defaults = pick.apply(null, [exports].concat(defaultScripts));
