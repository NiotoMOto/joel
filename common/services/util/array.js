'use strict';

import { partialize, _ } from './func';
import { get } from './object';
import { localize } from '../locales';

const vocabulary = localize('/vocabulary');

export const wrap = (obj) => Array.isArray(obj) ? obj : [obj];

export const uniq = (xs) => [...new Set(xs)];

export const compact = (xs) => xs.filter((x) => x);

export const sentencify = (xs, {
  join = `${vocabulary.join} `,
  last = ` ${vocabulary.last} `,
} = {}) =>
  xs.reduce((agg, x, i) => {
    switch (i) {
      case 0: return x;
      case xs.length - 1: return `${agg}${last} ${x}`;
      default: return `${agg}${join}${x}`;
    }
  }, '');

export const takeWhile = (xs, pred) => {
  const ret = [];
  for (const i in xs) {
    if (pred(xs[i], i)) {
      ret.push(xs[i]);
    } else {
      return ret;
    }
  }
  return ret;
};

export const partition = (xs, length) => {
  if (length <= 0) {
    throw new Error('length should be greater than 0');
  }

  const ret = [];
  xs.forEach((x, i) => {
    if (i % length === 0) {
      ret.push([x]);
    } else {
      ret[ret.length - 1].push(x);
    }
  });
  return ret;
};

export const repeat = (x, n) => {
  const ret = [];
  for (let i = 0; i < n; i++) {
    ret.push(x);
  }
  return ret;
};

export const removeAtIndex = (xs, index) => {
  if (!xs.hasOwnProperty(index)) {
    throw new Error(`index ${index} out of bound`);
  }

  const ret = [];
  for (const i in xs) {
    if (+i !== +index) {
      ret.push(xs[i]);
    }
  }
  return ret;
};

export const first = partialize(get, _, 0, _);
