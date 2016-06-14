'use strict';

const spawn = require('child_process').spawn;
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const glob = require('glob');

const constants = require('./constants');

gulp.task('test:unit', () =>
  gulp.src(constants.paths.test.unit)
    .pipe(plugins.mocha()));

gulp.task('test:e2e', (done) => {
  glob(constants.paths.test.e2e, (err, files) => {
    if (err) {
      plugins.util.log(plugins.util.colors.red(err));
      return done();
    }

    const casper = spawn('casperjs', ['test'].concat(files));

    casper.stdout.on('data', (data) => {
      plugins.util.log('CasperJS:', data.toString().slice(0, -1));
    });

    casper.on('close', (code) => {
      if (code === 0) {
        plugins.util.log(
          plugins.util.colors.green('Tous les tests e2e se sont terminés avec succès')
        );
      } else {
        plugins.util.log(
          plugins.util.colors.red('Des erreurs sont survenues')
        );
      }
      done();
    });
  })
});

gulp.task('test', ['test:unit', 'test:e2e']);
