
'use strict';

import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton } from 'material-ui';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';

@connect({ props: ['projets', 'totalCount'] })
export default class ProjetList extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    projets: PropTypes.array.isRequired,
  };

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
      <Layout>
        <h1>Liste des Projets </h1>
        {projets}
      </Layout>
    );
  }
}
