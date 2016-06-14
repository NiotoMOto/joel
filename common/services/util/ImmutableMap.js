'use strict';

export const keyIn = (...keys) => {
  const keySet = new Set(keys);
  return (v, k) => keySet.has(k);
};
