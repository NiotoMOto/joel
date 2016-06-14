'use strict';

import { parse, stringify } from 'querystring';
import { toRegExp } from './util/string';
import { filter } from './util/object';

export const updateSearch = (query, search = window.location.search) => {
  const obj = parse(search.slice(1));
  const newquery = filter(Object.assign({}, obj, query),
    ({ val }) => (typeof val === 'string' || typeof val === 'boolean')
  );
  return `?${stringify(newquery)}`;
};

export const match = (pattern, pathname = window.location.pathname) =>
  (pattern instanceof RegExp ? pattern : toRegExp(pattern)).test(pathname);
