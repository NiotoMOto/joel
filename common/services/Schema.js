'use strict';

import Joi from 'joi';

import { api as schemas } from '@oneinfo/schemas';
import { localize } from './locales';

export default class Schema {
  static load(name, method) {
    return new Schema(name, method);
  }

  static validate(name, method, value) {
    return Schema.load(name, method).validate(value);
  }

  constructor(name, method) {
    this.schema = { method, name };
  }

  localize(field, options) {
    return localize(`/joi/errors/${field}`, options);
  }

  validate(value) {
    const schema = schemas[this.schema.name][this.schema.method];
    const { error } = Joi.validate(value, schema, { abortEarly: false });
    return {
      value,
      errors: !error ? null : error.details.reduce((agg, { context, path, type }) => {
        if (typeof agg[path] === 'undefined') {
          agg[path] = [];
        }
        agg[path].push({ context, type });
        return agg;
      }, {}),
    };
  }
}
