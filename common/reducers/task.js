
import { PATCH_TASK } from '../actions/task';
import { smartPatch } from '../services/util/index';

export default (state = {}, action) => {
  switch (action.type) {
    case PATCH_TASK:
    console.log(state, action.patch, action.value);
      return smartPatch(state, action.path, action.value);
    default:
      return state;
  }
};
