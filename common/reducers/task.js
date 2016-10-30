
import { PATCH_TASK } from '../actions/task';
import { smartPatch } from '../services/util/index';

export default (state = {}, action) => {
  switch (action.type) {
    case PATCH_TASK:
      return smartPatch(state, action.path, action.value);
    default:
      return state;
  }
};
