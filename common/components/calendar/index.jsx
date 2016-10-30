import React, { Component } from 'react';
import * as _ from 'lodash';

import { connect } from '../../services/util';

@connect({ props: ['currentWeek', 'selectedWeek', 'users', 'projects', 'tasks'] })
export default class Calendar extends Component {

  renderCase(week, user) {
    // console.log(week, user);
    const { tasks } = this.props;
    let render = <div key={`${user._id}${week}`}>Pas de tâche</div>;
    const tasksToDisplay = tasks.filter((t) => {
      return _.includes(t.weeks, week) && t.user === user._id
    });
    if (tasksToDisplay && tasksToDisplay.length){
      render = tasksToDisplay.map((t) => (
        <div
          className="inline-block"
          key={`${user._id}${week}`}
        >
          <a href={`/tasks/${t._id}`}> {t.name} </a>
        </div>
      ));
    }
    return render;
  }

  renderWeeks() {
    const { selectedWeek } = this.props;
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
    const { selectedWeek } = this.props;
    const weeks = [selectedWeek - 1, selectedWeek, selectedWeek + 1];
    const { users } = this.props;
    return (
      <div>
        <div className="col-sm-3">
          <div>Semaines</div>
          {
            users.map((u) => (
              <div key={`c${u._id}`}>{u.firstName}</div>
            ))
          }
        </div>
        {weeks.map((s) => (
          <div className="col-sm-3" key={`c${s}`}>
            {s}
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
