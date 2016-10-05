'use strict';

import * as jsonpointer from 'jsonpointer';

import req from '../../req';
import { capitalize, map, pick, diffObj } from '../../../services/util';
import Promise from 'bluebird';

import { localize } from '../../../services/locales';

export const main = (name, path, options = {}) => {
  const retrieve = (path, fallback) => jsonpointer.get(options, path) || fallback;

  const buildMessages = (action) =>
    map(['success', 'failure'], ({ val: type }) => {
      if (!retrieve(`/${action}/messages/no${capitalize(type)}`)) {
        const key = retrieve(
          `/${action}/messages/${type}`,
          `/messages/rest/default/${action}/${type}`
        );
        return { key: type, val: localize(key, { name }) };
      }
      return {};
    });

  const methods = {
    all(querystring, options = {}) {
      return req(
        retrieve('/all/path', path),
        Object.assign({}, { querystring }, options)
      );
    },

    show(id, querystring, options = {}) {
      return req(
        `${retrieve('/show/path', path)}/${id}`,
        Object.assign({}, { querystring }, options)
      );
    },

    create(body, options = {}) {
      return req(retrieve('/create/path', path), Object.assign({}, {
        body,
        messages: buildMessages('create'),
        params: { method: 'POST' },
      }, options));
    },

    update(id, body, original, options = {}) {
      const diff = diffObj(original, body);
      let promise;
      if (Object.keys(diff).length) {
        promise = req(`${retrieve('/update/path', path)}/${id}`, Object.assign({}, {
          body: diff,
          messages: buildMessages('update'),
          params: { method: 'PATCH' },
        }, options));
      } else {
        promise = Promise.resolve(original);
      }
      return promise;
    },

    remove(id, options = {}) {
      return req(`${retrieve('/remove/path', path)}/${id}`, Object.assign({}, {
        messages: buildMessages('remove'),
        params: { method: 'DELETE' },
      }, options));
    },
  };

  return pick(methods, ...retrieve('/only', Object.keys(methods)));
};
