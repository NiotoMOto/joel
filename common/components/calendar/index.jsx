import React, { Component } from 'react';
import * as _ from 'lodash';

import { connect } from '../../services/util';

@connect({ props: ['currentWeek', 'selectedWeek', 'users', 'projects', 'tasks'] })
export default class Calendar extends Component {

  goToTask(t) {
    window.location = `/tasks/${t._id}`;
  }

  gotToNewTask(user, week) {
    window.location = `/tasks/new?user=${user._id}&week=${week}`;
  }

  renderCase(week, user) {
    const { tasks } = this.props;
    let render = (
      <div
        className="calendar-case clickable"
        key={`${user._id}${week}`}
        onClick={this.gotToNewTask.bind(this, user, week)}
      >
        <i className="fa fa-plus" />
      </div>
    );
    const tasksToDisplay = tasks.filter((t) => (
     _.includes(t.weeks, week) && t.user === user._id
    ));
    if (tasksToDisplay && tasksToDisplay.length) {
      render = tasksToDisplay.map((t) => (
        <div
          className="calendar-case clickable"
          key={`${user._id}${week}`}
          onClick={this.goToTask.bind(this, t)}
        >
          {t.name}
        </div>
      ));
    }
    return render;
  }

  renderLines() {
    const { selectedWeek } = this.props;
    const weeks = [selectedWeek - 1, selectedWeek, selectedWeek + 1];
    const { users } = this.props;
    return (
      <div>
        <div className="col-sm-3 calendar-column">
          <div className="calendar-case">Semaines</div>
          {
            users.map((u) => (
              <div className="calendar-case" key={`c${u._id}`}>{u.firstName}</div>
            ))
          }
        </div>
        {weeks.map((s) => (
          <div className="col-sm-3 calendar-column" key={`c${s}`}>
            <div className="calendar-case">{s}</div>
           {
             users.map((u) => (
              this.renderCase(s, u)
            ))
           }
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Calendrier</h1>
        {this.renderLines()}
      </div>
    );
  }
}
