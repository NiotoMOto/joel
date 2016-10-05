import React, { Component } from 'react';
import ContentCreate from 'material-ui/svg-icons/content/create';
import { FloatingActionButton } from 'material-ui';

import { connect } from '../../services/util/index';
import ProductForm from '../../components/users/UserForm';
import Layout from '../../components/Layout';

@connect({ props:['user'], actions: ['user'] })
export default class ProductNew extends Component {

  submit(e) {
    e.preventDefault();
    this.props.actions.user.create(this.props.user).then((user) => {
      window.location.href = `/users/${user._id}`;
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
    const { user, actions } = this.props;
    return (
      <Layout footer={this.renderFooter()}>
        <ProductForm
          patch={actions.user.patch}
          user={user}
        />
      </Layout>
    );
  }
}
