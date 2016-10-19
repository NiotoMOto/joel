
'use strict';

import React, { Component, PropTypes } from 'react';
import { FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';
import TasksTable from '../../components/tasks/TasksTable';

@connect({ props: ['tasks', 'totalCount'] })
export default class TasksList extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
  };

  renderFooter() {
    return (
      <FloatingActionButton
        className="pull-right"
        href="/tasks/new"
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    return (
      <Layout footer={this.renderFooter()}>
        <h1>Liste des tâches </h1>
        <TasksTable />
      </Layout>
    );
  }
}
