import React, { PropTypes, Component } from 'react';

import { connect } from '../../services/util/index';
import { Input, AutoComplete } from '../commons';

@connect({ props: ['users', 'projects'], actions: ['users', 'projects'] })
export default class TaskForm extends Component {
  static porpTypes = {
    task: PropTypes.object.isRequired,
    patch: PropTypes.func,
  }

  searchUser(q) {
    const query = JSON.stringify({
      $or: [
        {
          firstName: `~${q}`,
        },
      ],
    });
    this.props.actions.users.fetchAutocomplete({ query });
  }

  render() {
    const { patch, task, users } = this.props;
    console.log();
    return (
      <div>
        <div className="form-group">
          <Input
            defaultValue={task.name}
            floatingLabelText="Nom"
            hintText="Nom de la tâche"
            id="taskName"
            onChange={patch.bind(this, '/name')}
            type="text"
          />
        </div>

        <div className="form-group">
          <AutoComplete
            dataSource={users}
            dataSourceConfig={{ text: 'firstName', value: '_id' }}
            field="_id"
            filter={AutoComplete.noFilter}
            floatingLabelText="Technicien"
            hintText="Technicien"
            id="tech"
            onNewRequest={patch.bind(this, '/user')}
            onUpdateInput={::this.searchUser}
            openOnFocus
          />
        </div>
      </div>
    );
  }
}