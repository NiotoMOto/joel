'use strict';

import { combineReducers, createStore } from 'redux';

import enhancer from './enhancer';
import * as reducers from '../reducers';
import { omit, pick } from '../services/util/object';
import { idWithDefault } from '../services/util/index';

const filterReducers = (reducers, { action, keys = [] } = {}) => {
  switch (action) {
    case 'omit': return omit(reducers, ...keys);
    case 'only': return pick(reducers, ...keys);
    default: return reducers;
  }
};

export default (initialState, options) =>
  createStore(combineReducers(filterReducers(Object.assign({}, reducers, {
    originalItem: idWithDefault({}),
    currentWeek: idWithDefault({}),
    // Ajouter valeurs par défaut (ex: `user: idWithDefault({})`)
  }), options)), initialState, enhancer);
