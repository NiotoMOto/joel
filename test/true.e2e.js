'use strict';

var util = require('util');
var login = require('../utils/index.js').login;

var URL = 'http://127.0.0.1:4000';
var URLS = [
  '/',
];
var FAKE_URL = '/tagss';

casper.test.begin('Le site est fonctionnel', 23, function (test) {

  casper.start();

  login.call(casper, URL);

  casper
    .eachThen(URLS, function (resp) {
      var url = URL + resp.data;
      test.info('GET ' + url);
      casper.thenOpen(url, function (res) {
        test.assertEquals(res.url, url, 'La page chargée est la bonne.');
        test.assertEquals(res.status, 200, 'et elle retourne un 200');
      });
    })

    .thenOpen(URL + FAKE_URL, function (res) {
      test.assertEquals(res.status, 404, 'fake url returns 404');
    })

    .run(function () {
      test.done();
    });
});
