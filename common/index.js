/* eslint no-underscore-dangle: 0 */

'use strict';

import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

const { paths, reducers, state } = window.__INIT__;
const Container = require(`./containers/${paths.container}`).default;
const store = require(`./stores/${paths.store}`).default;

render(
  <Provider store={store(state, reducers)}>
    <Container />
  </Provider>,
  document.getElementById('root')
);
