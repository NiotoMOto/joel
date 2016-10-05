'use strict';
import userService from '../services/rest/user';

export const PATCH_USER = 'PATCH_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const patch = (path, value) => (
  { type: PATCH_USER, path, value }
);

export const create = (body) => (dispatch) => {
  const params = {
    querystring: {},
  };
  return userService.create(
    Object.assign(body, {}),
    params).then((res) => {
      dispatch({ type: CREATE_USER, res });
      return res;
    });
};

export const update = (id, original, body) => (dispatch) => {
  const params = {
    querystring: { id },
    messages: { success: 'Mise a jours de l\'utilisateur réussi' },
  };
  return userService.update(id, original, body, params)
    .then((res) => dispatch({ type: UPDATE_USER, body, res }));
};
