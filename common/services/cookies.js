'use strict';

import { parse } from './util/string';

export default () =>
  document.cookie.split(';')
    .map((cookie) => cookie.trim().split('='))
    .reduce((agg, [key, val]) => {
      try {
        agg[key] = parse(val);
      } catch (e) {
        agg[key] = val;
      } finally {
        return agg;
      }
    }, {});
