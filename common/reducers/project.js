
import { PATCH_PROJECT } from '../actions/project';
import { smartPatch } from '../services/util/index';

export default (state = {}, action) => {
  switch (action.type) {
    case PATCH_PROJECT:
      return smartPatch(state, action.path, action.value);
    default:
      return state;
  }
};
