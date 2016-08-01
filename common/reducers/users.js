'use strict';

import { FETCH_USER } from '../actions/users';

export default function tags(state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      return action.users;
    default:
      return state;
  }
}
