'use strict';

import mediaService from '../services/rest/media';

export const FETCH_MEDIA = 'FETCH_MEDIA';

export const fetch = (query) => (dispatch) =>
  mediaService.all(query)
    .then(({ medias, ...rest }) => {
      dispatch({ type: FETCH_MEDIA, medias });
      return { medias, ...rest };
    });
