'use strict';

export const PATCH_WEEK = 'PATCH_WEEK';

export const patch = (value) => (
  { type: PATCH_WEEK, value }
);
