
'use strict';

import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';

@connect({ props: ['projets', 'totalCount'] })
export default class ProjetList extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    projets: PropTypes.array.isRequired,
  };

  renderFooter() {
    return (
      <FloatingActionButton className="pull-right">
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    const projets = this.props.projets.map((p) => (
      <div
        className="col-sm-3 card-spaced"
        key={p._id}
      >
        <Card>
          <CardTitle
            title={p.name}
          />
          <CardActions>
            <FlatButton label="Détail" />
          </CardActions>
        </Card>
      </div>
    ));
    return (
      <Layout footer={this.renderFooter()}>
        <h1>Liste des Projets </h1>
        <div className="row">
          {projets}
        </div>
      </Layout>
    );
  }
}
