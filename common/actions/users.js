'use strict';

import userService from '../services/rest/user';

export const FETCH_USER = 'FETCH_USER';

export const fetch = (query) => (dispatch) =>
  userService.all(query)
    .then(({ users, ...rest }) => {
      dispatch({ type: FETCH_USER, users });
      return { users, ...rest };
    });

export const fetchAutocomplete = (query) => (dispatch) =>
  userService.all(query)
    .then((users) => {
      dispatch({ type: FETCH_USER, users });
      return { users };
    });
