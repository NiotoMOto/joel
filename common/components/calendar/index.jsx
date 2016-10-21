import React, { Component } from 'react';

import { connect } from '../../services/util';

@connect({ props: ['currentWeek', 'selectedWeek', 'users', 'projects', 'tasks'] })
export default class Calendar extends Component {

  renderWeeks() {
    const { selectedWeek } = this.props;
    console.log(selectedWeek);
    const weeks = [selectedWeek - 1, selectedWeek, selectedWeek + 1];
    return weeks.map((s) => (
      <div
        className="inline-block"
        key={s}
      >
        Semaine {s}
      </div>
    ));
  }

  renderLines() {
    const { users } = this.props;
    return users.map((u) => (
      <div>
        <div
          className="calendar line"
          key={u._id}
        >
          <div>{u.firstName}</div>
        </div>
        <div className="inline-block">
          {this.renderWeeks()}
        </div>
      </div>
    ));
  }

  render() {
    const { tasks, users, projects } = this.props;
    console.log(tasks, users, projects);
    return (
      <div>
        <h1>Calendrier</h1>
        {this.renderLines()}
      </div>
    );
  }
}
