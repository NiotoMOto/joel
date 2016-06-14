'use strict';

require('babel-register');
require('babel-polyfill');

require('./gulp/common');
require('./gulp/develop');
require('./gulp/build');
require('./gulp/test');

const gulp = require('gulp');
const node = require('./gulp/node');

gulp.task('build', ['lint:error', 'scss:build', 'webpack:build', 'compile:build', 'copy:build']);

gulp.task('default', ['watch'], node.start);
