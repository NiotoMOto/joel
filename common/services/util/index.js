'use strict';

import moment from 'moment';
import { fromJS } from 'immutable';
import { apply } from 'fast-json-patch';
import { get } from 'jsonpointer';
import { bindActionCreators } from 'redux';
import { connect as reduxConnect } from 'react-redux';

import { select } from './object';
import { wrap } from './array';
import { range } from './number';
import * as actions from '../../actions';

export const DATE_FORMAT = 'DD/MM/YYYY HH:mm';

export const ISO_REGEX = new RegExp([
  '(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]',
  '\\d:[0-5]\\d|Z))|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d([+-]',
  '[0-2]\\d:[0-5]\\d|Z))|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d([+-][0-2]\\d:[0-5]\\d|Z))',
].join(''));

/**
 *  Retourne la valeur d'un paramètre dans la querystring
 *
 * @param {String} name - nom du paramètre à récupérer
 * @param {String} url - url à parser, default: window.location.href
 * @returns {*}
 */
export const getParameterByName = (name, url) => {
  const name1 = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name1}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url || window.location.href);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const devicesToText = (notifs) =>
  notifs.map((n) => DEVICES.find((d) => d.name === n).label).join(', ');

export const dateToText = (date) =>
  date ? moment(date).format(DATE_FORMAT) : '';

export const dateToISO = (date) =>
  date ? moment(date, DATE_FORMAT).toISOString() : null;

export const id = (x) => x;

export const idWithDefault = (defaultValue) =>
  (x) => id(typeof x === 'undefined' ? defaultValue : x);

export const mapDispatchToProps = (...keys) => (dispatch) => keys.reduce((agg, key) =>
  (agg.actions[key] = bindActionCreators(actions[key], dispatch), agg), { actions: {} });

export const connectWithDefaultState = (...args) => reduxConnect(id, ...args);

export const connectWithSelectedState = (keys, ...args) => reduxConnect(select(...keys), ...args);

export const connectWithNoState = (...args) => reduxConnect(null, ...args);

export const connect = ({ actions = [], props = [], mergeProps = null, options = {} } = {}) => {
  const propsCb = props === 'default' ? id : select(...props);
  return reduxConnect(propsCb, mapDispatchToProps(...actions), mergeProps, options);
};

export const benchmark = (object, name, value) => {
  /* eslint no-console: 0 */
  const f = value.value;
  value.value = (...args) => {
    const now = Date.now();
    f(...args);
    console.log(`${name} finished in ${Date.now() - now} ms`);
  };
};

export const delay = function delay({ id, time = 0, delay = 0 } = {}, callback) {
  const currentTime = Date.now();
  if (currentTime - time < delay) {
    clearTimeout(id);
  }
  return {
    delay,
    id: setTimeout(callback, delay),
    time: currentTime,
  };
};

const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7',
                  '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

// cf. https://github.com/makeable/uuid-v4.js/blob/master/uuid-v4.js
export const uuid = () =>
  range(36).reduce((uuid, i) => {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      return `${uuid}-`;
    } else if (i === 15) {
      return `${uuid}4`;
    } else if (i === 20) {
      return `${uuid}${hexChars[(Math.random() * 4 | 0 + 8)]}`;
    }
    return `${uuid}${hexChars[(Math.random() * 15 | 0)]}`;
  }, '');

export const isEmpty = (obj) => {
  let length = 0;
  if (obj.hasOwnProperty('length')) {
    length = obj.length;
  } else {
    for (const unused in obj) {
      length++;
      break;
    }
  }
  return length === 0;
};

export const clone = (obj) => fromJS(obj).toJS();

export const patch = (obj, patch) => {
  const ret = clone(obj);
  apply(ret, wrap(patch));
  return ret;
};

export const smartPatch = (obj, path, value) => {
  let op;
  if (typeof value === 'undefined') {
    op = 'remove';
  } else {
    op = typeof get(obj, path) !== 'undefined' ? 'replace' : 'add';
  }

  return patch(obj, { op, path, value });
};

export const extractTextFromHTMLString = (str) =>
  new DOMParser().parseFromString(str, 'text/html').documentElement.textContent.trim();

export * from './object';
export * from './array';
export * from './string';
export * from './func';
