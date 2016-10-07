'use strict';

import { FETCH_TASK } from '../actions/tasks';

export default function tags(state = [], action) {
  switch (action.type) {
    case FETCH_TASK:
      return action.tasks;
    default:
      return state;
  }
}
