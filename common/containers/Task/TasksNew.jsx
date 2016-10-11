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
    this.props.actions.task.create(this.props.task).then((task) => {
      window.location.href = `/tasks/${task._id}`;
    });
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
