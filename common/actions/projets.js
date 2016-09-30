'use strict';

import projetService from '../services/rest/projet';

export const FETCH_PROJET = 'FETCH_PROJET';

export const fetch = (query) => (dispatch) =>
  projetService.all(query)
    .then(({ users, ...rest }) => {
      dispatch({ type: FETCH_PROJET, users });
      return { users, ...rest };
    });
