import React, { PropTypes, Component } from 'react';
import { AutoComplete, Chip } from 'material-ui';

import { connect } from '../../services/util/index';
import { Input, PAutoComplete } from '../commons';
import items from '../../constants/items';

@connect({ props: ['users', 'projects', 'currentWeek'], actions: ['users', 'projects'] })
export default class TaskForm extends Component {
  static porpTypes = {
    task: PropTypes.object.isRequired,
    patch: PropTypes.func,
  }

  searchUser(q) {
    const query = JSON.stringify({
      $or: [{ firstName: `~${q}` }],
    });
    this.props.actions.users.fetchAutocomplete({ query });
  }

  searchProject(q) {
    const query = JSON.stringify({
      $or: [{ name: `~${q}` }],
    });
    this.props.actions.projects.fetchAutocomplete({ query });
  }

  pushWeek(value, index) {
    if (index !== -1) {
      this.props.patch('/weeks', [...this.props.task.weeks, parseInt(value)]);
    }
  }

  renderWeeks() {
    let render = 'Non assignée à une semaine';
    if (this.props.task.weeks && this.props.task.weeks.length) {
      render = this.props.task.weeks.map((w) => (
        <Chip className="text-center" key={w}>Semaine {w}</Chip>
      ))
    }
    return render
  }

  render() {
    const weeks = items.weeks;
    const { patch, task, users, projects } = this.props;
    const { user, project, week } = task;
    const userValue = user ? user.firstName : '';
    const projectValue = project ? project.name : '';
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
          <PAutoComplete
            dataSource={users}
            dataSourceConfig={{ text: 'firstName', value: '_id' }}
            field="_id"
            filter={AutoComplete.caseInsensitiveFilter}
            floatingLabelText="Technicien"
            hintText="Technicien"
            id="tech"
            onNewRequest={patch.bind(this, '/user')}
            onUpdateInput={::this.searchUser}
            openOnFocus
            searchText={userValue}
          />
        </div>
        <div className="form-group">
          <PAutoComplete
            dataSource={projects}
            dataSourceConfig={{ text: 'name', value: '_id' }}
            field="_id"
            filter={AutoComplete.noFilter}
            floatingLabelText="Projet"
            hintText="Projet"
            id="tech"
            onNewRequest={patch.bind(this, '/project')}
            onUpdateInput={::this.searchProject}
            openOnFocus
            searchText={projectValue}
          />
        </div>
        <div className="form-group">
          <Input
            defaultValue={task.progress}
            floatingLabelText="Progression"
            hintText="Progression"
            id="progress"
            onChange={patch.bind(this, '/progress')}
            type="number"
          />
        </div>
        <div className="form-group">
          <Input
            defaultValue={task.timePass}
            floatingLabelText="Temps passé"
            hintText="Temps passé"
            id="timePass"
            onChange={patch.bind(this, '/timePass')}
            type="number"
          />
        </div>
        <div className="form-group">
          <PAutoComplete
            dataSource={weeks}
            field="week"
            floatingLabelText="Semaine"
            hintText="Semaine"
            id="week"
            maxSearchResults={7}
            onNewRequest={::this.pushWeek}
            openOnFocus
            searchText={week}
            type="number"
          />
        </div>
        <div className="form-group">
          {::this.renderWeeks()}
        </div>
      </div>
    );
  }
}
