import React, { PropTypes, Component } from 'react';

import { Input } from '../commons';

export default class ProductForm extends Component {
  static porpTypes = {
    project: PropTypes.object.isRequired,
    patch: PropTypes.func,
  }

  render() {
    const { patch, project } = this.props;
    return (
      <div>
        <Input
          defaultValue={project.name}
          floatingLabelText="Nom"
          hintText="Nom du projet"
          id="projectName"
          onChange={patch.bind(this, '/name')}
          type="text"
        />
      </div>
    );
  }
}
