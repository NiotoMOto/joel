'use strict';

const del = require('del');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const constants = require('./constants');

const isFixed = (file) =>
  file.eslint !== null && (file.eslint.errorCount > 0 || file.eslint.warningCount > 0);

gulp.task('lint', () =>
  gulp.src(constants.paths.server.noReact.concat(constants.paths.common.react))
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError()));

gulp.task('lint:all', () =>
  gulp.src(constants.paths.server.noReact.concat(constants.paths.common.react))
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format()));

gulp.task('lint:error', () =>
  gulp.src(constants.paths.server.noReact.concat(constants.paths.common.react))
    .pipe(plugins.eslint({
      quiet: true,
    }))
    .pipe(plugins.eslint.format()));

gulp.task('lint:fix:client', () =>
  gulp.src(constants.paths.common.react)
    .pipe(plugins.eslint({
      fix: true,
    }))
    .pipe(plugins.eslint.format())
    .pipe(plugins.if(isFixed, gulp.dest(constants.paths.common.root))));

gulp.task('lint:fix:server', () =>
  gulp.src(constants.paths.server.noReact)
    .pipe(plugins.eslint({
      fix: true,
    }))
    .pipe(plugins.eslint.format())
    .pipe(plugins.if(isFixed, gulp.dest(constants.paths.server.root))));

gulp.task('clean', done => {
  del([constants.paths.public.js, constants.paths.server.common])
    .then(() => done());
});
