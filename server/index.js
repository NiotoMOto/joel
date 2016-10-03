'use strict';

require('babel-polyfill');

const path = require('path');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');

const engines = require('./engines');
const routes = require('./routes');

const app = new express();

if (process.env.NODE_ENV === 'development') {
  app.use('/public/js/', require('express-http-proxy')('http://localhost:9000'));
}

app.engine('js', engines.react({
  layout: path.resolve(__dirname, 'views', 'index.dust'),
}));

app.set('views', path.resolve(__dirname, 'common', 'containers'));
app.set('view engine', 'js');

app.use(cookieParser());
app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

app.use('/vendors', express.static(path.resolve(__dirname, '..', 'node_modules')));
app.use('/public', express.static(path.resolve(__dirname, '..', 'public')));

app.use('/', routes);

module.exports = app;
