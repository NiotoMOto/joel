import React, { PropTypes, Component } from 'react';

import { Input } from '../commons';

export default class ProductForm extends Component {
  static porpTypes = {
    user: PropTypes.object.isRequired,
    patch: PropTypes.func,
  }

  render() {
    const { patch, user } = this.props;
    return (
      <div>
        <Input
          defaultValue={user.name}
          floatingLabelText="Nom"
          hintText="Nom du projet"
          id="userName"
          onChange={patch.bind(this, '/name')}
          type="text"
        />
      </div>
    );
  }
}
