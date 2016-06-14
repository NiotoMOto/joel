'use strict';

export const isFunction = (f) => Object.prototype.toString.call(f) === '[object Function]';

export const comp = (f, g) => (...args) => f(g(...args));

export const not = (f) => (...args) => !f(...args);

export const _ = Symbol();

export const partialize = (f, ...args) => (...args2) => {
  const realArgs = [];
  let j = 0;

  for (const i in args) {
    if (args[i] === _) {
      realArgs.push(args2[j]);
      j++;
    } else {
      realArgs.push(args[i]);
    }
  }

  return f(...realArgs);
};
