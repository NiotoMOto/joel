
import { PATCH_SELECTED_WEEK } from '../actions/task';

export default (state = {}, action) => {
  switch (action.type) {
    case PATCH_SELECTED_WEEK:
      return action.value;
    default:
      return state;
  }
};
