'use strict';

export const isPlainObject = (obj) =>
  Object.prototype.toString.call(obj).includes('Object');

export const cleanObj = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (typeof val !== 'undefined' && val !== null) {
      newObj[key] = val;
    }
  });
  return newObj;
};

export const diffObj = (origin, modified) => {
  const diff = {};
  const newObj = Object.assign({}, origin, modified);

  Object.keys(origin).forEach((key) => {
    if (origin[key] !== newObj[key]) {
      diff[key] = newObj[key];
    }
  });

  return diff;
};

export const pick = (obj, ...keys) => {
  const ret = {};
  if (!obj) {
    return obj;
  }
  keys.forEach((key) => {
    if (typeof obj[key] !== 'undefined') {
      ret[key] = obj[key];
    }
  });
  return ret;
};

export const select = (...keys) => (obj) => pick(obj, ...keys);

export const omit = (obj, ...keys) => {
  const ret = {};
  for (const { key, val } of iter(obj)) {
    if (!keys.includes(key)) {
      ret[key] = val;
    }
  }
  return ret;
};

export const filter = (obj, f) => {
  const newObj = {};
  for (const { key, val } of iter(obj)) {
    if (f({ key, val })) {
      newObj[key] = val;
    }
  }
  return newObj;
};

export const map = (obj, f) => {
  const newObj = {};
  for (const entry of iter(obj)) {
    const { key, val } = f(entry);
    newObj[key] = val;
  }
  return newObj;
};

export const iter = function *iter(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      yield { key, val: obj[key] };
    }
  }
};

export const groupBy = (obj, groupKey, cb) => {
  /* eslint callback-return: 0 */
  const ret = {};
  for (const entry of iter(obj)) {
    const key = entry.val[groupKey];
    const val = cb ? cb(entry) : entry.val;

    if (!ret.hasOwnProperty(key)) {
      ret[key] = [val];
    } else {
      ret[key].push(val);
    }
  }
  return ret;
};

export const get = (obj, key, notFound) => obj.hasOwnProperty(key) ? obj[key] : notFound;
