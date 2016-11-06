'use strict';

import * as _ from 'lodash';

import taskService from '../services/rest/task';

export const PATCH_TASK = 'PATCH_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const patch = (path, value) => (
  { type: PATCH_TASK, path, value }
);

export const create = (body) => (dispatch) => {
  const params = {
    querystring: {},
  };
  if (body.weeks && body.weeks.length) {
    body.weeks = _.map(body.weeks, (w) => (_.toNumber(w)));
  }
  return taskService.create(
    Object.assign(body, {}), params).then((res) => {
      dispatch({ type: CREATE_TASK, res });
      return res;
    });
};

export const update = (id, body) => (dispatch) => {
  const params = {
    querystring: { id },
    messages: { success: 'Mise a jours de l\'utilisateur réussi' },
  };
  return taskService.update(id, body, params)
    .then((res) => {
      dispatch({ type: UPDATE_TASK, body, res });
    });
};
