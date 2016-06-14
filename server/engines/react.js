'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const qs = require('querystring');

const dust = Promise.promisifyAll(require('dustjs-linkedin'));
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const serialize = require('serialize-javascript');

const { Provider } = require('react-redux');

const { defaults: defaultScripts } = require('../constants/scripts');
const { replaceLastOccurence } = require('../common/services/util/string');

const defaultSettings = (filePath, relativePath) => {
  let hasStore = true;
  const storePath = replaceLastOccurence(filePath, 'containers', 'stores');

  try {
    require.resolve(storePath);
  } catch (e) {
    hasStore = false;
  }

  return {
    key: 'default',
    props: {},
    relativePaths: {
      container: relativePath,
      store: hasStore ? relativePath : 'default',
    },
    paths: {
      container: filePath,
      store: hasStore ? storePath : '../common/stores/default',
    },
  };
};

module.exports = (middlewareSettings) => function compile(filePath, options, callback) {
  const settings = Object.assign({}, defaultSettings(filePath, this.name), options);
  const reducers = settings.reducers;
  const storeModule = require(settings.paths.store).default;
  const store = storeModule(Object.assign({}, settings.props, { }), reducers);

  return fs.readFileAsync(middlewareSettings.layout, 'utf8')
    .then((fileContent) => {
      dust.loadSource(dust.compile(fileContent, 'page'));

      const scriptConfigs = Object.assign({}, defaultScripts, settings.scripts);

      const scripts = Object.keys(scriptConfigs).map((key) =>
        ReactDOMServer.renderToStaticMarkup(
          React.createElement('script', scriptConfigs[key])
        )
      ).join('');

      const data = qs.escape(serialize({
        reducers,
        paths: settings.relativePaths,
        state: store.getState(),
      }));

      const content = ReactDOMServer.renderToString(
        React.createElement(Provider, { store },
          React.createElement(require(settings.paths.container).default)
        )
      );

      return dust.renderAsync('page', { content, data, scripts })
        .then((html) => callback(null, html));
    })
    .catch(callback);
};
