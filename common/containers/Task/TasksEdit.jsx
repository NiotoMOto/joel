import React, { Component } from 'react';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { FloatingActionButton } from 'material-ui';

import { connect } from '../../services/util/index';
import TaskForm from '../../components/tasks/TaskForm';
import Layout from '../../components/Layout';

@connect({ props:['task'], actions: ['task'] })
export default class ProductNew extends Component {

  submit(e) {
    e.preventDefault();
    const { _id, ...body } = this.props.task;
    this.props.actions.task.update(_id, body);
  }

  renderFooter() {
    return (
      <FloatingActionButton
        className="pull-right green"
        onClick={::this.submit}
      >
        <ContentCreate />
      </FloatingActionButton>
    );
  }

  render() {
    const { task, actions } = this.props;
    return (
      <Layout footer={this.renderFooter()}>
        <TaskForm
          patch={actions.task.patch}
          task={task}
        />
      </Layout>
    );
  }
}
