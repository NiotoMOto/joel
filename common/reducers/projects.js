'use strict';

import { FETCH_PROJECT } from '../actions/projects';

export default function tags(state = [], action) {
  switch (action.type) {
    case FETCH_PROJECT:
      return action.projects;
    default:
      return state;
  }
}
