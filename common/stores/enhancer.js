'use strict';

import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const args = [applyMiddleware(thunk)];

if (process.env.NODE_ENV !== 'production') {
  // args.push();
}

export default compose(...args);
