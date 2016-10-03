
'use strict';

import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';

@connect({ props: ['projects', 'totalCount'] })
export default class ProjectList extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    projects: PropTypes.array.isRequired,
  };

  renderFooter() {
    return (
      <FloatingActionButton
        className="pull-right"
        href="/projects/new"
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    const projects = this.props.projects.map((p) => (
      <div
        className="spaced col-sm-3"
        key={p._id}
      >
        <Card>
          <CardTitle
            title={p.name}
          />
          <CardActions>
            <FlatButton href={`/projects/${p._id}`} label="Détail" />
          </CardActions>
        </Card>
      </div>
    ));
    return (
      <Layout footer={this.renderFooter()}>
        <h1>Liste des Projets </h1>
        <div className="row">
          {projects}
        </div>
      </Layout>
    );
  }
}
