'use strict';

import projectService from '../services/rest/project';

export const FETCH_PROJECT = 'FETCH_PROJECT';

export const fetch = (query) => (dispatch) =>
  projectService.all(query)
    .then(({ projects, ...rest }) => {
      dispatch({ type: FETCH_PROJECT, projects });
      return { projects, ...rest };
    });

export const fetchAutocomplete = (query) => (dispatch) =>
  projectService.all(query)
    .then((projects) => {
      dispatch({ type: FETCH_PROJECT, projects });
      return { projects };
    });
