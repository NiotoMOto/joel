import React, { PropTypes, Component } from 'react';

import { Input } from '../commons';

export default class UserForm extends Component {
  static porpTypes = {
    user: PropTypes.object.isRequired,
    patch: PropTypes.func,
  }

  render() {
    const { patch, user } = this.props;
    return (
      <div>
        <div className="form-group">
          <Input
            defaultValue={user.username}
            floatingLabelText="Username"
            hintText="Username"
            id="userName"
            onChange={patch.bind(this, '/username')}
            type="text"
          />
        </div>
        <div className="form-group">
          <Input
            defaultValue={user.firstName}
            floatingLabelText="Prénom"
            hintText="Prénom"
            id="userName"
            onChange={patch.bind(this, '/firstName')}
            type="text"
          />
        </div>
        <div className="form-group">
          <Input
            defaultValue={user.lastName}
            floatingLabelText="Nom de famille"
            hintText="Nom de famille"
            id="userName"
            onChange={patch.bind(this, '/lastName')}
            type="text"
          />
        </div>
      </div>
    );
  }
}
