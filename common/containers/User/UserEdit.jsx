import React, { Component } from 'react';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { FloatingActionButton } from 'material-ui';

import { connect } from '../../services/util/index';
import UserForm from '../../components/users/UserForm';
import Layout from '../../components/Layout';

@connect({ props:['user', 'originalItem'], actions: ['user'] })
export default class ProductNew extends Component {

  submit(e) {
    e.preventDefault();
    const { _id, ...body } = this.props.user;
    this.props.actions.user.update(_id, body, this.props.originalItem);
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
    const { user, actions } = this.props;
    return (
      <Layout footer={this.renderFooter()}>
        <UserForm
          patch={actions.user.patch}
          user={user}
        />
      </Layout>
    );
  }
}
