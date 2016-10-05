'use strict';
import projectService from '../services/rest/project';

export const PATCH_PROJECT = 'PATCH_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export const patch = (path, value) => (
  { type: PATCH_PROJECT, path, value }
);

export const create = (body) => (dispatch) => {
  const params = {
    querystring: {},
  };
  return projectService.create(
    Object.assign(body, {}),
    params).then((res) => {
      dispatch({ type: CREATE_PROJECT, res });
      return res;
    });
};

export const update = (id, original, body) => (dispatch) => {
  const params = {
    querystring: { id },
    messages: { success: 'Mise a jours du projet réussi' },
  };
  return projectService.update(id, original, body, params)
    .then((res) => dispatch({ type: UPDATE_PROJECT, body, res }));
};
