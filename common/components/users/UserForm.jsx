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
        <Input
          defaultValue={user.username}
          floatingLabelText="Username"
          hintText="Username"
          id="userName"
          onChange={patch.bind(this, '/username')}
          type="text"
        />
      </div>
    );
  }
}
