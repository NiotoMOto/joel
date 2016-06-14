/* eslint prefer-const: 0 */
'use strict';

module.exports = (...keys) => (req, res, next) => {
  // let -> const
  for (let key of keys) {
    if (req.query.hasOwnProperty(key)) {
      try {
        req.query[key] = JSON.parse(req.query[key]);
      } catch (e) {
        continue;
      }
    }
  }
  next();
};
