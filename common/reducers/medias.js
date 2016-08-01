'use strict';

import { FETCH_MEDIA } from '../actions/medias';

export default function tags(state = [], action) {
  switch (action.type) {
    case FETCH_MEDIA:
      return action.medias;
    default:
      return state;
  }
}
