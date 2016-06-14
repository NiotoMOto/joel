'use strict';

import { comp } from './func';
import { remove as removeDiacritics } from 'diacritics';

const regExpOperators = /[|\\{}()[\]^$+*?.]/g;

export const toRegExp = (str) =>
  new RegExp(str.replace(regExpOperators, '\\$&'));

export const replaceLastOccurence = (str, pattern, replacement) => {
  const lastIndex = str.lastIndexOf(pattern);
  if (lastIndex >= 0) {
    return str.substring(0, lastIndex) + replacement + str.substring(lastIndex + pattern.length);
  }
  return str;
};

export const capitalize = (str) => str.length ? str[0].toUpperCase() + str.slice(1) : '';

export const dashify = (str) =>
  str.replace(/[\/\s_]+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const underscore = (str) =>
  str.replace(/[\/\s\-]+/g, '_').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

export const camelCase = (str) =>
  dashify(str).replace(/\-(\w)/g, (_, letter) => letter.toUpperCase());

export const upperCamelCase = comp(capitalize, camelCase);

export const truncate = (str, length = 10, end = '...') => {
  if (length <= 0) {
    return '';
  }
  return str.length > length + end.length ? `${str.slice(0, length)}${end}` : str;
};

export const parse = (str) => JSON.parse(decodeURIComponent(str));

export const slugify = (str) =>
  dashify(removeDiacritics(str).trim().toLowerCase().replace(/[^\w\s]+/g, ''));
