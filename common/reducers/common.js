'use strict';

import { UPDATE_TOTAL_COUNT } from '../actions/totalCount';

export const totalCount = (state = 0, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_COUNT:
      return action.totalCount;
    default:
      return state;
  }
};
