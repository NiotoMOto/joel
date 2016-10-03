'use strict';

import projetService from '../services/rest/project';

export const FETCH_PROJECT = 'FETCH_PROJECT';

export const fetch = (query) => (dispatch) =>
  projetService.all(query)
    .then(({ projects, ...rest }) => {
      dispatch({ type: FETCH_PROJECT, projects });
      return { projects, ...rest };
    });
