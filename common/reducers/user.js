
import { PATCH_USER } from '../actions/user';
import { smartPatch } from '../services/util/index';

export default (state = {}, action) => {
  switch (action.type) {
    case PATCH_USER:
      return smartPatch(state, action.path, action.value);
    default:
      return state;
  }
};
