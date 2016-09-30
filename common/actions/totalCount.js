'use strict';

export const UPDATE_TOTAL_COUNT = 'UPDATE_TOTAL_COUNT';

export const update = (totalCount) => (
  { type: UPDATE_TOTAL_COUNT, totalCount }
);
