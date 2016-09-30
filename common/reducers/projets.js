'use strict';

import { FETCH_PROJET } from '../actions/projets';

export default function tags(state = [], action) {
  switch (action.type) {
    case FETCH_PROJET:
      return action.projets;
    default:
      return state;
  }
}
