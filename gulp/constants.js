'use strict';

exports.paths = {
  common: {
    root: './common',
    react: './common/**/*.{js,jsx}',
    entry: './common/index.js',
    json: './common/**/*.json',
  },
  server: {
    root: './server',
    noReact: ['./server/**/*.js', '!./server/common/**/*.js'],
    common: './server/common',
  },
  mainCss: './public/css/main.css',
  public: {
    js: './public/js',
    css: './public/css',
  },
  scss: './scss/**/*.scss',
  test: {
    e2e: './test/**/*.e2e.js',
    unit: './test/**/*.unit.js',
  },
  webpack: {
    config: '../webpack.config.js',
  },
};

exports.node = {
  path: 'index.js',
  options: [],
};
