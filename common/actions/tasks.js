'use strict';

import projetService from '../services/rest/task';

export const FETCH_TASK = 'FETCH_TASK';

export const fetch = (query) => (dispatch) =>
  projetService.all(query)
    .then(({ tasks, ...rest }) => {
      dispatch({ type: FETCH_TASK, tasks });
      return { tasks, ...rest };
    });
