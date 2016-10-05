
'use strict';

import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';

@connect({ props: ['users', 'totalCount'] })
export default class ProjectList extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
  };

  renderFooter() {
    return (
      <FloatingActionButton
        className="pull-right"
        href="/users/new"
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    const users = this.props.users.map((p) => (
      <div
        className="spaced col-sm-3"
        key={p._id}
      >
        <Card>
          <CardTitle
            title={p.username}
          />
          <CardActions>
            <FlatButton href={`/users/${p._id}`} label="Détail" />
          </CardActions>
        </Card>
      </div>
    ));
    return (
      <Layout footer={this.renderFooter()}>
        <h1>Liste des utilisateurs </h1>
        <div className="row">
          {users}
        </div>
      </Layout>
    );
  }
}
