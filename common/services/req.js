'use strict';

import qs from 'querystring';

import { camelCase, underscore } from '../services/util/string';
import { isFunction } from '../services/util/func';
import { filter, map } from '../services/util/object';
import { isEmpty } from '../services/util/index';
import toastr from './toastr';
import { localize } from './locales';

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  return res.text().then((text) => Promise.reject(text));
};

const processErrorMessage = (err) => {
  try {
    const errors = JSON.parse(err);
    return errors.map(({ error, field }) => (
      localize(`/error/codes/${camelCase(error)}`, {
        field: localize(`/fields/${field.replace('.', '/')}`) || field,
      } || `${error}: ${field}`)
    )).join('<br>');
  } catch (e) {
    return err;
  }
};

/**
 * @param {String} path
 * @param {Object} options?
 * @param {Object} options.body
 * @param {Object} options.querystring
 * @param {Object} options.messages
 * @param {Boolean} options.underscore
 * @param {Function | string} options.messages.success
 * @param {Function | string} options.messages.failure
 * @param {Object} options.params
 *   Les paramètres de la fonction 'fetch'
 *   Ceux-ci prennent l'ascendant sur les autres options
 *   Voir: https://fetch.spec.whatwg.org/
 * @return {Promise<any>}
 *   La valeur de retour de 'fetch'
 */
export default (path, options = {}) => {
  const { messages = {}, params = {}, underscore: convert } = options;
  let { body, querystring = {} } = options;

  // Construction du querystring
  querystring = filter(querystring, ({ val }) =>
    typeof val !== 'undefined' && val !== null && val !== '');

  if (convert) {
    querystring = map(querystring, ({ key, val }) => (
      { val, key: underscore(key) }
    ));
  }

  querystring = isEmpty(querystring) ? '' : `?${qs.stringify(querystring)}`;

  // Contruction du body, et mise à jour des en-têtes de réponse
  if (body) {
    body = JSON.stringify(body);
    params.headers = Object.assign({}, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, params.headers);
  }

  return fetch(
    `${path}${querystring}`,
    Object.assign({ credentials: 'same-origin' }, { body }, params)
  )
    .then(checkStatus)
    .then((res) => res.json())
    .then((response) => {
      const { success } = messages;
      const message = isFunction(success) ? success(response, body || params.body) : success;
      if (message) {
        toastr({ message });
      }
      return response;
    })
    .catch((err) => {
      const failure = processErrorMessage(err) ||
        messages.failure ||
        localize('/messages/error/default');
      const message = isFunction(failure) ? failure(err, body || params.body) : failure;
      if (message) {
        toastr({ type: 'error', message });
      }
      return Promise.reject(err);
    });
};
