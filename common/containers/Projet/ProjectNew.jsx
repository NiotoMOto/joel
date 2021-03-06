import React, { Component } from 'react';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { FloatingActionButton } from 'material-ui';

import { connect } from '../../services/util/index';
import ProjectForm from '../../components/projects/ProjectForm';
import Layout from '../../components/Layout';

@connect({ props:['project'], actions: ['project'] })
export default class ProductNew extends Component {

  submit(e) {
    e.preventDefault();
    this.props.actions.project.create(this.props.project).then((project) => {
      window.location.href = `/projects/${project._id}`;
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
    const { project, actions } = this.props;
    return (
      <Layout footer={this.renderFooter()}>
        <ProjectForm
          patch={actions.project.patch}
          project={project}
        />
      </Layout>
    );
  }
}
