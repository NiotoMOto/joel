'use strict';

export const isNumber = (x) => Object.prototype.toString.call(x) === '[object Number]';

export const range = (rawMin, rawMax, step = 1) => {
  if (step === 0) {
    throw new Error('0 step leads to infinite loop');
  }

  const max = isNumber(rawMax) ? rawMax : rawMin;
  const min = isNumber(rawMax) ? rawMin : 0;
  const ret = [];
  for (let i = min; i < max; i += step) {
    ret.push(i);
  }
  return ret;
};
